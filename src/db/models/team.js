const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    pilot_1: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    pilot_2: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    car_id: Number,
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'cars' },
    category: String,
    grid: Number
})

const TeamModel = mongoose.model('teams', teamSchema);

module.exports = TeamModel;