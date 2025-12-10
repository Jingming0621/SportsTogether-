import React, { useState } from 'react';
import { instructors } from '../../../data/mockData';
import PaymentModal from '../../../components/PaymentModal/PaymentModal';
import './Instructors.css';

const Instructors = () => {
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleBooking = () => {
        if (!selectedSlot) {
            alert('Please select a time slot');
            return;
        }
        setShowPaymentModal(true);
    };

    const handlePaymentSuccess = () => {
        alert(`🎉 Session Booked!\n\nInstructor: ${selectedInstructor.name}\nDate: ${selectedSlot.date}\nTime: ${selectedSlot.time}\n\nA confirmation has been sent to both you and the instructor.\n\n(This is a prototype UI)`);
        setShowPaymentModal(false);
        setSelectedInstructor(null);
        setSelectedSlot(null);
    };

    return (
        <div className="instructors-page">
            <div className="instructors-container">
                <h1>Instructor Marketplace</h1>
                <p className="subtitle">Book verified instructors for personalized training</p>

                {!selectedInstructor ? (
                    <div className="instructors-grid">
                        {instructors.map(instructor => (
                            <div key={instructor.id} className="instructor-card">
                                <div className="instructor-header-card">
                                    <img src={instructor.avatar} alt={instructor.name} className="instructor-avatar" />
                                    {instructor.verified && (
                                        <div className="verified-badge">✓ Verified</div>
                                    )}
                                </div>

                                <h3>{instructor.name}</h3>

                                <div className="instructor-sports">
                                    {instructor.sports.map(sport => (
                                        <span key={sport} className="sport-tag">{sport}</span>
                                    ))}
                                </div>

                                <div className="instructor-rating">
                                    <span className="stars">⭐ {instructor.rating}</span>
                                    <span className="reviews">({instructor.reviewCount} reviews)</span>
                                </div>

                                <p className="instructor-bio">{instructor.bio}</p>

                                <div className="certifications">
                                    <strong>Certifications:</strong>
                                    <ul>
                                        {instructor.certifications.map((cert, idx) => (
                                            <li key={idx}>{cert}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="instructor-footer">
                                    <div className="instructor-rate">
                                        <span className="rate-amount">RM {instructor.hourlyRate}</span>
                                        <span className="rate-period">/hour</span>
                                    </div>
                                    <button
                                        className="book-btn"
                                        onClick={() => setSelectedInstructor(instructor)}
                                    >
                                        View Availability
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="booking-view">
                        <button className="back-btn" onClick={() => {
                            setSelectedInstructor(null);
                            setSelectedSlot(null);
                        }}>
                            ← Back to Instructors
                        </button>

                        <div className="booking-container">
                            <div className="booking-instructor-info">
                                <img src={selectedInstructor.avatar} alt={selectedInstructor.name} />
                                <div>
                                    <h2>{selectedInstructor.name}</h2>
                                    <div className="instructor-rating">
                                        <span className="stars">⭐ {selectedInstructor.rating}</span>
                                        <span className="reviews">({selectedInstructor.reviewCount} reviews)</span>
                                    </div>
                                    <div className="booking-price">RM {selectedInstructor.hourlyRate}/hour</div>
                                </div>
                            </div>

                            <div className="available-slots">
                                <h3>Select a Time Slot</h3>
                                <div className="slots-grid">
                                    {selectedInstructor.availableSlots.map((slot, idx) => (
                                        <button
                                            key={idx}
                                            className={`slot-card ${selectedSlot === slot ? 'selected' : ''}`}
                                            onClick={() => setSelectedSlot(slot)}
                                        >
                                            <div className="slot-date">{new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                                            <div className="slot-time">{slot.time}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="confirm-booking-btn"
                                onClick={handleBooking}
                                disabled={!selectedSlot}
                            >
                                Book Session (RM {selectedInstructor.hourlyRate})
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showPaymentModal && (
                <PaymentModal
                    amount={selectedInstructor.hourlyRate}
                    title={`${selectedInstructor.name} - Coaching Session`}
                    onClose={() => setShowPaymentModal(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};

export default Instructors;

