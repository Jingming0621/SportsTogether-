import React from 'react';
import './InstructorDashboard.css';

const InstructorDashboard = ({ onNavigate }) => {
    const dashboardItems = [
        {
            id: 'instructorProfile',
            icon: '📋',
            title: 'My Profile',
            description: 'Manage your instructor profile, rates, and certifications',
            color: '#f093fb'
        },
        {
            id: 'manageSessions',
            icon: '📅',
            title: 'Manage Sessions',
            description: 'Create sessions and handle booking requests',
            color: '#4facfe'
        },
        {
            id: 'classHistory',
            icon: '📚',
            title: 'Class History',
            description: 'View past sessions, earnings, and student feedback',
            color: '#a8edea'
        },
        {
            id: 'instructorRewards',
            icon: '🏆',
            title: 'Rewards & Level',
            description: 'Track your instructor level and unlock benefits',
            color: '#ffeaa7'
        },
        {
            id: 'instructorPayouts',
            icon: '💰',
            title: 'Payouts',
            description: 'Manage earnings and withdraw funds',
            color: '#84fab0'
        }
    ];

    return (
        <div className="instructor-dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Instructor Dashboard</h1>
                    <p className="subtitle">Welcome back! Manage your coaching business</p>
                </div>

                <div className="dashboard-grid">
                    {dashboardItems.map(item => (
                        <div
                            key={item.id}
                            className="dashboard-card"
                            onClick={() => onNavigate(item.id)}
                            style={{ borderColor: item.color }}
                        >
                            <div className="card-icon" style={{ background: item.color }}>
                                {item.icon}
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <div className="card-arrow">→</div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-info">
                    <div className="info-card">
                        <h3>📊 Quick Stats</h3>
                        <div className="stats-row">
                            <div className="stat">
                                <strong>187</strong>
                                <span>Total Sessions</span>
                            </div>
                            <div className="stat">
                                <strong>4.9 ⭐</strong>
                                <span>Rating</span>
                            </div>
                            <div className="stat">
                                <strong>RM 2,400</strong>
                                <span>Wallet Balance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;

