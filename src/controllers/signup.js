const uid2 = require('uid2');
const SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

const UserModel = require('../db/models/user');


async function signUp(req, res) {

    const salt = uid2(32);
    let userSaved;
    const errorArray = [];

    try {
        const newUser = new UserModel({
            firstname: req.body.firstname,
            name: req.body.name,
            email: req.body.email,
            password: SHA256(req.body.password + salt).toString(encBase64),
            token: uid2(32),
            status: req.body.status,
            salt: salt,
            avatar: req.body.avatar
        });

        userSaved = await newUser.save();
    } catch (error) {
        console.log('ERREUR', error.code);
        if (error.code === 11000) {
            errorArray.push("email existant");
        }
    }

    res.json({
        message: "ok",
        data: userSaved,
        error: errorArray
    })
}

module.exports = signUp;