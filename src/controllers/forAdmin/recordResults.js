const ResultModel = require('../../db/models/result');

async function recordResults(req, res) {

    try {
        const newResult = new ResultModel({
            team_id: req.body.team_id,
            stage: req.body.stage,
            position: req.body.position,
            gpe_position: req.body.gpe_position,
            time: req.body.time,
            diff: req.body.diff,
        });

        const resultSaved = await newResult.save();

        res.json({
            recorded: true,
            data: resultSaved,
        })


    } catch (error) {
        res.status(400);
        res.json({
            recorded: false,
            error: error
        })
    }
}

module.exports = recordResults;