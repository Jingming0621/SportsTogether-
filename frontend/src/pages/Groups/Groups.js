import React, { useState } from 'react';
import { groups, sportTypes } from '../../data/mockData';
import './Groups.css';

const Groups = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        sportInterest: '',
        description: '',
        visibility: 'Public'
    });

    const myGroups = groups.filter(g => g.joined);
    const discoverGroups = groups.filter(g => !g.joined);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateGroup = (e) => {
        e.preventDefault();
        alert(`🎉 Group Created!\n\nName: ${formData.name}\nSport: ${formData.sportInterest}\nVisibility: ${formData.visibility}\n\nYou are now the admin of this group!\n\n(This is a prototype UI)`);
        setShowCreateForm(false);
        setFormData({ name: '', sportInterest: '', description: '', visibility: 'Public' });
    };

    const handleJoinGroup = (groupName) => {
        alert(`Joined "${groupName}"!\n\n(This is a prototype UI)`);
    };

    const handleLeaveGroup = (groupName) => {
        if (window.confirm(`Are you sure you want to leave "${groupName}"?`)) {
            alert(`Left "${groupName}"\n\n(This is a prototype UI)`);
        }
    };

    return (
        <div className="groups-page">
            <div className="groups-container">
                <div className="groups-header">
                    <div>
                        <h1>Groups</h1>
                        <p className="subtitle">Connect with people who share your sports interests</p>
                    </div>
                    <button className="create-group-btn" onClick={() => setShowCreateForm(true)}>
                        ➕ Create Group
                    </button>
                </div>

                {/* Create Group Modal */}
                {showCreateForm && (
                    <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
                        <div className="create-group-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Create a New Group</h2>
                                <button className="close-btn" onClick={() => setShowCreateForm(false)}>✕</button>
                            </div>
                            <form onSubmit={handleCreateGroup} className="create-form">
                                <div className="form-group">
                                    <label>Group Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Penang Basketball League"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Sport Interest *</label>
                                    <select
                                        name="sportInterest"
                                        value={formData.sportInterest}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select a sport</option>
                                        {sportTypes.map(sport => (
                                            <option key={sport} value={sport}>{sport}</option>
                                        ))}
                                        <option value="Multiple Sports">Multiple Sports</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe your group's purpose and activities..."
                                        rows="3"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Visibility</label>
                                    <div className="visibility-options">
                                        <label className={`visibility-option ${formData.visibility === 'Public' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="visibility"
                                                value="Public"
                                                checked={formData.visibility === 'Public'}
                                                onChange={handleInputChange}
                                            />
                                            <div>
                                                <strong>🌐 Public</strong>
                                                <span>Anyone can find and join</span>
                                            </div>
                                        </label>
                                        <label className={`visibility-option ${formData.visibility === 'Private' ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name="visibility"
                                                value="Private"
                                                checked={formData.visibility === 'Private'}
                                                onChange={handleInputChange}
                                            />
                                            <div>
                                                <strong>🔒 Private</strong>
                                                <span>Invite-only group</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">Create Group</button>
                                    <button type="button" className="cancel-btn" onClick={() => setShowCreateForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* My Groups */}
                <div className="groups-section">
                    <h2>My Groups ({myGroups.length})</h2>
                    <div className="groups-grid">
                        {myGroups.map(group => (
                            <div key={group.id} className="group-card">
                                {group.image && (
                                    <div className="group-image" style={{ backgroundImage: `url(${group.image})` }} />
                                )}
                                <div className="group-content">
                                    <div className="group-header-card">
                                        <h3>{group.name}</h3>
                                        <span className={`visibility-badge ${group.visibility.toLowerCase()}`}>
                                            {group.visibility}
                                        </span>
                                    </div>
                                    <p className="group-sport">{group.sportInterest}</p>
                                    <p className="group-description">{group.description}</p>

                                    <div className="group-meta">
                                        <div className="group-members">
                                            <div className="member-avatars">
                                                {group.memberAvatars.slice(0, 3).map((avatar, idx) => (
                                                    <img key={idx} src={avatar} alt="Member" />
                                                ))}
                                            </div>
                                            <span>{group.members} members</span>
                                        </div>
                                    </div>

                                    <div className="group-actions">
                                        <button className="view-btn">View Group</button>
                                        <button className="leave-btn" onClick={() => handleLeaveGroup(group.name)}>Leave</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Discover Groups */}
                <div className="groups-section">
                    <h2>Discover Groups</h2>
                    <div className="groups-grid">
                        {discoverGroups.map(group => (
                            <div key={group.id} className="group-card">
                                {group.image && (
                                    <div className="group-image" style={{ backgroundImage: `url(${group.image})` }} />
                                )}
                                <div className="group-content">
                                    <div className="group-header-card">
                                        <h3>{group.name}</h3>
                                        <span className={`visibility-badge ${group.visibility.toLowerCase()}`}>
                                            {group.visibility}
                                        </span>
                                    </div>
                                    <p className="group-sport">{group.sportInterest}</p>
                                    <p className="group-description">{group.description}</p>

                                    <div className="group-meta">
                                        <div className="group-members">
                                            <div className="member-avatars">
                                                {group.memberAvatars.slice(0, 3).map((avatar, idx) => (
                                                    <img key={idx} src={avatar} alt="Member" />
                                                ))}
                                            </div>
                                            <span>{group.members} members</span>
                                        </div>
                                    </div>

                                    <button className="join-btn" onClick={() => handleJoinGroup(group.name)}>
                                        {group.visibility === 'Private' ? 'Request to Join' : 'Join Group'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Groups;
