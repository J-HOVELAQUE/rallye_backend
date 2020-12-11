const UserModel = require('../db/models/user');

async function getUser(req, res) {
    console.log('QUERY', req.query.token);
    const answerDb = await UserModel.findOne({ token: req.query.token })
        .populate('favorite')
        .exec();



    res.json({
        user: answerDb
    })
}

module.exports = getUser;