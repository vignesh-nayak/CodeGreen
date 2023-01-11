import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ForgotPassword = () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/forgotPassword`;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPassword('');
            setConfirmPassword('');
            alert('password and confrim password does not match.');
            return;
        }
        if (email === 'admin@gmail.com') {
            alert(`can't change password for ${email}`);
            return;
        }

        const post = { email: email, password: password };
        try {
            const res = await axios.post(url, post)
            if (res.data.status === 'ok') {
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                alert('password changed successfully.');
                navigate('/Login');
            }
            else {
                alert('Password was not able update properly.');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='divContainer'>
            <h1 className='divHeader'>Forgot Password Form.</h1>
            <form className='divForm' onSubmit={onSubmit}>
                <label className='label'>
                    Email:
                    <input name='EmailId' className='input' type="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </label>
                <label className='label'>
                    Password:
                    <input name='password' className='input' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </label>
                <label className='label'>
                    Confirm Password:
                    <input name='confirmPassword' className='input' type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                </label>
                <input type="submit" value="Submit" className='button' />
            </form>
            <label className='label'>
                <a href="/login" className='link'>Back to login.</a>
            </label>
        </div>
    )
}

export default ForgotPassword