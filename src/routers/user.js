const express = require('express');
const router = express.Router();

const signUp = require('../controllers/signup');
const signIn = require('../controllers/signin');
const getUser = require('../controllers/getUser');
const updateUser = require('../controllers/updateUser');
// const updateFavorite = require('../controllers/updateFavorite');
const addFavorite = require('../controllers/addFavorite');
const removeFavorite = require('../controllers/removeFavorite');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);

router.get('/get-user', getUser);
router.put('/update-user', updateUser)
// router.put('/update-favorite', updateFavorite)
router.put('/add-favorite', addFavorite)
router.put('/remove-favorite', removeFavorite)

module.exports = router;