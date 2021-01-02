const CateringModel = require('../../db/models/catering');

async function recordCatering(req, res) {

    try {
        const newCatering = new CateringModel({
            adress: req.body.adress,
            date: req.body.date
        });

        const cateringSaved = await newCatering.save();

        res.json({
            recorded: true,
            data: cateringSaved,
        })

    } catch (error) {
        res.status(400);
        res.json({
            recorded: false,
            error: error
        })
    }
}

module.exports = recordCatering;