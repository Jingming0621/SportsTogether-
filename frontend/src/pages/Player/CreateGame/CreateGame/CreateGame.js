import React, { useState } from 'react';
import { currentUser, sportTypes } from '../../data/mockData';
import './CreateGame.css';

const CreateGame = ({ onBack }) => {
    const [formData, setFormData] = useState({
        sportType: '',
        title: '',
        date: '',
        time: '',
        venue: '',
        venueAddress: '',
        cost: '',
        maxPlayers: '',
        description: '',
        requirements: ''
    });

    const [venueProof, setVenueProof] = useState(null);
    const needsVerification = currentUser.trustLevel === 'New';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVenueProof(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.sportType || !formData.title || !formData.date || !formData.time || !formData.venue || !formData.cost || !formData.maxPlayers) {
            alert('Please fill in all required fields');
            return;
        }

        if (needsVerification && !venueProof) {
            alert('As a new user, please upload venue booking proof for verification');
            return;
        }

        const message = needsVerification
            ? '🎉 Game Created!\n\nStatus: Pending Admin Verification\n\nYour game will be published once an admin verifies your venue booking proof. You will be notified via email.\n\n(This is a prototype UI)'
            : '🎉 Game Created Successfully!\n\nYour game is now live and visible to the community!\n\n(This is a prototype UI)';

        alert(message);
        onBack();
    };

    return (
        <div className="create-game-page">
            <div className="create-game-container">
                <div className="page-header">
                    <button className="back-btn" onClick={onBack}>← Back</button>
                    <h1>Create a New Game</h1>
                    <p className="subtitle">Organize a game and invite the community to join</p>
                </div>

                {/* Trust Level Banner */}
                <div className={`trust-banner ${currentUser.trustLevel.toLowerCase()}`}>
                    <div className="trust-info">
                        <span className="trust-icon">
                            {currentUser.trustLevel === 'Verified' && '✓'}
                            {currentUser.trustLevel === 'Trusted' && '⭐'}
                            {currentUser.trustLevel === 'New' && 'ℹ️'}
                        </span>
                        <div>
                            <strong>Your Trust Level: {currentUser.trustLevel}</strong>
                            {needsVerification && (
                                <p>As a new user, your game will require admin verification before being published.</p>
                            )}
                            {!needsVerification && (
                                <p>Your game will be published immediately!</p>
                            )}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="create-game-form">
                    {/* Basic Information */}
                    <div className="form-section">
                        <h2>Basic Information</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Sport Type *</label>
                                <select
                                    name="sportType"
                                    value={formData.sportType}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a sport</option>
                                    {sportTypes.map(sport => (
                                        <option key={sport} value={sport}>{sport}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Game Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Friday Night Basketball"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Time *</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Venue Information */}
                    <div className="form-section">
                        <h2>Venue Information</h2>

                        <div className="form-group">
                            <label>Venue Name *</label>
                            <input
                                type="text"
                                name="venue"
                                value={formData.venue}
                                onChange={handleInputChange}
                                placeholder="e.g., USM Sports Complex"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Venue Address *</label>
                            <input
                                type="text"
                                name="venueAddress"
                                value={formData.venueAddress}
                                onChange={handleInputChange}
                                placeholder="Full address"
                                required
                            />
                        </div>

                        {needsVerification && (
                            <div className="form-group venue-proof">
                                <label>Venue Booking Proof * <span className="required-badge">Required for new users</span></label>
                                <div className="file-upload-area">
                                    <input
                                        type="file"
                                        id="venue-proof"
                                        accept="image/*,.pdf"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="venue-proof" className="file-upload-btn">
                                        📎 Upload Booking Screenshot/PDF
                                    </label>
                                    {venueProof && (
                                        <div className="file-selected">
                                            ✓ {venueProof}
                                        </div>
                                    )}
                                </div>
                                <small>Upload proof of venue booking (screenshot or confirmation email)</small>
                            </div>
                        )}
                    </div>

                    {/* Game Details */}
                    <div className="form-section">
                        <h2>Game Details</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Cost per Player (RM) *</label>
                                <input
                                    type="number"
                                    name="cost"
                                    value={formData.cost}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Max Players *</label>
                                <input
                                    type="number"
                                    name="maxPlayers"
                                    value={formData.maxPlayers}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 10"
                                    min="2"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your game, skill level, what to expect..."
                                rows="4"
                            />
                        </div>

                        <div className="form-group">
                            <label>Requirements</label>
                            <input
                                type="text"
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleInputChange}
                                placeholder="e.g., Bring your own equipment, water bottle"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    {formData.sportType && formData.title && (
                        <div className="game-preview">
                            <h3>Preview</h3>
                            <div className="preview-card">
                                <div className="preview-header">
                                    <span className="sport-badge-preview">{formData.sportType}</span>
                                    <span className={`status-badge ${needsVerification ? 'pending' : 'open'}`}>
                                        {needsVerification ? 'Pending Review' : 'Open'}
                                    </span>
                                </div>
                                <h3>{formData.title || 'Game Title'}</h3>
                                <div className="preview-details">
                                    <div>📅 {formData.date ? new Date(formData.date).toLocaleDateString() : 'Date'}</div>
                                    <div>🕐 {formData.time || 'Time'}</div>
                                    <div>📍 {formData.venue || 'Venue'}</div>
                                    {formData.cost && <div>💰 RM {formData.cost} per player</div>}
                                    {formData.maxPlayers && <div>👥 Max {formData.maxPlayers} players</div>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            {needsVerification ? '📤 Submit for Review' : '🎮 Create Game'}
                        </button>
                        <button type="button" className="cancel-btn" onClick={onBack}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGame;
