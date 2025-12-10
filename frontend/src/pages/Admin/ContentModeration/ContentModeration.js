import React, { useState } from 'react';
import './ContentModeration.css';
import { flaggedContent } from '../../../data/mockData';

const ContentModeration = () => {
    const [content, setContent] = useState(flaggedContent);
    const [filter, setFilter] = useState('all');

    const filteredContent = content.filter(item => {
        if (filter === 'all') return item.status === 'flagged';
        return item.type === filter && item.status === 'flagged';
    });

    const handleDeleteContent = (id) => {
        setContent(content.map(item =>
            item.id === id ? { ...item, status: 'deleted' } : item
        ));
    };

    const handleKeepContent = (id) => {
        setContent(content.map(item =>
            item.id === id ? { ...item, status: 'approved' } : item
        ));
    };

    const getSeverityBadge = (severity) => {
        const badges = {
            low: { text: 'Low', class: 'severity-low' },
            medium: { text: 'Medium', class: 'severity-medium' },
            high: { text: 'High', class: 'severity-high' }
        };
        const badge = badges[severity];
        return <span className={`severity-badge ${badge.class}`}>{badge.text}</span>;
    };

    return (
        <div className="content-moderation">
            <div className="page-header">
                <h1>🛡️ Content Moderation</h1>
                <p>Review flagged content and ensure community safety</p>
            </div>

            <div className="filters">
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
                    All ({content.filter(c => c.status === 'flagged').length})
                </button>
                <button onClick={() => setFilter('post')} className={filter === 'post' ? 'active' : ''}>
                    Posts ({content.filter(c => c.type === 'post' && c.status === 'flagged').length})
                </button>
                <button onClick={() => setFilter('group')} className={filter === 'group' ? 'active' : ''}>
                    Groups ({content.filter(c => c.type === 'group' && c.status === 'flagged').length})
                </button>
                <button onClick={() => setFilter('comment')} className={filter === 'comment' ? 'active' : ''}>
                    Comments ({content.filter(c => c.type === 'comment' && c.status === 'flagged').length})
                </button>
            </div>

            <div className="content-grid">
                {filteredContent.map(item => (
                    <div key={item.id} className="content-card">
                        <div className="content-header">
                            <div>
                                <h3>{item.type === 'post' ? '📝' : item.type === 'group' ? '👥' : '💬'} {item.type.toUpperCase()}</h3>
                                <p className="content-author">Posted by: {item.author}</p>
                            </div>
                            {getSeverityBadge(item.severity)}
                        </div>

                        <div className="content-body">
                            <p><strong>Content:</strong></p>
                            <div className="content-preview">{item.content}</div>
                        </div>

                        <div className="flag-details">
                            <p><strong>Flagged for:</strong> {item.reason}</p>
                            <p><strong>Reports:</strong> {item.reportCount}</p>
                            <p><strong>Date:</strong> {item.flaggedDate}</p>
                        </div>

                        <div className="content-actions">
                            <button onClick={() => handleDeleteContent(item.id)} className="btn-delete">
                                🗑️ Delete Content
                            </button>
                            <button onClick={() => handleKeepContent(item.id)} className="btn-keep">
                                ✅ Keep Content
                            </button>
                        </div>
                    </div>
                ))}

                {filteredContent.length === 0 && (
                    <div className="no-content">
                        <p>✨ No flagged content to review!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentModeration;

