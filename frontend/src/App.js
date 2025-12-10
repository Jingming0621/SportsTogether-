import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import InstructorNavbar from './components/InstructorNavbar/InstructorNavbar';
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
import CalendarPage from './pages/Calendar/CalendarPage';
import GameHistory from './pages/GameHistory/GameHistory';
import PlayerAnalytics from './pages/PlayerAnalytics/PlayerAnalytics';

// Instructor Module Pages
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';
import InstructorProfile from './pages/InstructorProfile/InstructorProfile';
import ManageSessions from './pages/ManageSessions/ManageSessions';
import InstructorRewards from './pages/InstructorRewards/InstructorRewards';
import ClassHistory from './pages/ClassHistory/ClassHistory';
import InstructorPayouts from './pages/InstructorPayouts/InstructorPayouts';
import AIChat from './components/AIChat/AIChat';
import './styles/main.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [showLoginPage, setShowLoginPage] = useState(false);

    // Check if current page is an instructor page
    const instructorPages = ['instructorDashboard', 'instructorProfile', 'manageSessions', 'instructorRewards', 'classHistory', 'instructorPayouts'];
    const isInstructorPage = instructorPages.includes(currentPage);

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
            {/* Conditionally render navbar based on page type */}
            {isInstructorPage ? (
                <InstructorNavbar
                    onNavigate={navigateTo}
                    onLogout={handleLogout}
                    currentPage={currentPage}
                />
            ) : (
                <Navbar
                    isAuthenticated={isAuthenticated}
                    onLogout={handleLogout}
                    onShowLogin={handleShowLogin}
                    onNavigate={navigateTo}
                    currentPage={currentPage}
                />
            )}

            {/* Player Module Pages */}
            {currentPage === 'home' && <Home onGameClick={handleGameClick} />}
            {currentPage === 'calendar' && <CalendarPage />}
            {currentPage === 'gameHistory' && <GameHistory />}
            {currentPage === 'analytics' && <PlayerAnalytics />}
            {currentPage === 'profile' && <Profile />}
            {currentPage === 'createGame' && <CreateGame onBack={() => navigateTo('home')} />}
            {currentPage === 'gameDetails' && <GameDetails gameId={selectedGameId} onBack={() => navigateTo('home')} />}
            {currentPage === 'socialFeed' && <SocialFeed />}
            {currentPage === 'groups' && <Groups />}
            {currentPage === 'instructors' && <Instructors />}
            {currentPage === 'rewards' && <Rewards />}
            {currentPage === 'reportIssue' && <ReportIssue onBack={() => navigateTo('home')} />}
            {currentPage === 'instructorApp' && <InstructorApplication onBack={() => navigateTo('instructors')} />}

            {/* Instructor Module Pages */}
            {currentPage === 'instructorDashboard' && <InstructorDashboard onNavigate={navigateTo} />}
            {currentPage === 'instructorProfile' && <InstructorProfile />}
            {currentPage === 'manageSessions' && <ManageSessions />}
            {currentPage === 'instructorRewards' && <InstructorRewards />}
            {currentPage === 'classHistory' && <ClassHistory />}
            {currentPage === 'instructorPayouts' && <InstructorPayouts />}

            {/* AI Chat is always available */}
            <AIChat />
        </div>
    );
}

export default App;