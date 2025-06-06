import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

// Define the engineeringBranches data structure directly in Courses.js
const engineeringBranches = { // eslint-disable-line no-unused-vars
  computerScience: {
    name: "Computer Science Engineering",
    levels: {
      beginner: {
        title: "Beginner Level",
        courses: [
          "Introduction to Programming",
          "Basic Data Structures",
          "Computer Fundamentals",
          "Digital Logic Design"
        ]
      },
      intermediate: {
        title: "Intermediate Level",
        courses: [
          "Object-Oriented Programming",
          "Database Management Systems",
          "Operating Systems",
          "Computer Networks"
        ]
      },
      advanced: {
        title: "Advanced Level",
        courses: [
          "Machine Learning",
          "Artificial Intelligence",
          "Cloud Computing",
          "Cybersecurity"
        ]
      }
    }
  },
  civil: {
    name: "Civil Engineering",
    levels: {
      beginner: {
        title: "Beginner Level",
        courses: [
          "Engineering Mechanics",
          "Basic Structural Analysis",
          "Surveying",
          "Building Materials"
        ]
      },
      intermediate: {
        title: "Intermediate Level",
        courses: [
          "Reinforced Concrete Design",
          "Transportation Engineering",
          "Environmental Engineering",
          "Geotechnical Engineering"
        ]
      },
      advanced: {
        title: "Advanced Level",
        courses: [
          "Advanced Structural Design",
          "Earthquake Engineering",
          "Bridge Engineering",
          "Construction Management"
        ]
      }
    }
  },
  electrical: {
    name: "Electrical Engineering",
    levels: {
      beginner: {
        title: "Beginner Level",
        courses: [
          "Basic Electronics",
          "Circuit Analysis",
          "Digital Electronics",
          "Electrical Machines"
        ]
      },
      intermediate: {
        title: "Intermediate Level",
        courses: [
          "Power Systems",
          "Control Systems",
          "Microprocessors",
          "Electrical Measurements"
        ]
      },
      advanced: {
        title: "Advanced Level",
        courses: [
          "Power Electronics",
          "Renewable Energy Systems",
          "Smart Grid Technology",
          "High Voltage Engineering"
        ]
      }
    }
  },
  mechanical: {
    name: "Mechanical Engineering",
    levels: {
      beginner: {
        title: "Beginner Level",
        courses: [
          "Engineering Drawing",
          "Thermodynamics",
          "Mechanics of Materials",
          "Manufacturing Processes"
        ]
      },
      intermediate: {
        title: "Intermediate Level",
        courses: [
          "Fluid Mechanics",
          "Heat Transfer",
          "Machine Design",
          "Industrial Engineering"
        ]
      },
      advanced: {
        title: "Advanced Level",
        courses: [
          "Robotics",
          "Automation",
          "Advanced Manufacturing",
          "Mechatronics"
        ]
      }
    }
  }
};

