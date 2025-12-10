import React, { useState } from 'react';
import './VerificationDashboard.css';
import { verificationRequests } from '../../../data/mockData';

const VerificationDashboard = () => {
    const [requests, setRequests] = useState(verificationRequests);
    const [filter, setFilter] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    const filteredRequests = requests.filter(req => {
        if (filter === 'all') return true;
        return req.type.toLowerCase() === filter;
    });

    const handleApprove = (id) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: 'approved' } : req
        ));
        setSelectedRequest(null);
    };

    const handleReject = (id) => {
        if (!rejectionReason.trim()) {
            alert('Please provide a rejection reason');
            return;
        }
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: 'rejected', rejectionReason } : req
        ));
        setSelectedRequest(null);
        setRejectionReason('');
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { text: 'Pending', class: 'badge-pending' },
            approved: { text: 'Approved', class: 'badge-approved' },
            rejected: { text: 'Rejected', class: 'badge-rejected' }
        };
        const badge = badges[status.toLowerCase()] || badges.pending;
        return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
    };

    return (
        <div className="verification-dashboard">
            <div className="dashboard-header">
                <h1>✅ Verification Dashboard</h1>
                <p>Review and approve organizer & instructor applications</p>
            </div>

            <div className="filters">
                <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All ({requests.length})</button>
                <button onClick={() => setFilter('organizer')} className={filter === 'organizer' ? 'active' : ''}>
                    Organizers ({requests.filter(r => r.type.toLowerCase() === 'organizer').length})
                </button>
                <button onClick={() => setFilter('instructor')} className={filter === 'instructor' ? 'active' : ''}>
                    Instructors ({requests.filter(r => r.type.toLowerCase() === 'instructor').length})
                </button>
            </div>

            <div className="requests-grid">
                {filteredRequests.map(request => (
                    <div key={request.id} className={`request-card card-${request.type.toLowerCase()}`}>
                        <div className="request-header">
                            <div>
                                <h3>{request.name}</h3>
                                <p className="request-type">{request.type.toLowerCase() === 'organizer' ? '📋 Organizer' : '👨‍🏫 Instructor'}</p>
                            </div>
                            {getStatusBadge(request.status)}
                        </div>

                        <div className="request-details">
                            <p><strong>Email:</strong> {request.email}</p>
                            <p><strong>Submitted:</strong> {request.submittedDate}</p>
                            {request.type === 'instructor' && (
                                <>
                                    <p><strong>Sports:</strong> {request.sports.join(', ')}</p>
                                    <p><strong>Experience:</strong> {request.experience} years</p>
                                </>
                            )}
                        </div>

                        <div className="request-documents">
                            <strong>Documents:</strong>
                            <ul>
                                {request.documents.map((doc, idx) => (
                                    <li key={idx}>{doc}</li>
                                ))}
                            </ul>
                        </div>

                        {request.status === 'pending' && (
                            <div className="request-actions">
                                <button onClick={() => setSelectedRequest(request)} className="btn-review">Review</button>
                            </div>
                        )}

                        {request.status === 'rejected' && request.rejectionReason && (
                            <div className="rejection-reason">
                                <strong>Rejection Reason:</strong> {request.rejectionReason}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedRequest && (
                <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Review Application</h2>
                        <div className="modal-details">
                            <p><strong>Name:</strong> {selectedRequest.name}</p>
                            <p><strong>Type:</strong> {selectedRequest.type}</p>
                            <p><strong>Email:</strong> {selectedRequest.email}</p>
                        </div>

                        <div className="modal-actions">
                            <button onClick={() => handleApprove(selectedRequest.id)} className="btn-approve">
                                ✅ Approve
                            </button>
                            <div className="reject-section">
                                <input
                                    type="text"
                                    placeholder="Rejection reason (required)"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                />
                                <button onClick={() => handleReject(selectedRequest.id)} className="btn-reject">
                                    ❌ Reject
                                </button>
                            </div>
                            <button onClick={() => setSelectedRequest(null)} className="btn-cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerificationDashboard;

