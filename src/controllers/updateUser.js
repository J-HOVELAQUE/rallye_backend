const UserModel = require('../db/models/user');
const { put } = require('../routers/user');

async function updateUser(req, res) {

    // sur un put
    console.log('QUERY', req.body.token)
    console.log('UPDATE', req.body.keyToUpdate)
    console.log('UPDATE', req.body.newValue)

    // console.log('QUERY', req.query.token);
    // const answerDb = await UserModel.findOne({ token: req.query.token });
    // console.log('USER', answerDb);

    // res.json({
    //     user: answerDb
    // })
}

module.exports = updateUser;