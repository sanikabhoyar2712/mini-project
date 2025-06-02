import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About SelfCare Hub</h1>
        <p>Your journey to a better you starts here</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At SelfCare Hub, we believe that taking care of yourself is the foundation of a happy and fulfilling life. 
            Our mission is to provide a comprehensive platform that helps you prioritize your well-being through 
            self-care practices, fitness routines, and continuous learning.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Self-Care Resources</h3>
              <p>Access to a wide range of self-care activities, tips, and personalized routines to help you maintain your well-being.</p>
            </div>
            <div className="feature-card">
              <h3>Fitness Guidance</h3>
              <p>Curated workout plans and exercises suitable for all fitness levels, from beginners to advanced.</p>
            </div>
            <div className="feature-card">
              <h3>Learning Support</h3>
              <p>An AI-powered learning guide to help you set and achieve your educational and personal development goals.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Accessibility</h3>
              <p>Making self-care and wellness resources available to everyone, regardless of their background or experience level.</p>
            </div>
            <div className="value-card">
              <h3>Personalization</h3>
              <p>Tailoring our resources and recommendations to meet your unique needs and goals.</p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>Building a supportive community where everyone can share their journey and inspire others.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Join Our Community</h2>
          <p>
            Start your journey towards a better you today. Sign up to access all our features and become part of our 
            growing community of self-care enthusiasts.
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