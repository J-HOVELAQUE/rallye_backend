const UserModel = require('../db/models/user');

async function updateUser(req, res) {

    let result = false
    // var update = { [req.body.keyToUpdate]: req.body.newValue }
    let jsonFields = JSON.parse(req.body.newValue)

    var update = {
        firstname: jsonFields.userFirstName,
        name: jsonFields.userLastName,
        email: jsonFields.userEmail,
        avatar: jsonFields.userAvatar,
        nationality: jsonFields.userNationality
    }

    console.log('RAW ////// : ', req.body.newValue)
    console.log('PARSE /////// : ', jsonFields)
    console.log('UPDATE ////// : ', update)

    const updateDb = await UserModel.updateOne(
        {
            token: req.body.token
        }, update
    )

    console.log(updateDb)
    if (updateDb.nModified === 1) {
        result = true
    }

    // Retrieve user updated
    const answerDb = await UserModel.findOne({ token: req.body.token });

    res.json({ result, user: answerDb })
}

module.exports = updateUser;