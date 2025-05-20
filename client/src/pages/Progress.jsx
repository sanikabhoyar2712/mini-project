import React from 'react';
import './Progress.css';

const Progress = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Web Development Fundamentals',
      progress: 75,
      lastAccessed: '2 days ago',
      nextLesson: 'CSS Grid Layout'
    },
    {
      id: 2,
      title: 'Advanced React',
      progress: 30,
      lastAccessed: '1 week ago',
      nextLesson: 'Custom Hooks'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Course Completed',
      description: 'Completed your first course',
      icon: 'fas fa-trophy',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Perfect Week',
      description: 'Studied for 7 days in a row',
      icon: 'fas fa-calendar-check',
      date: '2024-03-20'
    }
  ];

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h1>Your Learning Progress</h1>
      </div>

      <div className="progress-grid">
        <section className="progress-section">
          <h2>Current Courses</h2>
          <div className="courses-progress">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="progress-card">
                <h3>{course.title}</h3>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="progress-details">
                  <span>{course.progress}% Complete</span>
                  <span>Last accessed: {course.lastAccessed}</span>
                </div>
                <div className="next-lesson">
                  <h4>Next Lesson:</h4>
                  <p>{course.nextLesson}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="progress-section">
          <h2>Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">
                  <i className={achievement.icon}></i>
                </div>
                <div className="achievement-content">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  <span className="achievement-date">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="progress-section">
          <h2>Learning Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <i className="fas fa-clock"></i>
              <h3>Total Learning Time</h3>
              <p>24 hours</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-book"></i>
              <h3>Courses Enrolled</h3>
              <p>2 courses</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-certificate"></i>
              <h3>Certificates Earned</h3>
              <p>1 certificate</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Progress; 