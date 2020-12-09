//// This function relay the position of a vehicule from transponder toward frontend ////

let allPosition = [];

function transmitVehiculePosition(req, res) {
    console.log('DATA', req.body);

    let alreadyRecorded = false;


    for (let i = 0; i < allPosition.length; i++) {
        if (allPosition[i].idVehicule === req.body.idVehicule) {
            allPosition[i] = req.body;
            alreadyRecorded = true;
        }

    }

    if (!alreadyRecorded) {
        allPosition.push(req.body)
    }

    console.log('POSITION', allPosition);

    req.dependencies.socketServer.emit('sendPositionToAll', { allPosition });
    res.json(req.body)
}

module.exports = transmitVehiculePosition;