import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

const engineeringBranches = { /* ... same as before ... */ };

function Courses() {
  const navigate = useNavigate();

  const handleLevelClick = (branch, level) => {
    navigate(`/courses/details/${branch.toLowerCase().replace(/ /g, '-')}/${level.toLowerCase()}`);
  };

  return (
    <div className="courses-container">
      <h1>Engineering Courses</h1>

      {/* Computer Engineering Section */}
      <div className="branch-section">
        <h2>Computer Engineering</h2>
        <div className="levels-container">
          <a href="https://www.youtube.com/@ApnaCollegeOfficial" target="_blank" rel="noopener noreferrer" className="level">
            <h3>Beginner</h3>
            <ul>
              <li>Introduction to Programming</li>
              <li>Basic Data Structures</li>
              <li>Computer Fundamentals</li>
              <li>Digital Logic Design</li>
            </ul>
          </a>
          <div className="level" onClick={() => handleLevelClick('computerScience', 'intermediate')}>
            <h3>Intermediate</h3>
            <ul>
              <li>Object-Oriented Programming</li>
              <li>Database Management Systems</li>
              <li>Operating Systems</li>
              <li>Computer Networks</li>
            </ul>
          </div>
          <div className="level" onClick={() => handleLevelClick('computerScience', 'advanced')}>
            <h3>Advanced</h3>
            <ul>
              <li>Machine Learning</li>
              <li>Artificial Intelligence</li>
              <li>Cloud Computing</li>
              <li>Cybersecurity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Civil, Electrical, Mechanical Sections (same as before) */}
      {/* ... copy-paste the rest as you had it ... */}
    </div>
  );
}

export default Courses;
