const express = require('express');
const router = express.Router();

const getUserByStatus = require('../controllers/getUserByStatus');

router.get('/get-status', getUserByStatus);

module.exports = router;