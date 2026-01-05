import React, { useState } from 'react';
import { transactions, issueCategories } from '../../../data/mockData';
import './ReportIssue.css';

const ReportIssue = ({ onBack }) => {
    const [formData, setFormData] = useState({
        transactionId: '',
        reason: '',
        details: '',
        evidence: null
    });

    const reportableTransactions = transactions.filter(t => t.canReport);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, evidence: file.name }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.transactionId || !formData.reason || !formData.details) {
            alert('Please fill in all required fields');
            return;
        }

        alert(`🛡️ Report Submitted\n\nTransaction: ${transactions.find(t => t.id == formData.transactionId)?.title}\nReason: ${formData.reason}\n\nYour report has been submitted to our admin team.\nAssociated funds have been frozen in escrow.\nTicket ID: #${Math.floor(Math.random() * 10000)}\n\nYou will be notified of the resolution via email.\n\n(This is a prototype UI)`);
        onBack();
    };

    return (
        <div className="report-issue-page">
            <div className="report-container">
                <button className="back-btn" onClick={onBack}>← Back</button>

                <div className="report-header">
                    <h1>🛡️ Report an Issue</h1>
                    <p className="subtitle">Help us maintain a safe and fair community</p>
                </div>

                <form onSubmit={handleSubmit} className="report-form">
                    <div className="safety-window-banner">
                        <strong>⏰ Safety Window: 24 Hours</strong>
                        <p>You can report issues within 24 hours after a game or session is completed.</p>
                    </div>

                    <div className="form-section">
                        <h2>Select Transaction</h2>
                        <div className="form-group">
                            <label>Transaction/Game *</label>
                            <select
                                name="transactionId"
                                value={formData.transactionId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a transaction from your history</option>
                                {reportableTransactions.map(transaction => (
                                    <option key={transaction.id} value={transaction.id}>
                                        {transaction.title} - {new Date(transaction.date).toLocaleDateString()} (RM {transaction.amount})
                                    </option>
                                ))}
                            </select>
                            {reportableTransactions.length === 0 && (
                                <p className="no-transactions">No reportable transactions in the safety window</p>
                            )}
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Issue Details</h2>

                        <div className="form-group">
                            <label>Reason for Report *</label>
                            <select
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a reason</option>
                                {issueCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Detailed Description *</label>
                            <textarea
                                name="details"
                                value={formData.details}
                                onChange={handleInputChange}
                                placeholder="Please provide as much detail as possible about the issue..."
                                rows="5"
                                required
                            />
                            <small>Minimum 50 characters</small>
                        </div>

                        <div className="form-group">
                            <label>Evidence (Optional)</label>
                            <div className="file-upload-area">
                                <input
                                    type="file"
                                    id="evidence"
                                    accept="image/*,.pdf"
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="evidence" className="upload-btn">
                                    📎 Upload Evidence (Screenshots, Photos, etc.)
                                </label>
                                {formData.evidence && (
                                    <div className="file-selected">✓ {formData.evidence}</div>
                                )}
                            </div>
                            <small>Supported formats: JPG, PNG, PDF</small>
                        </div>
                    </div>

                    <div className="what-happens-next">
                        <h3>What Happens Next?</h3>
                        <div className="steps-grid">
                            <div className="step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <strong>Funds Frozen</strong>
                                    <p>Associated payment is frozen in escrow</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <strong>Admin Review</strong>
                                    <p>Our team investigates within 48 hours</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <strong>Resolution</strong>
                                    <p>Funds refunded or released based on verdict</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={reportableTransactions.length === 0}>
                            Submit Report
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

export default ReportIssue;

