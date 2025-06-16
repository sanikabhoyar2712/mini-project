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
  },
  {
    text: "I am enough.",
    author: "Marisa Peer",
    emoji: "❤️"
  }
];

const testimonials = [
  {
    name: "Amit Sharma",
    text: "From daily goals to self-care, StudySphere keeps me on track—both academically and personally!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Aarav Patel",
    text: "An all-in-one platform that truly understands a student's learning journey. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  
  {
    name: "Sneha Patel",
    text: "Serena made learning so much more organized and fun. The personalized tools are just perfect!",
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
              <h1>Welcome to <span className="brand">Serena</span></h1>
              <p className="hero-subtitle">
                where peace meets progress
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
              <img src="/images/my-background.jpg" alt="Workspace" className="notion-illustration" />
            </div>
          </section>

          {/* Features Section */}
          <section className="features notion-features">
            <h2>Why Serena?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-calendar-alt"></i>
                <h3>Smart Study Planner</h3>
                <p>Organize your tasks and deadlines with a personalized calendar to stay on top of your goals.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-graduation-cap"></i>
                <h3>Course Dashboard</h3>
                <p>Access and manage all your enrolled courses in one place, with structured modules and note-taking tools.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-heartbeat"></i>
                <h3>Self-Care Integration</h3>
                <p>Balance productivity with wellness through scheduled breaks, hydration reminders, and mental health tips.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-chart-line"></i>
                <h3>Learning Insights</h3>
                <p>Analyze your productivity with weekly summaries, time tracking, and goal achievement stats.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-tasks"></i>
                <h3>To-Do List with Progress Tracker</h3>
                <p>Break down your study sessions into manageable tasks and visually track your daily progress.</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-bell"></i>
                <h3>Smart Reminders & Notifications</h3>
                <p>Get timely alerts for upcoming tasks, missed deadlines, and scheduled breaks to stay focused and on track.</p>
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
