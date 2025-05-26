import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Courses from './pages/Courses';
import Progress from './pages/Progress';
import SelfCare from './pages/SelfCare';
import Workout from './pages/Workout';
import StudyPlanner from './pages/StudyPlanner';
import Goals from './pages/Goals';
import SpaceBot from './pages/SpaceBot';
import Auth from './pages/Auth';
import About from './pages/About';
import Contact from './pages/Contact';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/selfcare" element={<SelfCare />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/study-planner" element={<StudyPlanner />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/spacebot" element={<SpaceBot />} />

          {/* Auth */}
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />

          {/* More Dropdown Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
