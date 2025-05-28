import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/login' ||
                location.pathname === '/' ||
                location.pathname === '/signup') {
                navigate('/home');
            }
        } else {
            console.log("Token exists, user is authenticated.");
        }
    }, [location, navigate, setIsAuthenticated]);

    return (
        null
    )
}

export default RefreshHandler;