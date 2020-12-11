const express = require('express');
const router = express.Router();

const getNews = require('../routers/news');

router.get('/get-news', getNews);

module.exports = router;
