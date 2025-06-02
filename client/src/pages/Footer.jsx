import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'pink');

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>StudySphere</h3>
          <p>Empowering lifelong learners with the best tools and resources to achieve their goals.</p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/signup">Get Started</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Info</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> 123 Learning Lane, Eduland</li>
            <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
            <li><i className="fas fa-envelope"></i> info@studysphere.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StudySphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
