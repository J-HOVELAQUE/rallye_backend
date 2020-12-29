//// This controller return the list of user by status for the chat (only admin and pilot) ////

const UserModel = require('../../db/models/user');
const TeamModel = require('../../db/models/team');


async function getUserByStatus(req, res) {

    //// Pilots ////
    //// We need the car_id of each pilot so no other way to use the team model and populate it ////
    const teams = await TeamModel.find()
        .populate('pilot_1')
        .populate('pilot_2')
        .exec();

    const pilots = [];

    teams.forEach(team => {
        pilots.push({
            team: team.car_id,
            name: team.pilot_1.name,
            firstname: team.pilot_1.firstname,
            _id: team.pilot_1._id
        });
        pilots.push({
            team: team.car_id,
            name: team.pilot_2.name,
            firstname: team.pilot_2.firstname,
            _id: team.pilot_2._id
        })
    });


    //// admins ////
    const adminData = await UserModel.find({ status: "admin" });

    const admins = adminData.map(admin => {
        return {
            _id: admin._id,
            name: admin.name,
            firstname: admin.firstname
        }
    })

    res.json({ pilots, admins })
}

module.exports = getUserByStatus;