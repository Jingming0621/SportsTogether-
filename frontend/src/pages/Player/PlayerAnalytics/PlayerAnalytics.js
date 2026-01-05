import React from 'react';
import { currentUser, games } from '../../../data/mockData';
import './PlayerAnalytics.css';

const PlayerAnalytics = () => {
    // Calculate stats based on COMPLETED (past) games only
    const today = new Date();
    const myGames = games.filter(game => {
        const gameDate = new Date(game.date);
        const isUserInGame = game.roster.some(player => player.id === currentUser.id);
        const isPast = gameDate < today;
        return isUserInGame && isPast;
    });

    const totalGamesPlayed = myGames.length;
    const totalSpent = myGames.reduce((acc, game) => acc + game.cost, 0);

    const totalPointsEarned = myGames.reduce((acc, game) => {
        let points = 50;
        if (game.organizer && game.organizer.id === currentUser.id) {
            points = 100;
        }
        return acc + points;
    }, 0);

    const sportCounts = myGames.reduce((acc, game) => {
        acc[game.sportType] = (acc[game.sportType] || 0) + 1;
        return acc;
    }, {});

    const sortedSports = Object.entries(sportCounts)
        .sort(([, a], [, b]) => b - a);

    const favoriteSport = sortedSports.length > 0 ? sortedSports[0][0] : 'None';

    // Calculate points progression
    const sortedGames = [...myGames].sort((a, b) => new Date(a.date) - new Date(b.date));
    const pointsData = sortedGames.map((game, index) => {
        const cumulativePoints = sortedGames
            .slice(0, index + 1)
            .reduce((sum, g) => {
                let points = 50;
                if (g.organizer && g.organizer.id === currentUser.id) {
                    points = 100;
                }
                return sum + points;
            }, 0);
        return {
            date: new Date(game.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            points: cumulativePoints
        };
    });

    const maxPoints = pointsData.length > 0 ? Math.max(...pointsData.map(d => d.points)) : 100;

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
                        <div className="stat-value">{totalPointsEarned}</div>
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

                <div className="charts-grid">
                    <div className="charts-section">
                        <div className="chart-container">
                            <h2>Sports Breakdown</h2>
                            <div className="bar-chart">
                                {sortedSports.map(([sport, count]) => {
                                    const percentage = (count / totalGamesPlayed) * 100;
                                    return (
                                        <div key={sport} className="bar-column">
                                            <span className="bar-value">{count}</span>
                                            <div
                                                className="bar-fill"
                                                style={{ height: `${percentage}%` }}
                                                title={`${count} games (${Math.round(percentage)}%)`}
                                            ></div>
                                            <span className="bar-label">{sport}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="charts-section">
                        <div className="chart-container">
                            <h2>Points Progression</h2>
                            {pointsData.length > 0 ? (
                                <div className="line-chart">
                                    {pointsData.map((data, index) => {
                                        const heightPercent = (data.points / maxPoints) * 100;
                                        const prevHeight = index > 0 ? (pointsData[index - 1].points / maxPoints) * 100 : 0;
                                        const isIncreasing = index === 0 || data.points > pointsData[index - 1].points;

                                        return (
                                            <div key={index} className="line-point-wrapper">
                                                {index > 0 && (
                                                    <svg className="line-connector" style={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        left: '-50%',
                                                        top: 0,
                                                        pointerEvents: 'none',
                                                        overflow: 'visible'
                                                    }}>
                                                        <line
                                                            x1="0"
                                                            y1={`${100 - prevHeight}%`}
                                                            x2="100%"
                                                            y2={`${100 - heightPercent}%`}
                                                            stroke="#3b82f6"
                                                            strokeWidth="3"
                                                        />
                                                    </svg>
                                                )}
                                                <div
                                                    className="line-point"
                                                    style={{ bottom: `${heightPercent}%` }}
                                                    title={`${data.date}: ${data.points} points`}
                                                >
                                                    <span className="point-value">{data.points}</span>
                                                    <div className={`point-dot ${isIncreasing ? 'increasing' : 'decreasing'}`}></div>
                                                </div>
                                                <span className="point-label">{data.date}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                                    No points data available yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerAnalytics;
