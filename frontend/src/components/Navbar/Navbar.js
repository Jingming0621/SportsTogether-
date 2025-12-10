import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout, onShowLogin, onNavigate, currentPage }) => {
    const username = localStorage.getItem('username');
    // eslint-disable-next-line no-unused-vars
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

                {/* Profile Dropdown */}
                <li className="nav-dropdown profile-dropdown">
                    <button className="nav-link profile-btn">
                        <div className="profile-icon">JM</div>
                    </button>
                    <div className="dropdown-menu right-aligned">
                        <div className="dropdown-header">
                            <strong>Jing Ming</strong>
                            <span>Player</span>
                        </div>
                        <hr />
                        <button onClick={() => handleNavigate('profile')}>My Profile</button>
                        <button onClick={() => handleNavigate('calendar')}>My Calendar</button>
                        <button onClick={() => handleNavigate('gameHistory')}>Game History</button>
                        <button onClick={() => handleNavigate('analytics')}>My Analytics</button>
                        <button onClick={() => handleNavigate('rewards')}>Rewards</button>
                        <hr />
                        <button onClick={() => handleNavigate('reportIssue')}>Report Issue</button>
                        <button onClick={() => handleNavigate('instructorApp')}>Become Instructor</button>
                        <hr />
                        <button onClick={onLogout} className="logout-btn">Sign Out</button>
                    </div>
                </li>
            </ul>
            <div className="navbar-auth">
                {isAuthenticated ? (
                    <>
                        {/* Mobile menu trigger or other auth items could go here */}
                    </>
                ) : (
                    <button onClick={onShowLogin} className="nav-link nav-cta">Sign In</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
