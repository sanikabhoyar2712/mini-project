import React, { useEffect, useState } from 'react';
import './Home.css';

const quotes = [
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
    emoji: "🌟"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    emoji: "📚"
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown",
    emoji: "💪"
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    emoji: "🌱"
  },
  {
    text: "Success doesn’t just find you. You have to go out and get it.",
    author: "Unknown",
    emoji: "🚀"
  }
];

const Home = () => {
  const [showQuote, setShowQuote] = useState(true);
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    // Select a random quote when component mounts
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(quote);

    const timer = setTimeout(() => {
      setShowQuote(false);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      {showQuote && randomQuote ? (
        <div className="quote-screen">
          <div className="quote-content">
            <span className="emoji">{randomQuote.emoji}</span>
            <p className="quote-text">"{randomQuote.text}"</p>
            <span className="author">— {randomQuote.author}</span>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-content">
              <h1>Welcome to StudySphere</h1>
              <p>Your personal learning space designed to boost your productivity and help you grow smarter every day.</p>
              <div className="hero-buttons">
                <button className="btn-primary">Get Started</button>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>
            <div className="hero-image">
              <div className="floating-elements">
                <i className="fas fa-book"></i>
                <i className="fas fa-laptop-code"></i>
                <i className="fas fa-brain"></i>
                <i className="fas fa-pencil-alt"></i>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features">
            <div className="section-title">
              <h2>Features</h2>
              <p>Explore the powerful tools designed to support your learning journey.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-check-circle"></i>
                <h3>To-Do List</h3>
                <p>Organize your tasks and stay on top of your study schedule.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-bullseye"></i>
                <h3>Goal Tracker</h3>
                <p>Set milestones and track your learning progress over time.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-chart-line"></i>
                <h3>Progress Analytics</h3>
                <p>Visualize your growth with insightful data and charts.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-user-friends"></i>
                <h3>Peer Connection</h3>
                <p>Collaborate, share, and grow with fellow learners.</p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
