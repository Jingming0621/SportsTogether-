import React, { useState } from 'react';
import './RewardsManagement.css';
import { rewardsData } from '../../../data/mockData';

const RewardsManagement = () => {
    const [rewards, setRewards] = useState(rewardsData);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        partnerName: '',
        voucherType: '',
        pointCost: '',
        description: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateReward = (e) => {
        e.preventDefault();
        const newReward = {
            id: rewards.length + 1,
            ...formData,
            pointCost: parseInt(formData.pointCost),
            active: true
        };
        setRewards([...rewards, newReward]);
        setFormData({ partnerName: '', voucherType: '', pointCost: '', description: '' });
        setShowForm(false);
    };

    const toggleRewardStatus = (id) => {
        setRewards(rewards.map(r =>
            r.id === id ? { ...r, active: !r.active } : r
        ));
    };

    return (
        <div className="rewards-management">
            <div className="page-header">
                <h1>🎁 Rewards Management</h1>
                <p>Create and manage partner rewards for the platform</p>
            </div>

            <div className="action-bar">
                <button onClick={() => setShowForm(!showForm)} className="btn-create">
                    {showForm ? '❌ Cancel' : '➕ Create New Reward'}
                </button>
            </div>

            {showForm && (
                <div className="reward-form">
                    <h2>Create New Reward</h2>
                    <form onSubmit={handleCreateReward}>
                        <div className="form-group">
                            <label>Partner Name</label>
                            <input
                                type="text"
                                name="partnerName"
                                value={formData.partnerName}
                                onChange={handleInputChange}
                                placeholder="e.g., Decathlon"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Voucher Type</label>
                            <input
                                type="text"
                                name="voucherType"
                                value={formData.voucherType}
                                onChange={handleInputChange}
                                placeholder="e.g., RM5 Off"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Point Cost</label>
                            <input
                                type="number"
                                name="pointCost"
                                value={formData.pointCost}
                                onChange={handleInputChange}
                                placeholder="e.g., 100"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe the reward..."
                                rows="3"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">Create Reward</button>
                    </form>
                </div>
            )}

            <div className="rewards-grid">
                {rewards.map(reward => (
                    <div key={reward.id} className={`reward-card ${!reward.active ? 'inactive' : ''}`}>
                        <div className="reward-header">
                            <div>
                                <h3>{reward.partnerName}</h3>
                                <p className="voucher-type">{reward.voucherType}</p>
                            </div>
                            <span className={`status-badge ${reward.active ? 'active' : 'inactive'}`}>
                                {reward.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        <div className="reward-details">
                            <p><strong>Point Cost:</strong> {reward.pointCost} points</p>
                            <p><strong>Description:</strong> {reward.description}</p>
                        </div>

                        <div className="reward-actions">
                            <button
                                onClick={() => toggleRewardStatus(reward.id)}
                                className={reward.active ? 'btn-deactivate' : 'btn-activate'}
                            >
                                {reward.active ? '🚫 Deactivate' : '✅ Activate'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RewardsManagement;

