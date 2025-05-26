import React, { useState } from 'react';
import './Courses.css';

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courseCategories = [
    { id: 'programming', name: 'Programming & Tech', icon: '💻' },
    { id: 'languages', name: 'Foreign Languages', icon: '🌍' },
    { id: 'design', name: 'Design & Creativity', icon: '🎨' }
  ];

  const courses = [
    // Programming Courses
    {
      id: 1,
      title: "Python for Beginners",
      category: "programming",
      level: "beginner",
      description: "Learn Python programming from scratch with hands-on projects",
      thumbnail: "https://img.youtube.com/vi/kqtD5dpn9C8/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
      instructor: "freeCodeCamp",
      duration: "4.5 hours"
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      category: "programming",
      level: "advanced",
      description: "Master advanced JavaScript concepts and modern ES6+ features",
      thumbnail: "https://img.youtube.com/vi/1Rs2ND1luYI/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1luYI",
      instructor: "Traversy Media",
      duration: "3.2 hours"
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      category: "programming",
      level: "intermediate",
      description: "Complete web development course covering HTML, CSS, and JavaScript",
      thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      instructor: "freeCodeCamp",
      duration: "5 hours"
    },
    // Language Courses
    {
      id: 4,
      title: "Spanish for Beginners",
      category: "languages",
      level: "beginner",
      description: "Start your Spanish language journey with essential phrases and grammar",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      instructor: "Language Learning Pro",
      duration: "2.5 hours"
    },
    {
      id: 5,
      title: "Japanese Conversation Practice",
      category: "languages",
      level: "intermediate",
      description: "Improve your Japanese speaking skills with practical conversations",
      thumbnail: "https://img.youtube.com/vi/8UuWwLxRy5E/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=8UuWwLxRy5E",
      instructor: "JapanesePod101",
      duration: "3 hours"
    },
    {
      id: 6,
      title: "French Language Basics",
      category: "languages",
      level: "beginner",
      description: "Learn essential French vocabulary and pronunciation",
      thumbnail: "https://img.youtube.com/vi/hQlSR0g-zu8/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=hQlSR0g-zu8",
      instructor: "Learn French with Alexa",
      duration: "2 hours"
    },
    // Design Courses
    {
      id: 7,
      title: "UI/UX Design Principles",
      category: "design",
      level: "beginner",
      description: "Learn the fundamentals of user interface and experience design",
      thumbnail: "https://img.youtube.com/vi/68w2VwalD5w/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=68w2VwalD5w",
      instructor: "Design Mastery",
      duration: "3.5 hours"
    },
    {
      id: 8,
      title: "Advanced Photoshop Techniques",
      category: "design",
      level: "advanced",
      description: "Master advanced photo editing and manipulation techniques",
      thumbnail: "https://img.youtube.com/vi/IyR_uYsRdPs/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=IyR_uYsRdPs",
      instructor: "Photoshop Pro",
      duration: "5 hours"
    },
    {
      id: 9,
      title: "Figma UI Design Tutorial",
      category: "design",
      level: "intermediate",
      description: "Learn to create beautiful UI designs using Figma",
      thumbnail: "https://img.youtube.com/vi/FTFaQWZBqQ8/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
      instructor: "Design Course",
      duration: "4 hours"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const handleCourseClick = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>Explore Courses</h1>
        <p>Discover top-quality courses across various categories and levels</p>
      </div>

      <div className="courses-controls">
        <div className="filter-section">
          <h3>Level</h3>
          <div className="filter-buttons">
            <button 
              className={selectedLevel === 'all' ? 'active' : ''} 
              onClick={() => setSelectedLevel('all')}
            >
              All Levels
            </button>
            <button 
              className={selectedLevel === 'beginner' ? 'active' : ''} 
              onClick={() => setSelectedLevel('beginner')}
            >
              Beginner
            </button>
            <button 
              className={selectedLevel === 'intermediate' ? 'active' : ''} 
              onClick={() => setSelectedLevel('intermediate')}
            >
              Intermediate
            </button>
            <button 
              className={selectedLevel === 'advanced' ? 'active' : ''} 
              onClick={() => setSelectedLevel('advanced')}
            >
              Advanced
            </button>
          </div>
        </div>

        <div className="filter-section">
          <h3>Category</h3>
          <div className="category-buttons">
            <button 
              className={selectedCategory === 'all' ? 'active' : ''} 
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </button>
            {courseCategories.map(category => (
              <button 
                key={category.id}
                className={selectedCategory === category.id ? 'active' : ''} 
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div 
            key={course.id} 
            className="course-card"
            onClick={() => handleCourseClick(course.videoUrl)}
          >
            <div className="course-thumbnail">
              <img src={course.thumbnail} alt={course.title} />
              <span className="course-level">{course.level}</span>
            </div>
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-meta">
                <span className="instructor">{course.instructor}</span>
                <span className="duration">{course.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 