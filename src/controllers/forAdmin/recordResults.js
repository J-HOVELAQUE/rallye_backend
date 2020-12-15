const ResultModel = require('../../db/models/results');

async function recordResults(req, res) {

    const newResult = new ResultModel({
        team_id: req.body.team_id,
        timings: req.body.timings,
    });

    const resultSaved = await newResult.save();

    res.json({
        recorded: true,
        data: resultSaved,
    })
}

module.exports = recordResults;