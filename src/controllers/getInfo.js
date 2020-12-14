const mongoose = require('mongoose');

const AccomodationModel = require('../db/models/accomodation');
const CateringModel = require('../db/models/catering');

const getIdWithToken = require('../tools/getIdWithToken');

async function getInfo(req, res) {

    const idUser = await getIdWithToken(req.query.token);
    const today = new Date;

    console.log('MONTH', today.getMonth());
    console.log('DAY', today.getDate());
    console.log('YEAR', today.getFullYear());

    console.log("AUJOURD'HUI", today);

    //// Getting the accomodation of the day for the user connected (with is token) /////
    const accomodation = await AccomodationModel
        .aggregate()
        .match({ users: mongoose.Types.ObjectId(idUser) })

        // .lookup({
        //     'from': 'users',
        //     'localField': 'users',
        //     'foreignField': '_id',
        //     'as': 'usersData'
        // })
        .addFields({ "month": { $month: '$date' }, "day": { $dayOfMonth: '$date' }, "year": { $year: '$date' } })
        .match({ day: today.getDate() }, { month: (today.getMonth() + 1) }, { year: today.getFullYear() })

        // .match({ userData: { firstname: 'Romain' } })
        .exec()


    //// Getting the catering of the day for the user connected /////
    // const catering = await CateringModel


    res.json({ accomodation })
}

module.exports = getInfo;