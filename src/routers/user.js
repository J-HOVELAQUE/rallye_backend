const express = require('express');
const router = express.Router();

const signUp = require('../controllers/signup');
const signIn = require('../controllers/signin');
const getUser = require('../controllers/getUser');
const updateUser = require('../controllers/updateUser');
const updateFavorite = require('../controllers/updateFavorite');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

router.get('/get-user', getUser);
router.put('/update-user', updateUser)
router.put('/update-favorite', updateFavorite)

module.exports = router;