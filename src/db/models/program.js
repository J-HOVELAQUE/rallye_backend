const mongoose = require('mongoose');

const programSchema = mongoose.Schema({
    date: Date,
    event: Array
})

const ProgramModel = mongoose.model('programs', programSchema);

module.exports = ProgramModel;