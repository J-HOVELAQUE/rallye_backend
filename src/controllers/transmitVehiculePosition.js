//// This function relay the position of a vehicule from transponder toward frontend ////

function transmitVehiculePosition(req, res) {
    console.log('POSITION', req.body);
    req.dependencies.socketServer.emit('sendPositionToAll', { positions: req.body });
    res.json(req.body)
}

module.exports = transmitVehiculePosition;