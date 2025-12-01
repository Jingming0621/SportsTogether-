import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import CreateGame from './pages/CreateGame/CreateGame';
import GameDetails from './pages/GameDetails/GameDetails';
import SocialFeed from './pages/SocialFeed/SocialFeed';
import Groups from './pages/Groups/Groups';
import Instructors from './pages/Instructors/Instructors';
import Rewards from './pages/Rewards/Rewards';
import ReportIssue from './pages/ReportIssue/ReportIssue';
import InstructorApplication from './pages/InstructorApplication/InstructorApplication';
import AIChat from './components/AIChat/AIChat';
import { games } from './data/mockData';
import './styles/main.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState('home'); // home, profile, createGame, gameDetails, socialFeed, groups, instructors, rewards, reportIssue, instructorApp
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [showLoginPage, setShowLoginPage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        setShowLoginPage(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setCurrentPage('home');
    };

    const handleShowLogin = () => {
        setShowLoginPage(true);
    };

    const handleBackToHome = () => {
        setShowLoginPage(false);
    };

    const navigateTo = (page, gameId = null) => {
        setCurrentPage(page);
        if (gameId) setSelectedGameId(gameId);
    };

    const handleGameClick = (gameId) => {
        setSelectedGameId(gameId);
        setCurrentPage('gameDetails');
    };

    if (showLoginPage) {
        return <Login onLoginSuccess={handleLoginSuccess} onBack={handleBackToHome} />;
    }

    return (
        <div className="app-container">
            <Navbar
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                onShowLogin={handleShowLogin}
                onNavigate={navigateTo}
                currentPage={currentPage}
            />

            {currentPage === 'home' && <Home onGameClick={handleGameClick} />}
            {currentPage === 'profile' && <Profile />}
            {currentPage === 'createGame' && <CreateGame onBack={() => navigateTo('home')} />}
            {currentPage === 'gameDetails' && <GameDetails gameId={selectedGameId} onBack={() => navigateTo('home')} />}
            {currentPage === 'socialFeed' && <SocialFeed />}
            {currentPage === 'groups' && <Groups />}
            {currentPage === 'instructors' && <Instructors />}
            {currentPage === 'rewards' && <Rewards />}
            {currentPage === 'reportIssue' && <ReportIssue onBack={() => navigateTo('home')} />}
            {currentPage === 'instructorApp' && <InstructorApplication onBack={() => navigateTo('instructors')} />}

            {/* AI Chat is always available */}
            <AIChat />
        </div>
    );
}

export default App;