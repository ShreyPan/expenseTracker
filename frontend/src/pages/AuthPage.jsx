import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function AuthPage() {
    const [active, setActive] = useState(false);

    return (
        <div className={`container${active ? ' active' : ''}`}>
            <div className="form-box login">
                <Login onToggle={() => setActive(true)} />
            </div>
            <div className="form-box register">
                <Signup onToggle={() => setActive(false)} />
            </div>
            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                    <h1>Hello, Welcome!</h1>
                    <p>Don't have an account?</p>
                    <button className="btn register-btn" onClick={() => setActive(true)}>Register</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <button className="btn register-btn" onClick={() => setActive(false)}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;