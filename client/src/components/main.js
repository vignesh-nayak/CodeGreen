import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css';

const Main = () => {

    useEffect(() => {
        alert('Currently page is not responsive. specially in mobile/small screen, please enable desktop site for now. Will be fix it soon. Thank you.')
    }, [])

    return (
        <div className='homeButton'>
            <Link to="/login" className='link main-link'>Login</Link>
            <Link to="/register" className='link main-link'>Signup</Link>
        </div>
    )
}

export default Main