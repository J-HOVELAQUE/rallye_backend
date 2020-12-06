const mongoose = require('mongoose');

const dbTestSchema = mongoose.Schema({
    test1: String,
    test2: Number
});

const dbTestModel = mongoose.model('tests', dbTestSchema);

module.exports = dbTestModel;