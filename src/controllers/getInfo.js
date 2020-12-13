const AccomodationModel = require('../db/models/accomodation');

async function getInfo(req, res) {



    const dataFounded = await AccomodationModel

        .aggregate()
        .lookup({
            'from': 'users',
            'localField': 'users',
            'foreignField': '_id',
            'as': 'usersData'
        })
        .addFields({ "month": { $month: '$date' } })
        .match({ month: 9 })
        // .match({ "userData.firstname": "Romain" })
        .exec()

    console.log("Nombre de match", dataFounded.length);



    // const dataFounded = await aggr.exec();
    // const dataFounded = await AccomodationModel.find({ users: '5fd218e245c4df00171790c5' })

    res.json({ message: dataFounded })
}

module.exports = getInfo;