const uid2 = require('uid2');
const SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
const Joi = require('joi');

const UserModel = require('../../db/models/user');

const schemaPayload = Joi.object({
    firstname: Joi.string(),

    name: Joi.string()
        .required(),

    password: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
})


async function signUp(req, res) {

    const salt = uid2(32);
    let answerForFront = {};
    const errorArray = [];
    let recorded = false;

    ///// Validation payload /////
    const { error } = schemaPayload.validate(req.body,
        { abortEarly: false });

    if (error) {
        const answerJoi = error.details;

        answerJoi.forEach(element => {
            errorArray.push(element.message)
        });

        res.status(400);
        res.json({
            type: "invalid payload",
            error: errorArray,
            recorded: false
        })

        return
    }

    ///// Process if payload is ok //////
    if (errorArray.length === 0) {
        try {
            const newUser = new UserModel({
                firstname: req.body.firstname,
                name: req.body.name,
                email: req.body.email,
                password: SHA256(req.body.password + salt).toString(encBase64),
                token: uid2(32),
                status: "fan",
                salt: salt,
                avatar: req.body.avatar,
                favorite: []
            });

            const userSaved = await newUser.save();

            answerForFront = {
                firstname: userSaved.firstname,
                name: userSaved.name,
                token: userSaved.token,
                status: userSaved.status,
                avatar: userSaved.avatar,
                favorite: userSaved.favorite,
                email: userSaved.email
            }
            recorded = true;

        } catch (error) {
            if (error.code === 11000) {
                res.status(409);
                res.json({
                    type: "conflict",
                    error: ["email existant"],
                    recorded: false
                })
                return
            }
            throw error;
        }
    }

    res.json({
        recorded: recorded,
        data: answerForFront,
        error: errorArray
    })
}

module.exports = signUp;