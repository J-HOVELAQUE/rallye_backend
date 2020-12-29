const ChatModel = require('../../db/models/chat');

async function recordChat(req, res) {

    let chat = {
        msg: 'testC',
        sender: 'blabla',
        status: 'pilot'
    }
    const newChat = new ChatModel({
        roomName: req.body.room,
        members: req.body.members,
        history: chat
    });

    const ChatSaved = await newChat.save();

    res.json({
        recorded: true,
        data: ChatSaved,
    })
}

module.exports = recordChat;