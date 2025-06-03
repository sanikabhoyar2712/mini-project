import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import SelfCare from './pages/SelfCare';
import Todo from './pages/Todo';
import Courses from './pages/Courses';
import Enrollment from './pages/Enrollment';
import WorkoutDetails from './pages/WorkoutDetails';
import CourseDetails from './pages/CourseDetails';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/selfcare/*" element={<SelfCare />} >
             <Route path="workout/:workoutId" element={<WorkoutDetails />} />
          </Route>
          <Route path="/todo" element={<Todo />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/details/:branch/:level" element={<CourseDetails />} />
          <Route path="/enrollment/:branch/:level" element={<Enrollment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
