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
            className="dark-mode-toggle"
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
    );
};

export default DarkModeToggle;
