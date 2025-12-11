import React, { useState } from 'react';
import { currentUser, sportTypes, games } from '../../../data/mockData';
import './Profile.css';

const Profile = () => {
    // Calculate stats dynamically
    const today = new Date();
    const myGames = games.filter(game => {
        const gameDate = new Date(game.date);
        const isUserInGame = game.roster.some(player => player.id === currentUser.id);
        const isPast = gameDate < today;
        return isUserInGame && isPast;
    });

    const gamesPlayed = myGames.length;
    const pointsEarned = myGames.reduce((acc, game) => {
        let points = 50;
        if (game.organizer && game.organizer.id === currentUser.id) {
            points = 100;
        }
        return acc + points;
    }, 0);

    // Calculate favorite sport (most played)
    const sportCounts = myGames.reduce((acc, game) => {
        acc[game.sportType] = (acc[game.sportType] || 0) + 1;
        return acc;
    }, {});

    const sortedSports = Object.entries(sportCounts).sort(([, a], [, b]) => b - a);
    const favoriteSport = sortedSports.length > 0 ? sortedSports[0][0] : 'None';

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: currentUser.username,
        bio: currentUser.bio,
        favoriteSports: currentUser.favoriteSports
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSportToggle = (sport) => {
        setFormData(prev => ({
            ...prev,
            favoriteSports: prev.favoriteSports.includes(sport)
                ? prev.favoriteSports.filter(s => s !== sport)
                : [...prev.favoriteSports, sport]
        }));
    };

    const handleSave = () => {
        alert('Profile updated successfully! ✓\n\nNote: This is a prototype - changes are not persisted.');
        setIsEditing(false);
    };

    const handleFileUpload = () => {
        alert('File upload functionality - This is a prototype UI');
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Header Section */}
                <div className="profile-header">
                    <div className="profile-avatar-section">
                        <img
                            src={currentUser.profilePicture}
                            alt={currentUser.username}
                            className="profile-avatar-large"
                        />
                        <button className="change-photo-btn" onClick={handleFileUpload}>
                            📷 Change Photo
                        </button>
                        <span className="file-hint">JPG/PNG only</span>
                    </div>

                    <div className="profile-info">
                        <div className="profile-title">
                            <h1>{currentUser.username}</h1>
                            <span className={`trust-badge ${currentUser.trustLevel.toLowerCase()}`}>
                                {currentUser.trustLevel === 'Verified' && '✓ '}
                                {currentUser.trustLevel}
                            </span>
                        </div>
                        <p className="member-since">Member since {new Date(currentUser.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

                        {/* Stats */}
                        <div className="profile-stats">
                            <div className="stat-item">
                                <span className="stat-number">{gamesPlayed}</span>
                                <span className="stat-label">Games Played</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{pointsEarned}</span>
                                <span className="stat-label">Points Earned</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{favoriteSport}</span>
                                <span className="stat-label">Favorite Sport</span>
                            </div>
                        </div>
                    </div>

                    {!isEditing && (
                        <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                            ✏️ Edit Profile
                        </button>
                    )}
                </div>

                {/* Editable Section */}
                <div className="profile-details">
                    <div className="detail-section">
                        <h2>About Me</h2>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="bio-input"
                                rows="4"
                                maxLength="200"
                            />
                        ) : (
                            <p className="bio-text">{currentUser.bio}</p>
                        )}
                    </div>

                    <div className="detail-section">
                        <h2>Favorite Sports</h2>
                        {isEditing ? (
                            <div className="sports-grid">
                                {sportTypes.slice(0, 12).map(sport => (
                                    <button
                                        key={sport}
                                        className={`sport-tag ${formData.favoriteSports.includes(sport) ? 'selected' : ''}`}
                                        onClick={() => handleSportToggle(sport)}
                                    >
                                        {sport}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="sports-list">
                                {currentUser.favoriteSports.map(sport => (
                                    <span key={sport} className="sport-badge">{sport}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="detail-section">
                        <h2>Contact Information</h2>
                        <div className="contact-info">
                            <div className="info-row">
                                <span className="info-label">Email:</span>
                                <span className="info-value">{currentUser.email}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Role:</span>
                                <span className="info-value">{currentUser.role}</span>
                            </div>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="profile-actions">
                            <button className="btn-save" onClick={handleSave}>
                                💾 Save Changes
                            </button>
                            <button className="btn-cancel" onClick={() => {
                                setFormData({
                                    username: currentUser.username,
                                    bio: currentUser.bio,
                                    favoriteSports: currentUser.favoriteSports
                                });
                                setIsEditing(false);
                            }}>
                                ✖ Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
