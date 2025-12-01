import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ amount, title, onClose, onSuccess }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onSuccess();
        }, 2000);
    };

    return (
        <div className="payment-modal-overlay" onClick={onClose}>
            <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Secure Payment</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    <div className="payment-summary">
                        <div className="summary-item">
                            <span>Game:</span>
                            <strong>{title}</strong>
                        </div>
                        <div className="summary-item total">
                            <span>Total Amount:</span>
                            <strong>RM {amount.toFixed(2)}</strong>
                        </div>
                    </div>

                    <form onSubmit={handlePayment}>
                        <div className="payment-method-selector">
                            <h3>Payment Method</h3>
                            <div className="method-options">
                                <label className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                    />
                                    <div className="method-content">
                                        <span className="method-icon">💳</span>
                                        <span>Credit/Debit Card</span>
                                    </div>
                                </label>

                                <label className={`method-option ${paymentMethod === 'grabpay' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="grabpay"
                                        checked={paymentMethod === 'grabpay'}
                                        onChange={() => setPaymentMethod('grabpay')}
                                    />
                                    <div className="method-content">
                                        <span className="method-icon">🟢</span>
                                        <span>GrabPay</span>
                                    </div>
                                </label>

                                <label className={`method-option ${paymentMethod === 'tng' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="tng"
                                        checked={paymentMethod === 'tng'}
                                        onChange={() => setPaymentMethod('tng')}
                                    />
                                    <div className="method-content">
                                        <span className="method-icon">🔵</span>
                                        <span>Touch 'n Go</span>
                                    </div>
                                </label>

                                <label className={`method-option ${paymentMethod === 'bank' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="bank"
                                        checked={paymentMethod === 'bank'}
                                        onChange={() => setPaymentMethod('bank')}
                                    />
                                    <div className="method-content">
                                        <span className="method-icon">🏦</span>
                                        <span>Online Banking</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {paymentMethod === 'card' && (
                            <div className="card-details">
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiry Date</label>
                                        <input type="text" placeholder="MM/YY" maxLength="5" required />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input type="text" placeholder="123" maxLength="3" required />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="security-info">
                            <div className="security-badge">
                                🔒 Secured by SSL Encryption
                            </div>
                            <p>Your payment is held in escrow and will be released to the organizer after the game is completed.</p>
                        </div>

                        <div className="modal-actions">
                            <button type="submit" className="pay-btn" disabled={isProcessing}>
                                {isProcessing ? (
                                    <>
                                        <span className="spinner"></span>
                                        Processing...
                                    </>
                                ) : (
                                    `Pay RM ${amount.toFixed(2)}`
                                )}
                            </button>
                            <button type="button" className="cancel-btn" onClick={onClose} disabled={isProcessing}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
