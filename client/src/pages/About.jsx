import React from 'react';
import './About.css';

const About = () => {
  const text = {
    title: "About SelfCare Hub",
    subtitle: "Empowering you to live healthier and happier",
    missionTitle: "Our Mission",
    missionContent: "At SelfCare Hub, we aim to support your personal well-being through self-care, fitness, and mindful living.",
    offerTitle: "What We Offer",
    offers: [
      "🧘‍♀️ Guided self-care and meditation tools",
      "💪 Personalized fitness plans",
      "📚 Learning support with AI-powered guidance"
    ],
    valuesTitle: "Our Values",
    values: [
      "✅ Accessibility for everyone",
      "✅ Personalized experience",
      "✅ Supportive community"
    ]
  };

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>{text.title}</h1>
        <p>{text.subtitle}</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>{text.missionTitle}</h2>
          <p>{text.missionContent}</p>
        </section>

        <section className="about-section">
          <h2>{text.offerTitle}</h2>
          <ul>
            {text.offers.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="about-section">
          <h2>{text.valuesTitle}</h2>
          <ul>
            {text.values.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
