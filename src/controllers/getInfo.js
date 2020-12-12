const AccomodationModel = require('../db/models/accomodation');

async function getInfo(req, res) {
    res.json({ message: "information" })
}

module.exports = getInfo;