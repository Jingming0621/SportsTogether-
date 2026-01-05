import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ onNavigate }) => {
    const adminCards = [
        {
            id: 'verification',
            icon: '✅',
            title: 'Verification Dashboard',
            description: 'Review and approve organizer & instructor applications',
            page: 'verificationDashboard',
            color: '#10b981'
        },
        {
            id: 'disputes',
            icon: '⚖️',
            title: 'Dispute Resolution',
            description: 'Manage user disputes and issue reports',
            page: 'disputeResolution',
            color: '#f59e0b'
        },
        {
            id: 'rewards',
            icon: '🎁',
            title: 'Rewards Management',
            description: 'Create and manage partner rewards',
            page: 'rewardsManagement',
            color: '#8b5cf6'
        },
        {
            id: 'content',
            icon: '🛡️',
            title: 'Content Moderation',
            description: 'Review flagged content and ensure community safety',
            page: 'contentModeration',
            color: '#ef4444'
        },
        {
            id: 'ai',
            icon: '🤖',
            title: 'AI Agent Management',
            description: 'Update knowledge base and view conversation logs',
            page: 'aiAgentManagement',
            color: '#06b6d4'
        }
    ];

    const stats = [
        { label: 'Pending Verifications', value: '12', icon: '📋' },
        { label: 'Open Disputes', value: '5', icon: '⚠️' },
        { label: 'Flagged Content', value: '8', icon: '🚩' }
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-dashboard-header">
                <h1>Admin Dashboard</h1>
                <p className="subtitle">Manage platform operations and user safety</p>
            </div>

            <div className="quick-stats">
                <h2>📊 Quick Stats</h2>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <span className="stat-icon">{stat.icon}</span>
                            <div className="stat-info">
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="admin-cards">
                {adminCards.map(card => (
                    <div
                        key={card.id}
                        className="admin-card"
                        onClick={() => onNavigate(card.page)}
                        style={{ borderTop: `4px solid ${card.color}` }}
                    >
                        <div className="card-icon" style={{ background: `${card.color}20`, color: card.color }}>
                            {card.icon}
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
