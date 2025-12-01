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
                <li><button onClick={() => onNavigate('manageSessions')} className={`nav-link ${currentPage === 'manageSessions' ? 'active' : ''}`}>📅 Sessions</button></li>
                <li><button onClick={() => onNavigate('classHistory')} className={`nav-link ${currentPage === 'classHistory' ? 'active' : ''}`}>📚 History</button></li>
                <li><button onClick={() => onNavigate('instructorRewards')} className={`nav-link ${currentPage === 'instructorRewards' ? 'active' : ''}`}>🏆 Rewards</button></li>
                <li><button onClick={() => onNavigate('instructorPayouts')} className={`nav-link ${currentPage === 'instructorPayouts' ? 'active' : ''}`}>💰 Payouts</button></li>
            </ul>
            <div className="navbar-auth">
                <button onClick={() => onNavigate('home')} className="nav-link">🏠 Player Mode</button>
                <button onClick={() => onNavigate('instructorProfile')} className="nav-link">👤 {username || 'Profile'}</button>
                <button onClick={onLogout} className="nav-link nav-cta">Logout</button>
            </div>
        </nav>
    );
};

export default InstructorNavbar;
