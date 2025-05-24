import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SelfCare from './pages/SelfCare';
import Workout from './pages/Workout';
import SpaceBot from './pages/SpaceBot';
import Auth from './pages/Auth';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">SelfCare Hub</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/selfcare">Self Care</Link>
            <Link to="/spacebot">SpaceBot</Link>
            <Link to="/about">About Us</Link>
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/signup" className="auth-link">Sign Up</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selfcare" element={<SelfCare />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/spacebot" element={<SpaceBot />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;