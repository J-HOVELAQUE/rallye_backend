const express = require('express');
const router = express.Router();

const recordTeam = require('../controllers/forAdmin/recordTeam');

router.get('/team', recordTeam);

module.exports = router;