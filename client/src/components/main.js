import React from 'react';
import './style/style.css';

const Main = () => {
    return (
        <div className='homeButton'>
            <a href="/login" className='link main-link'>Login</a>
            <a href="/register" className='link main-link'>Signup</a>
        </div>
    )
}

export default Main