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

                <li><button onClick={() => handleNavigate('socialFeed')} className={`nav-link ${currentPage === 'socialFeed' ? 'active' : ''}`}>Social</button></li>
                <li><button onClick={() => handleNavigate('groups')} className={`nav-link ${currentPage === 'groups' ? 'active' : ''}`}>Groups</button></li>
                <li><button onClick={() => handleNavigate('instructors')} className={`nav-link ${currentPage === 'instructors' ? 'active' : ''}`}>Instructors</button></li>


            </ul>
            <div className="navbar-auth">
                {isAuthenticated ? (
                    <>
                        <button onClick={() => handleNavigate('instructorDashboard')} className="nav-link mode-toggle">
                            Instructor Mode
                        </button>
                        <div className="nav-dropdown profile-dropdown">
                            <button className="nav-link profile-btn">
                                <span className="profile-name">Jing Ming</span>
                                <div className="profile-icon">JM</div>
                            </button>
                            <div className="dropdown-menu right-aligned">
                                <div className="dropdown-header">
                                    <div className="user-name">Jing Ming</div>
                                    <div className="user-role">Player</div>
                                </div>
                                <hr />
                                <button onClick={() => handleNavigate('profile')}>My Profile</button>
                                <button onClick={() => handleNavigate('calendar')}>My Calendar</button>
                                <button onClick={() => handleNavigate('gameHistory')}>Game History</button>
                                <button onClick={() => handleNavigate('analytics')}>My Analytics</button>
                                <button onClick={() => handleNavigate('rewards')}>Rewards</button>
                                <hr />

                                <button onClick={() => handleNavigate('instructorApp')}>Become Instructor</button>
                                <hr />
                                <button onClick={onLogout} className="logout-btn">Sign Out</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <button onClick={onShowLogin} className="nav-link nav-cta">Sign In</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
