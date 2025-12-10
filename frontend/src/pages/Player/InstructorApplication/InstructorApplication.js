import React, { useState } from 'react';
import { sportTypes } from '../../../data/mockData';
import './InstructorApplication.css';

const InstructorApplication = ({ onBack }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        sports: [],
        yearsExperience: '',
        certifications: '',
        bio: '',
        hourlyRate: '',
        documents: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSportToggle = (sport) => {
        setFormData(prev => ({
            ...prev,
            sports: prev.sports.includes(sport)
                ? prev.sports.filter(s => s !== sport)
                : [...prev.sports, sport]
        }));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            documents: [...prev.documents, ...files.map(f => f.name)]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.sports.length === 0) {
            alert('Please select at least one sport');
            return;
        }

        if (formData.documents.length === 0) {
            alert('Please upload at least one certification document');
            return;
        }

        alert(`🎉 Application Submitted!\n\nThank you for applying to become an instructor!\n\nStatus: Pending Verification\n\nOur admin team will review your application and documents within 3-5 business days. You will receive an email notification once your application has been processed.\n\n(This is a prototype UI)`);
        onBack();
    };

    return (
        <div className="instructor-application-page">
            <div className="application-container">
                <button className="back-btn" onClick={onBack}>← Back</button>

                <div className="application-header">
                    <h1>Become an Instructor</h1>
                    <p className="subtitle">Share your expertise and earn money teaching sports</p>
                </div>

                <div className="benefits-section">
                    <h3>Why Become an Instructor?</h3>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">💰</div>
                            <strong>Flexible Earnings</strong>
                            <p>Set your own rates and schedule</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">📈</div>
                            <strong>Grow Your Reach</strong>
                            <p>Access to active sports community</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">🎓</div>
                            <strong>Share Knowledge</strong>
                            <p>Help others improve their skills</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">✓</div>
                            <strong>Verified Badge</strong>
                            <p>Build trust with verification</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="application-form">
                    <div className="form-section">
                        <h2>Personal Information</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+60 12-345 6789"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Professional Details</h2>

                        <div className="form-group">
                            <label>Sports You Can Teach * (Select all that apply)</label>
                            <div className="sports-selection">
                                {sportTypes.slice(0, 12).map(sport => (
                                    <button
                                        key={sport}
                                        type="button"
                                        className={`sport-chip ${formData.sports.includes(sport) ? 'selected' : ''}`}
                                        onClick={() => handleSportToggle(sport)}
                                    >
                                        {sport}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Years of Experience *</label>
                                <input
                                    type="number"
                                    name="yearsExperience"
                                    value={formData.yearsExperience}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 5"
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Desired Hourly Rate (RM) *</label>
                                <input
                                    type="number"
                                    name="hourlyRate"
                                    value={formData.hourlyRate}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 80"
                                    min="20"
                                    step="5"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Certifications *</label>
                            <textarea
                                name="certifications"
                                value={formData.certifications}
                                onChange={handleInputChange}
                                placeholder="List your certifications, qualifications, and relevant training (one per line)"
                                rows="3"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Professional Bio *</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                placeholder="Tell us about your experience, teaching style, and what makes you a great instructor..."
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Supporting Documents</h2>

                        <div className="form-group">
                            <label>Upload Certificates & Documents * <span className="required-text">At least 1 document required</span></label>
                            <div className="upload-area">
                                <input
                                    type="file"
                                    id="documents"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    multiple
                                    onChange={handleFileUpload}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="documents" className="upload-box">
                                    <div className="upload-icon">📄</div>
                                    <div className="upload-text">
                                        <strong>Click to upload documents</strong>
                                        <p>PDF, JPG, PNG (Max 5MB each)</p>
                                    </div>
                                </label>

                                {formData.documents.length > 0 && (
                                    <div className="uploaded-files">
                                        <strong>Uploaded Files:</strong>
                                        <ul>
                                            {formData.documents.map((doc, idx) => (
                                                <li key={idx}>✓ {doc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <small>Upload copies of certifications, licenses, or any relevant documents</small>
                        </div>
                    </div>

                    <div className="verification-notice">
                        <strong>📋 Verification Process</strong>
                        <p>After submission, our admin team will review your application and documents. This typically takes 3-5 business days. You'll receive an email notification once your application is approved.</p>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            Submit Application
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

export default InstructorApplication;

