
const ResultModel = require('../db/models/results');

async function getResults(req, res) {

    const results = await ResultModel.find()
        .populate('team_id')
        .exec();
    console.log(results);

    res.json({ results: results })
}

module.exports = getResults;