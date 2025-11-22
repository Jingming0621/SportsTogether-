import React from 'react';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout, onShowLogin }) => {
    const username = localStorage.getItem('username');

    return (
        <nav className="navbar">
            <a href="/" className="navbar-logo">
                Sports<span>Together</span>
            </a>
            <ul className="navbar-links">
                <li><a href="/" className="nav-link">Home</a></li>
                <li><a href="#games" className="nav-link">Find Games</a></li>
                <li><a href="#rewards" className="nav-link">Rewards</a></li>
                <li><a href="#community" className="nav-link">Community</a></li>
            </ul>
            <div className="navbar-auth">
                {isAuthenticated ? (
                    <>
                        {username && <span className="nav-link">Hello, {username}</span>}
                        <button onClick={onLogout} className="nav-link nav-cta">Logout</button>
                    </>
                ) : (
                    <button onClick={onShowLogin} className="nav-link nav-cta">Sign In</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
