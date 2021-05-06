const {checkJWT} = require('../helpers/helpers');
let chatController = require('./chatController');

chatController = new chatController();


const socketController = async( socket, io ) => {

    //get token from frontend connection
    const user = await checkJWT(socket.handshake.headers.authorization);

    if(!user){ return socket.disconnect(); }

    chatController.connectUser(user);
    io.emit('active-users', chatController.connectedUsers);

    socket.on('disconnect', ()=>{
        chatController.disconnectUser(user.id);
        io.emit('active-users', chatController.connectedUsers);
    });

    


}

module.exports = {
    socketController
};