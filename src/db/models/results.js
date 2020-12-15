const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'teams' },
    timings: Array,
})

const ResultModel = mongoose.model('results', resultSchema);

module.exports = ResultModel;