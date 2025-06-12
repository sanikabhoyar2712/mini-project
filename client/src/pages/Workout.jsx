import React, { useState } from 'react';
import './Workout.css';

const Workout = () => {
  const [workoutLog, setWorkoutLog] = useState([]);
  const [newWorkoutEntry, setNewWorkoutEntry] = useState('');

  // Load workout log from local storage on component mount
  React.useEffect(() => {
    const storedLog = localStorage.getItem('workoutLog');
    if (storedLog) {
      setWorkoutLog(JSON.parse(storedLog));
    }
  }, []);

  // Save workout log to local storage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('workoutLog', JSON.stringify(workoutLog));
  }, [workoutLog]);

  const workoutCategories = [
    {
      title: 'Warm-up',
      icon: '��',
      points: [
        'Start with 5-10 minutes of light cardio (e.g., jogging in place, jumping jacks).',
        'Include dynamic stretches like arm circles, leg swings, and torso twists.',
        'Prepare your muscles and joints for the upcoming exercise.',
        'Gradually increase your heart rate and blood flow.'
      ],
      description: 'A proper warm-up prepares your body for physical activity, increasing blood flow to muscles and reducing the risk of injury.',
      videoUrls: [
        'https://www.youtube.com/embed/-p0PA9Zt8zk',
        'https://www.youtube.com/embed/VecbXgWY0DI',
        'https://www.youtube.com/embed/KFcnspwkyLA'
      ]
    },
    {
      title: 'Cardio',
      icon: '❤️',
      points: [
        'Aim for 20-30 minutes of moderate-intensity cardio most days of the week.',
        'Choose activities like brisk walking, running, cycling, swimming, or dancing.',
        'Improves cardiovascular health and endurance.',
        'Helps burn calories and manage weight.'
      ],
      description: 'Cardiovascular exercise strengthens your heart and lungs, improves circulation, and can significantly boost your overall fitness.',
      videoUrls: [
        'https://www.youtube.com/embed/ImI63BUUPwU',
        'https://www.youtube.com/embed/9psH-BsJ_IM',
        'https://www.youtube.com/embed/kZDvg92tTMc'
      ]
    },
    {
      title: 'Weight Loss',
      icon: '⚖️',
      points: [
        'Combine cardio with strength training for optimal fat burning.',
        'Focus on high-intensity interval training (HIIT) for efficient calorie expenditure.',
        'Maintain a consistent calorie deficit through diet and exercise.',
        'Incorporate full-body workouts to maximize muscle engagement.'
      ],
      description: 'Effective weight loss involves a combination of consistent exercise and mindful eating. These workouts are designed to help you burn calories and build lean muscle.',
      videoUrls: [
        'https://www.youtube.com/embed/-hSma-BRzoo',
        'https://www.youtube.com/embed/Ammb_7sv_KA',
        'https://www.youtube.com/embed/IT94xC35u6k'
      ]
    },
    {
      title: 'Strength Training',
      icon: '💪',
      points: [
        'Perform strength exercises 2-3 times per week, targeting all major muscle groups.',
        'Include exercises like squats, push-ups, lunges, planks, and rows.',
        'Use your body weight, resistance bands, or weights.',
        'Builds muscle mass, boosts metabolism, and strengthens bones.'
      ],
      description: 'Strength training builds muscle, increases bone density, and boosts metabolism, which is crucial for a healthy and strong body.',
      videoUrls: [
        'https://www.youtube.com/embed/tj0o8aH9vJw',
        'https://www.youtube.com/embed/t3kL5gswXAc',
        'https://www.youtube.com/embed/RPi9aJGuRDM'
      ]
    },
    {
      title: 'Pilates',
      icon: '🩰',
      points: [
        'Focus on core strength, flexibility, and controlled movements.',
        'Improves posture, balance, and body awareness.',
        'Can be done on a mat or with specialized equipment.',
        'Excellent for injury prevention and rehabilitation.'
      ],
      description: 'Pilates is a full-body exercise method that strengthens muscles while improving posture, flexibility, and mental well-being.',
      videoUrls: [
        'https://www.youtube.com/embed/C2HX2pNbUCM',
        'https://www.youtube.com/embed/-_6uhR46pvE',
        'https://www.youtube.com/embed/hpyT2v04Bj0'
      ]
    },
    {
      title: 'Nutrition & Hydration',
      icon: '🍏',
      points: [
        'Fuel your body with a balanced diet rich in whole foods, lean proteins, and healthy fats.',
        'Stay well-hydrated by drinking plenty of water throughout the day, especially around workouts.',
        'Proper nutrition supports energy levels, muscle repair, and overall health.'
      ],
      description: 'Fueling your body with the right nutrients and staying hydrated are fundamental for maximizing your workout performance and recovery.',
      videoUrls: []
    },
    {
      title: 'Rest & Recovery',
      icon: '🛌',
      points: [
        'Allow your body adequate rest (7-9 hours of sleep) for muscle repair and growth.',
        'Incorporate active recovery days with light activities like walking or gentle stretching.',
        'Prevents overtraining and burnout, essential for long-term progress.'
      ],
      description: 'Rest and recovery are just as important as the workout itself, allowing your muscles to repair and grow stronger.',
      videoUrls: []
    }
  ];

  const YoutubeEmbed = ({ embedUrl }) => (
    <div className="video-responsive">
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      ></iframe>
    </div>
  );

  const handleLogWorkout = () => {
    if (newWorkoutEntry.trim() !== '') {
      const newEntry = {
        date: new Date().toLocaleString(),
        workout: newWorkoutEntry
      };
      setWorkoutLog([...workoutLog, newEntry]);
      setNewWorkoutEntry('');
    }
  };

  const handleDeleteWorkout = (index) => {
    const newWorkoutLog = workoutLog.filter((_, i) => i !== index);
    setWorkoutLog(newWorkoutLog);
  };

  return (
    <div className="workout-section">
      <h2>Your Workout Journey</h2>

      {/* Workout Log Section */}
      <div className="workout-log-section">
        <h2>Log Your Workout</h2>
        <div className="log-input-area">
          <input
            type="text"
            placeholder="e.g., Cardio 30 mins"
            value={newWorkoutEntry}
            onChange={(e) => setNewWorkoutEntry(e.target.value)}
          />
          <button onClick={handleLogWorkout}>Log Workout</button>
        </div>
        <h3>Your Past Workouts</h3>
        {workoutLog.length === 0 ? (
          <p className="no-entries">No workouts logged yet. Let's get started!</p>
        ) : (
          <ul className="workout-log-list">
            {workoutLog.map((entry, index) => (
              <li key={index}>
                <span className="log-date">{entry.date}:</span>
                <span className="log-workout">{entry.workout}</span>
                <button className="delete-log-entry" onClick={() => handleDeleteWorkout(index)}>🗑️</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="workout-categories">
        {workoutCategories.map((category, index) => (
          <div key={index} className="workout-category-card">
            <span className="icon">{category.icon}</span>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <ul>
              {category.points.map((point, pointIndex) => (
                <li key={pointIndex}>{point}</li>
              ))}
            </ul>
            {category.videoUrls && category.videoUrls.length > 0 && (
              <div className="workout-videos-grid">
                {category.videoUrls.map((videoUrl, videoIndex) => (
                  <div key={videoIndex} className="workout-video-item">
                    <YoutubeEmbed embedUrl={videoUrl} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout; 