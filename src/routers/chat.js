const express = require('express');
const router = express.Router();

const getUserByStatus = require('../controllers/getUserByStatus');
const getChat = require('../controllers/getChat');
const updateChat = require('../controllers/updateChat');

router.get('/get-status', getUserByStatus);
router.get('/get-chat', getChat)

router.put('/update-chat', updateChat)

module.exports = router;