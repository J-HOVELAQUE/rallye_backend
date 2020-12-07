const express = require('express');
const router = express.Router();

const signUp = require('../controllers/signup');

router.get('/sign-up', signUp);

module.exports = router;