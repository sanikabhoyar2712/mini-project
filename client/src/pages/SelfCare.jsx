import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Workout from './Workout';
import './SelfCare.css';
import SelfCareBgImage from '../assets/selfcarebackground.jpg';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/selfcare';

const getMoodIcon = (mood) => {
  switch (mood) {
    case 'great':
      return 'grin-stars';
    case 'good':
      return 'smile';
    case 'okay':
      return 'meh';
    case 'down':
      return 'frown';
    default:
      return 'question-circle';
  }
};

const getYouTubeEmbedUrl = (url) => {
  const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&\n?#]+)/);
  return videoIdMatch && videoIdMatch[1] ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=0&controls=1&showinfo=0&rel=0` : null;
};

const SelfCare = () => {
  const [activeTab, setActiveTab] = useState('skincare');
  const [newSkincareGoal, setNewSkincareGoal] = useState('');
  const [diaryEntry, setDiaryEntry] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [timer, setTimer] = useState(3600); // 1 hour in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pastMeditations, setPastMeditations] = useState([]);
  
  // Add these new state variables
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formStatus, setFormStatus] = useState('');

  // Add new state variables for personal space
  const [importantDates, setImportantDates] = useState([]);
  const [newDate, setNewDate] = useState({ title: '', date: '', description: '' });
  const [learningThoughts, setLearningThoughts] = useState([]);
  const [newThought, setNewThought] = useState({ content: '', category: 'general' });
  const [personalGoals, setPersonalGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ content: '', deadline: '', priority: 'medium' });
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({ content: '', category: 'general' });

  // Meditation videos
  const meditationVideos = {
    breathing: {
      title: "Breathing Exercise",
      type: "Calming",
      url: "https://www.youtube.com/watch?v=1Dv-ldGLnIY"
    },
    sleep: {
      title: "Sleep Meditation",
      type: "Relaxing",
      url: "https://www.youtube.com/watch?v=1ZYbU82GVz4"
    },
    mindfulness: {
      title: "Mindfulness",
      type: "Focus",
      url: "https://www.youtube.com/watch?v=O-6f5wQXSu8"
    },
    mindfulness20Min: {
      title: "Mindfulness Meditation in 20 Minutes",
      duration: "20 minutes",
      type: "Mindfulness",
      url: "https://www.youtube.com/watch?v=64ZU2UCQdmQ"
    },
    fiveMinMeditation: {
      title: "5-Minute Meditation You Can Do Anywhere",
      duration: "5 minutes",
      type: "Quick Relief",
      url: "https://www.youtube.com/watch?v=inpok4MKVLM"
    },
    blissfulRelaxation: {
      title: "Guided Meditation - Blissful Deep Relaxation",
      duration: "~30 minutes", // Approximating duration
      type: "Relaxation",
      url: "https://www.youtube.com/watch?v=Jyy0ra2WcQQ"
    }
  };

  // Add state for editing important dates
  const [editingDateId, setEditingDateId] = useState(null);
  const [editedDate, setEditedDate] = useState({ title: '', date: '', description: '' });

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

  // Add new skincare categories
  const skincareCategories = [
    {
      title: "Morning Routine",
      icon: "sun",
      tips: skincareTips.morning
    },
    {
      title: "Evening Routine",
      icon: "moon",
      tips: skincareTips.evening
    },
    {
      title: "Weekly Care",
      icon: "calendar-week",
      tips: skincareTips.weekly
    },
    {
      title: "Face Masks",
      icon: "spa",
      tips: [
        "Use clay masks for oily skin",
        "Hydrating masks for dry skin",
        "Sheet masks for quick hydration",
        "Exfoliating masks once a week",
        "Charcoal masks for deep cleansing"
      ]
    },
    {
      title: "Serums & Treatments",
      icon: "tint",
      tips: [
        "Vitamin C for brightening",
        "Hyaluronic acid for hydration",
        "Retinol for anti-aging",
        "Niacinamide for oil control",
        "Peptides for firming"
      ]
    },
    {
      title: "Skincare Tools",
      icon: "tools",
      tips: [
        "Use facial rollers for circulation",
        "Guasha for lymphatic drainage",
        "LED masks for skin concerns",
        "Facial steamers for deep cleansing",
        "Ice rollers for puffiness"
      ]
    }
  ];

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
        // Save the completed meditation duration before resetting
        const initialMeditationTime = 3600; // Define the initial time (1 hour)
        if (timer < initialMeditationTime) { // Only save if some time has passed
          const duration = initialMeditationTime - timer;
          const newMeditation = {
            id: Date.now(),
            duration: formatTime(duration),
            date: new Date().toLocaleDateString()
          };
          setPastMeditations(prevMeditations => {
            const updatedMeditations = [...prevMeditations, newMeditation];
            localStorage.setItem('pastMeditations', JSON.stringify(updatedMeditations));
            return updatedMeditations;
          });
        }
        setTimer(initialMeditationTime);
        setIsTimerRunning(false);
        break;
      default:
        break;
    }
  };

  // Load data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // For now, using a hardcoded userId. In a real app, this would come from authentication
        const userId = 'user123';
        const response = await axios.get(`${API_URL}/${userId}`);
        const data = response.data;
        
        if (data) {
          setImportantDates(data.importantDates || []);
          setLearningThoughts(data.thoughts || []);
          setPersonalGoals(data.goals || []);
          setAchievements(data.achievements || []);
          setDiaryEntries(data.diaryEntries || []);
          setMoodHistory(data.moods || []);
          setPastMeditations(data.pastMeditations || []);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load saved data. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to backend
  const saveData = async (data) => {
    try {
      const userId = 'user123'; // Same as above, would come from auth in real app
      await axios.post(API_URL, {
        userId,
        updatedData: data
      });
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Failed to save data. Please try again.');
    }
  };

  // Update diary entry handler
  const handleSaveDiary = async () => {
    if (diaryEntry.trim()) {
      try {
        const newEntry = {
          content: diaryEntry,
          date: new Date().toLocaleDateString()
        };

        // First save to backend
        const response = await axios.post(`${API_URL}/diary`, {
          userId: 'user123', // This should come from your auth system
          content: diaryEntry,
          date: new Date().toLocaleDateString()
        });

        // If successful, update local state
        if (response.data.diary) {
          setDiaryEntries(response.data.diary);
          setDiaryEntry('');
          setFormStatus('Diary entry saved successfully!');
        }
      } catch (error) {
        console.error('Error saving diary entry:', error);
        setError('Failed to save diary entry. Please try again.');
      }
    }
  };

  const handleDeleteEntry = (entryId) => {
    const updatedEntries = diaryEntries.filter(entry => entry.id !== entryId);
    setDiaryEntries(updatedEntries);
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
  };

  // Update mood handler
  const handleMoodSelect = async (mood) => {
    try {
      setSelectedMood(mood);
      const newMoodEntry = {
        id: Date.now(),
        mood,
        date: new Date().toLocaleDateString()
      };
      const updatedMoods = [...moodHistory, newMoodEntry];
      setMoodHistory(updatedMoods);
      await saveData({ moods: updatedMoods });
    } catch (error) {
      console.error('Error saving mood:', error);
      setError('Failed to save mood. Please try again.');
    }
  };

  // Personal Space functionality
  const handleAddDate = async () => {
    if (newDate.title.trim() && newDate.date.trim()) {
      try {
        const dateToAdd = {
          id: Date.now(),
          ...newDate,
          date: new Date(newDate.date).toLocaleDateString()
        };
        const updatedDates = [...importantDates, dateToAdd];
        setImportantDates(updatedDates);
        setNewDate({ title: '', date: '', description: '' });
        await saveData({ importantDates: updatedDates });
      } catch (error) {
        console.error('Error saving date:', error);
        setError('Failed to save date. Please try again.');
      }
    }
  };

  const handleDeleteDate = (dateId) => {
    const updatedDates = importantDates.filter(date => date.id !== dateId);
    setImportantDates(updatedDates);
    localStorage.setItem('importantDates', JSON.stringify(updatedDates));
  };

  const handleEditDate = (date) => {
    setEditingDateId(date.id);
    setEditedDate(date);
  };

  const handleCancelEditDate = () => {
    setEditingDateId(null);
    setEditedDate({ title: '', date: '', description: '' });
  };

  const handleSaveEditedDate = (dateId) => {
    const updatedDates = importantDates.map(date => 
      date.id === dateId ? { ...editedDate, date: new Date(editedDate.date).toLocaleDateString() } : date
    );
    setImportantDates(updatedDates);
    localStorage.setItem('importantDates', JSON.stringify(updatedDates));
    setEditingDateId(null);
    setEditedDate({ title: '', date: '', description: '' });
  };

  // Update thought handler
  const handleAddThought = async () => {
    if (newThought.content.trim()) {
      try {
        const thoughtToAdd = {
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          ...newThought,
        };
        const updatedThoughts = [...learningThoughts, thoughtToAdd];
        setLearningThoughts(updatedThoughts);
        setNewThought({ content: '', category: 'general' });
        await saveData({ thoughts: updatedThoughts });
      } catch (error) {
        console.error('Error saving thought:', error);
        setError('Failed to save thought. Please try again.');
      }
    }
  };

  const handleDeleteThought = (thoughtId) => {
    setLearningThoughts(learningThoughts.filter(thought => thought.id !== thoughtId));
    localStorage.setItem('learningThoughts', JSON.stringify(learningThoughts.filter(thought => thought.id !== thoughtId)));
  };

  // Update goal handler
  const handleAddGoal = async () => {
    if (newGoal.content.trim()) {
      try {
        const goalToAdd = {
          id: Date.now(),
          content: newGoal.content,
          deadline: newGoal.deadline,
          priority: newGoal.priority,
          completed: false
        };
        const updatedGoals = [...personalGoals, goalToAdd];
        setPersonalGoals(updatedGoals);
        setNewGoal({ content: '', deadline: '', priority: 'medium' });
        await saveData({ goals: updatedGoals });
      } catch (error) {
        console.error('Error saving goal:', error);
        setError('Failed to save goal. Please try again.');
      }
    }
  };

  const handleDeleteGoal = (goalId) => {
    const updatedGoals = personalGoals.filter(goal => goal.id !== goalId);
    setPersonalGoals(updatedGoals);
    localStorage.setItem('personalGoals', JSON.stringify(updatedGoals));
  };

  // Update achievement handler
  const handleAddAchievement = async () => {
    if (newAchievement.content.trim()) {
      try {
        const achievementToAdd = {
          id: Date.now(),
          date: new Date().toLocaleDateString(),
          ...newAchievement,
        };
        const updatedAchievements = [...achievements, achievementToAdd];
        setAchievements(updatedAchievements);
        setNewAchievement({ content: '', category: 'general' });
        await saveData({ achievements: updatedAchievements });
      } catch (error) {
        console.error('Error saving achievement:', error);
        setError('Failed to save achievement. Please try again.');
      }
    }
  };

  const handleDeleteAchievement = (achievementId) => {
    setAchievements(achievements.filter(achievement => achievement.id !== achievementId));
    localStorage.setItem('achievements', JSON.stringify(achievements.filter(achievement => achievement.id !== achievementId)));
  };

  return (
    <div className="selfcare-container" style={{ backgroundImage: `url(${SelfCareBgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <div className="selfcare-header">
        <div className="selfcare-intro">
          <p className="selfcare-quote">"Caring for your body, mind, and spirit is your greatest and grandest responsibility. It's about listening to the needs of your soul."
            <br /><span className="quote-author">- Kristen Butler</span>
          </p>
        </div>
      </div>

      <div className="selfcare-tabs">
        <button 
          className={`tab-button ${activeTab === 'diary' ? 'active' : ''}`}
          onClick={() => setActiveTab('diary')}
        >
          <i className="fas fa-book"></i> Daily Journal
        </button>
        <button 
          className={`tab-button ${activeTab === 'skincare' ? 'active' : ''}`}
          onClick={() => setActiveTab('skincare')}
        >
          <i className="fas fa-spa"></i> Skincare
        </button>
        <button
          className={`tab-button ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          Workout
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
        {/* Background Image */}
        <div className="background-video-container">
          <img className="background-video" src={SelfCareBgImage} alt="Self Care Background" />
        </div>
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
                    <button 
                      className="delete-entry"
                      onClick={() => handleDeleteEntry(entry.id)}
                      title="Delete entry"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <p className="entry-date">{entry.date}</p>
                    <p className="entry-content">{entry.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
            )}

            {activeTab === 'skincare' && (
              <div className="skincare-section">
                <div className="goals-section">
                  <h3>MY SKINCARE GOALS</h3>
                  <div className="goals-content">
                    <div className="add-goal">
                      <input
                        type="text"
                        placeholder="Add a new skincare goal (e.g., Drink more water)"
                        value={newSkincareGoal}
                        onChange={(e) => setNewSkincareGoal(e.target.value)}
                      />
                      <button onClick={handleAddGoal}>Add Goal</button>
                    </div>
                    <div className="goals-list">
                      {personalGoals.map((goal) => (
                        <div
                          key={goal.id}
                          className={`goal-item ${goal.completed ? 'completed' : ''}`}
                          onClick={() => {
                            const updatedGoals = personalGoals.map(g =>
                              g.id === goal.id ? { ...g, completed: !g.completed } : g
                            );
                            setPersonalGoals(updatedGoals);
                            localStorage.setItem('personalGoals', JSON.stringify(updatedGoals));
                          }}
                        >
                          <span>{goal.content}</span>
                          <button
                            className="delete-goal"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGoal(goal.id);
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
    
                <div className="routine-steps">
                  <h3>MY SKINCARE ROUTINE</h3>
                  {skincareCategories.map((category, index) => (
                    <div key={index} className="routine-category">
                      <h4><i className={`fas fa-${category.icon}`}></i> {category.title}</h4>
                      <ul>
                        {category.tips.map((tip, tipIndex) => (
                          <li key={tipIndex}><i className="fas fa-check-circle"></i> {tip}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
    
                <div className="skincare-tips">
                  <h3>SKINCARE TIPS</h3>
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
                    <div className="tip-card">
                      <i className="fas fa-sun"></i>
                      <h4>Sun Protection</h4>
                      <p>Always wear SPF 30+ sunscreen, even on cloudy days</p>
                    </div>
                    <div className="tip-card">
                      <i className="fas fa-magic"></i>
                      <h4>Gentle Exfoliation</h4>
                      <p>Exfoliate 1-2 times weekly to remove dead skin cells</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
    
            {activeTab === 'workout' && <Workout /> }
    
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
                          <div className="mood-icon">
                            <i className={`fas fa-${getMoodIcon(entry.mood)}`}></i>
                          </div>
                          <div className="mood-details">
                            <span className="mood-text">{entry.mood}</span>
                            <span className="mood-date">{entry.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
    
            {activeTab === 'meditation' && (
              <div className="meditation-section">
                <h2>Find Your Inner Peace</h2>
                <div className="meditation-grid">
                  {Object.entries(meditationVideos).map(([key, video]) => (
                    <div key={key} className="meditation-card">
                      <div className="meditation-video-preview">
                        <iframe
                          src={getYouTubeEmbedUrl(video.url)}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={video.title}
                        ></iframe>
                      </div>
                      <div className="meditation-info">
                        <h3 className="meditation-card-title">{video.title}</h3>
                        <p className="meditation-description">{video.description}</p>
                        <div className="meditation-meta">
                          <span><i className="fas fa-clock"></i> {video.duration}</span>
                          <span><i className="fas fa-tag"></i> {video.type}</span>
                        </div>
                        <button className="start-button" onClick={() => window.open(video.url, '_blank')}>Start Meditation</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="meditation-timer">
                  <h3>Meditation Timer</h3>
                  <div className="timer-display">
                    <span>{formatTime(timer)}</span>
                  </div>
                  <div className="timer-controls">
                    <button onClick={() => handleTimerControl('start')} disabled={isTimerRunning} className="timer-button">Start</button>
                    <button onClick={() => handleTimerControl('pause')} disabled={!isTimerRunning} className="timer-button">Pause</button>
                    <button onClick={() => handleTimerControl('reset')} className="timer-button">Reset</button>
                  </div>
                  {pastMeditations.length > 0 && (
                    <div className="past-meditations">
                      <h4>Past Meditations</h4>
                      <ul>
                        {pastMeditations.map(med => (
                          <li key={med.id}>{med.duration} on {med.date}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
    
            {activeTab === 'personal' && (
              <div className="personal-space-section">
                <h2>Your Personal Space</h2>
                <div className="personal-grid">
                  {/* Important Dates Section */}
                  <div className="important-dates glass-card">
                    <h3>Important Dates</h3>
                    <div className="add-date-form">
                      <input
                        type="text"
                        placeholder="Event Title"
                        value={newDate.title}
                        onChange={(e) => setNewDate({ ...newDate, title: e.target.value })}
                      />
                      <input
                        type="date"
                        value={newDate.date}
                        onChange={(e) => setNewDate({ ...newDate, date: e.target.value })}
                      />
                      <textarea
                        placeholder="Description (optional)"
                        value={newDate.description}
                        onChange={(e) => setNewDate({ ...newDate, description: e.target.value })}
                      ></textarea>
                      <button onClick={handleAddDate}>Add Date</button>
                    </div>
                    <div className="date-list">
                      {importantDates.map((dateItem) => (
                        <div key={dateItem.id} className="date-card">
                          {editingDateId === dateItem.id ? (
                            <>
                              <input
                                type="text"
                                value={editedDate.title}
                                onChange={(e) => setEditedDate({ ...editedDate, title: e.target.value })}
                              />
                              <input
                                type="date"
                                value={editedDate.date}
                                onChange={(e) => setEditedDate({ ...editedDate, date: e.target.value })}
                              />
                              <textarea
                                value={editedDate.description}
                                onChange={(e) => setEditedDate({ ...editedDate, description: e.target.value })}
                              ></textarea>
                              <div className="date-actions">
                                <button onClick={() => handleSaveEditedDate(dateItem.id)}>Save</button>
                                <button onClick={handleCancelEditDate}>Cancel</button>
                              </div>
                            </>
                          ) : (
                            <>
                              <h4>{dateItem.title}</h4>
                              <p className="date">{dateItem.date}</p>
                              {dateItem.description && <p className="description">{dateItem.description}</p>}
                              <div className="date-actions">
                                <button onClick={() => handleEditDate(dateItem)}>Edit</button>
                                <button onClick={() => handleDeleteDate(dateItem.id)}>Delete</button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
    
                  {/* Learning & Thoughts Section */}
                  <div className="learning-thoughts glass-card">
                    <h3>Learning & Thoughts</h3>
                    <div className="add-thought-form">
                      <textarea
                        placeholder="What's on your mind?"
                        value={newThought.content}
                        onChange={(e) => setNewThought({ ...newThought, content: e.target.value })}
                      ></textarea>
                      <select
                        value={newThought.category}
                        onChange={(e) => setNewThought({ ...newThought, category: e.target.value })}
                      >
                        <option value="general">General</option>
                        <option value="inspiration">Inspiration</option>
                        <option value="lesson">Lesson Learned</option>
                      </select>
                      <button onClick={handleAddThought}>Add Thought</button>
                    </div>
                    <div className="thought-list">
                      {learningThoughts.map((thought) => (
                        <div key={thought.id} className={`thought-card ${thought.category}`}>
                          <p className="thought-content">{thought.content}</p>
                          <div className="thought-meta">
                            <span className="category">{thought.category}</span>
                            <span className="date">{thought.date}</span>
                            <button onClick={() => handleDeleteThought(thought.id)}>Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
    
                  {/* Personal Goals Section */}
                  <div className="personal-goals glass-card">
                    <h3>Personal Goals</h3>
                    <div className="add-goal-form">
                      <input
                        type="text"
                        placeholder="Set a new goal..."
                        value={newGoal.content}
                        onChange={(e) => setNewGoal({ ...newGoal, content: e.target.value })}
                      />
                      <input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                      />
                      <select
                        value={newGoal.priority}
                        onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                      <button onClick={handleAddGoal}>Add Goal</button>
                    </div>
                    <div className="goal-list">
                      {personalGoals.map((goal) => (
                        <div key={goal.id} className={`goal-card ${goal.priority} ${goal.completed ? 'completed' : ''}`}>
                          <input
                            type="checkbox"
                            checked={goal.completed}
                            onChange={() => {
                              const updatedGoals = personalGoals.map(g =>
                                g.id === goal.id ? { ...g, completed: !g.completed } : g
                              );
                              setPersonalGoals(updatedGoals);
                              localStorage.setItem('personalGoals', JSON.stringify(updatedGoals));
                            }}
                          />
                          <span className="goal-content">
                            <span className="goal-text">{goal.content}</span>
                            {goal.deadline && <span className="goal-deadline">Deadline: {goal.deadline}</span>}
                          </span>
                          <div className="goal-meta">
                            <span className="goal-priority">{goal.priority} Priority</span>
                            <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
    
                  {/* Achievements Section */}
                  <div className="achievements-section glass-card">
                    <h3>My Achievements</h3>
                    <div className="add-achievement-form">
                      <input
                        type="text"
                        placeholder="Add a new achievement..."
                        value={newAchievement.content}
                        onChange={(e) => setNewAchievement({ ...newAchievement, content: e.target.value })}
                      />
                      <select
                        value={newAchievement.category}
                        onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
                      >
                        <option value="general">General</option>
                        <option value="fitness">Fitness</option>
                        <option value="academic">Academic</option>
                        <option value="personal">Personal</option>
                      </select>
                      <button onClick={handleAddAchievement}>Add Achievement</button>
                    </div>
                    <div className="achievement-list">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className={`achievement-card ${achievement.category}`}>
                          <p className="achievement-content">{achievement.content}</p>
                          <div className="achievement-meta">
                            <span className="category">{achievement.category}</span>
                            <span className="date">{achievement.date}</span>
                            <button onClick={() => handleDeleteAchievement(achievement.id)}>Delete</button>
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
    