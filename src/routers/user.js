const express = require('express');
const router = express.Router();

const signUp = require('../controllers/signup');
const signIn = require('../controllers/signin');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

module.exports = router;