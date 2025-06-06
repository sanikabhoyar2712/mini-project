import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Serena</h1>
        <p>where peace meets progress</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to provide tools and resources to help you prioritize well-being, academic goals, and personal growth.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Self-Care Resources</h3>
              <p>Access activities, tips, and routines to maintain your well-being.</p>
            </div>
            <div className="feature-card">
              <h3>Study Tools</h3>
              <p>Tools for organizing tasks, tracking progress, and managing courses.</p>
            </div>
            <div className="feature-card">
              <h3>Learning Support</h3>
              <p>Guidance to help you set and achieve educational and personal development goals.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Accessibility</h3>
              <p>Making wellness and learning resources available to everyone.</p>
            </div>
            <div className="value-card">
              <h3>Personalization</h3>
              <p>Tailoring resources to your unique needs and goals.</p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>Building a supportive space to share and inspire others.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Join Us</h2>
          <p>
            Start your journey today. Sign up to access features and join our community.
          </p>
          <div className="cta-buttons">
            <a href="/signup" className="btn btn-primary">Sign Up Now</a>
            <a href="/login" className="btn btn-outline">Login</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 