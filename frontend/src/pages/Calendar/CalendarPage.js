import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { games, currentUser, classHistory } from '../../data/mockData';
import './CalendarPage.css';

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());

    // Filter games: User is Organizer OR User is in Roster
    const myGames = games.filter(game =>
        game.organizer.id === currentUser.id ||
        game.roster.some(player => player.id === currentUser.id)
    );

    // Combine with class history (if applicable)
    // Assuming classHistory has a similar date structure
    const mySchedule = [
        ...myGames.map(g => ({ ...g, type: 'Game' })),
        ...classHistory.map(c => ({ ...c, title: `${c.sport} Class`, type: 'Class' }))
    ];

    const onChange = (newDate) => {
        setDate(newDate);
    };

    // Helper to check if a date has events
    const hasEvent = (dateToCheck) => {
        return mySchedule.some(item => {
            const itemDate = new Date(item.date);
            return itemDate.toDateString() === dateToCheck.toDateString();
        });
    };

    // Get events for the selected date
    const eventsForDate = mySchedule.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === date.toDateString();
    });

    return (
        <div className="calendar-page">
            <div className="calendar-container">
                <h1 className="section-title">My Schedule</h1>
                <div className="calendar-wrapper">
                    <Calendar
                        onChange={onChange}
                        value={date}
                        tileContent={({ date, view }) =>
                            view === 'month' && hasEvent(date) ? <div className="dot"></div> : null
                        }
                        className="custom-calendar"
                    />
                </div>

                <div className="games-list">
                    <h3>Schedule for {date.toDateString()}</h3>
                    {eventsForDate.length > 0 ? (
                        eventsForDate.map(item => (
                            <div key={item.id} className={`game-item ${item.type.toLowerCase()}-item`}>
                                <div className="game-time">{item.time || item.timeSlot}</div>
                                <div className="game-info">
                                    <h4>{item.title || item.sport} <span className="event-type-badge">{item.type}</span></h4>
                                    <p>{item.venue}</p>
                                    <p className="status">{item.status}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-games">No events scheduled for this day.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
