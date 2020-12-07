const express = require('express');
const router = express.Router();

const signUp = require('../controllers/signup');

router.post('/sign-up', signUp);

module.exports = router;