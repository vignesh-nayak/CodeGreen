const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    levelOnePlayed: { type: Number, default: 0 },
    levelOneCompleted: { type: Number, default: 0 },
    levelTwoPlayed: { type: Number, default: 0 },
    levelTwoCompleted: { type: Number, default: 0 },
    levelThreePlayed: { type: Number, default: 0 },
    levelThreeCompleted: { type: Number, default: 0 },
    levelFourPlayed: { type: Number, default: 0 },
    levelFourCompleted: { type: Number, default: 0 },

}, {
    collection: 'userData',
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;