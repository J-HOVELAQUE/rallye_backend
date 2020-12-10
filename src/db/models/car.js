const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    image: String,
    description: String
})

const carModel = mongoose.model('cars', carSchema);

module.exports = carModel;