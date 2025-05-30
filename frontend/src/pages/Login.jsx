import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSuccess, handleError } from '../utils'
import { ToastContainer, toast } from 'react-toastify';
import DarkModeToggle from '../components/DarkModeToggle';

function Login() {
    const [loginInfo, setLoginInfo] = React.useState({
        email: '',
        password: ''
    });

    const handleError = (msg) => toast.error(msg);
    const handleSuccess = (msg) => toast.success(msg);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('All fields are required');
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message;
                handleError(details || error.message || 'Something went wrong');
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message || 'Login failed');
        }
    };

    return (
        <>
            <DarkModeToggle />
            <div className='container'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder='Enter your email...'
                            value={loginInfo.email} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder='Enter your password...'
                            value={loginInfo.password} />
                    </div>
                    <button type='submit'>Login</button>
                    <span>Don't have an account?
                        <Link to="/signup">Signup</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login