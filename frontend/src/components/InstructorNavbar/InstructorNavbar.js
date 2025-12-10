import React from 'react';
import './InstructorNavbar.css';

const InstructorNavbar = ({ onNavigate, currentPage, onLogout }) => {
    const username = localStorage.getItem('username');

    return (
        <nav className="instructor-navbar">
            <button onClick={() => onNavigate('instructorDashboard')} className="navbar-logo" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Instructor<span>Dashboard</span>
            </button>
            <ul className="navbar-links">
                <li><button onClick={() => onNavigate('manageSessions')} className={`nav-link ${currentPage === 'manageSessions' ? 'active' : ''}`}>Sessions</button></li>
                <li><button onClick={() => onNavigate('classHistory')} className={`nav-link ${currentPage === 'classHistory' ? 'active' : ''}`}>History</button></li>
                <li><button onClick={() => onNavigate('instructorRewards')} className={`nav-link ${currentPage === 'instructorRewards' ? 'active' : ''}`}>Rewards</button></li>
                <li><button onClick={() => onNavigate('instructorPayouts')} className={`nav-link ${currentPage === 'instructorPayouts' ? 'active' : ''}`}>Payouts</button></li>
            </ul>
            <div className="navbar-auth">
                <button onClick={() => onNavigate('home')} className="nav-link mode-toggle">
                    🏠 Player Mode
                </button>
                <div className="nav-dropdown profile-dropdown">
                    <button className="nav-link profile-btn">
                        <span className="profile-name">{username || 'Jing Ming'}</span>
                        <div className="profile-icon">JM</div>
                    </button>
                    <div className="dropdown-menu right-aligned">
                        <div className="dropdown-header">
                            <div className="user-name">{username || 'Jing Ming'}</div>
                            <div className="user-role">Instructor</div>
                        </div>
                        <hr />
                        <button onClick={() => onNavigate('instructorProfile')}>My Profile</button>
                        <hr />
                        <button onClick={onLogout} className="logout-btn">Sign Out</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default InstructorNavbar;
