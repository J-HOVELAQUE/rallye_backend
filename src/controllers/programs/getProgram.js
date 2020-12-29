const ProgramModel = require('../../db/models/program');

async function getProgram(req, res) {
    const programDb = await ProgramModel.find()
    console.log('Le Programme', programDb);
    res.json({ program: programDb })
}

module.exports = getProgram;