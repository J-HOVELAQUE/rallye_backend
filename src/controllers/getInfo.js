const AccomodationModel = require('../db/models/accomodation');
const mongoose = require('mongoose');

const getIdWithToken = require('../tools/getIdWithToken');

async function getInfo(req, res) {

    const idUser = await getIdWithToken(req.query.token);

    const dataFounded = await AccomodationModel

        .aggregate()
        // .lookup({
        //     'from': 'users',
        //     'localField': 'users',
        //     'foreignField': '_id',
        //     'as': 'usersData'
        // })
        .addFields({ "month": { $month: '$date' }, "day": { $dayOfMonth: '$date' } })
        .match({ day: 2 }, { month: 9 })
        .match({ users: mongoose.Types.ObjectId(idUser) })

        // .match({ userData: { firstname: 'Romain' } })
        .exec()

    // const dataFounded = await aggr.exec();
    // const dataFounded = await AccomodationModel.find({ users: '5fd218e245c4df00171790c5' })

    res.json({ message: dataFounded })
}

module.exports = getInfo;