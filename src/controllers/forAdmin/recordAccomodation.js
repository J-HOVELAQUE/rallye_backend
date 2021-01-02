const AccomodationModel = require('../../db/models/accomodation');

async function recordAccomodation(req, res) {

    try {
        const newAccomodation = new AccomodationModel({
            name: req.body.name,
            adress: req.body.adress,
            date: req.body.date,
            shuttle_point: req.body.shuttle_point,
            shuttle_hours: req.body.shuttle_hours,
            users: req.body.users
        });

        const accomodationSaved = await newAccomodation.save();

        res.json({
            recorded: true,
            data: accomodationSaved,
        })

    } catch (error) {
        res.status(400);
        res.json({
            recorded: false,
            error: error
        })
    }
}

module.exports = recordAccomodation;