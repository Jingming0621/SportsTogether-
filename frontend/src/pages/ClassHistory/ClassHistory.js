import React, { useState } from 'react';
import { classHistory } from '../../data/mockData';
import './ClassHistory.css';

const ClassHistory = () => {
    const [filter, setFilter] = useState('all');
    const [sportFilter, setSportFilter] = useState('all');

    const filteredHistory = classHistory.filter(item => {
        if (sportFilter !== 'all' && item.sport !== sportFilter) return false;
        return true;
    });

    const totalEarnings = classHistory.reduce((sum, item) => sum + item.earnings, 0);
    const averageRating = (classHistory.reduce((sum, item) => sum + item.rating, 0) / classHistory.length).toFixed(1);

    return (
        <div className="class-history-page">
            <div className="history-container">
                <h1>Class History</h1>
                <p className="subtitle">View your past coaching sessions and earnings</p>

                {/* Summary Stats */}
                <div className="summary-stats">
                    <div className="stat-card">
                        <div className="stat-icon">📚</div>
                        <div className="stat-value">{classHistory.length}</div>
                        <div className="stat-label">Total Classes</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-value">RM {totalEarnings.toFixed(2)}</div>
                        <div className="stat-label">Total Earnings</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-value">{averageRating}</div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-section">
                    <div className="filter-group">
                        <label>Filter by Sport:</label>
                        <select value={sportFilter} onChange={(e) => setSportFilter(e.target.value)} className="filter-select">
                            <option value="all">All Sports</option>
                            <option value="Tennis">Tennis</option>
                            <option value="Badminton">Badminton</option>
                        </select>
                    </div>
                </div>

                {/* History List */}
                {filteredHistory.length > 0 ? (
                    <div className="history-list">
                        {filteredHistory.map(item => (
                            <div key={item.id} className="history-card">
                                <div className="history-header-row">
                                    <div className="history-date">
                                        <div className="date-day">{new Date(item.date).getDate()}</div>
                                        <div className="date-month">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                                    </div>
                                    <div className="history-info">
                                        <h3>{item.sport} - {item.sessionType}</h3>
                                        <p className="history-time">⏰ {item.timeSlot}</p>
                                        <div className="participants-tags">
                                            {item.participants.map((participant, idx) => (
                                                <span key={idx} className="participant-tag">{participant}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="history-right">
                                        <div className="earnings-badge">RM {item.earnings.toFixed(2)}</div>
                                        <div className="rating-display">
                                            <span className="stars">{'⭐'.repeat(Math.floor(item.rating))}</span>
                                            <span className="rating-value">{item.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                                {item.feedback && (
                                    <div className="feedback-section">
                                        <strong>Feedback:</strong>
                                        <p>"{item.feedback}"</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-data-message">
                        <div className="no-data-icon">📋</div>
                        <h3>No completed classes yet</h3>
                        <p>Start coaching to build your history!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassHistory;
