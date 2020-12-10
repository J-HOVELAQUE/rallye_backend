const express = require('express');
const router = express.Router();

const recordTeam = require('../controllers/forAdmin/recordTeam');
const recordCar = require('../controllers/forAdmin/recordCar');

router.post('/team', recordTeam);
router.post('/car', recordCar);

module.exports = router;