const express = require('express');
const router = express.Router();

const recordTeam = require('../controllers/forAdmin/recordTeam');
const recordCar = require('../controllers/forAdmin/recordCar');
const recordUser = require('../controllers/forAdmin/recordUser');

router.post('/team', recordTeam);
router.post('/car', recordCar);
router.post('/user', recordUser);

module.exports = router;