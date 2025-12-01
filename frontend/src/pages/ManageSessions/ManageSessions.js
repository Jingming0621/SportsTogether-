import React, { useState } from 'react';
import { coachingSessions } from '../../data/mockData';
import './ManageSessions.css';

const ManageSessions = () => {
    const [sessions, setSessions] = useState(coachingSessions);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        timeSlot: '',
        sessionType: 'Private Lesson',
        sport: '',
        price: '',
        maxParticipants: 1,
        venue: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreate = (e) => {
        e.preventDefault();
        alert(`✅ Session Created!\n\nDate: ${formData.date}\nTime: ${formData.timeSlot}\nType: ${formData.sessionType}\nPrice: RM ${formData.price}\n\nYour session is now published in the marketplace!\n\n(This is a prototype UI)`);
        setShowCreateForm(false);
        setFormData({
            date: '',
            timeSlot: '',
            sessionType: 'Private Lesson',
            sport: '',
            price: '',
            maxParticipants: 1,
            venue: ''
        });
    };

    const handleAcceptBooking = (sessionId) => {
        alert('✅ Booking Accepted!\n\nThe session has been confirmed and added to your calendar.\nThe player has been notified.\n\n(This is a prototype UI)');
    };

    const handleDeclineBooking = (sessionId) => {
        alert('❌ Booking Declined\n\nThe slot has been released back to the marketplace.\n\n(This is a prototype UI)');
    };

    const handleCancelSession = (sessionId) => {
        if (window.confirm('Are you sure you want to cancel this session?\n\nRegistered players will be refunded automatically.')) {
            alert('🔄 Session Cancelled\n\nRefunds have been initiated.\nPlayers have been notified via email.\n\n(This is a prototype UI)');
        }
    };

    return (
        <div className="manage-sessions-page">
            <div className="sessions-container">
                <div className="sessions-header">
                    <div>
                        <h1>Manage Coaching Sessions</h1>
                        <p className="subtitle">Create and manage your coaching schedule</p>
                    </div>
                    <button className="create-session-btn" onClick={() => setShowCreateForm(true)}>
                        + Create Session
                    </button>
                </div>

                {/* Create Session Modal */}
                {showCreateForm && (
                    <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
                        <div className="create-session-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Create New Session</h2>
                                <button className="close-btn" onClick={() => setShowCreateForm(false)}>✕</button>
                            </div>
                            <form onSubmit={handleCreate} className="session-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date *</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Time Slot *</label>
                                        <input
                                            type="text"
                                            name="timeSlot"
                                            value={formData.timeSlot}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 10:00 AM - 12:00 PM"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Session Type *</label>
                                        <select
                                            name="sessionType"
                                            value={formData.sessionType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="Private Lesson">Private Lesson</option>
                                            <option value="Group Class">Group Class</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Sport *</label>
                                        <select
                                            name="sport"
                                            value={formData.sport}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select sport</option>
                                            <option value="Tennis">Tennis</option>
                                            <option value="Badminton">Badminton</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Price (RM) *</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            min="20"
                                            step="10"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Max Participants *</label>
                                        <input
                                            type="number"
                                            name="maxParticipants"
                                            value={formData.maxParticipants}
                                            onChange={handleInputChange}
                                            min="1"
                                            max="10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Venue *</label>
                                    <input
                                        type="text"
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Penang Tennis Centre"
                                        required
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">Create Session</button>
                                    <button type="button" className="cancel-btn" onClick={() => setShowCreateForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Sessions List */}
                <div className="sessions-tabs">
                    <button className="tab-btn active">Upcoming</button>
                    <button className="tab-btn">All Sessions</button>
                </div>

                <div className="sessions-grid">
                    {sessions.map(session => (
                        <div key={session.id} className={`session-card ${session.status.toLowerCase()}`}>
                            <div className="session-header-row">
                                <div className="session-date-block">
                                    <div className="date">{new Date(session.date).getDate()}</div>
                                    <div className="month">{new Date(session.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                                </div>
                                <div className="session-info">
                                    <h3>{session.sport} - {session.sessionType}</h3>
                                    <p className="session-time">⏰ {session.timeSlot}</p>
                                    <p className="session-venue">📍 {session.venue}</p>
                                </div>
                                <div className={`status-badge ${session.status.toLowerCase()}`}>
                                    {session.status}
                                </div>
                            </div>

                            <div className="session-details-row">
                                <div className="participants-info">
                                    <strong>Participants: </strong>
                                    <span>{session.currentParticipants}/{session.maxParticipants}</span>
                                </div>
                                <div className="price-info">
                                    <strong>RM {session.price.toFixed(2)}</strong>
                                </div>
                            </div>

                            {session.participants.length > 0 && (
                                <div className="participants-list">
                                    {session.participants.map((participant, idx) => (
                                        <div key={idx} className="participant-item">
                                            <img src={participant.profilePicture} alt={participant.name} />
                                            <span>{participant.name}</span>
                                            {participant.requestStatus === 'Pending' && (
                                                <span className="pending-tag">Pending Approval</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="session-actions">
                                {session.status === 'Pending' && (
                                    <>
                                        <button className="accept-btn" onClick={() => handleAcceptBooking(session.id)}>
                                            ✓ Accept
                                        </button>
                                        <button className="decline-btn" onClick={() => handleDeclineBooking(session.id)}>
                                            ✕ Decline
                                        </button>
                                    </>
                                )}
                                {session.status === 'Confirmed' && (
                                    <button className="cancel-btn-session" onClick={() => handleCancelSession(session.id)}>
                                        Cancel Session
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageSessions;
