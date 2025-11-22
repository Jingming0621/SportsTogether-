import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    Play More. <br />
                    <span>Connect Better.</span>
                </h1>
                <p className="hero-subtitle">
                    The all-in-one platform to organize games, find teammates, and earn rewards for staying active. Join the community today.
                </p>
                <div className="hero-cta-group">
                    <a href="#games" className="btn btn-primary">Find a Game</a>
                    <a href="#create" className="btn btn-secondary">Host a Game</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
