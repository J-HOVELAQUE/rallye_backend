const userModel = require('../db/models/user');
const uid2 = require('uid2');
const SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

const token = uid2(32)


async function signIn(req, res) {

    var result = false
    var user = null
    var error = []
  
    if (req.body.email == '' ||
      req.body.password == ''
    ) {
      error.push('champs vides')
    }
    if (error.length == 0) {
      console.log(req.body)
      user = await userModel.findOne({
        email: req.body.email
      });
      var hash = SHA256(req.body.password + user.salt).toString(encBase64);
  
      console.log(hash, user.password)
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