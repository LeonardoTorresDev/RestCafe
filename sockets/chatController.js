const Message = require('../models/message');

class chatController {

    constructor() {
        this.users = {}
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

    async sendMessage( uid, message, receiver = '' ){

        const new_message = new Message({
            author : uid,
            creationDate : new Date(),
            message,   
        });

        if(receiver){
            new_message.receiver = receiver;
        }       

        await new_message.save();
           
    }

    async getLastMessages(){      
        const messages = await Message.find()
                                        .populate('author')
                                        .sort({_id: -1})
                                        .limit(10)
                                        .exec();
        return messages;
    }

}

module.exports = chatController;