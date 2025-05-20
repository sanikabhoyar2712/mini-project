import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, and JavaScript basics',
      level: 'Beginner',
      duration: '8 weeks',
      image: 'https://source.unsplash.com/random/400x300?web'
    },
    {
      id: 2,
      title: 'Advanced React',
      description: 'Master React hooks and advanced patterns',
      level: 'Advanced',
      duration: '6 weeks',
      image: 'https://source.unsplash.com/random/400x300?react'
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      description: 'Essential computer science concepts',
      level: 'Intermediate',
      duration: '10 weeks',
      image: 'https://source.unsplash.com/random/400x300?code'
    },
    {
      id: 4,
      title: 'UI/UX Design',
      description: 'Learn modern design principles',
      level: 'Beginner',
      duration: '6 weeks',
      image: 'https://source.unsplash.com/random/400x300?design'
    }
  ];

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Available Courses</h1>
        <div className="courses-filter">
          <select className="filter-select">
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-image">
              <img src={course.image} alt={course.title} />
              <span className="course-level">{course.level}</span>
            </div>
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span><i className="fas fa-clock"></i> {course.duration}</span>
                <Link to={`/courses/${course.id}`} className="enroll-button">
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 