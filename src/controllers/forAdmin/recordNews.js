const NewsModel = require('../../db/models/news');

async function recordNews(req, res) {

    try {
        const newNews = new NewsModel({
            title: req.body.title,
            image: req.body.image,
            description: req.body.description,
            dat: req.body.date,
        });

        const newsSaved = await newNews.save();

        res.json({
            recorded: true,
            data: newsSaved,
        })

    } catch (error) {
        res.status(400);
        res.json({
            recorded: false,
            error: error
        })
    }
}

module.exports = recordNews;