const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'teams' },
    stage: String,
    position: Number,
    gpe_position: Number,
    time: String,
    diff: String,
})

const ResultModel = mongoose.model('results', resultSchema);

module.exports = ResultModel;