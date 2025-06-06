import React from 'react';
import { useParams } from 'react-router-dom';
import './TopicVideos.css'; // We'll create this CSS file next

// Define the topics data structure
const branchLevelsData = {
  'computer': {
    'beginner': ['Introduction to Programming', 'Basic Data Structures', 'Computer Fundamentals', 'Digital Logic Design'],
    'intermediate': ['Object-Oriented Programming', 'Database Management Systems', 'Operating Systems', 'Computer Networks'],
    'advanced': ['Machine Learning', 'Artificial Intelligence', 'Cloud Computing', 'Cybersecurity'],
  },
  'civil': {
    'beginner': ['Engineering Mechanics', 'Basic Structural Analysis', 'Surveying', 'Building Materials'],
    'intermediate': ['Reinforced Concrete Design', 'Transportation Engineering', 'Environmental Engineering', 'Geotechnical Engineering'],
    'advanced': ['Advanced Structural Design', 'Earthquake Engineering', 'Bridge Engineering', 'Construction Management'],
  },
  'electrical': {
    'beginner': ['Basic Electronics', 'Circuit Analysis', 'Digital Electronics', 'Electrical Machines'],
    'intermediate': ['Power Systems', 'Control Systems', 'Microprocessors', 'Electrical Measurements'],
    'advanced': ['Power Electronics', 'Renewable Energy Systems', 'Smart Grid Technology', 'High Voltage Engineering'],
  },
  'mechanical': {
    'beginner': ['Engineering Drawing', 'Thermodynamics', 'Mechanics of Materials', 'Manufacturing Processes'],
    'intermediate': ['Fluid Mechanics', 'Heat Transfer', 'Machine Design', 'Industrial Engineering'],
    'advanced': ['Robotics', 'Automation', 'Advanced Manufacturing', 'Mechatronics'],
  },
};

function TopicVideos() {
  const { branch, level } = useParams(); // Get parameters from URL

  const topics = branchLevelsData[branch]?.[level] || [];

  return (
    <div className="topic-videos-container">
      <h1>{branch.replace('-', ' ').toUpperCase()} Engineering - {level.toUpperCase()} Level Topics</h1>

      {topics.length === 0 ? (
        <p>No topics found for this selection.</p>
      ) : (
        <ul>
          {topics.map((topic, index) => (
            <li key={index} className="topic-item">
              <span>{topic}</span>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' tutorial')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-link"
              >
                Watch Video
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopicVideos; 