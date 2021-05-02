const {checkJWT} = require('../helpers/helpers');

const socketController = async( socket ) => {

    //get token from frontend connection
    const user = await checkJWT(socket.handshake.headers.authorization);

    if(!user){ return socket.disconnect(); }

    console.log(`Connected user: ${user.name}`);

}

module.exports = {
    socketController
};