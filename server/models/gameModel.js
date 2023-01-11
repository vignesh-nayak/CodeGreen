const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    gamePlayer: { type: String, required: true },
    isComplete: { type: String, required: true, default: false },
    numberArr: { type: Array, required: true },
    answerArr: { type: Array, required: true },
}, {
    collection: 'gameData',
    timestamps: true
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;