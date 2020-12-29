const express = require('express');
const router = express.Router();

const getAllTeams = require('../controllers/teams/getAllTeams');

router.get('/get-teams', getAllTeams);

module.exports = router;