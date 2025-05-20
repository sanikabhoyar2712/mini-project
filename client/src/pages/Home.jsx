import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Your Learning Journey</h1>
          <p>Discover, Learn, and Grow with our personalized learning platform</p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">
              <i className="fas fa-book"></i> Explore Courses
            </Link>
            <Link to="/signup" className="btn btn-outline">
              <i className="fas fa-user-plus"></i> Get Started
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-elements">
            <i className="fas fa-graduation-cap"></i>
            <i className="fas fa-book"></i>
            <i className="fas fa-lightbulb"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-title">
          <h2>Why Choose Us?</h2>
          <p>Experience learning like never before with our unique features</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-heart"></i>
            <h3>Personalized Learning</h3>
            <p>Tailored courses that match your learning style and pace</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-trophy"></i>
            <h3>Achievement System</h3>
            <p>Earn badges and rewards as you progress through your courses</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-users"></i>
            <h3>Community Support</h3>
            <p>Connect with fellow learners and share your journey</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-chart-line"></i>
            <h3>Track Progress</h3>
            <p>Monitor your learning journey with detailed analytics</p>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="popular-courses">
        <div className="section-title">
          <h2>Popular Courses</h2>
          <p>Start your learning journey with our most popular courses</p>
        </div>
        <div className="courses-grid">
          <div className="course-card">
            <div className="course-image">
              <i className="fas fa-code"></i>
            </div>
            <div className="course-content">
              <h3>Web Development</h3>
              <p>Learn modern web development from scratch</p>
              <Link to="/courses" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
          <div className="course-card">
            <div className="course-image">
              <i className="fas fa-paint-brush"></i>
            </div>
            <div className="course-content">
              <h3>Digital Design</h3>
              <p>Master the art of digital design and creativity</p>
              <Link to="/courses" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
          <div className="course-card">
            <div className="course-image">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <div className="course-content">
              <h3>Mobile Development</h3>
              <p>Create amazing mobile applications</p>
              <Link to="/courses" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of learners worldwide and begin your journey today</p>
          <Link to="/signup" className="btn btn-primary">
            <i className="fas fa-rocket"></i> Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;