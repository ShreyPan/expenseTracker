import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const storedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(storedMode);
        document.body.classList.toggle('dark-mode', storedMode);
    }, []);

    const toggleMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.body.classList.toggle('dark-mode', newMode);
        localStorage.setItem('darkMode', newMode);
    };

    return (
        <button
            onClick={toggleMode}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999,
                fontSize: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isDarkMode ? '#f1c40f' : '#2c3e50'
            }}
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default DarkModeToggle;
