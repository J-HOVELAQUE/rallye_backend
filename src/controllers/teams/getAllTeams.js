//// Return full informations of teams (with car and pilot) ////
const TeamModel = require('../../db/models/team');

async function getAllTeams(req, res) {

    const teams = await TeamModel.find()
        .sort({ car_id: 1 })
        .populate('pilot_1')
        .populate('pilot_2')
        .populate('car')
        .exec();

    res.json({ teams: teams })
}

module.exports = getAllTeams;