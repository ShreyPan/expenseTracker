import React from 'react'

function Login({ onToggle }) {
    return (
        <div class='container'>
            <div className="form-box login">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            required />
                        <i class='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required />
                        <i class='bx bxs-lock-alt' ></i>
                    </div>
                    <div className="forgot-link">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit" class="btn">Login</button>
                    <p>or login with social platforms</p>
                    <div className="social-icons">
                        <a href="#"><i class='bx bxl-google' ></i></a>
                        <a href="#"><i class='bx bxl-facebook' ></i></a>
                        <a href="#"><i class='bx bxl-github' ></i></a>
                        <a href="#"><i class='bx bxl-linkedin' ></i></a>
                    </div>
                </form>
            </div>

            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                    <h1>Hello, Welcome!</h1>
                    <p>Don't have an account?</p>
                    <button class="btn register-btn" onClick={onToggle}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Login