function Courses() {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });

  const courses = ['Engineering']; // Example courses, you can expand this list

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // e.g., send data to a backend API.
    console.log('Enrollment Form Data:', formData);
    setShowEnrollmentForm(false); // Hide the form and show courses after submission
  };

  const handleLevelClick = (branch, level) => {
    // Navigate to the new CourseDetails page with branch and level parameters
    navigate(`/courses/details/${branch.toLowerCase().replace(/ /g, '-')}/${level.toLowerCase()}`);
  };

  return (
    <div className="courses-container">
      {showEnrollmentForm ? (
        <div className="enrollment-form-container">
          <h1>Enroll for Courses</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="course">Course:</label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course} value={course.toLowerCase()}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-button">Enroll</button>
          </form>
        </div>
      ) : (
        <>
          <h1>Engineering Courses</h1>
          
          {/* Computer Engineering Section */}
          <div className="branch-section">
            <h2>Computer Engineering</h2>
            <div className="levels-container">
              {/* Beginner Level - Will navigate to CourseDetails page */}
              <a href="https://www.youtube.com/@ApnaCollegeOfficial" target="_blank" rel="noopener noreferrer" className="level">
                <h3>Beginner</h3>
                <ul>
                  <li>Introduction to Programming</li>
                  <li>Basic Data Structures</li>
                  <li>Computer Fundamentals</li>
                  <li>Digital Logic Design</li>
                </ul>
              </a>{/* Replace 'placeholder-computer-science' with the actual YouTube video ID for Computer Science Beginner */}
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

          {/* Civil Engineering Section */}
          <div className="branch-section">
            <h2>Civil Engineering</h2>
            <div className="levels-container">
              {/* Beginner Level - Will open a YouTube video */}
              <a href="https://www.youtube.com/watch?v=placeholder-civil-engineering" target="_blank" rel="noopener noreferrer" className="level">
                <h3>Beginner</h3>
                <ul>
                  <li>Engineering Mechanics</li>
                  <li>Basic Structural Analysis</li>
                  <li>Surveying</li>
                  <li>Building Materials</li>
                </ul>
              </a>{/* Replace 'placeholder-civil-engineering' with the actual YouTube video ID for Civil Engineering Beginner */}
              <div className="level" onClick={() => handleLevelClick('civil', 'intermediate')}>
                <h3>Intermediate</h3>
                <ul>
                  <li>Reinforced Concrete Design</li>
                  <li>Transportation Engineering</li>
                  <li>Environmental Engineering</li>
                  <li>Geotechnical Engineering</li>
                </ul>
              </div>
              <div className="level" onClick={() => handleLevelClick('civil', 'advanced')}>
                <h3>Advanced</h3>
                <ul>
                  <li>Advanced Structural Design</li>
                  <li>Earthquake Engineering</li>
                  <li>Bridge Engineering</li>
                  <li>Construction Management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Electrical Engineering Section */}
          <div className="branch-section">
            <h2>Electrical Engineering</h2>
            <div className="levels-container">
              {/* Beginner Level - Will open a YouTube video */}
              <a href="https://www.youtube.com/watch?v=placeholder-electrical-engineering" target="_blank" rel="noopener noreferrer" className="level">
                <h3>Beginner</h3>
                <ul>
                  <li>Basic Electronics</li>
                  <li>Circuit Analysis</li>
                  <li>Digital Electronics</li>
                  <li>Electrical Machines</li>
                </ul>
              </a>{/* Replace 'placeholder-electrical-engineering' with the actual YouTube video ID for Electrical Engineering Beginner */}
              <div className="level" onClick={() => handleLevelClick('electrical', 'intermediate')}>
                <h3>Intermediate</h3>
                <ul>
                  <li>Power Systems</li>
                  <li>Control Systems</li>
                  <li>Microprocessors</li>
                  <li>Electrical Measurements</li>
                </ul>
              </div>
              <div className="level" onClick={() => handleLevelClick('electrical', 'advanced')}>
                <h3>Advanced</h3>
                <ul>
                  <li>Power Electronics</li>
                  <li>Renewable Energy Systems</li>
                  <li>Smart Grid Technology</li>
                  <li>High Voltage Engineering</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mechanical Engineering Section */}
          <div className="branch-section">
            <h2>Mechanical Engineering</h2>
            <div className="levels-container">
              {/* Beginner Level - Will open a YouTube video */}
              <a href="https://www.youtube.com/watch?v=placeholder-mechanical-engineering" target="_blank" rel="noopener noreferrer" className="level">
                <h3>Beginner</h3>
                <ul>
                  <li>Engineering Drawing</li>
                  <li>Thermodynamics</li>
                  <li>Mechanics of Materials</li>
                  <li>Manufacturing Processes</li>
                </ul>
              </a>{/* Replace 'placeholder-mechanical-engineering' with the actual YouTube video ID for Mechanical Engineering Beginner */}
              <div className="level" onClick={() => handleLevelClick('mechanical', 'intermediate')}>
                <h3>Intermediate</h3>
                <ul>
                  <li>Fluid Mechanics</li>
                  <li>Heat Transfer</li>
                  <li>Machine Design</li>
                  <li>Industrial Engineering</li>
                </ul>
              </div>
              <div className="level" onClick={() => handleLevelClick('mechanical', 'advanced')}>
                <h3>Advanced</h3>
                <ul>
                  <li>Robotics</li>
                  <li>Automation</li>
                  <li>Advanced Manufacturing</li>
                  <li>Mechatronics</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Courses; 