import React from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
    const formattedDate = new Date(game.date).toLocaleDateString(undefined, {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });

    // Placeholder images based on sport type
    const getSportImage = (sport) => {
        const images = {
            'Badminton': 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
            'Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
            'Futsal': 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=800&auto=format&fit=crop',
            'Tennis': 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=800&auto=format&fit=crop',
            'Ping Pong': 'https://images.unsplash.com/photo-1534158914592-062992bbe900?q=80&w=800&auto=format&fit=crop'
        };
        return images[sport] || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop';
    };

    return (
        <div className="game-card">
            <div className="game-card-image" style={{ backgroundImage: `url(${game.image || getSportImage(game.sportType)})` }}>
                <span className="sport-tag">{game.sportType}</span>
                <div className="price-tag">RM {game.cost || game.costPerPlayer}</div>
            </div>

            <div className="game-card-content">
                <h3 className="game-title">{game.title}</h3>

                <div className="game-details">
                    <div className="detail-row">
                        <span className="icon">📍</span>
                        <span className="text">{game.venue}</span>
                    </div>
                    <div className="detail-row">
                        <span className="icon">📅</span>
                        <span className="text">
                            {formattedDate} • {(() => {
                                const [h, m] = game.time.split(':');
                                const hour = parseInt(h);
                                const ampm = hour >= 12 ? 'PM' : 'AM';
                                const hour12 = hour % 12 || 12;
                                return `${hour12}:${m} ${ampm}`;
                            })()}
                        </span>
                    </div>
                    <div className="detail-row organizer">
                        <span className="icon">👤</span>
                        <span className="text">Hosted by <strong>{game.organizer?.username || game.organizerName || 'Unknown'}</strong></span>
                    </div>
                </div>

                <div className="game-card-actions">
                    <button className="btn-view">View Details</button>
                    <button className="btn-book">Book Slot</button>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
