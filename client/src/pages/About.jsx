import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About SelfCare Hub</h1>
        <p>Empowering you to live healthier and happier</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At SelfCare Hub, we aim to support your personal well-being through self-care, fitness, and mindful living.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>🧘‍♀️ Guided self-care and meditation tools</li>
            <li>💪 Personalized fitness plans</li>
            <li>📚 Learning support with AI-powered guidance</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li>✅ Accessibility for everyone</li>
            <li>✅ Personalized experience</li>
            <li>✅ Supportive community</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
