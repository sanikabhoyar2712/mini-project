import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        LearnHub
      </Link>
      
      <button className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </button>

      <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/selfcare" className="nav-link">Self Care</Link>
        <Link to="/todo" className="nav-link">To Do</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="contact-btn">Contact Us</Link>
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
