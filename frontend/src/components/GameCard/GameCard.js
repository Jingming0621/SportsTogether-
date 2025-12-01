import React from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
    const formattedDate = new Date(game.date).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const isTrusted = game.organizer?.trustLevel === 'Verified' || game.organizer?.trustLevel === 'Trusted';

    return (
        <div className="game-card">
            <div className="game-card-header">
                <h3 className="game-sport">{game.sportType || game.sport}</h3>
                <span className="game-price">${game.cost || game.costPerPlayer}</span>
            </div>
            <div className="game-card-body">
                <div className="game-info-row">
                    <span>📍</span>
                    <span>{game.venue}</span>
                </div>
                <div className="game-info-row">
                    <span>📅</span>
                    <span>{formattedDate}, {game.time}</span>
                </div>
                <div className="game-organizer">
                    <span>Host: {game.organizer?.username || game.organizerName || 'Unknown'}</span>
                    {isTrusted && <span className="verified-badge" title="Trusted Organizer">⭐</span>}
                </div>
            </div>
            <div className="game-card-footer">
                <a href={`#join/${game.id}`} className="btn-join">Join Game</a>
            </div>
        </div>
    );
};

export default GameCard;

