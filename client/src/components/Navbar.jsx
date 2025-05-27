import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // for More dropdown

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
          {/* Removed Tasks Link */}
          <li className="nav-item">
            <Link to="/selfcare" className="nav-link"><i className="fas fa-heart"></i> Self Care</Link>
          </li>

          {/* More Dropdown (3 dots icon only) */}
          <li
            className="nav-item dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="nav-link">
              <i className="fas fa-ellipsis-h"></i> {/* 3 dots icon */}
            </span>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/about" className="dropdown-link">About</Link></li>
                <li><Link to="/contact" className="dropdown-link">Contact Us</Link></li>
              </ul>
            )}
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
