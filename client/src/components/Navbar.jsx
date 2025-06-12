import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AuthContext } from '../App';
import './Navbar.css';

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    <i className="fas fa-graduation-cap"></i> Serena
                </NavLink>

                <div className="menu-icon" onClick={toggleMenu}>
                    <FaBars />
                </div>

                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>

                    {isLoggedIn ? (
                        <>
                            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About Us</NavLink></li>
                            <li><NavLink to="/selfcare" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Self Care</NavLink></li>
                            <li><NavLink to="/todo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>To Do</NavLink></li>
                            <li><NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Courses</NavLink></li>
                            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact Us</NavLink></li>
                            <li><button onClick={logoutHandler} className="logout-btn">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact Us</NavLink></li>
                            <li><NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink></li>
                            <li><NavLink to="/signup" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Sign Up</NavLink></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
