import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import './styles/main.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginPage, setShowLoginPage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setShowLoginPage(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
    };

    const handleShowLogin = () => {
        setShowLoginPage(true);
    };

    const handleBackToHome = () => {
        setShowLoginPage(false);
    };

    if (showLoginPage) {
        return <Login onLoginSuccess={handleLoginSuccess} onBack={handleBackToHome} />;
    }

    return (
        <div className="app-container">
            <Navbar 
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout} 
                onShowLogin={handleShowLogin}
            />
            <Home />
        </div>
    );
}

export default App;