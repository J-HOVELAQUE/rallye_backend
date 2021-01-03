const express = require('express');
const router = express.Router();

const transmitVehiculePosition = require('../controllers/map/transmitVehiculePosition')

router.post('/position', transmitVehiculePosition);

module.exports = router;