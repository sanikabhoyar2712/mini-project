import React, { useState, useEffect } from 'react';
import './SelfCare.css';

const SelfCare = () => {
  const [activeTab, setActiveTab] = useState('diary');
  const [diaryEntry, setDiaryEntry] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Add new state variables for personal space
  const [importantDates, setImportantDates] = useState([]);
  const [newDate, setNewDate] = useState({ title: '', date: '', description: '' });
  const [learningThoughts, setLearningThoughts] = useState([]);
  const [newThought, setNewThought] = useState({ content: '', category: 'general' });
  const [personalGoals, setPersonalGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ content: '', deadline: '', priority: 'medium' });

  // Workout videos
  const workoutVideos = {
    beginner: {
      title: "Beginner Full Body Workout",
      duration: "20 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=2pLT-olgUJs",
      description: "Perfect for those just starting their fitness journey"
    },
    weightLoss: {
      title: "Fat Burning HIIT",
      duration: "25 minutes",
      level: "Intermediate",
      url: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
      description: "High-intensity workout for maximum calorie burn"
    },
    weightGain: {
      title: "Strength Training for Muscle Gain",
      duration: "30 minutes",
      level: "Intermediate",
      url: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
      description: "Build muscle and increase strength"
    },
    yoga: {
      title: "Morning Yoga Flow",
      duration: "15 minutes",
      level: "All Levels",
      url: "https://www.youtube.com/watch?v=sTANio_2E0Q",
      description: "Start your day with energy and flexibility"
    },
    core: {
      title: "Core Strength & Planks",
      duration: "15 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
      description: "Strengthen your core and improve posture"
    },
    legs: {
      title: "Lower Body & Squats",
      duration: "20 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=YaXPRqUwItQ",
      description: "Tone and strengthen your legs"
    }
  };

  // Add workout tips
  const workoutTips = {
    weightLoss: [
      "Combine cardio with strength training",
      "Stay hydrated during workouts",
      "Maintain a calorie deficit",
      "Get enough protein",
      "Rest between sets"
    ],
    weightGain: [
      "Focus on progressive overload",
      "Eat in a calorie surplus",
      "Prioritize compound exercises",
      "Get adequate rest",
      "Track your progress"
    ],
    beginner: [
      "Start slow and build gradually",
      "Focus on proper form",
      "Don't skip warm-up",
      "Stay consistent",
      "Listen to your body"
    ]
  };

  // Meditation videos
  const meditationVideos = {
    breathing: {
      title: "Breathing Exercise",
      duration: "5 minutes",
      type: "Calming",
      url: "https://www.youtube.com/watch?v=1Dv-ldGLnIY"
    },
    sleep: {
      title: "Sleep Meditation",
      duration: "15 minutes",
      type: "Relaxing",
      url: "https://www.youtube.com/watch?v=1ZYbU82GVz4"
    },
    mindfulness: {
      title: "Mindfulness",
      duration: "10 minutes",
      type: "Focus",
      url: "https://www.youtube.com/watch?v=O-6f5wQXSu8"
    }
  };

  // Update skincare state
  const [skincareStreak, setSkincareStreak] = useState(0);
  const [lastSkincareDate, setLastSkincareDate] = useState(null);
  const [selectedSkinType, setSelectedSkinType] = useState('');
  const [personalMotivation, setPersonalMotivation] = useState('');
  const [skincareGoals, setSkincareGoals] = useState([]);
  const [newSkincareGoal, setNewSkincareGoal] = useState('');

  const skinTypes = [
    { type: 'dry', description: 'Feels tight and rough, may have flaky patches' },
    { type: 'oily', description: 'Shiny appearance, prone to breakouts' },
    { type: 'combination', description: 'Mix of dry and oily areas' },
    { type: 'normal', description: 'Balanced, not too dry or oily' },
    { type: 'sensitive', description: 'Easily irritated, may have redness' }
  ];

  const skincareTips = {
    morning: [
      "Start with a gentle cleanser to remove overnight buildup",
      "Apply vitamin C serum for brightening and protection",
      "Don't forget your neck and décolletage",
      "Always apply sunscreen, even on cloudy days",
      "Stay hydrated throughout the day"
    ],
    evening: [
      "Double cleanse to remove makeup and impurities",
      "Use a toner to balance your skin's pH",
      "Apply treatments (serums, actives) on damp skin",
      "Lock in moisture with a night cream",
      "Get 7-8 hours of sleep for skin regeneration"
    ],
    weekly: [
      "Exfoliate 1-2 times per week",
      "Use a face mask suited to your skin type",
      "Give your skin a break from makeup",
      "Deep clean your makeup brushes",
      "Check your products' expiration dates"
    ]
  };

  // Timer functionality
  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimerControl = (action) => {
    switch (action) {
      case 'start':
        setIsTimerRunning(true);
        break;
      case 'pause':
        setIsTimerRunning(false);
        break;
      case 'reset':
        setTimer(600);
        setIsTimerRunning(false);
        break;
      default:
        break;
    }
  };

  // Diary functionality
  const handleSaveDiary = () => {
    if (diaryEntry.trim()) {
      const newEntry = {
        id: Date.now(),
        content: diaryEntry,
        date: new Date().toLocaleDateString(),
        prompt: "What made you smile today?"
      };
      setDiaryEntries([...diaryEntries, newEntry]);
      setDiaryEntry('');
      // In a real app, you would save this to a backend
      localStorage.setItem('diaryEntries', JSON.stringify([...diaryEntries, newEntry]));
    }
  };

  // Mood tracking functionality
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const newMoodEntry = {
      id: Date.now(),
      mood,
      date: new Date().toLocaleDateString()
    };
    setMoodHistory([...moodHistory, newMoodEntry]);
    // In a real app, you would save this to a backend
    localStorage.setItem('moodHistory', JSON.stringify([...moodHistory, newMoodEntry]));
  };

  // Load saved data on component mount
  useEffect(() => {
    const savedDiaryEntries = localStorage.getItem('diaryEntries');
    const savedMoodHistory = localStorage.getItem('moodHistory');
    const savedImportantDates = localStorage.getItem('importantDates');
    const savedLearningThoughts = localStorage.getItem('learningThoughts');
    const savedPersonalGoals = localStorage.getItem('personalGoals');
    const savedSkincareGoals = localStorage.getItem('skincareGoals');
    const savedMotivation = localStorage.getItem('personalMotivation');
    
    if (savedDiaryEntries) {
      setDiaryEntries(JSON.parse(savedDiaryEntries));
    }
    if (savedMoodHistory) {
      setMoodHistory(JSON.parse(savedMoodHistory));
    }
    if (savedImportantDates) {
      setImportantDates(JSON.parse(savedImportantDates));
    }
    if (savedLearningThoughts) {
      setLearningThoughts(JSON.parse(savedLearningThoughts));
    }
    if (savedPersonalGoals) {
      setPersonalGoals(JSON.parse(savedPersonalGoals));
    }
    if (savedSkincareGoals) {
      setSkincareGoals(JSON.parse(savedSkincareGoals));
    }
    if (savedMotivation) {
      setPersonalMotivation(savedMotivation);
    }
  }, []);

  // Add handlers for personal space
  const handleAddDate = () => {
    if (newDate.title && newDate.date) {
      const dateToAdd = {
        id: Date.now(),
        ...newDate
      };
      setImportantDates([...importantDates, dateToAdd]);
      localStorage.setItem('importantDates', JSON.stringify([...importantDates, dateToAdd]));
      setNewDate({ title: '', date: '', description: '' });
    }
  };

  const handleAddThought = () => {
    if (newThought.content) {
      const thoughtToAdd = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        ...newThought
      };
      setLearningThoughts([...learningThoughts, thoughtToAdd]);
      localStorage.setItem('learningThoughts', JSON.stringify([...learningThoughts, thoughtToAdd]));
      setNewThought({ content: '', category: 'general' });
    }
  };

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      const goalToAdd = {
        id: Date.now(),
        content: newGoal,
        date: new Date().toLocaleDateString()
      };
      setSkincareGoals([...skincareGoals, goalToAdd]);
      localStorage.setItem('skincareGoals', JSON.stringify([...skincareGoals, goalToAdd]));
      setNewGoal('');
    }
  };

  const handleSaveMotivation = () => {
    if (personalMotivation.trim()) {
      localStorage.setItem('personalMotivation', personalMotivation);
    }
  };

  // Update handlers for personal motivation
  const handleAddSkincareGoal = () => {
    if (newSkincareGoal.trim()) {
      const goal = {
        id: Date.now(),
        content: newSkincareGoal,
        completed: false
      };
      setSkincareGoals([...skincareGoals, goal]);
      setNewSkincareGoal('');
      localStorage.setItem('skincareGoals', JSON.stringify([...skincareGoals, goal]));
    }
  };

  const handleToggleGoal = (goalId) => {
    const updatedGoals = personalGoals.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    setPersonalGoals(updatedGoals);
    localStorage.setItem('personalGoals', JSON.stringify(updatedGoals));
  };

  return (
    <div className="selfcare-container">
      <div className="selfcare-header">
        <h1>Self Care Hub</h1>
        <p>Your daily dose of wellness and self-love</p>
      </div>

      <div className="selfcare-tabs">
        <button 
          className={`tab-button ${activeTab === 'diary' ? 'active' : ''}`}
          onClick={() => setActiveTab('diary')}
        >
          <i className="fas fa-book"></i> Daily Journal
        </button>
        <button 
          className={`tab-button ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          <i className="fas fa-dumbbell"></i> Workout
        </button>
        <button 
          className={`tab-button ${activeTab === 'skincare' ? 'active' : ''}`}
          onClick={() => setActiveTab('skincare')}
        >
          <i className="fas fa-spa"></i> Skincare
        </button>
        <button 
          className={`tab-button ${activeTab === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveTab('mood')}
        >
          <i className="fas fa-smile"></i> Mood
        </button>
        <button 
          className={`tab-button ${activeTab === 'meditation' ? 'active' : ''}`}
          onClick={() => setActiveTab('meditation')}
        >
          <i className="fas fa-om"></i> Meditation
        </button>
        <button 
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <i className="fas fa-user-circle"></i> Personal Space
        </button>
      </div>

      <div className="selfcare-content">
        {activeTab === 'diary' && (
          <div className="diary-section">
            <div className="diary-prompt">
              <h3>Today's Reflection</h3>
              <p>What made you smile today?</p>
            </div>
            <textarea 
              className="diary-textarea" 
              placeholder="Write your thoughts here..."
              value={diaryEntry}
              onChange={(e) => setDiaryEntry(e.target.value)}
            ></textarea>
            <button className="save-button" onClick={handleSaveDiary}>
              <i className="fas fa-save"></i> Save Entry
            </button>
            
            {diaryEntries.length > 0 && (
              <div className="diary-history">
                <h3>Previous Entries</h3>
                {diaryEntries.map((entry) => (
                  <div key={entry.id} className="diary-entry">
                    <p className="entry-date">{entry.date}</p>
                    <p className="entry-content">{entry.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'workout' && (
          <div className="workout-section">
            <div className="workout-header">
              <h2>Workout Hub</h2>
              <p>Choose your fitness goal and level</p>
            </div>

            <div className="workout-categories">
              <div className="category-section">
                <h3>Beginner Friendly</h3>
                <div className="workout-cards">
                  <div className="workout-card">
                    <div className="workout-video">
                      <iframe 
                        src="https://www.youtube.com/embed/2pLT-olgUJs" 
                        title="Beginner Workout"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h3>{workoutVideos.beginner.title}</h3>
                    <p>{workoutVideos.beginner.duration} • {workoutVideos.beginner.level}</p>
                    <p className="workout-description">{workoutVideos.beginner.description}</p>
                    <a href={workoutVideos.beginner.url} target="_blank" rel="noopener noreferrer" className="start-button">
                      Watch on YouTube
                    </a>
                  </div>
                  <div className="workout-card">
                    <div className="workout-video">
                      <iframe 
                        src="https://www.youtube.com/embed/ASdvN_XEl_c" 
                        title="Core Workout"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h3>{workoutVideos.core.title}</h3>
                    <p>{workoutVideos.core.duration} • {workoutVideos.core.level}</p>
                    <p className="workout-description">{workoutVideos.core.description}</p>
                    <a href={workoutVideos.core.url} target="_blank" rel="noopener noreferrer" className="start-button">
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>

              <div className="category-section">
                <h3>Weight Loss</h3>
                <div className="workout-cards">
                  <div className="workout-card">
                    <div className="workout-video">
                      <iframe 
                        src="https://www.youtube.com/embed/ml6cT4AZdqI" 
                        title="HIIT Workout"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h3>{workoutVideos.weightLoss.title}</h3>
                    <p>{workoutVideos.weightLoss.duration} • {workoutVideos.weightLoss.level}</p>
                    <p className="workout-description">{workoutVideos.weightLoss.description}</p>
                    <a href={workoutVideos.weightLoss.url} target="_blank" rel="noopener noreferrer" className="start-button">
                      Watch on YouTube
                    </a>
                  </div>
                  <div className="workout-card">
                    <div className="workout-video">
                      <iframe 
                        src="https://www.youtube.com/embed/YaXPRqUwItQ" 
                        title="Legs Workout"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h3>{workoutVideos.legs.title}</h3>
                    <p>{workoutVideos.legs.duration} • {workoutVideos.legs.level}</p>
                    <p className="workout-description">{workoutVideos.legs.description}</p>
                    <a href={workoutVideos.legs.url} target="_blank" rel="noopener noreferrer" className="start-button">
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>

              <div className="category-section">
                <h3>Weight Gain & Strength</h3>
                <div className="workout-cards">
                  <div className="workout-card">
                    <div className="workout-video">
                      <iframe 
                        src="https://www.youtube.com/embed/3VcKaXpzqRo" 
                        title="Strength Training"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h3>{workoutVideos.weightGain.title}</h3>
                    <p>{workoutVideos.weightGain.duration} • {workoutVideos.weightGain.level}</p>
                    <p className="workout-description">{workoutVideos.weightGain.description}</p>
                    <a href={workoutVideos.weightGain.url} target="_blank" rel="noopener noreferrer" className="start-button">
                      Watch on YouTube
                    </a>
                  </div>
                  <div className="workout-card">
                    <div className="workout-video">
                      <iframe 
                        src="https://www.youtube.com/embed/sTANio_2E0Q" 
                        title="Yoga Flow"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <h3>{workoutVideos.yoga.title}</h3>
                    <p>{workoutVideos.yoga.duration} • {workoutVideos.yoga.level}</p>
                    <p className="workout-description">{workoutVideos.yoga.description}</p>
                    <a href={workoutVideos.yoga.url} target="_blank" rel="noopener noreferrer" className="start-button">
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>

              <div className="workout-tips">
                <h3>Pro Tips</h3>
                <div className="tips-grid">
                  <div className="tips-category">
                    <h4>Weight Loss Tips</h4>
                    <ul>
                      {workoutTips.weightLoss.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="tips-category">
                    <h4>Weight Gain Tips</h4>
                    <ul>
                      {workoutTips.weightGain.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="tips-category">
                    <h4>Beginner Tips</h4>
                    <ul>
                      {workoutTips.beginner.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skincare' && (
          <div className="skincare-section">
            <div className="skincare-header">
              <h2>Your Skincare Journey</h2>
              <p>Nurture your skin, nurture your soul</p>
            </div>

            <div className="personal-motivation">
              <h3>Your Personal Motivation</h3>
              <div className="motivation-input">
                <textarea
                  placeholder="Why is skincare important to you? What are your personal goals?"
                  value={personalMotivation}
                  onChange={(e) => setPersonalMotivation(e.target.value)}
                  onBlur={handleSaveMotivation}
                />
              </div>
            </div>

            <div className="skincare-goals">
              <h3>Your Skincare Goals</h3>
              <div className="add-goal-form">
                <input
                  type="text"
                  placeholder="Add a new skincare goal..."
                  value={newSkincareGoal}
                  onChange={(e) => setNewSkincareGoal(e.target.value)}
                />
                <button onClick={handleAddSkincareGoal}>Add Goal</button>
              </div>
              <div className="goals-list">
                {skincareGoals.map((goal) => (
                  <div key={goal.id} className="goal-item">
                    <p className="goal-content">{goal.content}</p>
                    <span className="goal-date">{goal.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skincare-routine">
              <h3>Your Personalized Routine</h3>
              <div className="skin-type-selector">
                <h4>What's Your Skin Type?</h4>
                <div className="skin-type-options">
                  {skinTypes.map((type) => (
                    <button
                      key={type.type}
                      className={`skin-type-button ${selectedSkinType === type.type ? 'selected' : ''}`}
                      onClick={() => setSelectedSkinType(type.type)}
                    >
                      {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                    </button>
                  ))}
                </div>
                {selectedSkinType && (
                  <p className="skin-type-description">
                    {skinTypes.find(t => t.type === selectedSkinType)?.description}
                  </p>
                )}
              </div>

              <div className="routine-steps">
                <div className="routine-category">
                  <h4><i className="fas fa-sun"></i> Morning Routine</h4>
                  <ul>
                    {skincareTips.morning.map((tip, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="routine-category">
                  <h4><i className="fas fa-moon"></i> Evening Routine</h4>
                  <ul>
                    {skincareTips.evening.map((tip, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="routine-category">
                  <h4><i className="fas fa-calendar-week"></i> Weekly Care</h4>
                  <ul>
                    {skincareTips.weekly.map((tip, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="skincare-streak">
              <h3>Your Skincare Streak</h3>
              <div className="streak-counter">
                <i className="fas fa-fire"></i>
                <span>{skincareStreak} Days</span>
              </div>
              <p>Keep up the great work! Every day of care counts.</p>
            </div>

            <div className="skincare-tips">
              <h3>Pro Tips</h3>
              <div className="tips-grid">
                <div className="tip-card">
                  <i className="fas fa-tint"></i>
                  <h4>Hydration is Key</h4>
                  <p>Drink at least 8 glasses of water daily for glowing skin</p>
                </div>
                <div className="tip-card">
                  <i className="fas fa-bed"></i>
                  <h4>Beauty Sleep</h4>
                  <p>Get 7-8 hours of sleep for optimal skin regeneration</p>
                </div>
                <div className="tip-card">
                  <i className="fas fa-apple-alt"></i>
                  <h4>Healthy Diet</h4>
                  <p>Eat foods rich in antioxidants and omega-3 fatty acids</p>
                </div>
                <div className="tip-card">
                  <i className="fas fa-wind"></i>
                  <h4>Stress Management</h4>
                  <p>Practice stress-reducing activities to prevent breakouts</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mood' && (
          <div className="mood-section">
            <h2>How are you feeling today?</h2>
            <div className="mood-buttons">
              <button 
                className={`mood-button ${selectedMood === 'great' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('great')}
              >
                <i className="fas fa-grin-stars"></i>
                <span>Great!</span>
              </button>
              <button 
                className={`mood-button ${selectedMood === 'good' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('good')}
              >
                <i className="fas fa-smile"></i>
                <span>Good</span>
              </button>
              <button 
                className={`mood-button ${selectedMood === 'okay' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('okay')}
              >
                <i className="fas fa-meh"></i>
                <span>Okay</span>
              </button>
              <button 
                className={`mood-button ${selectedMood === 'down' ? 'selected' : ''}`}
                onClick={() => handleMoodSelect('down')}
              >
                <i className="fas fa-frown"></i>
                <span>Down</span>
              </button>
            </div>
            {moodHistory.length > 0 && (
              <div className="mood-history">
                <h3>Mood History</h3>
                <div className="mood-history-list">
                  {moodHistory.map((entry) => (
                    <div key={entry.id} className="mood-history-item">
                      <span className="mood-date">{entry.date}</span>
                      <span className={`mood-icon ${entry.mood}`}>
                        <i className={`fas fa-${entry.mood === 'great' ? 'grin-stars' : 
                          entry.mood === 'good' ? 'smile' : 
                          entry.mood === 'okay' ? 'meh' : 'frown'}`}></i>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'meditation' && (
          <div className="meditation-section">
            <div className="meditation-cards">
              <div className="meditation-card">
                <div className="meditation-video">
                  <iframe 
                    src="https://www.youtube.com/embed/1Dv-ldGLnIY" 
                    title="Breathing Exercise"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3>{meditationVideos.breathing.title}</h3>
                <p>{meditationVideos.breathing.duration} • {meditationVideos.breathing.type}</p>
                <a href={meditationVideos.breathing.url} target="_blank" rel="noopener noreferrer" className="start-button">
                  Watch on YouTube
                </a>
              </div>
              <div className="meditation-card">
                <div className="meditation-video">
                  <iframe 
                    src="https://www.youtube.com/embed/1ZYbU82GVz4" 
                    title="Sleep Meditation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3>{meditationVideos.sleep.title}</h3>
                <p>{meditationVideos.sleep.duration} • {meditationVideos.sleep.type}</p>
                <a href={meditationVideos.sleep.url} target="_blank" rel="noopener noreferrer" className="start-button">
                  Watch on YouTube
                </a>
              </div>
              <div className="meditation-card">
                <div className="meditation-video">
                  <iframe 
                    src="https://www.youtube.com/embed/O-6f5wQXSu8" 
                    title="Mindfulness"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3>{meditationVideos.mindfulness.title}</h3>
                <p>{meditationVideos.mindfulness.duration} • {meditationVideos.mindfulness.type}</p>
                <a href={meditationVideos.mindfulness.url} target="_blank" rel="noopener noreferrer" className="start-button">
                  Watch on YouTube
                </a>
              </div>
            </div>
            <div className="meditation-timer">
              <h3>Meditation Timer</h3>
              <div className="timer-display">{formatTime(timer)}</div>
              <div className="timer-controls">
                <button 
                  className="timer-button"
                  onClick={() => handleTimerControl('start')}
                  disabled={isTimerRunning}
                >
                  <i className="fas fa-play"></i>
                </button>
                <button 
                  className="timer-button"
                  onClick={() => handleTimerControl('pause')}
                  disabled={!isTimerRunning}
                >
                  <i className="fas fa-pause"></i>
                </button>
                <button 
                  className="timer-button"
                  onClick={() => handleTimerControl('reset')}
                >
                  <i className="fas fa-redo"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="personal-space-section">
            <div className="personal-grid">
              <div className="important-dates">
                <h3>Important Dates</h3>
                <div className="add-date-form">
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={newDate.title}
                    onChange={(e) => setNewDate({...newDate, title: e.target.value})}
                  />
                  <input
                    type="date"
                    value={newDate.date}
                    onChange={(e) => setNewDate({...newDate, date: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newDate.description}
                    onChange={(e) => setNewDate({...newDate, description: e.target.value})}
                  />
                  <button onClick={handleAddDate}>Add Date</button>
                </div>
                <div className="dates-list">
                  {importantDates.map((date) => (
                    <div key={date.id} className="date-card">
                      <h4>{date.title}</h4>
                      <p className="date">{new Date(date.date).toLocaleDateString()}</p>
                      <p className="description">{date.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="learning-thoughts">
                <h3>Learning Thoughts</h3>
                <div className="add-thought-form">
                  <textarea
                    placeholder="Write your learning thought..."
                    value={newThought.content}
                    onChange={(e) => setNewThought({...newThought, content: e.target.value})}
                  />
                  <select
                    value={newThought.category}
                    onChange={(e) => setNewThought({...newThought, category: e.target.value})}
                  >
                    <option value="general">General</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="achievement">Achievement</option>
                    <option value="lesson">Life Lesson</option>
                  </select>
                  <button onClick={handleAddThought}>Add Thought</button>
                </div>
                <div className="thoughts-list">
                  {learningThoughts.map((thought) => (
                    <div key={thought.id} className={`thought-card ${thought.category}`}>
                      <p className="thought-content">{thought.content}</p>
                      <div className="thought-meta">
                        <span className="category">{thought.category}</span>
                        <span className="date">{thought.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="personal-goals">
                <h3>Personal Goals</h3>
                <div className="add-goal-form">
                  <input
                    type="text"
                    placeholder="Your goal..."
                    value={newGoal.content}
                    onChange={(e) => setNewGoal({...newGoal, content: e.target.value})}
                  />
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button onClick={handleAddGoal}>Add Goal</button>
                </div>
                <div className="goals-list">
                  {personalGoals.map((goal) => (
                    <div key={goal.id} className={`goal-card ${goal.priority} ${goal.completed ? 'completed' : ''}`}>
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        
                      />
                      <div className="goal-content">
                        <p className="goal-text">{goal.content}</p>
                        <div className="goal-meta">
                          <span className="deadline">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                          <span className="priority">{goal.priority} priority</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfCare; 