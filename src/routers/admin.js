const express = require('express');
const router = express.Router();

const recordTeam = require('../controllers/forAdmin/recordTeam');
const recordCar = require('../controllers/forAdmin/recordCar');
const recordUser = require('../controllers/forAdmin/recordUser');
const recordNews = require('../controllers/forAdmin/recordNews');

router.post('/team', recordTeam);
router.post('/car', recordCar);
router.post('/user', recordUser);
router.post('/news', recordNews);

module.exports = router;