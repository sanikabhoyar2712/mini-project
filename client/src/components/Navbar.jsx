import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaPalette, FaAngleDown } from 'react-icons/fa'; // Added FaPalette and FaAngleDown
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('default'); // 'default', 'pink-theme', 'blue-theme'

    // Load theme from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('websiteTheme');
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            setCurrentTheme(savedTheme);
        } else {
            // Set a default theme if none is saved (e.g., 'blue-theme' or 'default')
            document.body.classList.add('blue-theme'); // Or your preferred default
            setCurrentTheme('blue-theme');
            localStorage.setItem('websiteTheme', 'blue-theme');
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Close theme dropdown if opening mobile menu
        if (!isMenuOpen) setIsThemeDropdownOpen(false);
    };

    const toggleThemeDropdown = () => {
        setIsThemeDropdownOpen(!isThemeDropdownOpen);
    };

    const applyTheme = (themeClass) => {
        // Remove existing theme classes
        document.body.classList.remove('pink-theme', 'blue-theme');
        // Add the new theme class
        document.body.classList.add(themeClass);
        // Save to localStorage
        localStorage.setItem('websiteTheme', themeClass);
        // Update state
        setCurrentTheme(themeClass);
        // Close dropdown
        setIsThemeDropdownOpen(false);
        // Close mobile menu if open
        if (isMenuOpen) setIsMenuOpen(false);
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

                    {/* Theme Dropdown */}
                    <div className="nav-item dropdown" onMouseEnter={() => setIsThemeDropdownOpen(true)} onMouseLeave={() => setIsThemeDropdownOpen(false)}>
                        <div className="nav-link" onClick={toggleThemeDropdown}>
                            <FaPalette /> Theme <FaAngleDown className="dropdown-arrow" />
                        </div>
                        <div className={`dropdown-menu ${isThemeDropdownOpen ? 'active' : ''}`}>
                            <div className="dropdown-link" onClick={() => applyTheme('blue-theme')}>
                                <span className="theme-indicator blue-dot"></span> Blue
                            </div>
                            <div className="dropdown-link" onClick={() => applyTheme('pink-theme')}>
                                <span className="theme-indicator pink-dot"></span> Pink
                            </div>
                        </div>
                    </div>
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