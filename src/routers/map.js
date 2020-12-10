const express = require('express');
const router = express.Router();

const transmitVehiculePosition = require('../controllers/transmitVehiculePosition')

router.post('/position', transmitVehiculePosition);


module.exports = router;