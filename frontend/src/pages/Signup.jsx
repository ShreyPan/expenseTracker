import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSuccess, handleError } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import DarkModeToggle from '../components/DarkModeToggle';

function Signup() {

    const [signupInfo, setSignupInfo] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleError = (msg) => toast.error(msg);
    const handleSuccess = (msg) => toast.success(msg);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = signupInfo;
        if (!name || !email || !password || !confirmPassword) {
            return handleError('All fields are required');
        }
        if (password !== confirmPassword) {
            return handleError('Passwords do not match');
        }
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details || error.message || 'Something went wrong');
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <>
            <DarkModeToggle />
            <div className='container'>
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            autoFocus
                            placeholder='Enter your name...'
                            value={signupInfo.name} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder='Enter your email...'
                            value={signupInfo.email} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder='Enter your password...'
                            value={signupInfo.password} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            onChange={handleChange}
                            type="password"
                            name="confirmPassword"
                            placeholder='Confirm your password...'
                            value={signupInfo.confirmPassword}
                        />
                    </div>
                    <button type='submit'>Signup</button>
                    <span>Already have an account?
                        <Link to="/login">Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default Signup
