import React, { useState } from 'react';
import { instructorProfile, payoutHistory, bankAccounts, instructorEarnings } from '../../data/mockData';
import './InstructorPayouts.css';

const InstructorPayouts = () => {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [showWithdrawForm, setShowWithdrawForm] = useState(false);

    const handleWithdraw = (e) => {
        e.preventDefault();

        if (!instructorProfile.bankAccountVerified) {
            alert('❌ Unverified Bank Account\n\nPlease add and verify your bank account details before withdrawing funds.\n\n(This is a prototype UI)');
            return;
        }

        const amount = parseFloat(withdrawAmount);
        if (amount > instructorProfile.walletBalance) {
            alert('❌ Insufficient Balance\n\nYou don\'t have enough funds in your wallet.\n\n(This is a prototype UI)');
            return;
        }

        if (amount < 50) {
            alert('❌ Minimum Withdrawal\n\nMinimum withdrawal amount is RM 50.\n\n(This is a prototype UI)');
            return;
        }

        alert(`✅ Withdrawal Initiated!\n\nAmount: RM ${amount.toFixed(2)}\nBank: ${bankAccounts[0].bankName}\nAccount: ${bankAccounts[0].accountNumber}\n\nFunds will be transferred within 1-3 business days.\n\n(This is a prototype UI)`);
        setShowWithdrawForm(false);
        setWithdrawAmount('');
    };

    const handleAddBank = () => {
        alert('🏦 Add Bank Account\n\nThis would open a form to add and verify your bank account details.\n\n(This is a prototype UI)');
    };

    return (
        <div className="instructor-payouts-page">
            <div className="payouts-container">
                <h1>Payouts & Earnings</h1>
                <p className="subtitle">Manage your earnings and withdrawals</p>

                {/* Wallet Balance */}
                <div className="wallet-card">
                    <div className="wallet-header">
                        <div>
                            <h2>Wallet Balance</h2>
                            <p className="wallet-subtitle">Available for withdrawal</p>
                        </div>
                        <div className="wallet-balance">RM {instructorProfile.walletBalance.toFixed(2)}</div>
                    </div>
                    <button className="withdraw-btn" onClick={() => setShowWithdrawForm(true)}>
                        Withdraw Funds
                    </button>
                </div>

                {/* Withdraw Form Modal */}
                {showWithdrawForm && (
                    <div className="modal-overlay" onClick={() => setShowWithdrawForm(false)}>
                        <div className="withdraw-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Withdraw Funds</h2>
                                <button className="close-btn" onClick={() => setShowWithdrawForm(false)}>✕</button>
                            </div>
                            <form onSubmit={handleWithdraw} className="withdraw-form">
                                <div className="balance-display">
                                    <span>Available Balance:</span>
                                    <strong>RM {instructorProfile.walletBalance.toFixed(2)}</strong>
                                </div>

                                <div className="form-group">
                                    <label>Withdrawal Amount (RM) *</label>
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        min="50"
                                        step="10"
                                        placeholder="Minimum RM 50"
                                        required
                                    />
                                    <small>Minimum withdrawal: RM 50</small>
                                </div>

                                {instructorProfile.bankAccountVerified ? (
                                    <div className="bank-info-display">
                                        <strong>Transfer To:</strong>
                                        <div className="bank-details">
                                            <p>{bankAccounts[0].bankName}</p>
                                            <p>{bankAccounts[0].accountNumber}</p>
                                            <p>{bankAccounts[0].accountHolderName}</p>
                                            <span className="verified-tag">✓ Verified</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="unverified-notice">
                                        <p>⚠️ No verified bank account found</p>
                                        <button type="button" className="add-bank-btn" onClick={handleAddBank}>
                                            Add Bank Account
                                        </button>
                                    </div>
                                )}

                                <div className="form-actions">
                                    <button type="submit" className="submit-btn" disabled={!instructorProfile.bankAccountVerified}>
                                        Request Withdrawal
                                    </button>
                                    <button type="button" className="cancel-btn" onClick={() => setShowWithdrawForm(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Earnings Overview */}
                <div className="earnings-overview">
                    <h2>Earnings Overview</h2>
                    <div className="earnings-grid">
                        <div className="earning-card">
                            <div className="earning-label">This Month</div>
                            <div className="earning-value">RM {instructorEarnings.thisMonth.toFixed(2)}</div>
                        </div>
                        <div className="earning-card">
                            <div className="earning-label">Last Month</div>
                            <div className="earning-value">RM {instructorEarnings.lastMonth.toFixed(2)}</div>
                        </div>
                        <div className="earning-card">
                            <div className="earning-label">Pending Payouts</div>
                            <div className="earning-value pending">RM {instructorEarnings.pendingPayouts.toFixed(2)}</div>
                        </div>
                        <div className="earning-card">
                            <div className="earning-label">Lifetime Earnings</div>
                            <div className="earning-value total">RM {instructorEarnings.lifetimeEarnings.toFixed(2)}</div>
                        </div>
                    </div>
                </div>

                {/* Monthly Breakdown */}
                <div className="breakdown-section">
                    <h2>Monthly Breakdown</h2>
                    <div className="breakdown-list">
                        {instructorEarnings.earningsBreakdown.map((item, idx) => (
                            <div key={idx} className="breakdown-item">
                                <div className="breakdown-month">{item.month}</div>
                                <div className="breakdown-sessions">{item.sessions} sessions</div>
                                <div className="breakdown-amount">RM {item.amount.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payout History */}
                <div className="history-section">
                    <h2>Payout History</h2>
                    <div className="payout-history-list">
                        {payoutHistory.map(payout => (
                            <div key={payout.id} className="payout-item">
                                <div className="payout-date">
                                    {new Date(payout.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </div>
                                <div className="payout-details">
                                    <div className="payout-method">{payout.method}</div>
                                    <div className="payout-account">{payout.bankAccount}</div>
                                    <div className="transaction-id">Transaction ID: {payout.transactionId}</div>
                                </div>
                                <div className="payout-amount">RM {payout.amount.toFixed(2)}</div>
                                <div className={`payout-status ${payout.status.toLowerCase()}`}>{payout.status}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bank Account Section */}
                <div className="bank-account-section">
                    <div className="section-header-row">
                        <h2>Bank Account</h2>
                        {bankAccounts.length === 0 && (
                            <button className="add-bank-btn-header" onClick={handleAddBank}>
                                + Add Bank Account
                            </button>
                        )}
                    </div>
                    {bankAccounts.map(account => (
                        <div key={account.id} className="bank-account-card">
                            <div className="bank-icon">🏦</div>
                            <div className="bank-info">
                                <h3>{account.bankName}</h3>
                                <p>{account.accountNumber}</p>
                                <p>{account.accountHolderName}</p>
                                <small>Added on {new Date(account.addedDate).toLocaleDateString()}</small>
                            </div>
                            {account.verified && (
                                <div className="verified-badge-bank">✓ Verified</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstructorPayouts;
