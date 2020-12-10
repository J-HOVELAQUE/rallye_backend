const mongoose = require('mongoose');

const cateringSchema = mongoose.Schema({
    adress: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

const CateringModel = mongoose.model('caterings', cateringSchema);

module.exports = CateringModel;