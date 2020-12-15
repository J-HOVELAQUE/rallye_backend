const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        unique: true
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    history: [{
        msg: String,
        sender: String,
        status: String
    }]
});

const ChatModel = mongoose.model('chats', chatSchema);

module.exports = ChatModel;