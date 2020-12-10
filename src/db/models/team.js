const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    pilot_1: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    pilot_2: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    car_id: String,
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'car' },
    category: String,
    grid: Number,
    

const TeamModel = mongoose.model('team', teamSchema);

module.exports = TeamModel;