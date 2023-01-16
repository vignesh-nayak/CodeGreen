import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import mySvg from './Img/homeSvg.svg';

const Login = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/login`;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const post = { email: email, password: password };
        try {
            console.log(post)
            console.log(url)
            const res = await axios.post(url, post);
            if (res.data.status === 'ok') {
                localStorage.setItem('EmailForCodeBlue', email);
                setEmail('');
                setPassword('');
                navigate('/game');
            }
            else {
                alert('Invalid User.');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='divContainer'>
            <div className='divHeader'>
                <Link to="/">
                    <img title='Go to Home page' src={mySvg} alt="home icon" className='imgHome' />
                </Link>
                <h1 >Login Form</h1>
            </div>
            <form className='divForm' onSubmit={onSubmit}>
                <label className='label'>
                    Email:
                    <input name='EmailId' className='input' type="Email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='admin@gmail.com' required />
                </label>
                <label className='label'>
                    Password:
                    <input name='password' className='input' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='aadmin' required />
                </label>
                <input type="submit" value="Submit" className='button' />
            </form>
            <label className='label'>
                <Link to="/forgotPassword" className='link'>Forgot Password?</Link>
            </label>
            <label className='label'>
                <Link to="/register" className='link'>Create a new account.</Link>
            </label>
        </div >
    )
}

export default Login