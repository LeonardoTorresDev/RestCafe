
class chatController {

    constructor() {
        this.messages = []
        this.users    = {}
    }

    get connectedUsers() {
        return Object.values( this.users ); // [ {}, {}, {}]
    }

    connectUser( user ) {
        this.users[user.id] = user
    }

    disconnectUser( id ) {
        delete this.users[id];
    }

}

module.exports = chatController;