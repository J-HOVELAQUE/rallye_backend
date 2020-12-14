const express = require('express');
const router = express.Router();

const getProgram = require('../controllers/getProgram');

router.get('/get-program', getProgram);

module.exports = router;