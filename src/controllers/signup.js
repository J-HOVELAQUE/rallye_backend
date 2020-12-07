const UserModel = require('../db/models/user');
const uid2 = require('uid2');

async function signUp(req, res) {

    const newUser = new UserModel({
        firstname: req.body.firstname,
        name: req.body.mail,
        email: req.body.email,
        password: req.body.password,
        token: uid2(32),
        status: req.body.status,
        salt: req.body.salt,
        avatar: req.body.avatar
    });

    const userSaved = await newUser.save();

    res.json({
        message: "ok",
        data: userSaved
    })
}

module.exports = signUp;