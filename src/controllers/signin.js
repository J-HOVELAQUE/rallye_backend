const UserModel = require('../db/models/user');
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
  let token;

  ////// Validation payload //////

  const { error } = schemaPayload.validate(req.body,
    { abortEarly: false });

  console.log('ERREURS', error);

  if (error !== undefined) {
    const answerJoi = error.details;

    answerJoi.forEach(element => {
      errorArray.push(element.message)
    });
  }

  ///// Process if payload ok /////

  if (errorArray.length == 0) {

    user = await UserModel.findOne({
      email: req.body.email
    });

    var hash = SHA256(req.body.password + user.salt).toString(encBase64);


    ///// Testing password /////

    if (hash === user.password) {
      result = true
      token = user.token
    } else {
      errorArray.push('email ou mot de passe incorrect')
    }

  }
  res.json({
    result,
    data: { token: token },
    error: errorArray,
  })
}

module.exports = signIn;