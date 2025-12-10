import React from 'react';
import { currentUser, games } from '../../data/mockData';
import './PlayerAnalytics.css';

const PlayerAnalytics = () => {
    // Calculate stats
    const myGames = games.filter(game =>
        game.roster.some(player => player.id === currentUser.id)
    );

    const totalGamesPlayed = myGames.length;
    const totalSpent = myGames.reduce((acc, game) => acc + game.cost, 0);

    // Calculate favorite sports
    const sportCounts = myGames.reduce((acc, game) => {
        acc[game.sportType] = (acc[game.sportType] || 0) + 1;
        return acc;
    }, {});

    const sortedSports = Object.entries(sportCounts)
        .sort(([, a], [, b]) => b - a);

    const favoriteSport = sortedSports.length > 0 ? sortedSports[0][0] : 'None';

    // Calculate monthly activity (last 6 months)
    const last6Months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        return d.toLocaleString('default', { month: 'short' });
    }).reverse();

    return (
        <div className="analytics-page">
            <div className="analytics-container">
                <h1 className="section-title">My Analytics</h1>

                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Games Played</h3>
                        <div className="stat-value">{totalGamesPlayed}</div>
                        <div className="stat-subtitle">Total matches joined</div>
                    </div>
                    <div className="stat-card">
                        <h3>Points Earned</h3>
                        <div className="stat-value">{currentUser.pointsEarned}</div>
                        <div className="stat-subtitle">Reward points</div>
                    </div>
                    <div className="stat-card">
                        <h3>Total Spent</h3>
                        <div className="stat-value">RM {totalSpent.toFixed(2)}</div>
                        <div className="stat-subtitle">On game fees</div>
                    </div>
                    <div className="stat-card">
                        <h3>Favorite Sport</h3>
                        <div className="stat-value highlight">{favoriteSport}</div>
                        <div className="stat-subtitle">Most played</div>
                    </div>
                </div>

                <div className="charts-section">
                    <div className="chart-container">
                        <h2>Sports Breakdown</h2>
                        <div className="sports-list">
                            {sortedSports.map(([sport, count]) => (
                                <div key={sport} className="sport-stat-row">
                                    <span className="sport-name">{sport}</span>
                                    <div className="progress-bar-bg">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${(count / totalGamesPlayed) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="sport-count">{count} games</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerAnalytics;
