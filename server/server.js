const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./connect');
const User = require('./models/userModel');
const Game = require('./models/gameModel');
const helper = require('./helper');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

connectMongoDB();

app.use(cors());
app.use(express.json());

app.get('/api', async (req, res) => {
    res.json({ status: 'backend is working fine.' });
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (user) res.json({ status: 'ok', user: true })
    else res.json({ status: 'error', user: false })
})

app.post('/api/register', async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'ok' });
    }
    catch (e) {
        res.json({ status: 'error' });
    }
})

app.post('/api/forgotPassword', async (req, res) => {
    try {
        const filter = { email: req.body.email };
        const update = { password: req.body.password };
        await User.findOneAndUpdate(filter, update);
        res.json({ status: 'ok' });
    }
    catch (e) {
        res.json({ status: 'error' });
    }
})

app.post('/api/game', async (req, res) => {
    const numbers = helper.getNumbers(parseInt(req.body.number));
    const tempArr = [...numbers];
    const indexToRemove = Math.floor(Math.random() * numbers.length);
    tempArr.splice(indexToRemove, 1);

    try {
        const game = await Game.create({
            gamePlayer: req.body.email,
            numberArr: numbers,
            answerArr: tempArr,
        })

        if (req.body.number === '2') await User.findOneAndUpdate({ email: req.body.email }, { $inc: { levelOnePlayed: 1 } });
        else if (req.body.number === '4') await User.findOneAndUpdate({ email: req.body.email }, { $inc: { levelTwoPlayed: 1 } });
        else if (req.body.number === '6') await User.findOneAndUpdate({ email: req.body.email }, { $inc: { levelThreePlayed: 1 } });
        else if (req.body.number === '8') await User.findOneAndUpdate({ email: req.body.email }, { $inc: { levelFourPlayed: 1 } });

        res.json({ status: 'ok', numbers: numbers, gameid: game._id });
    }
    catch (e) {
        res.json({ status: 'error' });
    }
})

app.patch('/api/game', async (req, res) => {
    let arr = req.body.numberArr;
    arr = helper.getCorrectSequence(arr);
    const gameId = req.body.gameId;
    try {
        const game = await Game.findOne({ _id: gameId });
        const colorArr = helper.getColors(arr, game.answerArr);
        let flag = true;
        for (let index = 0; index < game.answerArr.length; index++) {
            if (colorArr[index] !== 'G') flag = false;
        }
        if (flag) {
            await Game.findOneAndUpdate({ _id: gameId }, { $set: { isComplete: true } });

            if (req.body.numberArr.inputEight !== -1) await User.findOneAndUpdate({ email: req.body.email }, { $inc: { levelFourCompleted: 1 } });
            else if (req.body.numberArr.inputSix !== -1) await User.findOneAndUpdate({ email: req.body.email }, { $inc: { levelThreeCompleted: 1 } });
            else if (req.body.numberArr.inputFour !== -1) await User.findOneAndUpdate({ email: req.body.email }, { $inc: { levelTwoCompleted: 1 } });
            else if (req.body.numberArr.inputTwo !== -1) await User.findOneAndUpdate({ email: req.body.email }, { $inc: { levelOneCompleted: 1 } });

            res.json({ status: 'ok', colorArr: colorArr, isComplete: true });
        }
        else res.json({ status: 'ok', colorArr: colorArr, isComplete: false });
    }
    catch (e) {
        res.json({ status: 'error' });
    }
})

app.get('/api/deletegame', async (req, res) => {
    try {
        await Game.deleteMany({});
        res.json({ status: 'deleted successfully' });
    } catch (error) {
        res.json({ status: 'not able delete', error: error });
    }
})

app.get('/api/deleteuser', async (req, res) => {
    try {
        await User.deleteMany({ email: { $ne: 'admin@gmail.com' } });
        res.json({ status: 'deleted successfully' });
    } catch (error) {
        res.json({ status: 'not able delete', error: error });
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})