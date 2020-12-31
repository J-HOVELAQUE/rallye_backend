const UserModel = require('../../db/models/user');
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const Joi = require('joi');

const schemaPayload = Joi.object({
    password: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
})

async function signIn(req, res) {

    let result = false;
    let user = null;
    const errorArray = [];

    const answer = {
        token: null,
        status: null
    }

    let favorites = [];

    ////// Validation payload //////
    const { error } = schemaPayload.validate(req.body,
        { abortEarly: false });

    if (error) {
        const answerJoi = error.details;

        answerJoi.forEach(element => {
            errorArray.push(element.message)
        });

        res.status(400);
        res.json({
            result,
            data: answer,
            error: errorArray,
            favorites
        })
        return
    }

    ///// Process if payload ok /////
    if (errorArray.length == 0) {

        user = await UserModel.findOne({ email: req.body.email })
            .populate('favorite')
            .exec();

        if (user) {
            var hash = SHA256(req.body.password + user.salt).toString(encBase64);


            ///// Testing password /////
            if (hash === user.password) {
                result = true;
                answer.token = user.token;
                answer.status = user.status;
                answer.firstname = user.firstname;
                answer.name = user.name;
                answer.avatar = user.avatar;
                favorites = user.favorite.map(fav => fav.car_id)
            } else {
                res.status(400);
                res.json({
                    result,
                    data: answer,
                    error: ['wrong password'],
                    favorites
                })
                return
            }
        } else {
            res.status(400);
            res.json({
                result,
                data: answer,
                error: ['inexisting email'],
                favorites
            })
            return
        }
    }

    res.json({
        result,
        data: answer,
        error: errorArray,
        favorites
    })
}

module.exports = signIn;