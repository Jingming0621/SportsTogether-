import React, { useState } from 'react';
import { aiChatHistory } from '../../data/mockData';
import './AIChat.css';

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(aiChatHistory);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            sender: 'user',
            message: inputMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, userMessage]);
        setInputMessage('');

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                sender: 'ai',
                message: getAIResponse(inputMessage),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    const getAIResponse = (query) => {
        const lowercaseQuery = query.toLowerCase();

        if (lowercaseQuery.includes('create') && lowercaseQuery.includes('game')) {
            return "To create a game, click on the 'Create Game' button in the navigation menu. Fill in the game details including sport type, date, time, venue, and cost. If you're a new user, you may need to upload venue booking proof for verification. Click 'Submit' when you're done!";
        } else if (lowercaseQuery.includes('payment') || lowercaseQuery.includes('pay')) {
            return "We accept various payment methods including credit/debit cards (Visa, Mastercard), e-wallets (GrabPay, Touch 'n Go), and online banking. All payments are securely processed and held in escrow until the game is completed.";
        } else if (lowercaseQuery.includes('point') || lowercaseQuery.includes('reward')) {
            return "You can earn points by joining games (+50), completing games (+100), getting 5-star ratings (+75), and referring friends (+200). Redeem your points in the Rewards Store for vouchers, merchandise, and free services!";
        } else if (lowercaseQuery.includes('report') || lowercaseQuery.includes('issue')) {
            return "If you encounter any issues, you can report them within 24 hours after a game or session. Go to your transaction history, select the game/session, and click 'Report Issue'. Our admin team will investigate and resolve it within 48 hours.";
        } else if (lowercaseQuery.includes('instructor') || lowercaseQuery.includes('coach')) {
            return "You can book verified instructors from the Instructor Marketplace. Browse through available coaches, check their certifications and ratings, select a time slot, and complete the booking. To become an instructor, click 'Become an Instructor' and submit your application!";
        } else {
            return "I'm here to help! You can ask me about creating games, payments, rewards, reporting issues, booking instructors, or any other features on SportsTogether. What would you like to know?";
        }
    };

    return (
        <>
            {/* Chat Bubble Button */}
            {!isOpen && (
                <button className="ai-chat-bubble" onClick={() => setIsOpen(true)}>
                    <span className="bubble-icon">🤖</span>
                    <span className="bubble-text">Need Help?</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="chat-header">
                        <div className="header-info">
                            <span className="ai-avatar">🤖</span>
                            <div>
                                <strong>AI Assistant</strong>
                                <span className="status-dot">● Online</span>
                            </div>
                        </div>
                        <div className="header-actions">
                            <button className="minimize-btn" onClick={() => setIsOpen(false)}>−</button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.sender === 'ai' && <span className="message-avatar">🤖</span>}
                                <div className="message-content">
                                    <div className="message-text">{msg.message}</div>
                                    <div className="message-time">{msg.timestamp}</div>
                                </div>
                                {msg.sender === 'user' && <span className="message-avatar user-avatar">👤</span>}
                            </div>
                        ))}
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="send-btn" onClick={handleSendMessage}>
                            📤
                        </button>
                    </div>

                    <div className="quick-questions">
                        <button onClick={() => setInputMessage("How do I create a game?")}>
                            How to create a game?
                        </button>
                        <button onClick={() => setInputMessage("How do I earn points?")}>
                            How to earn points?
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChat;
