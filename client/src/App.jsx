import React, { createContext, useState } from 'react';
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
import PrivateRoute from './components/PrivateRoute';

import './App.css';

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route
              path="/selfcare/*"
              element={
                <PrivateRoute>
                  <SelfCare />
                </PrivateRoute>
              }
            >
              <Route path="workout/:workoutId" element={<WorkoutDetails />} />
            </Route>
            <Route
              path="/todo"
              element={
                <PrivateRoute>
                  <Todo />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              }
            />
            <Route path="/courses/details/:branch/:level" element={<CourseDetails />} />
            <Route path="/enrollment/:branch/:level" element={<Enrollment />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
