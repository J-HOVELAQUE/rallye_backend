const ProgramModel = require('../../db/models/program');

async function recordProgram(req, res) {

    try {
        const newProgram = new ProgramModel({
            date: req.body.date,
            event: req.body.event,
        });

        const programSaved = await newProgram.save();

        res.json({
            recorded: true,
            data: programSaved,

        })

    } catch (error) {
        res.status(400);
        res.json({
            recorded: false,
            error: error
        })
    }
}

module.exports = recordProgram;