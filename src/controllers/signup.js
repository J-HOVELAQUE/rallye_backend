const UserModel = require('../db/models/user');

async function signUp(req, res) {

    const newUser = new UserModel({
        firstname: req.body.firstname,
        name: req.body.mail,
        email: req.body.email,
        password: req.body.password,
        token: req.body.token,
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