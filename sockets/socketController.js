const {checkJWT} = require('../helpers/helpers');
let chatController = require('./chatController');

chatController = new chatController();


const socketController = async( socket, io ) => {

    //get token from frontend connection
    const user = await checkJWT(socket.handshake.headers.authorization);

    if(!user){ return socket.disconnect(); }

    //when connect socket add user to object array and update active-users emit
    chatController.connectUser(user);
    io.emit('active-users', chatController.connectedUsers);

    //when disconnect socket delete user from object array and update active-users emit
    socket.on('disconnect', ()=>{
        chatController.disconnectUser(user.id);
        //wait to message to be stored on database
        io.emit('active-users', chatController.connectedUsers);
    });

    socket.on('send-message', async ({ uid, message}) => {
        //await until database saves new message
        await chatController.sendMessage(user.id, message);
        //await until database sends last ten messages 
        const return_messages = await chatController.getLastMessages()
        //send last ten messages
        io.emit('receive-message', return_messages );
    });
}

module.exports = {
    socketController
};