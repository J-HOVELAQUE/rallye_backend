const NewsModel = require('../db/models/news');

async function getNews(req, res) {
    const newsDb = await NewsModel.find()
    console.log('LES NEWS', newsDb);
    res.json({ news: newsDb })
}

module.exports = getNews;
