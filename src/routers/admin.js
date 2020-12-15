const express = require('express');
const router = express.Router();

const recordTeam = require('../controllers/forAdmin/recordTeam');
const recordCar = require('../controllers/forAdmin/recordCar');
const recordUser = require('../controllers/forAdmin/recordUser');
const recordAccomodation = require('../controllers/forAdmin/recordAccomodation');
const recordCatering = require('../controllers/forAdmin/recordCatering');
const recordNews = require('../controllers/forAdmin/recordNews');
const recordProgram = require('../controllers/forAdmin/recordProgram');
const recordResults = require('../controllers/forAdmin/recordResults');

router.post('/team', recordTeam);
router.post('/car', recordCar);
router.post('/user', recordUser);
router.post('/accomodation', recordAccomodation);
router.post('/catering', recordCatering);
router.post('/news', recordNews);
router.post('/program', recordProgram);
router.post('/results', recordResults);

module.exports = router;