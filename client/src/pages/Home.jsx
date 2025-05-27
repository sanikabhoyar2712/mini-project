import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import Footer from './Footer'; // Import Footer component

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
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown",
    emoji: "🚀"
  }
];

const Home = () => {
  const navigate = useNavigate();
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

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleAbout = () => {
    navigate('/about');
  };

  return (
    <div className="home">
      {/* Navbar - directly included */}

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
                <button className="get-started-btn" onClick={handleGetStarted}>
                  Get Started
                  <i className="fas fa-arrow-right"></i>
                </button>
                <button className="about-btn" onClick={handleAbout}>
                  About Us
                  <i className="fas fa-info-circle"></i>
                </button>
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
                <h3>Smart Tasks</h3>
                <p>Organize and prioritize your study tasks efficiently.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-bullseye"></i>
                <h3>Goal Tracking</h3>
                <p>Set and achieve your learning milestones with ease.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-user-friends"></i>
                <h3>Study Groups</h3>
                <p>Connect and learn with peers worldwide.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-chart-line"></i>
                <h3>Progress Insights</h3>
                <p>Track your growth with intuitive analytics.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Add Footer Component here */}
      <Footer />
    </div>
  );
};

export default Home;
