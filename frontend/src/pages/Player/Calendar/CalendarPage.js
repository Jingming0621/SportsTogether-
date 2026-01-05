import React, { useState } from 'react';

import { games, currentUser, studentClasses } from '../../../data/mockData';
import './CalendarPage.css';

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Request Form State
    const [actionType, setActionType] = useState(null); // 'reschedule' | 'cancel'
    const [reason, setReason] = useState('');
    const [customReason, setCustomReason] = useState('');

    const handleEventClick = (event) => {
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (eventDate >= today) {
            setSelectedEvent(event);
            setShowModal(true);
            setActionType(null); // Reset form
            setReason('');
            setCustomReason('');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
        setActionType(null);
    };

    const handleSendRequest = (e) => {
        e.preventDefault();
        const finalReason = reason === 'Other' ? customReason : reason;

        if (!finalReason) {
            alert('Please provide a reason.');
            return;
        }

        alert(`✅ Request Sent to Instructor!\n\nType: ${actionType === 'reschedule' ? 'Reschedule' : 'Cancellation'}\nReason: ${finalReason}\n\nYour instructor will review this request.`);
        handleCloseModal();
    };

    const rescheduleReasons = [
        "Schedule Conflict",
        "Health Issue",
        "Emergency",
        "Other"
    ];

    const cancelReasons = [
        "No longer interested",
        "Found another class",
        "Health Issue",
        "Other"
    ];

    // Filter games: User is Organizer OR User is in Roster
    const myGames = games.filter(game =>
        game.organizer.id === currentUser.id ||
        game.roster.some(player => player.id === currentUser.id)
    );

    // Combine with class history (if applicable)
    const mySchedule = [
        ...myGames.map(g => ({ ...g, type: 'Game', color: '#3b82f6' })), // Blue for games
        ...studentClasses.map(c => ({ ...c, title: `${c.sport} Class`, type: 'Class', color: '#10b981' })) // Green for classes
    ];

    // Calendar Logic
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Adjust firstDay to make Monday the start of the week (optional, but common)
    // If 0 (Sunday), make it 6. If 1 (Monday), make it 0.
    const startDayOffset = firstDay === 0 ? 6 : firstDay - 1;

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
        setCurrentDate(new Date(newDate));
    };

    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        const [hours, minutes] = timeStr.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const renderCalendarCells = () => {
        const cells = [];

        // Empty cells for previous month
        for (let i = 0; i < startDayOffset; i++) {
            cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
        }

        // Days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            // Find events for this day
            const dayEvents = mySchedule.filter(item => item.date === dateString);

            cells.push(
                <div key={day} className="calendar-cell">
                    <div className="cell-header">
                        <span className="day-number">{day}</span>
                    </div>
                    <div className="cell-content">
                        {dayEvents.map((event, index) => {
                            const eventDate = new Date(event.date);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const isPast = eventDate < today;
                            const eventClass = isPast ? 'calendar-event past' : 'calendar-event future';

                            const rawTime = event.time || event.timeSlot?.split(' - ')[0];
                            const formattedTime = formatTime(rawTime);

                            return (
                                <div
                                    key={index}
                                    className={eventClass}
                                    style={{ backgroundColor: isPast ? '#94a3b8' : event.color }}
                                    title={`${event.title} at ${formattedTime}`}
                                    onClick={() => !isPast && handleEventClick(event)}
                                >
                                    <span className="event-time">{formattedTime}</span>
                                    <span className="event-title">{event.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        return cells;
    };

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button onClick={() => changeMonth(-1)} className="nav-btn">&lt;</button>
                    <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                    <button onClick={() => changeMonth(1)} className="nav-btn">&gt;</button>
                </div>

                <div className="calendar-grid">
                    <div className="weekday-header">Mon</div>
                    <div className="weekday-header">Tue</div>
                    <div className="weekday-header">Wed</div>
                    <div className="weekday-header">Thu</div>
                    <div className="weekday-header">Fri</div>
                    <div className="weekday-header">Sat</div>
                    <div className="weekday-header">Sun</div>

                    {renderCalendarCells()}
                </div>
            </div>

            {/* Event Details Modal */}
            {showModal && selectedEvent && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{selectedEvent.title}</h3>
                            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {selectedEvent.time || selectedEvent.timeSlot}</p>
                            <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                            {selectedEvent.instructor && <p><strong>Instructor:</strong> {selectedEvent.instructor}</p>}
                            <p><strong>Status:</strong> {selectedEvent.status}</p>
                        </div>
                        <div className="modal-actions">
                            {selectedEvent.type === 'Class' ? (
                                !actionType ? (
                                    <>
                                        <button className="btn-reschedule" onClick={() => setActionType('reschedule')}>Reschedule</button>
                                        <button className="btn-cancel-class" onClick={() => setActionType('cancel')}>Cancel Class</button>
                                    </>
                                ) : (
                                    <form className="request-form" onSubmit={handleSendRequest}>
                                        <h4>{actionType === 'reschedule' ? 'Request Reschedule' : 'Request Cancellation'}</h4>

                                        <div className="form-group">
                                            <label>Reason:</label>
                                            <select
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                                                required
                                            >
                                                <option value="">Select a reason</option>
                                                {(actionType === 'reschedule' ? rescheduleReasons : cancelReasons).map(r => (
                                                    <option key={r} value={r}>{r}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {reason === 'Other' && (
                                            <div className="form-group">
                                                <label>Please specify:</label>
                                                <textarea
                                                    value={customReason}
                                                    onChange={(e) => setCustomReason(e.target.value)}
                                                    placeholder="Type your reason here..."
                                                    required
                                                    rows="3"
                                                />
                                            </div>
                                        )}

                                        <div className="form-buttons">
                                            <button type="button" className="btn-back" onClick={() => setActionType(null)}>Back</button>
                                            <button type="submit" className="btn-submit-request">Send Request</button>
                                        </div>
                                    </form>
                                )
                            ) : (
                                <button className="btn-view-details" onClick={() => alert('View Game Details')}>View Game Details</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarPage;
