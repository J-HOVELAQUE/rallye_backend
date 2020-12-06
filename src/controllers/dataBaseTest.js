const dbTestModel = require('../db/models/dbTest');

async function dataBaseTest(req, res) {
    const newDocDb = new dbTestModel({
        test1: "toto",
        test2: 75
    });
    await newDocDb.save();
    res.json({ message: "recorded" })
}

module.exports = dataBaseTest;