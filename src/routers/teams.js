const express = require('express');
const router = express.Router();

const getAllTeams = require('../controllers/getAllTeams');

router.get('/get-teams', getAllTeams);

module.exports = router;