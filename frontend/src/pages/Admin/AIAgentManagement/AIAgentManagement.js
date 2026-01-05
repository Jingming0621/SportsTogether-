import React, { useState } from 'react';
import './AIAgentManagement.css';
import { aiConversationLogs, aiKnowledgeBase } from '../../../data/mockData';

const AIAgentManagement = () => {
    const [knowledgeBase, setKnowledgeBase] = useState(aiKnowledgeBase);
    const [logs] = useState(aiConversationLogs);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        category: 'general'
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddKnowledge = (e) => {
        e.preventDefault();
        const newEntry = {
            id: knowledgeBase.length + 1,
            ...formData
        };
        setKnowledgeBase([...knowledgeBase, newEntry]);
        setFormData({ question: '', answer: '', category: 'general' });
        setShowForm(false);
    };

    const handleDeleteKnowledge = (id) => {
        setKnowledgeBase(knowledgeBase.filter(item => item.id !== id));
    };

    return (
        <div className="ai-agent-management">
            <div className="page-header">
                <h1>🤖 AI Agent Management</h1>
                <p>Update knowledge base and view conversation logs</p>
            </div>

            <div className="content-sections">
                {/* Knowledge Base Section */}
                <div className="knowledge-section">
                    <div className="section-header">
                        <h2>📚 Knowledge Base</h2>
                        <button onClick={() => setShowForm(!showForm)} className="btn-add">
                            {showForm ? '❌ Cancel' : '➕ Add Q&A'}
                        </button>
                    </div>

                    {showForm && (
                        <div className="knowledge-form">
                            <form onSubmit={handleAddKnowledge}>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange}>
                                        <option value="general">General</option>
                                        <option value="games">Games</option>
                                        <option value="rewards">Rewards</option>
                                        <option value="payments">Payments</option>
                                        <option value="instructors">Instructors</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Question</label>
                                    <input
                                        type="text"
                                        name="question"
                                        value={formData.question}
                                        onChange={handleInputChange}
                                        placeholder="What question should the AI answer?"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Answer</label>
                                    <textarea
                                        name="answer"
                                        value={formData.answer}
                                        onChange={handleInputChange}
                                        placeholder="Provide the answer..."
                                        rows="4"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-submit">Add to Knowledge Base</button>
                            </form>
                        </div>
                    )}

                    <div className="knowledge-list">
                        {knowledgeBase.map(item => (
                            <div key={item.id} className="knowledge-item">
                                <div className="knowledge-header">
                                    <span className="category-badge">{item.category}</span>
                                    <button onClick={() => handleDeleteKnowledge(item.id)} className="btn-delete-kb">
                                        🗑️
                                    </button>
                                </div>
                                <div className="knowledge-content">
                                    <p className="question"><strong>Q:</strong> {item.question}</p>
                                    <p className="answer"><strong>A:</strong> {item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Conversation Logs Section */}
                <div className="logs-section">
                    <h2>💬 Recent Conversations</h2>
                    <div className="logs-list">
                        {logs.map(log => (
                            <div key={log.id} className="log-item">
                                <div className="log-header">
                                    <span className="log-user">👤 {log.username}</span>
                                    <span className="log-date">{log.date}</span>
                                </div>
                                <div className="log-conversation">
                                    <div className="user-message">
                                        <strong>User:</strong> {log.userMessage}
                                    </div>
                                    <div className="ai-response">
                                        <strong>AI:</strong> {log.aiResponse}
                                    </div>
                                </div>
                                {log.helpful !== undefined && (
                                    <div className="log-feedback">
                                        {log.helpful ? '👍 Helpful' : '👎 Not Helpful'}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAgentManagement;

