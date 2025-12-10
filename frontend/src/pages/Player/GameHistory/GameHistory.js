import React, { useState } from 'react';
import { games } from '../../../data/mockData';

import './GameHistory.css';

const GameHistory = () => {
    const [filter, setFilter] = useState('all');
    const [modalView, setModalView] = useState(null); // 'details', 'report', or null
    const [selectedGame, setSelectedGame] = useState(null);
    const [reportReason, setReportReason] = useState('');

    // In a real app, we would filter by the current user's ID
    const today = new Date();

    // Helper to determine status
    const calculateStatus = (game) => {
        const gameDate = new Date(game.date);
        const now = new Date();
        const isPast = gameDate < now;

        // Calculate days since game
        const diffTime = Math.abs(now - gameDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (game.status === 'Completed') {
            return 'Completed';
        }

        if (game.status === 'Under Review') {
            return 'Under Review';
        }

        if (isPast) {
            // Auto-complete after 1 day
            if (diffDays > 1) {
                return 'Completed';
            }
            // Otherwise pending manual completion
            return 'Pending';
        }

        return game.status;
    };

    const historyGames = games.filter(game => {
        const gameDate = new Date(game.date);
        // Show past games or games explicitly marked completed or under review
        return gameDate < today || game.status === 'Completed' || game.status === 'Under Review';
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    const filteredGames = historyGames.filter(game => {
        if (filter === 'all') return true;
        return game.sportType.toLowerCase() === filter.toLowerCase();
    });

    const sports = [...new Set(historyGames.map(game => game.sportType))];

    const handleMarkCompleted = (gameId) => {
        // In a real app, this would make an API call
        alert(`Game ${gameId} marked as Completed!`);
        setModalView(null);
    };

    const handleRowClick = (game) => {
        setSelectedGame(game);
        setModalView('details');
    };

    const handleReportClick = () => {
        setModalView('report');
        setReportReason('');
    };

    const handleSubmitReport = () => {
        if (!reportReason.trim()) {
            alert("Please enter a reason for the report.");
            return;
        }
        // Simulate API call
        alert(`Report submitted for game: ${selectedGame.title}\nReason: ${reportReason}`);
        setModalView(null);
        setSelectedGame(null);
    };

    const closeModal = () => {
        setModalView(null);
        setSelectedGame(null);
    };

    return (
        <div className="game-history-page">
            <div className="history-header">
                <h1 className="section-title">Game History</h1>
                <div className="filter-controls">
                    <label>Filter by Sport:</label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All Sports</option>
                        {sports.map(sport => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredGames.length > 0 ? (
                <div className="history-table-container">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Sport</th>
                                <th>Game Title</th>
                                <th>Venue</th>
                                <th>Points</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredGames.map(game => {
                                // Format time to 12-hour
                                const [hours, minutes] = game.time.split(':');
                                const timeObj = new Date();
                                timeObj.setHours(hours);
                                timeObj.setMinutes(minutes);
                                const formattedTime = timeObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

                                // Calculate points (mock logic: 10 points per RM or fixed 50)
                                const points = Math.floor(game.cost * 10) || 50;

                                const displayStatus = calculateStatus(game);

                                return (
                                    <tr
                                        key={game.id}
                                        onClick={() => handleRowClick(game)}
                                        className="clickable-row"
                                    >
                                        <td>{new Date(game.date).toLocaleDateString('en-GB')}</td>
                                        <td>{formattedTime}</td>
                                        <td>
                                            <span className="sport-badge-small">{game.sportType}</span>
                                        </td>
                                        <td className="game-title-cell">{game.title}</td>
                                        <td>{game.venue}</td>
                                        <td>+{points} pts</td>
                                        <td>
                                            <span className={`status-badge ${displayStatus.toLowerCase().replace(' ', '-')}`}>
                                                {displayStatus}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="no-history">
                    <p>No past games found.</p>
                </div>
            )}

            {/* Modal */}

            {modalView && selectedGame && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{modalView === 'details' ? 'Game Details' : 'Report Issue'}</h3>
                            <button className="close-btn" onClick={closeModal}>&times;</button>
                        </div>

                        {modalView === 'details' ? (
                            <div className="modal-body details-view">
                                <div className="game-details-grid">
                                    <div className="detail-item">
                                        <label>Title</label>
                                        <p>{selectedGame.title}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Date & Time</label>
                                        <p>{new Date(selectedGame.date).toLocaleDateString('en-GB')} at {selectedGame.time}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Venue</label>
                                        <p>{selectedGame.venue}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Price</label>
                                        <p>RM {selectedGame.cost}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Status</label>
                                        <span className={`status-badge ${calculateStatus(selectedGame).toLowerCase().replace(' ', '-')}`}>
                                            {calculateStatus(selectedGame)}
                                        </span>
                                    </div>
                                </div>

                                {calculateStatus(selectedGame) === 'Pending' && (
                                    <div className="auto-complete-info">
                                        <p>ℹ️ This game will automatically be marked as <strong>Completed</strong> in 1 day if no action is taken.</p>
                                    </div>
                                )}

                                <div className="modal-actions">
                                    {calculateStatus(selectedGame) === 'Pending' && (
                                        <button
                                            className="btn-action btn-mark-completed-large"
                                            onClick={() => handleMarkCompleted(selectedGame.id)}
                                        >
                                            Mark as Completed
                                        </button>
                                    )}

                                    {calculateStatus(selectedGame) !== 'Under Review' ? (
                                        <button
                                            className="btn-action btn-report-large"
                                            onClick={handleReportClick}
                                        >
                                            Report Issue
                                        </button>
                                    ) : (
                                        <button
                                            className="btn-action btn-report-large"
                                            disabled
                                            style={{ backgroundColor: '#cbd5e1', cursor: 'not-allowed' }}
                                        >
                                            Reported
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="modal-body report-view">
                                <div className="safety-window-banner">
                                    <strong>⏰ Safety Window: 24 Hours</strong>
                                    <p>You can report issues within 24 hours after a game or session is completed.</p>
                                </div>

                                <p><strong>Game:</strong> {selectedGame.title}</p>

                                <div className="form-group">
                                    <label>Describe the issue:</label>
                                    <textarea
                                        value={reportReason}
                                        onChange={(e) => setReportReason(e.target.value)}
                                        placeholder="e.g., Organizer didn't show up, venue was closed, etc."
                                    />
                                </div>

                                <div className="what-happens-next">
                                    <h3>What Happens Next?</h3>
                                    <div className="steps-grid">
                                        <div className="step">
                                            <div className="step-number">1</div>
                                            <div className="step-content">
                                                <strong>Funds Frozen</strong>
                                                <p>Payment held in escrow</p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-number">2</div>
                                            <div className="step-content">
                                                <strong>Admin Review</strong>
                                                <p>Investigated in 48h</p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-number">3</div>
                                            <div className="step-content">
                                                <strong>Resolution</strong>
                                                <p>Refund or release</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-buttons">
                                    <button className="btn-cancel" onClick={() => setModalView('details')}>Back</button>
                                    <button className="btn-submit" onClick={handleSubmitReport}>Submit Report</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameHistory;
