import React from 'react';
import { instructorRewards } from '../../../data/mockData';
import './InstructorRewards.css';

const InstructorRewards = () => {
    const handleRedeemBenefit = (level) => {
        alert(`🎁 Benefit Redeemed!\n\nYou now enjoy ${instructorRewards.benefits.find(b => b.level === level).commissionRate} commission rate!\n\n(This is a prototype UI)`);
    };

    return (
        <div className="instructor-rewards-page">
            <div className="rewards-container">
                <h1>Performance & Rewards</h1>
                <p className="subtitle">Track your progress and unlock exclusive benefits</p>

                {/* Current Level */}
                <div className="level-card">
                    <div className="level-header">
                        <div className="level-badge-large">{instructorRewards.currentLevel}</div>
                        <div className="level-info">
                            <h2>Instructor Level: {instructorRewards.currentLevel}</h2>
                            <p>You're performing excellently! Keep it up!</p>
                        </div>
                    </div>
                    <div className="progress-section">
                        <div className="progress-header">
                            <span>Progress to {instructorRewards.nextLevel}</span>
                            <span>{instructorRewards.currentPoints} / {instructorRewards.currentPoints + instructorRewards.pointsToNextLevel} points</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${(instructorRewards.currentPoints / (instructorRewards.currentPoints + instructorRewards.pointsToNextLevel)) * 100}%` }}
                            />
                        </div>
                        <p className="progress-text">{instructorRewards.pointsToNextLevel} points needed for {instructorRewards.nextLevel} level</p>
                    </div>
                </div>

                {/* Points Breakdown */}
                <div className="points-section">
                    <h2>Points Breakdown</h2>
                    <div className="points-sources">
                        {instructorRewards.pointsSources.map((source, idx) => (
                            <div key={idx} className="source-card">
                                <div className="source-header">
                                    <h3>{source.source}</h3>
                                    <span className="source-points">{source.points} pts</span>
                                </div>
                                <div className="source-progress-bar">
                                    <div className="source-fill" style={{ width: `${source.percentage}%` }} />
                                </div>
                                <p className="source-percentage">{source.percentage}% of total</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Tiers */}
                <div className="benefits-section">
                    <h2>Platform Benefits</h2>
                    <div className="benefits-grid">
                        {instructorRewards.benefits.map((benefit, idx) => (
                            <div key={idx} className={`benefit-card ${benefit.unlocked ? 'unlocked' : 'locked'}`}>
                                <div className="benefit-level">{benefit.level}</div>
                                <div className="benefit-rate">{benefit.commissionRate}</div>
                                <div className="benefit-label">Commission Rate</div>
                                {benefit.unlocked ? (
                                    <>
                                        <div className="unlocked-badge">✓ Unlocked</div>
                                        {benefit.level === instructorRewards.currentLevel && (
                                            <button className="active-benefit-btn">Currently Active</button>
                                        )}
                                    </>
                                ) : (
                                    <div className="locked-badge">🔒 Locked</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* How to Earn Points */}
                <div className="earn-section">
                    <h2>How to Earn More Points</h2>
                    <div className="earn-grid">
                        <div className="earn-item">
                            <div className="earn-icon">📚</div>
                            <h4>Complete Sessions</h4>
                            <p>+10 points per session</p>
                        </div>
                        <div className="earn-item">
                            <div className="earn-icon">⭐</div>
                            <h4>5-Star Ratings</h4>
                            <p>+15 points per 5-star review</p>
                        </div>
                        <div className="earn-item">
                            <div className="earn-icon">🔁</div>
                            <h4>Repeat Bookings</h4>
                            <p>+20 points when players book again</p>
                        </div>
                        <div className="earn-item">
                            <div className="earn-icon">🎯</div>
                            <h4>Consistency Bonus</h4>
                            <p>+50 points for 10+ sessions/month</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorRewards;

