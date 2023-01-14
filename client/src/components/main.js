import React, { useEffect } from 'react';
import './style/style.css';

const Main = () => {

    useEffect(() => {
        alert('Currently page is not responsive. specially in mobile/small screen, please enable desktop site for now. Will be fix it soon. Thank you.')
    }, [])

    return (
        <div className='homeButton'>
            <a href="/login" className='link main-link'>Login</a>
            <a href="/register" className='link main-link'>Signup</a>
        </div>
    )
}

export default Main