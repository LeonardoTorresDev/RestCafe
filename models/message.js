const {Schema, model} = require('mongoose');

const messageSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    message: {
        type: String,
        required: [true,'Message is required']
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    creationDate: {
        type: Date,
        required: [true, 'Date is required']
    }
});

module.exports = model('Message', messageSchema);