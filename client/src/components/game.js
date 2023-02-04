import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
const userInputObject = {
    inputOne: -1,
    inputTwo: -1,
    inputThree: -1,
    inputFour: -1,
    inputFive: -1,
    inputSix: -1,
    inputSeven: -1,
    inputEight: -1,
}

const Game = () => {

    const email = localStorage.getItem("EmailForCodeBlue");
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) navigate('/');
    }, []);

    const url = `${process.env.REACT_APP_BASE_URL}/api/game`;

    const [value, setValue] = useState(0);
    const [numbers, setNumbers] = useState([]);
    const [color, setColors] = useState([]);
    const [userInput, setUserInput] = useState(userInputObject);

    const setNumbersFun = async (e) => {
        e.preventDefault();
        try {
            const data = { number: e.target.value, email: email };
            const res = await axios.post(url, data);
            if (res.data.status === 'ok') {
                setNumbers([...res.data.numbers.sort()]);
                localStorage.setItem('blueCodeGameId', res.data.gameid);
            }
            else {
                alert('Numbers is not able to fetch');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = async (e) => {
        setValue(e.target.value);
        await setNumbersFun(e);

        if (e.target.value === '0') {
            setColors([]);
            setNumbers([]);
            setValue(0);
        }

    }

    const getColors = async (e) => {
        e.preventDefault();
        try {
            const data = { numberArr: userInput, gameId: localStorage.getItem("blueCodeGameId"), email: email }
            const res = await axios.patch(url, data);
            if (res.data.status === 'ok') {
                setColors([...res.data.colorArr]);
                if (res.data.isComplete) alert('Congrats! you have cracked the code successfully.')
            }
            else {
                alert('Numbers is not able to fetch');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const checkCode = (e) => getColors(e);

    const newGame = () => {
        window.location.reload(false);
    }

    const logout = () => {
        localStorage.removeItem('EmailForCodeBlue'); // use redux*/contextAPI.
        localStorage.removeItem('blueCodeGameId');
        navigate('/login');
    }

    const options = [
        { label: 'Select level', value: 0 },
        { label: 'LEVEL 1', value: 2 },
        { label: 'LEVEL 2', value: 4 },
        { label: 'LEVEL 3', value: 6 },
        { label: 'LEVEL 4', value: 8 },
    ];

    return (
        <div className='divContainerGame'>
            <div className='divLevelSelector'>
                <select value={value} onChange={handleChange} className='dropdown'>
                    {
                        value === 0 ?
                            options.map((option) => (<option value={option.value}>{option.label}</option>))
                            : options.map((option) => (<option disabled value={option.value}>{option.label}</option>))
                    }
                </select>
                <Link title='how to play' to="/howToPlay" className='link ml-3'>?</Link>
            </div>
            <div className='divGameInputs'>
                {
                    value >= 2 ?
                        <div className='divGameLevel'>
                            <input type="text" onChange={(e) => setUserInput({ ...userInput, inputOne: e.target.value })} className='input gameInput' maxLength={1} minLength={1} />
                            <input type="text" onChange={(e) => setUserInput({ ...userInput, inputTwo: e.target.value })} className='input gameInput' maxLength={1} minLength={1} />
                        </div>
                        :
                        ''
                }
                {
                    value >= 4 ?
                        <div className='divGameLevel'>
                            <input type="text" onChange={(e) => setUserInput({ ...userInput, inputThree: e.target.value })} className='input gameInput' maxLength={1} minLength={1} />
                            <input type="text" onChange={(e) => setUserInput({ ...userInput, inputFour: e.target.value })} className='input gameInput' maxLength={1} minLength={1} />
                        </div>
                        :
                        ''
                }
                {
                    value >= 6 ?
                        <div className='divGameLevel'>
                            <input type="text" onChange={(e) => setUserInput({ ...userInput, inputFive: e.target.value })} className='input gameInput' maxLength={1} minLength={1} />
                            <input type="text" onChange={(e) => setUserInput({ ...userInput, inputSix: e.target.value })} className='input gameInput' maxLength={1} minLength={1} />
                        </div>
                        :
                        ''
                }
                {
                    value >= 8 ?
                        <div className='divGameLevel'>
                            <input type="text" onChange={(e) => setUserInput({ ...userInput, inputSeven: e.target.value })} className='input gameInput' maxLength={1} minLength={1} />
                            <input type="text" onChange={(e) => setUserInput({ ...userInput, inputEight: e.target.value })} className='input gameInput' maxLength={1} minLength={1} />
                        </div>
                        :
                        ''
                }

            </div>
            <div className='divNumbers'>
                {
                    numbers?.map((num, index) => <span>  {num} {numbers.length !== index + 1 ? "-" : ""}</span>)
                }
            </div>
            <div className='divGameButton'>
                <button className='button gameButton' onClick={checkCode}>Check Code</button>
            </div>
            <div className='divActualCode'>
                {
                    color?.map(col => col === 'G' ? <span className='green dot'>G</span> : col === 'B' ? <span className='blue dot'>B</span> : <span className='black dot'></span>)
                }
            </div>
            <div className='divGameButton'>
                <button className='button gameButton' onClick={newGame}>New Game</button>
                <button className='button gameButton' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Game