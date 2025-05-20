import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Progress from './pages/Progress';
import TodoList from './pages/TodoList';
import Auth from './pages/Auth';
import SelfCare from './pages/SelfCare';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/selfcare" element={<SelfCare />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;