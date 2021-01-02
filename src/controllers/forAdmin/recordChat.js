const ChatModel = require('../../db/models/chat');

async function recordChat(req, res) {

    try {
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

    } catch (error) {
        res.status(400);
        res.json({
            recorded: false,
            error: error
        })
    }
}

module.exports = recordChat;