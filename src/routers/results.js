const express = require('express');
const router = express.Router();

const getResults = require('../controllers/getResults.js');

router.get('/results', getResults);

module.exports = router;
