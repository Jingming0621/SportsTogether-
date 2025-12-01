import React, { useState } from 'react';
import { instructorProfile, sportTypes } from '../../data/mockData';
import './InstructorProfile.css';

const InstructorProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(instructorProfile);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSportToggle = (sport) => {
        const newSports = profile.sportsOffered.includes(sport)
            ? profile.sportsOffered.filter(s => s !== sport)
            : [...profile.sportsOffered, sport];
        setProfile(prev => ({ ...prev, sportsOffered: newSports }));
    };

    const handleSave = () => {
        if (profile.hourlyRate < 20) {
            alert('❌ Validation Error\n\nHourly rate cannot be below the platform minimum of RM 20.\n\n(This is a prototype UI)');
            return;
        }
        alert('✅ Profile Updated!\n\nYour changes have been saved and are now visible in the marketplace.\n\n(This is a prototype UI)');
        setIsEditing(false);
    };

    const handleAddCertification = () => {
        alert('📄 Add Certification\n\nUpload feature would allow you to add new certifications.\n\n(This is a prototype UI)');
    };

    return (
        <div className="instructor-profile-page">
            <div className="instructor-profile-container">
                <div className="profile-header">
                    <div className="profile-header-content">
                        <img src={profile.profilePicture} alt={profile.name} className="profile-avatar-large" />
                        <div className="profile-header-info">
                            <div className="profile-name-section">
                                <h1>{profile.name}</h1>
                                {profile.verified && <span className="verified-badge-large">✓ Verified Instructor</span>}
                            </div>
                            <div className="profile-stats-row">
                                <div className="stat-item">
                                    <span className="stat-icon">⭐</span>
                                    <span className="stat-value">{profile.rating}</span>
                                    <span className="stat-label">Rating</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">📚</span>
                                    <span className="stat-value">{profile.totalSessions}</span>
                                    <span className="stat-label">Sessions</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">💰</span>
                                    <span className="stat-value">RM {profile.totalEarnings.toFixed(2)}</span>
                                    <span className="stat-label">Earned</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-icon">🏆</span>
                                    <span className="stat-value">{profile.instructorLevel}</span>
                                    <span className="stat-label">Level</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!isEditing && (
                        <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="profile-content">
                    {/* Bio Section */}
                    <div className="profile-section">
                        <h2>About Me</h2>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleInputChange}
                                rows="4"
                                className="profile-input"
                            />
                        ) : (
                            <p className="profile-bio">{profile.bio}</p>
                        )}
                    </div>

                    {/* Experience & Rate */}
                    <div className="profile-section">
                        <h2>Professional Details</h2>
                        <div className="details-grid">
                            <div className="detail-item">
                                <label>Years of Experience</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        name="yearsExperience"
                                        value={profile.yearsExperience}
                                        onChange={handleInputChange}
                                        className="profile-input"
                                    />
                                ) : (
                                    <span className="detail-value">{profile.yearsExperience} years</span>
                                )}
                            </div>
                            <div className="detail-item">
                                <label>Hourly Rate</label>
                                {isEditing ? (
                                    <div className="rate-input-group">
                                        <span className="currency">RM</span>
                                        <input
                                            type="number"
                                            name="hourlyRate"
                                            value={profile.hourlyRate}
                                            onChange={handleInputChange}
                                            min="20"
                                            step="5"
                                            className="profile-input"
                                        />
                                    </div>
                                ) : (
                                    <span className="detail-value">RM {profile.hourlyRate}/hour</span>
                                )}
                                {isEditing && <small className="input-hint">Minimum: RM 20/hour</small>}
                            </div>
                        </div>
                    </div>

                    {/* Sports Offered */}
                    <div className="profile-section">
                        <h2>Sports I Teach</h2>
                        {isEditing ? (
                            <div className="sports-selection-grid">
                                {sportTypes.map(sport => (
                                    <button
                                        key={sport}
                                        className={`sport-chip ${profile.sportsOffered.includes(sport) ? 'selected' : ''}`}
                                        onClick={() => handleSportToggle(sport)}
                                    >
                                        {sport}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="sports-display">
                                {profile.sportsOffered.map(sport => (
                                    <span key={sport} className="sport-badge">{sport}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Certifications */}
                    <div className="profile-section">
                        <div className="section-header">
                            <h2>Certifications & Qualifications</h2>
                            {isEditing && (
                                <button className="add-cert-btn" onClick={handleAddCertification}>
                                    + Add
                                </button>
                            )}
                        </div>
                        <div className="certifications-list">
                            {profile.certifications.map((cert, idx) => (
                                <div key={idx} className="cert-card">
                                    <div className="cert-icon">📜</div>
                                    <div className="cert-details">
                                        <strong>{cert.name}</strong>
                                        <p>{cert.issuer} • {cert.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="profile-actions">
                            <button className="save-btn" onClick={handleSave}>Save Changes</button>
                            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorProfile;
