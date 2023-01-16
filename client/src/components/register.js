import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import mySvg from './Img/homeSvg.svg';

const Register = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/register`;
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const post = { name: name, email: email, password: password };
        try {
            const res = await axios.post(url, post)
            if (res.data.status === 'ok') {
                alert(`name: ${name}, email: ${email}, password: ${password}`);
                setName('');
                setEmail('');
                setPassword('');
                navigate('/login');
            }
            else {
                alert('User not created.');
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className='divContainer'>
            <div className='divHeader'>
                <Link to="/">
                    <img src={mySvg} alt="home icon" className='imgHome' />
                </Link>
                <h1 >Register Form</h1>
            </div>
            <form className='divForm' onSubmit={onSubmit}>
                <label className='label'>
                    Email:
                    <input name='EmailId' className='input' type="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </label>
                <label className='label'>
                    Name:
                    <input name='Name' className='input' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
                </label>
                <label className='label'>
                    Password:
                    <input name='password' className='input' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </label>
                <input type="submit" value="Submit" className='button' />
            </form>
            <label className='label'>
                <Link to="/login" className='link'>Already have account?</Link>
            </label>
        </div>
    )
}

export default Register