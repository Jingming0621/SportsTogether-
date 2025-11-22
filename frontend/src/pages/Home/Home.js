import React, { useEffect, useState } from 'react';
import Hero from '../../components/Hero/Hero';
import GameCard from '../../components/GameCard/GameCard';
import { fetchGames } from '../../services/api';

const Home = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const loadGames = async () => {
            try {
                const data = await fetchGames();
                setGames(data);
            } catch (error) {
                // Error is logged in the service
            }
        };
        loadGames();
    }, []);

    return (
        <>
            <Hero />
            <main className="main-content">
                <section id="games" className="games-section">
                    <h2 className="section-title">Upcoming Games</h2>
                    <div className="games-grid">
                        {games.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
