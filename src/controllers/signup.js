const uid2 = require('uid2');
const SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

const UserModel = require('../db/models/user');


async function signUp(req, res) {

    const salt = uid2(32);
    let userSaved;
    const errorArray = [];
    let recorded = false;

    if (req.body.name === undefined || req.body.name === null) {
        errorArray.push("champ requis name vide")
    }

    if (req.body.email === undefined || req.body.email === null) {
        errorArray.push("champ requis email vide")
    }

    if (req.body.password === undefined || req.body.password === null) {
        errorArray.push("champ requis password vide")
    }

    try {
        const newUser = new UserModel({
            firstname: req.body.firstname,
            name: req.body.name,
            email: req.body.email,
            password: SHA256(req.body.password + salt).toString(encBase64),
            token: uid2(32),
            status: "fan",
            salt: salt,
            avatar: req.body.avatar
        });

        userSaved = await newUser.save();
        recorded = true;

    } catch (error) {
        if (error.code === 11000) {
            errorArray.push("email existant");
        }
    }

    res.json({
        recorded: recorded,
        data: userSaved,
        error: errorArray
    })
}

module.exports = signUp;