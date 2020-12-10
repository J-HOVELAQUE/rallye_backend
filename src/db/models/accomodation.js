const mongoose = require('mongoose');

const accomodationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    shuttle_point: {
        type: String,
        required: true,
    },
    shuttle_hours: {
        type: Array,
        required: true,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
});

const AccomodationModel = mongoose.model('accomodations', accomodationSchema);

module.exports = AccomodationModel;