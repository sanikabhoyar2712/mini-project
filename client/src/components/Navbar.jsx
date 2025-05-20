import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-graduation-cap"></i>
          LearnHub
        </Link>
        
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link">
              <i className="fas fa-book"></i> Courses
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/progress" className="nav-link">
              <i className="fas fa-chart-line"></i> Progress
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/todo" className="nav-link">
              <i className="fas fa-tasks"></i> Tasks
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/selfcare" className="nav-link">
              <i className="fas fa-heart"></i> Self Care
            </Link>
          </li>
        </ul>

        <div className="nav-buttons">
          <Link to="/login" className="nav-button login">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
          <Link to="/signup" className="nav-button signup">
            <i className="fas fa-user-plus"></i> Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;