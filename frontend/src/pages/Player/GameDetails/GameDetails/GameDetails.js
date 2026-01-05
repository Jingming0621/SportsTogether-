import React, { useState } from 'react';
import { games, currentUser } from '../../data/mockData';
import PaymentModal from '../../components/PaymentModal/PaymentModal';
import './GameDetails.css';

const GameDetails = ({ gameId, onBack }) => {
    const game = games.find(g => g.id === gameId) || games[0];
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const availableSlots = game.maxPlayers - game.currentPlayers;
    const isFull = availableSlots === 0;
    const isOrganizer = game.organizer.id === currentUser.id;

    const handleJoinGame = () => {
        if (isFull) {
            alert('This game is full!');
            return;
        }
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = () => {
        alert('🎉 Successfully Joined!\n\nYou have been added to the game roster.\nPayment is held in escrow until the game is completed.\n\n(This is a prototype UI)');
        setShowPaymentModal(false);
        onBack();
    };

    return (
        <div className="game-details-page">
            <div className="game-details-container">
                <button className="back-btn" onClick={onBack}>← Back to Games</button>

                {/* Game Header */}
                <div className="game-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${game.image})` }}>
                    <div className="game-header-content">
                        <div className="game-badges">
                            <span className="sport-badge">{game.sportType}</span>
                            <span className={`status-badge ${game.status.toLowerCase().replace(' ', '-')}`}>
                                {game.status}
                            </span>
                        </div>
                        <h1>{game.title}</h1>
                        <div className="game-meta">
                            <span>🏆 Organized by {game.organizer.username}</span>
                            <span className={`trust-badge ${game.organizer.trustLevel.toLowerCase()}`}>
                                {game.organizer.trustLevel}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="game-content">
                    {/* Main Information */}
                    <div className="game-main">
                        {/* Key Details */}
                        <div className="details-card">
                            <h2>Game Details</h2>
                            <div className="details-grid">
                                <div className="detail-item">
                                    <div className="detail-icon">📅</div>
                                    <div>
                                        <div className="detail-label">Date</div>
                                        <div className="detail-value">
                                            {new Date(game.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon">🕐</div>
                                    <div>
                                        <div className="detail-label">Time</div>
                                        <div className="detail-value">{game.time}</div>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon">📍</div>
                                    <div>
                                        <div className="detail-label">Venue</div>
                                        <div className="detail-value">{game.venue}</div>
                                        <div className="detail-address">{game.venueAddress}</div>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-icon">💰</div>
                                    <div>
                                        <div className="detail-label">Cost</div>
                                        <div className="detail-value">RM {game.cost.toFixed(2)} per player</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="details-card">
                            <h2>About This Game</h2>
                            <p className="game-description">{game.description}</p>

                            {game.requirements && (
                                <div className="requirements">
                                    <strong>Requirements:</strong> {game.requirements}
                                </div>
                            )}
                        </div>

                        {/* Roster */}
                        <div className="details-card">
                            <h2>Players ({game.currentPlayers}/{game.maxPlayers})</h2>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${(game.currentPlayers / game.maxPlayers) * 100}%` }}
                                />
                            </div>
                            <div className="roster-grid">
                                {game.roster && game.roster.map(player => (
                                    <div key={player.id} className="player-card">
                                        <img src={player.profilePicture} alt={player.username} />
                                        <div className="player-info">
                                            <div className="player-name">{player.username}</div>
                                            <div className="player-bio">{player.bio.substring(0, 50)}...</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {availableSlots > 0 && (
                                <div className="slots-available">
                                    {availableSlots} slot{availableSlots !== 1 ? 's' : ''} available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="game-sidebar">
                        {/* Join Card */}
                        <div className="join-card">
                            <div className="price-tag">
                                <div className="price-label">Cost per player</div>
                                <div className="price-amount">RM {game.cost.toFixed(2)}</div>
                            </div>

                            {!isOrganizer && (
                                <>
                                    <button
                                        className="join-btn"
                                        onClick={handleJoinGame}
                                        disabled={isFull || game.status !== 'Open'}
                                    >
                                        {isFull ? '❌ Game is Full' : '🎮 Join Game'}
                                    </button>

                                    {game.status === 'Open' && !isFull && (
                                        <div className="payment-note">
                                            💳 Secure payment via escrow
                                        </div>
                                    )}
                                </>
                            )}

                            {isOrganizer && (
                                <div className="organizer-badge-large">
                                    ⭐ You are the organizer
                                </div>
                            )}
                        </div>

                        {/* Organizer Card */}
                        <div className="organizer-card">
                            <h3>Organizer</h3>
                            <div className="organizer-info">
                                <img src={game.organizer.profilePicture} alt={game.organizer.username} />
                                <div>
                                    <div className="organizer-name">{game.organizer.username}</div>
                                    <div className={`trust-badge-small ${game.organizer.trustLevel.toLowerCase()}`}>
                                        {game.organizer.trustLevel}
                                    </div>
                                </div>
                            </div>
                            {game.organizer.bio && (
                                <p className="organizer-bio">{game.organizer.bio}</p>
                            )}
                        </div>

                        {/* Safety Info */}
                        <div className="safety-card">
                            <h3>🛡️ Safety & Trust</h3>
                            <ul>
                                <li>Payment held in secure escrow</li>
                                <li>Released after game completion</li>
                                <li>24-hour dispute window</li>
                                <li>Verified organizer</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <PaymentModal
                    amount={game.cost}
                    title={game.title}
                    onClose={() => setShowPaymentModal(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};

export default GameDetails;
