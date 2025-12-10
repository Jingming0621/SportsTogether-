import React, { useState } from 'react';
import { games } from '../../data/mockData';
import GameCard from '../../components/GameCard/GameCard';
import './GameHistory.css';

const GameHistory = () => {
    const [filter, setFilter] = useState('all');

    // In a real app, we would filter by the current user's ID
    // For now, we'll just show all past games or games marked as 'Completed'
    const today = new Date();

    const historyGames = games.filter(game => {
        const gameDate = new Date(game.date);
        return gameDate < today || game.status === 'Completed';
    });

    const filteredGames = historyGames.filter(game => {
        if (filter === 'all') return true;
        return game.sportType.toLowerCase() === filter.toLowerCase();
    });

    const sports = [...new Set(historyGames.map(game => game.sportType))];

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
                <div className="games-grid">
                    {filteredGames.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                <div className="no-history">
                    <p>No past games found.</p>
                </div>
            )}
        </div>
    );
};

export default GameHistory;
