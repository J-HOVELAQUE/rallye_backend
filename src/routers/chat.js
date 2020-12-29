const express = require('express');
const router = express.Router();

const getUserByStatus = require('../controllers/chat/getUserByStatus');
const getChat = require('../controllers/chat/getChat');
const updateChat = require('../controllers/chat/updateChat');

router.get('/get-status', getUserByStatus);
router.get('/get-chat', getChat)

router.put('/update-chat', updateChat)

module.exports = router;