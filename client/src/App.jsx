import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* Temporary test content to see if anything renders */}
        <h1>Test Content</h1>
        {/* End of temporary test content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
