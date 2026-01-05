import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import InstructorNavbar from './components/InstructorNavbar/InstructorNavbar';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
// Common Pages
import Home from './pages/Common/Home/Home';
import Login from './pages/Common/Login/Login';
import ReportIssue from './pages/Common/ReportIssue/ReportIssue';

// Player Pages
import Profile from './pages/Player/Profile/Profile';
import CreateGame from './pages/Player/CreateGame/CreateGame';
import GameDetails from './pages/Player/GameDetails/GameDetails';
import SocialFeed from './pages/Player/SocialFeed/SocialFeed';
import Groups from './pages/Player/Groups/Groups';
import InstructorMarketplace from './pages/Player/InstructorMarketplace/InstructorMarketplace';
import Rewards from './pages/Player/Rewards/Rewards';
import InstructorApplication from './pages/Player/InstructorApplication/InstructorApplication';
import CalendarPage from './pages/Player/Calendar/CalendarPage';
import GameHistory from './pages/Player/GameHistory/GameHistory';
import PlayerAnalytics from './pages/Player/PlayerAnalytics/PlayerAnalytics';

// Instructor Module Pages
import InstructorDashboard from './pages/Instructor/InstructorDashboard/InstructorDashboard';
import InstructorProfile from './pages/Instructor/InstructorProfile/InstructorProfile';
import ManageSessions from './pages/Instructor/ManageSessions/ManageSessions';
import InstructorRewards from './pages/Instructor/InstructorRewards/InstructorRewards';
import ClassHistory from './pages/Instructor/ClassHistory/ClassHistory';
import InstructorPayouts from './pages/Instructor/InstructorPayouts/InstructorPayouts';

// Admin Module Pages
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import VerificationDashboard from './pages/Admin/VerificationDashboard/VerificationDashboard';
import DisputeResolution from './pages/Admin/DisputeResolution/DisputeResolution';
import RewardsManagement from './pages/Admin/RewardsManagement/RewardsManagement';
import ContentModeration from './pages/Admin/ContentModeration/ContentModeration';
import AIAgentManagement from './pages/Admin/AIAgentManagement/AIAgentManagement';

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

    // Check if current page is an admin page
    const adminPages = ['adminDashboard', 'verificationDashboard', 'disputeResolution', 'rewardsManagement', 'contentModeration', 'aiAgentManagement'];
    const isAdminPage = adminPages.includes(currentPage);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        setIsAuthenticated(!!token);

        if (token && role) {
            const lowerRole = role.toLowerCase();
            if (['instructor'].includes(lowerRole)) {
                setCurrentPage('instructorDashboard');
            } else if (['admin'].includes(lowerRole)) {
                setCurrentPage('adminDashboard');
            }
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        console.log("Login Success Data:", userData);
        setIsAuthenticated(true);
        setShowLoginPage(false);

        const role = userData.role || '';
        const lowerRole = role.toLowerCase();

        if (['instructor'].includes(lowerRole)) {
            console.log("Redirecting to Instructor Dashboard");
            setCurrentPage('instructorDashboard');
        } else if (['admin'].includes(lowerRole)) {
            console.log("Redirecting to Admin Dashboard");
            setCurrentPage('adminDashboard');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
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
            ) : isAdminPage ? (
                <AdminNavbar
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
            {currentPage === 'instructors' && <InstructorMarketplace />}
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

            {/* Admin Module Pages */}
            {currentPage === 'adminDashboard' && <AdminDashboard onNavigate={navigateTo} />}
            {currentPage === 'verificationDashboard' && <VerificationDashboard />}
            {currentPage === 'disputeResolution' && <DisputeResolution />}
            {currentPage === 'rewardsManagement' && <RewardsManagement />}
            {currentPage === 'contentModeration' && <ContentModeration />}
            {currentPage === 'aiAgentManagement' && <AIAgentManagement />}

            {/* AI Chat is always available */}
            <AIChat />
        </div>
    );
}

export default App;