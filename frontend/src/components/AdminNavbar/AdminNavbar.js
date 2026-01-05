import React from 'react';
import './AdminNavbar.css';

const AdminNavbar = ({ onNavigate, currentPage, onLogout }) => {
    const username = localStorage.getItem('username');

    return (
        <nav className="admin-navbar">
            <button onClick={() => onNavigate('adminDashboard')} className="navbar-logo" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Admin<span>Dashboard</span>
            </button>
            <ul className="navbar-links">
                <li><button onClick={() => onNavigate('verificationDashboard')} className={`nav-link ${currentPage === 'verificationDashboard' ? 'active' : ''}`}>Verification</button></li>
                <li><button onClick={() => onNavigate('disputeResolution')} className={`nav-link ${currentPage === 'disputeResolution' ? 'active' : ''}`}>Disputes</button></li>
                <li><button onClick={() => onNavigate('rewardsManagement')} className={`nav-link ${currentPage === 'rewardsManagement' ? 'active' : ''}`}>Rewards</button></li>
                <li><button onClick={() => onNavigate('contentModeration')} className={`nav-link ${currentPage === 'contentModeration' ? 'active' : ''}`}>Content</button></li>
                <li><button onClick={() => onNavigate('aiAgentManagement')} className={`nav-link ${currentPage === 'aiAgentManagement' ? 'active' : ''}`}>AI Agent</button></li>
            </ul>
            <div className="navbar-auth">
                <button onClick={() => onNavigate('adminDashboard')} className="nav-link">👤 {username || 'Admin'}</button>
                <button onClick={onLogout} className="nav-link nav-cta">Logout</button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
