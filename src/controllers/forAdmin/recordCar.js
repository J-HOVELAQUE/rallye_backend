const CarModel = require('../../db/models/car');

async function recordCar(req, res) {

    try {
        const newCar = new CarModel({
            brand: req.body.brand,
            model: req.body.model,
            year: req.body.year,
            image: req.body.image,
            description: req.body.description
        });

        const carSaved = await newCar.save();

        res.json({
            recorded: true,
            data: carSaved,
        })

    } catch (error) {
        res.status(400);
        res.json({
            recorded: false,
            error: error
        })
    }
}

module.exports = recordCar;