import React, { useState } from 'react';
import './DisputeResolution.css';
import { disputeCases } from '../../../data/mockData';

const DisputeResolution = () => {
    const [cases, setCases] = useState(disputeCases);
    const [selectedCase, setSelectedCase] = useState(null);
    const [action, setAction] = useState('');

    const handleResolve = (id, resolution) => {
        setCases(cases.map(c =>
            c.id === id ? { ...c, status: 'resolved', resolution } : c
        ));
        setSelectedCase(null);
        setAction('');
    };

    const getStatusBadge = (status) => {
        const badges = {
            open: { text: 'Open', class: 'badge-open' },
            investigating: { text: 'Investigating', class: 'badge-investigating' },
            resolved: { text: 'Resolved', class: 'badge-resolved' }
        };
        const badge = badges[status.toLowerCase()] || badges.open;
        return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
    };

    const getSeverityBadge = (severity) => {
        const badges = {
            low: { text: 'Low', class: 'severity-low' },
            medium: { text: 'Medium', class: 'severity-medium' },
            high: { text: 'High', class: 'severity-high' }
        };
        const badge = badges[(severity || 'low').toLowerCase()] || badges.low;
        return <span className={`severity-badge ${badge.class}`}>{badge.text}</span>;
    };

    return (
        <div className="dispute-resolution">
            <div className="page-header">
                <h1>⚖️ Dispute Resolution Center</h1>
                <p>Manage user disputes and issue reports</p>
            </div>

            <div className="cases-grid">
                {cases.map(caseItem => (
                    <div key={caseItem.id} className="case-card">
                        <div className="case-header">
                            <div>
                                <h3>Case #{caseItem.id}</h3>
                                <p className="case-type">{caseItem.type}</p>
                            </div>
                            <div className="badges">
                                {getStatusBadge(caseItem.status)}
                                {getSeverityBadge(caseItem.severity)}
                            </div>
                        </div>

                        <div className="case-details">
                            <p><strong>Reporter:</strong> {caseItem.reporter}</p>
                            <p><strong>Reported User:</strong> {caseItem.reportedUser}</p>
                            <p><strong>Date:</strong> {caseItem.reportDate}</p>
                            <p><strong>Description:</strong> {caseItem.description}</p>
                        </div>

                        {caseItem.transactionAmount && (
                            <div className="transaction-info">
                                <strong>Transaction Amount:</strong> RM {caseItem.transactionAmount}
                            </div>
                        )}

                        {caseItem.status === 'open' && (
                            <div className="case-actions">
                                <button onClick={() => setSelectedCase(caseItem)} className="btn-investigate">
                                    Investigate
                                </button>
                            </div>
                        )}

                        {caseItem.status === 'resolved' && (
                            <div className="resolution-info">
                                <strong>Resolution:</strong> {caseItem.resolution}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedCase && (
                <div className="modal-overlay" onClick={() => setSelectedCase(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Resolve Case #{selectedCase.id}</h2>
                        <div className="modal-details">
                            <p><strong>Type:</strong> {selectedCase.type}</p>
                            <p><strong>Reporter:</strong> {selectedCase.reporter}</p>
                            <p><strong>Reported User:</strong> {selectedCase.reportedUser}</p>
                            <p><strong>Description:</strong> {selectedCase.description}</p>
                        </div>

                        <div className="action-selector">
                            <label>Select Action:</label>
                            <select value={action} onChange={(e) => setAction(e.target.value)}>
                                <option value="">Choose an action...</option>
                                <option value="warning">Issue Warning</option>
                                <option value="ban">Ban User</option>
                                {selectedCase.transactionAmount && (
                                    <option value="refund">Issue Refund (RM {selectedCase.transactionAmount})</option>
                                )}
                                <option value="dismiss">Dismiss Report</option>
                            </select>
                        </div>

                        <div className="modal-actions">
                            <button
                                onClick={() => handleResolve(selectedCase.id, action)}
                                className="btn-confirm"
                                disabled={!action}
                            >
                                Confirm Resolution
                            </button>
                            <button onClick={() => setSelectedCase(null)} className="btn-cancel">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisputeResolution;

