import React, { useState } from 'react';
import { login, register } from '../../services/api';
import './Login.css';

const Login = ({ onLoginSuccess, onBack }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            if (isLogin) {
                const response = await login(formData.email, formData.password);
                localStorage.setItem('token', response.token);
                localStorage.setItem('username', response.username);
                setMessage('Login successful!');
                if (onLoginSuccess) {
                    onLoginSuccess(response);
                }
            } else {
                await register(formData.username, formData.email, formData.password);
                setMessage('Registration successful! You can now login.');
                setIsLogin(true);
                setFormData({ username: '', email: '', password: '' });
            }
        } catch (err) {
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {onBack && (
                    <button onClick={onBack} className="back-button">← Back to Home</button>
                )}
                <h1 className="login-title">{isLogin ? 'Login' : 'Register'}</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                name="username"
                                className="form-input"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <div className="toggle-mode">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Register' : 'Login'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
