const UserModel = require('../db/models/user');
const SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

async function signIn(req, res) {

  var result = false;
  var user = null;
  var error = [];
  let token;

  if (req.body.email == '' ||
    req.body.password == '' ||
    req.body.password === undefined ||
    req.body.email === undefined
  ) {
    error.push('champs vides')
  }

  if (error.length == 0) {

    user = await UserModel.findOne({
      email: req.body.email
    });

    var hash = SHA256(req.body.password + user.salt).toString(encBase64);


    if (hash === user.password) {
      result = true
      token = user.token
    } else {
      error.push('email ou mot de passe incorrect')
    }

  }
  res.json({
    result,
    user,
    error,
    token
  })
}

module.exports = signIn;