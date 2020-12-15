const ChatModel = require('../db/models/chat');

async function getChat(req, res) {
    // console.log('QUERY', req.query.token);
    console.log('ROOM HISTORY : ', req.query.room)
    const answerDb = await ChatModel.findOne({ roomName: req.query.room })
        // .populate('favorite')
        // .exec();



    res.json({
        roomInfo: answerDb
    })
}

module.exports = getChat;