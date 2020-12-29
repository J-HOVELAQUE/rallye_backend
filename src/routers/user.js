const express = require('express');
const router = express.Router();

const signUp = require('../controllers/user/signup');
const signIn = require('../controllers/user/signin');
const getUser = require('../controllers/user/getUser');
const updateUser = require('../controllers/user/updateUser');
const addFavorite = require('../controllers/user/addFavorite');
const removeFavorite = require('../controllers/user/removeFavorite');
const getInfo = require('../controllers/user/getInfo');
const updatePassword = require('../controllers/user/updatePassword');
const changeAvatar = require('../controllers/changeAvatar');
const getInfoMock = require('../controllers/user/getInfoMock');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/change-avatar', changeAvatar);

router.put('/update-user', updateUser);
router.put('/add-favorite', addFavorite);
router.put('/remove-favorite', removeFavorite);
router.put('/update-password', updatePassword);

router.get('/get-user', getUser);
router.get('/get-info', getInfo);
router.get('/get-info/mock', getInfoMock);

module.exports = router;