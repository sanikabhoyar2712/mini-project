import React from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetails.css'; // We'll create this next

// Define the engineeringBranches data structure here for now
// In a larger app, you might move this to a separate data file or context
const engineeringBranches = {
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
        ],
        videos: [ // Placeholder for YouTube video IDs
          "video-id-cs-beginner-1",
          "video-id-cs-beginner-2",
          "video-id-cs-beginner-3",
          "video-id-cs-beginner-4"
        ]
      },
      intermediate: {
        title: "Intermediate Level",
        courses: [
          "Object-Oriented Programming",
          "Database Management Systems",
          "Operating Systems",
          "Computer Networks"
        ],
        videos: [ // Placeholder for YouTube video IDs
          "video-id-cs-intermediate-1",
          "video-id-cs-intermediate-2",
          "video-id-cs-intermediate-3",
          "video-id-cs-intermediate-4"
        ]
      },
      advanced: {
        title: "Advanced Level",
        courses: [
          "Machine Learning",
          "Artificial Intelligence",
          "Cloud Computing",
          "Cybersecurity"
        ],
        videos: [ // Placeholder for YouTube video IDs
          "video-id-cs-advanced-1",
          "video-id-cs-advanced-2",
          "video-id-cs-advanced-3",
          "video-id-cs-advanced-4"
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
        ],
         videos: [ // Placeholder for YouTube video IDs
          "video-id-civil-beginner-1",
          "video-id-civil-beginner-2",
          "video-id-civil-beginner-3",
          "video-id-civil-beginner-4"
        ]
      },
      intermediate: {
        title: "Intermediate Level",
        courses: [
          "Reinforced Concrete Design",
          "Transportation Engineering",
          "Environmental Engineering",
          "Geotechnical Engineering"
        ],
         videos: [ // Placeholder for YouTube video IDs
          "video-id-civil-intermediate-1",
          "video-id-civil-intermediate-2",
          "video-id-civil-intermediate-3",
          "video-id-civil-intermediate-4"
        ]
      },
      advanced: {
        title: "Advanced Level",
        courses: [
          "Advanced Structural Design",
          "Earthquake Engineering",
          "Bridge Engineering",
          "Construction Management"
        ],
         videos: [ // Placeholder for YouTube video IDs
          "video-id-civil-advanced-1",
          "video-id-civil-advanced-2",
          "video-id-civil-advanced-3",
          "video-id-civil-advanced-4"
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
        ],
         videos: [ // Placeholder for YouTube video IDs
          "video-id-electrical-beginner-1",
          "video-id-electrical-beginner-2",
          "video-id-electrical-beginner-3",
          "video-id-electrical-beginner-4"
        ]
      },
      intermediate: {
        title: "Intermediate Level",
        courses: [
          "Power Systems",
          "Control Systems",
          "Microprocessors",
          "Electrical Measurements"
        ],
         videos: [ // Placeholder for YouTube video IDs
          "video-id-electrical-intermediate-1",
          "video-id-electrical-intermediate-2",
          "video-id-electrical-intermediate-3",
          "video-id-electrical-intermediate-4"
        ]
      },
      advanced: {
        title: "Advanced Level",
        courses: [
          "Power Electronics",
          "Renewable Energy Systems",
          "Smart Grid Technology",
          "High Voltage Engineering"
        ],
         videos: [ // Placeholder for YouTube video IDs
          "video-id-electrical-advanced-1",
          "video-id-electrical-advanced-2",
          "video-id-electrical-advanced-3",
          "video-id-electrical-advanced-4"
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
        ],
         videos: [ // Placeholder for YouTube video IDs
          "video-id-mechanical-beginner-1",
          "video-id-mechanical-beginner-2",
          "video-id-mechanical-beginner-3",
          "video-id-mechanical-beginner-4"
        ]
      },
      intermediate: {
        title: "Intermediate Level",
        courses: [
          "Fluid Mechanics",
          "Heat Transfer",
          "Machine Design",
          "Industrial Engineering"
        ],
         videos: [ // Placeholder for YouTube video IDs
          "video-id-mechanical-intermediate-1",
          "video-id-mechanical-intermediate-2",
          "video-id-mechanical-intermediate-3",
          "video-id-mechanical-intermediate-4"
        ]
      },
      advanced: {
        title: "Advanced Level",
        courses: [
          "Robotics",
          "Automation",
          "Advanced Manufacturing",
          "Mechatronics"
        ],
        videos: [ // Placeholder for YouTube video IDs
          "video-id-mechanical-advanced-1",
          "video-id-mechanical-advanced-2",
          "video-id-mechanical-advanced-3",
          "video-id-mechanical-advanced-4"
        ]
      }
    }
  }
};

function CourseDetails() {
  const { branch, level } = useParams();

  // Find the selected branch and level data
  const selectedBranch = engineeringBranches[branch];
  const selectedLevel = selectedBranch ? selectedBranch.levels[level] : null;

  if (!selectedLevel) {
    return <div>Course details not found!</div>;
  }

  return (
    <div className="course-details-container">
      <h1>{selectedLevel.title} {selectedBranch.name} Courses</h1>
      
      <h2>Topics:</h2>
      <ul className="course-topics-list">
        {selectedLevel.courses.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>

      {/* Placeholder for YouTube Videos */}
      {selectedLevel.videos && selectedLevel.videos.length > 0 && (
        <div className="course-videos-section">
          <h2>Related Videos:</h2>
          <div className="video-list">
            {selectedLevel.videos.map((videoId, index) => ( // Assuming videoId is just the ID
              <div key={index} className="video-item">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Related video ${index + 1}`}
                ></iframe>
                {/* You would ideally fetch video titles/thumbnails using the YouTube API */}
                 <p>Video Title Placeholder</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* You can add more details here like descriptions, prerequisites, etc. */}
    </div>
  );
}

export default CourseDetails; 