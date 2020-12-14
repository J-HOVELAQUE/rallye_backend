const express = require('express');
const router = express.Router();

const getProgram = require('../controllers/getProgram');

router.get('/get-Program', getProgram);

module.exports = router;