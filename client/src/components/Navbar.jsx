import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Removed FaPalette and FaAngleDown
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <i className="fas fa-graduation-cap"></i> LearnHub
                </Link>

                <button className="menu-icon" onClick={toggleMenu}>
                    <FaBars />
                </button>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/selfcare" className="nav-link" onClick={() => setIsMenuOpen(false)}>Self Care</Link>
                    <Link to="/todo" className="nav-link" onClick={() => setIsMenuOpen(false)}>To Do</Link>
                    <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
                </div>

                <div className="nav-buttons">
                    <Link to="/contact" className="nav-button contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                    <Link to="/login" className="nav-button login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    <Link to="/signup" className="nav-button signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;