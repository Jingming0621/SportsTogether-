import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout, onShowLogin, onNavigate, currentPage }) => {
    const username = localStorage.getItem('username');
    const [showDropdown, setShowDropdown] = useState(null);

    const handleNavigate = (page) => {
        onNavigate(page);
        setShowDropdown(null);
    };

    return (
        <nav className="navbar">
            <button onClick={() => handleNavigate('home')} className="navbar-logo" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Sports<span>Together</span>
            </button>
            <ul className="navbar-links">
                <li><button onClick={() => handleNavigate('home')} className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}>Games</button></li>
                <li><button onClick={() => handleNavigate('createGame')} className={`nav-link ${currentPage === 'createGame' ? 'active' : ''}`}>Create Game</button></li>
                <li><button onClick={() => handleNavigate('socialFeed')} className={`nav-link ${currentPage === 'socialFeed' ? 'active' : ''}`}>Social</button></li>
                <li><button onClick={() => handleNavigate('groups')} className={`nav-link ${currentPage === 'groups' ? 'active' : ''}`}>Groups</button></li>
                <li><button onClick={() => handleNavigate('instructors')} className={`nav-link ${currentPage === 'instructors' ? 'active' : ''}`}>Instructors</button></li>
                <li><button onClick={() => handleNavigate('rewards')} className={`nav-link ${currentPage === 'rewards' ? 'active' : ''}`}>Rewards</button></li>

                <li className="nav-dropdown">
                    <button className="nav-link">More ▾</button>
                    <div className="dropdown-menu">
                        <button onClick={() => handleNavigate('reportIssue')}>Report Issue</button>
                        <button onClick={() => handleNavigate('instructorApp')}>Become Instructor</button>
                    </div>
                </li>
            </ul>
            <div className="navbar-auth">
                {isAuthenticated ? (
                    <>
                        <button onClick={() => handleNavigate('profile')} className="nav-link">👤 {username || 'Profile'}</button>
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

