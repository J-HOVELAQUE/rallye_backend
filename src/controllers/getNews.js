const NewsModel = require('../db/models/news');

async function getNews(req, res) {
    const newsDb = await NewsModel({ 
        title: req.query.title,
        image: req.query.image,
        description: req.query.description,
        date: req.query.date,
    });

    console.log('LES NEWS', newsDb);

    res.json({ news: newsDb })
}

module.exports = getNews;
