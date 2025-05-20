import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
function Signup({ onToggle }) {
    return (
        <div class='container'>
            <div className="form-box register">
                <form action="">
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            required />
                        <i class='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Email"
                            required />
                        <i class='bx bxs-envelope' ></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required />
                        <i class='bx bxs-lock-alt' ></i>
                    </div>

                    <button type="submit" class="btn">Register</button>
                    <p>or register with social platforms</p>
                    <div className="social-icons">
                        <a href="#"><i class='bx bxl-google' ></i></a>
                        <a href="#"><i class='bx bxl-facebook' ></i></a>
                        <a href="#"><i class='bx bxl-github' ></i></a>
                        <a href="#"><i class='bx bxl-linkedin' ></i></a>
                    </div>
                </form>
            </div>
            <div className="toggle-box">
                <div className="toggle-panel toggle-right">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <button class="btn register-btn" onClick={onToggle}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Signup
