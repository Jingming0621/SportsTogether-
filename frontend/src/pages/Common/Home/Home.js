import React, { useState } from 'react';
import GameCard from '../../../components/GameCard/GameCard';
import CreateGame from '../../Player/CreateGame/CreateGame';
import { games, sportTypes } from '../../../data/mockData';
import './Home.css';

const Home = ({ onGameClick }) => {
    const [showCreateGameModal, setShowCreateGameModal] = useState(false);
    const [selectedSport, setSelectedSport] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showTimeList, setShowTimeList] = useState(false);
    const [showAmpmList, setShowAmpmList] = useState(false);
    const [showWhenPicker, setShowWhenPicker] = useState(false);
    const [selectedArea, setSelectedArea] = useState('All');

    // Extract unique areas for dropdown
    const uniqueAreas = ['All', ...new Set(games.map(g => g.area).filter(Boolean))];

    const filteredGames = games.filter(game => {
        const matchesSport = selectedSport === 'All' || game.sportType === selectedSport;
        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (game.area && game.area.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesDate = !selectedDate || game.date === selectedDate;
        const matchesTime = !selectedTime || game.time >= selectedTime;
        const matchesArea = selectedArea === 'All' || game.area === selectedArea;

        return matchesSport && matchesSearch && matchesDate && matchesTime && matchesArea;
    });

    const clearFilters = () => {
        setSelectedSport('All');
        setSearchQuery('');
        setSelectedDate('');
        setSelectedTime('');
        setSelectedArea('All');
    };

    return (
        <div className="home-page">
            {/* Custom Hero Section for Courtsite style */}
            <div className="hero-container">
                <div className="hero-content">
                    <h1>Find Your Next Game</h1>
                    <p>Join sports activities, find instructors, and meet new players nearby.</p>
                </div>

                {/* Floating Filter Bar */}
                <div className="filter-bar">
                    {/* Sport Chips Row */}
                    <div className="sport-filter">
                        <button
                            className={`filter-chip ${selectedSport === 'All' ? 'active' : ''}`}
                            onClick={() => setSelectedSport('All')}
                        >
                            All Sports
                        </button>
                        {sportTypes.slice(0, 6).map(sport => (
                            <button
                                key={sport}
                                className={`filter-chip ${selectedSport === sport ? 'active' : ''}`}
                                onClick={() => setSelectedSport(sport)}
                            >
                                {sport}
                            </button>
                        ))}
                    </div>

                    {/* Advanced Inputs Row */}
                    <div className="advanced-filters">
                        <div className="input-group when-filter-container">
                            <label>When</label>
                            <div
                                className="filter-input when-trigger"
                                onClick={() => setShowWhenPicker(!showWhenPicker)}
                            >
                                {selectedDate || selectedTime ? (
                                    <span className="selected-value">
                                        {selectedDate && new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                        {selectedDate && selectedTime && ', '}
                                        {selectedTime && (() => {
                                            const [h, m] = selectedTime.split(':');
                                            const hour = parseInt(h);
                                            const hour12 = hour % 12 || 12;
                                            return `${hour12.toString().padStart(2, '0')}:${m}`;
                                        })()}
                                        {selectedTime && (parseInt(selectedTime.split(':')[0]) >= 12 ? ' PM' : ' AM')}
                                    </span>
                                ) : (
                                    <span className="placeholder">Any Date & Time</span>
                                )}
                            </div>

                            {showWhenPicker && (
                                <div className="when-popup">
                                    <div className="popup-section">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="filter-input"
                                        />
                                    </div>
                                    <div className="popup-section">
                                        <label>Start time & duration</label>
                                        <div className="time-selection-row" style={{ display: 'flex', gap: '10px' }}>
                                            {/* Time 12h Picker */}
                                            <div className="time-picker-container" style={{ position: 'relative', flex: 2 }}>
                                                <div
                                                    className="custom-select-trigger filter-input"
                                                    onClick={() => {
                                                        setShowTimeList(!showTimeList);
                                                        setShowAmpmList(false);
                                                    }}
                                                >
                                                    {selectedTime ? (() => {
                                                        const [h, m] = selectedTime.split(':');
                                                        const hour = parseInt(h);
                                                        const hour12 = hour % 12 || 12;
                                                        return `${hour12.toString().padStart(2, '0')}:${m}`;
                                                    })() : "00:00"}
                                                    <span className="arrow">▼</span>
                                                </div>
                                                {showTimeList && (
                                                    <div className="custom-select-options">
                                                        {Array.from({ length: 24 }).map((_, i) => {
                                                            // Generate 12:00, 12:30, 01:00, ... 11:30
                                                            const hourSequence = Math.floor(i / 2); // 0 to 11
                                                            const hour12 = hourSequence === 0 ? 12 : hourSequence;
                                                            const min = (i % 2 === 0 ? '00' : '30');
                                                            const timeDisplay = `${hour12.toString().padStart(2, '0')}:${min}`;

                                                            return (
                                                                <div
                                                                    key={timeDisplay}
                                                                    className="custom-option"
                                                                    onClick={() => {
                                                                        // Calculate new 24h time based on current AM/PM
                                                                        let currentAmpm = 'AM';
                                                                        if (selectedTime) {
                                                                            const h = parseInt(selectedTime.split(':')[0]);
                                                                            if (h >= 12) currentAmpm = 'PM';
                                                                        }

                                                                        let newHour = hour12;
                                                                        if (currentAmpm === 'PM' && newHour !== 12) newHour += 12;
                                                                        if (currentAmpm === 'AM' && newHour === 12) newHour = 0;

                                                                        setSelectedTime(`${newHour.toString().padStart(2, '0')}:${min}`);
                                                                        setShowTimeList(false);
                                                                    }}
                                                                >
                                                                    {timeDisplay}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            {/* AM/PM Picker */}
                                            <div className="ampm-picker-container" style={{ position: 'relative', flex: 1 }}>
                                                <div
                                                    className="custom-select-trigger filter-input"
                                                    onClick={() => {
                                                        setShowAmpmList(!showAmpmList);
                                                        setShowTimeList(false);
                                                    }}
                                                >
                                                    {selectedTime ? (parseInt(selectedTime.split(':')[0]) >= 12 ? 'PM' : 'AM') : 'AM'}
                                                    <span className="arrow">▼</span>
                                                </div>
                                                {showAmpmList && (
                                                    <div className="custom-select-options">
                                                        {['AM', 'PM'].map(ampm => (
                                                            <div
                                                                key={ampm}
                                                                className={`custom-option ${(!selectedTime && ampm === 'AM') || (selectedTime && ((parseInt(selectedTime.split(':')[0]) >= 12 ? 'PM' : 'AM') === ampm)) ? 'selected' : ''}`}
                                                                onClick={() => {
                                                                    let h = 0, m = '00';
                                                                    if (selectedTime) {
                                                                        [h, m] = selectedTime.split(':');
                                                                        h = parseInt(h);
                                                                    } else {
                                                                        // Default to 12:00 if nothing selected
                                                                        h = 0; // 12 AM
                                                                        m = '00';
                                                                    }

                                                                    // Convert current 24h hour to 12h base
                                                                    let hour12 = h % 12 || 12;

                                                                    // Adjust based on new AM/PM
                                                                    let newHour = hour12;
                                                                    if (ampm === 'PM' && newHour !== 12) newHour += 12;
                                                                    if (ampm === 'AM' && newHour === 12) newHour = 0;

                                                                    setSelectedTime(`${newHour.toString().padStart(2, '0')}:${m}`);
                                                                    setShowAmpmList(false);
                                                                }}
                                                            >
                                                                {ampm}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="input-group">
                            <label>Area</label>
                            <select
                                value={selectedArea}
                                onChange={(e) => setSelectedArea(e.target.value)}
                                className="filter-input"
                            >
                                {uniqueAreas.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group search-group">
                            <label>Search</label>
                            <input
                                type="text"
                                placeholder="Search games..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="filter-input"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <main className="main-content">
                <section id="games" className="games-section">

                    <div className="section-header">
                        <h2 className="section-title">Trending Games</h2>
                        <div className="header-actions">
                            {(selectedDate || selectedTime || selectedArea !== 'All' || searchQuery) && (
                                <button className="clear-filter-link" onClick={clearFilters}>Clear all filters</button>
                            )}
                            <button className="create-game-btn-home" onClick={() => setShowCreateGameModal(true)}>
                                + Create Game
                            </button>
                        </div>
                    </div>

                    {filteredGames.length > 0 ? (
                        <div className="games-grid">
                            {filteredGames.map(game => (
                                <div key={game.id} onClick={() => onGameClick && onGameClick(game.id)} style={{ cursor: 'pointer' }}>
                                    <GameCard game={game} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <p>No games found matching your criteria.</p>
                            <button className="clear-filter-btn" onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {showCreateGameModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <CreateGame onBack={() => setShowCreateGameModal(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
