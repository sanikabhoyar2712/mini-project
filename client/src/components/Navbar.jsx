import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'pink');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleMenu = () => {
    setClick(!click);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-graduation-cap"></i> StudySphere
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/selfcare" className="nav-link">
              <i className="fas fa-heart"></i> SelfCare
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/todo" className="nav-link">
              <i className="fas fa-tasks"></i> To-Do
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/progress" className="nav-link">
              <i className="fas fa-chart-line"></i> Progress
            </Link>
          </li>

          {/* 🎨 Theme Selector */}
          <li className="nav-item theme-selector-container">
            <button className="theme-selector" onClick={toggleDropdown}>
              🎨 Themes
            </button>
            {dropdownOpen && (
              <ul className="theme-dropdown">
                <li onClick={() => handleThemeChange('pink')}>
                  🌸 Pink
                </li>
                <li onClick={() => handleThemeChange('blue')}>
                  💙 Blue
                </li>
              </ul>
            )}
          </li>

          {/* Buttons (Mobile) */}
          <div className="nav-buttons mobile">
            <Link to="/login" className="nav-button login">
              Login
            </Link>
            <Link to="/signup" className="nav-button signup">
              Sign Up
            </Link>
          </div>
        </ul>

        {/* Buttons (Desktop) */}
        <div className="nav-buttons desktop">
          <Link to="/login" className="nav-button login">
            Login
          </Link>
          <Link to="/signup" className="nav-button signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
