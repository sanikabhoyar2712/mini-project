import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Footer from '../components/Footer';

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

const testimonials = [
  {
    name: "Amit Sharma",
    text: "From daily goals to self-care, StudySphere keeps me on track—both academically and personally!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Priya Singh",
    text: "An all-in-one platform that truly understands a student’s learning journey. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  
  {
    name: "Sneha Patel",
    text: "StudySphere made learning so much more organized and fun. The personalized tools are just perfect!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [showQuote, setShowQuote] = useState(true);
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(quote);

    const timer = setTimeout(() => {
      setShowQuote(false);
    }, 2500);

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
          <section className="hero notion-hero">
            <div className="hero-content">
              <h1>Welcome to <span className="brand">StudySphere</span></h1>
              <p className="hero-subtitle">
                Organize your learning, track your progress, and achieve your goals — all in one beautiful workspace.
              </p>
              <div className="hero-buttons">
                <button className="get-started-btn" onClick={handleGetStarted}>
                  Get Started Free
                </button>
                <button className="about-btn" onClick={handleAbout}>
                  Learn More
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
              <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=1024,quality=80/front-static/pages/home/hero.png" alt="Workspace" className="notion-illustration" />
            </div>
          </section>

          {/* Features Section */}
          <section className="features notion-features">
            <h2>Why StudySphere?</h2>
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

          {/* Testimonials Section */}
          <section className="testimonials">
            <h2>What our users say</h2>
            <div className="testimonials-grid">
              {testimonials.map((t, idx) => (
                <div className="testimonial-card" key={idx}>
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <p className="testimonial-text">"{t.text}"</p>
                  <span className="testimonial-name">{t.name}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
