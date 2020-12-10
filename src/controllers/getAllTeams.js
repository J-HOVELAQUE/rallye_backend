
const TeamModel = require('../db/models/team');

async function getUser(req, res) {

    const teams = await TeamModel.find()
        .populate('pilot_1')
        .populate('pilot_2')
        .populate('car')
        .exec();
    console.log(teams);

    res.json({ teams: teams })
}

module.exports = getUser;