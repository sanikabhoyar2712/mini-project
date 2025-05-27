import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'pink');

  useEffect(() => {
    document.body.classList.remove('theme-pink', 'theme-blue');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-rocket"></i>
          Space
        </Link>

        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link"><i className="fas fa-home"></i> Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link"><i className="fas fa-book"></i> Courses</Link>
          </li>
          <li className="nav-item">
            <Link to="/progress" className="nav-link"><i className="fas fa-chart-line"></i> Progress</Link>
          </li>
          <li className="nav-item">
            <Link to="/selfcare" className="nav-link"><i className="fas fa-heart"></i> Self Care</Link>
          </li>
          {isMenuOpen && (
            <div className="nav-buttons mobile">
              <Link to="/contact" className="nav-button contact">
                <i className="fas fa-envelope"></i> Contact Us
              </Link>
              <Link to="/login" className="nav-button login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/signup" className="nav-button signup">
                <i className="fas fa-user-plus"></i> Sign Up
              </Link>
              <select
                className="theme-selector"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="pink">🌸 Pink</option>
                <option value="blue">🌊 Blue</option>
              </select>
            </div>
          )}
        </ul>

        <div className="nav-buttons desktop">
          <Link to="/contact" className="nav-button contact">
            <i className="fas fa-envelope"></i> Contact Us
          </Link>
          <Link to="/login" className="nav-button login">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
          <Link to="/signup" className="nav-button signup">
            <i className="fas fa-user-plus"></i> Sign Up
          </Link>
          <select
            className="theme-selector"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="pink">🌸 Pink</option>
            <option value="blue">🌊 Blue</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
