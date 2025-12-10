import React from 'react';
import { rewards, myRewards, currentUser } from '../../../data/mockData';
import './Rewards.css';

const Rewards = () => {
    const handleRedeem = (reward) => {
        if (currentUser.pointsEarned < reward.pointCost) {
            alert('❌ Insufficient Points\n\nYou don\'t have enough points to redeem this reward!\n\n(This is a prototype UI)');
            return;
        }

        alert(`🎉 Reward Redeemed!\n\nItem: ${reward.name}\nPoints Deducted: ${reward.pointCost}\n\nYour voucher has been added to "My Rewards" wallet.\n\n(This is a prototype UI)`);
    };

    return (
        <div className="rewards-page">
            <div className="rewards-container">
                <div className="rewards-header">
                    <div>
                        <h1>Rewards Store</h1>
                        <p className="subtitle">Redeem your points for exclusive rewards</p>
                    </div>
                    <div className="points-balance">
                        <span className="balance-label">Your Points</span>
                        <span className="balance-amount">{currentUser.pointsEarned}</span>
                    </div>
                </div>

                {/* My Rewards */}
                {myRewards.length > 0 && (
                    <div className="my-rewards-section">
                        <h2>My Rewards</h2>
                        <div className="my-rewards-grid">
                            {myRewards.map(item => (
                                <div key={item.id} className="my-reward-card">
                                    <div className="reward-image" style={{ backgroundImage: `url(${item.reward.image})` }} />
                                    <div className="reward-details">
                                        <h3>{item.reward.name}</h3>
                                        <div className="voucher-info">
                                            <div className="voucher-code">
                                                <strong>Code:</strong> {item.voucherCode}
                                            </div>
                                            <img src={item.qrCode} alt="QR Code" className="qr-code" />
                                        </div>
                                        <div className="reward-meta">
                                            <span>📅 Redeemed: {new Date(item.redeemedDate).toLocaleDateString()}</span>
                                            <span>⏰ Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className={`status-badge ${item.status.toLowerCase()}`}>
                                            {item.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Rewards Store */}
                <div className="store-section">
                    <h2>Available Rewards</h2>

                    {/* Filter by category */}
                    <div className="category-filter">
                        <button className="category-btn active">All</button>
                        <button className="category-btn">Vouchers</button>
                        <button className="category-btn">Merchandise</button>
                        <button className="category-btn">Services</button>
                    </div>

                    <div className="rewards-grid">
                        {rewards.map(reward => (
                            <div key={reward.id} className="reward-card">
                                <div className="reward-image" style={{ backgroundImage: `url(${reward.image})` }}>
                                    <div className="category-tag">{reward.category}</div>
                                </div>

                                <div className="reward-content">
                                    <h3>{reward.name}</h3>
                                    <p className="reward-description">{reward.description}</p>

                                    {reward.validUntil && (
                                        <div className="valid-until">
                                            Valid until {new Date(reward.validUntil).toLocaleDateString()}
                                        </div>
                                    )}

                                    {reward.stock !== null && (
                                        <div className="stock-info">
                                            {reward.stock > 0 ? (
                                                <span className="in-stock">{reward.stock} left in stock</span>
                                            ) : (
                                                <span className="out-of-stock">Out of Stock</span>
                                            )}
                                        </div>
                                    )}

                                    <div className="reward-footer">
                                        <div className="points-cost">
                                            <span className="points-icon">🏆</span>
                                            <span className="points">{reward.pointCost}</span>
                                            <span className="points-label">points</span>
                                        </div>
                                        <button
                                            className="redeem-btn"
                                            onClick={() => handleRedeem(reward)}
                                            disabled={currentUser.pointsEarned < reward.pointCost || (reward.stock !== null && reward.stock === 0)}
                                        >
                                            {currentUser.pointsEarned < reward.pointCost ? 'Not Enough Points' : 'Redeem'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How to Earn Points */}
                <div className="earn-points-section">
                    <h3>How to Earn Points</h3>
                    <div className="earn-points-grid">
                        <div className="earn-card">
                            <div className="earn-icon">🎮</div>
                            <div className="earn-title">Join Games</div>
                            <div className="earn-points">+50 points</div>
                        </div>
                        <div className="earn-card">
                            <div className="earn-icon">🎯</div>
                            <div className="earn-title">Complete Games</div>
                            <div className="earn-points">+100 points</div>
                        </div>
                        <div className="earn-card">
                            <div className="earn-icon">⭐</div>
                            <div className="earn-title">Get Rated 5 Stars</div>
                            <div className="earn-points">+75 points</div>
                        </div>
                        <div className="earn-card">
                            <div className="earn-icon">👥</div>
                            <div className="earn-title">Refer a Friend</div>
                            <div className="earn-points">+200 points</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rewards;

