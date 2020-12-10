const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: String,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['fan', 'pilot', 'admin'],
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'teams' }],
    nationality: String,
    avatar: String
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;