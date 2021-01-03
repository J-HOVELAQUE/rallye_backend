//// This function relay the position of a vehicule from transponder toward frontend ////
const TeamModel = require('../../db/models/team');

let allPosition = [];

async function transmitVehiculePosition(req, res) {
    let alreadyRecorded = false;

    //// Bulding the array of position with update or adding a vehicule depending if this vehicule is already in the array ////
    for (let i = 0; i < allPosition.length; i++) {
        if (allPosition[i].idVehicule === req.body.idVehicule) {
            allPosition[i].lat = req.body.lat;
            allPosition[i].long = req.body.long;
            alreadyRecorded = true;
        }
    }
    if (!alreadyRecorded) {
        let newCar = req.body;

        //// Join a color for the marker of the vehicule depending of it category ////
        const findedCar = await TeamModel.findOne({ car_id: parseInt(req.body.idVehicule, 10) });

        if (findedCar.category === "G/H/I") {
            newCar.color = "blue"
        } else {
            newCar.color = "red"
        }
        allPosition.push(newCar)
    }

    req.dependencies.socketServer.emit('sendPositionToAll', { allPosition });
    console.log(allPosition);
    res.json(req.body)
}

module.exports = transmitVehiculePosition;