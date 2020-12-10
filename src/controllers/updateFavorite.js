const UserModel = require('../db/models/user');

async function updateFavorite(req, res) {

    const answerDb = await UserModel.findOne({ token: req.body.token });

    let newFavorite = [...answerDb.favorite]
    newFavorite.push(req.body.newValue.toString())

    // Building of the update field
    var update = { favorite: newFavorite }

    const updateDb = await UserModel.updateOne(
        {
            token: req.body.token
        }, update
    )

    if (updateDb.nModified === 1) {
        let result = true
        res.json({ result, favorite: newFavorite })
    } else {
        let result = false
        res.json({ result, favorite: answerDb.favorite })
    }
}

module.exports = updateFavorite;