import React from 'react';
import Hero from '../../components/Hero/Hero';
import GameCard from '../../components/GameCard/GameCard';
import { games } from '../../data/mockData';

const Home = ({ onGameClick }) => {
    return (
        <>
            <Hero />
            <main className="main-content">
                <section id="games" className="games-section">
                    <h2 className="section-title">Upcoming Games</h2>
                    <div className="games-grid">
                        {games.map(game => (
                            <div key={game.id} onClick={() => onGameClick && onGameClick(game.id)} style={{ cursor: 'pointer' }}>
                                <GameCard game={game} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;

