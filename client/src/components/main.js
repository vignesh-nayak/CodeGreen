import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';

const Main = () => {
    return (
        <div className='homeButton'>
            <Link to="/login" className='link main-link'>Login</Link>
            <Link to="/register" className='link main-link'>Signup</Link>
        </div>
    )
}

export default Main