async function signIn(req, res) {

    var result = false
    var user = null
    var error = []
  
    if (req.body.emailFromFront == '' ||
      req.body.passwordFromFront == ''
    ) {
      error.push('champs vides')
    }
    if (error.length == 0) {
      console.log(req.body)
      user = await userModel.findOne({
        email: req.body.emailFromFront
      });
      var hash = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64);
  
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