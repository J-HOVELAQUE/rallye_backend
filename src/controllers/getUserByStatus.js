//// This controller return the list of user by status ////

const UserModel = require('../db/models/user');
const TeamModel = require('../db/models/team');


async function getUserByStatus(req, res) {

    const teams = await TeamModel.find()
        .populate('pilot_1')
        .populate('pilot_2')
        .exec();

    // const pilotData = await UserModel.find({ status: "pilot" });
    const pilots = teams.map(team => {
        return {
            team: team._id,
            name: team.pilot_1.name,
            firstname: team.pilot_1.firstname,
            _id: team.pilot_1._id
        },
        {
            team: team._id,
            name: team.pilot_2.name,
            firstname: team.pilot_2.firstname,
            _id: team.pilot_2._id
        }
    });

    // const pilots = pilotData.map(pilot => {
    //     return {
    //         _id: pilot._id,
    //         name: pilot.name,
    //     }
    // })

    // const adminData = await UserModel.find({ status: "admin" });

    // const admins = adminData.map(admin => {
    //     return {
    //         _id: admin._id,
    //         name: admin.name
    //     }
    // })

    res.json({ pilots })
}

module.exports = getUserByStatus;