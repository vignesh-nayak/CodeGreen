import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const HowToPlay = () => {

    const email = localStorage.getItem("EmailForCodeBlue");
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) navigate('/');
    }, []);

    const backToGame = () => {
        navigate('/game');
    }

    const logout = () => {
        localStorage.removeItem('EmailForCodeBlue');
        localStorage.removeItem('blueCodeGameId');
        navigate('/login');
    }

    return (
        <div className='divContainer'>
            <div className='divHeader'>
                <h1 className='howToPlayHeader'>How To Play</h1>
            </div>
            <div className='divForm'>
                <span className='spanIHowToPlay'>Step1: Select the level</span>
                <span className='spanIHowToPlay'>Step2: Think and enter the numbers in input box - possible numbers are in between the input and button.</span>
                <span className='spanIHowToPlay'>Step3: click button 'check code' till you get all cricle as green or 'G</span>
                <span className='spanIHowToPlay underline'>Points to remember</span>
                <span className='spanIHowToPlay'>number of green or 'G' circles is equal to number of input.</span>
                <span className='spanIHowToPlay'><span className='green'>Green or 'G'</span> presents correct number in correct place.</span>
                <span className='spanIHowToPlay'><span className='blue'>Blue or 'B'</span> presents correct number in wrong place.</span>
            </div>
            <div className='divGameButton'>
                <button className='button gameButton' onClick={backToGame}>back to Game</button>
                <button className='button gameButton' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default HowToPlay