// Test comment to ensure file editing works
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
  const [skincareGoalInput, setSkincareGoalInput] = useState('');
  const [diaryEntry, setDiaryEntry] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [timer, setTimer] = useState(3600); // 1 hour in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pastMeditations, setPastMeditations] = useState([]);
  
  // Add workout state variables
  const [workoutLog, setWorkoutLog] = useState([]);
  const [newWorkoutEntry, setNewWorkoutEntry] = useState('');

  // Add these new state variables
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formStatus, setFormStatus] = useState('');

  // Add new state variables for personal space
  const [importantDates, setImportantDates] = useState([]);
  const [newDate, setNewDate] = useState({ title: '', date: '', description: '' });
  const [learningThoughts, setLearningThoughts] = useState([]);
  const [newThought, setNewThought] = useState({ content: '', category: 'general' });
  const [skincareGoalsState, setSkincareGoalsState] = useState([]);
  const [generalPersonalGoals, setGeneralPersonalGoals] = useState([]);
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

  // Workout categories data
  const workoutCategories = [
    {
      title: 'Warm-up',
      icon: '🔥',
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

  // YouTube embed component
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

  const handleTimerControl = async (action) => {
    switch (action) {
      case 'start':
        setIsTimerRunning(true);
        break;
      case 'pause':
        setIsTimerRunning(false);
        break;
      case 'reset':
        const initialMeditationTime = 3600; // Define the initial time (1 hour)
        if (timer < initialMeditationTime) { // Only save if some time has passed
          const duration = initialMeditationTime - timer;
          const formattedDuration = formatTime(duration);
          
          try {
            // Save to backend
            const response = await axios.post(`${API_URL}/meditation`, {
              userId: 'user123',
              duration: formattedDuration,
              date: new Date().toLocaleDateString()
            });

            // Update local state with the response from backend
            if (response.data.pastMeditations) {
              setPastMeditations(response.data.pastMeditations);
            } else {
              // If the response doesn't include the updated meditations, add the new meditation to existing ones
              setPastMeditations(prevMeditations => [
                {
                  id: Date.now(),
                  duration: formattedDuration,
                  date: new Date().toLocaleDateString()
                },
                ...prevMeditations
              ]);
            }
          } catch (error) {
            console.error('Error saving meditation session:', error);
            setError('Failed to save meditation session. Please try again.');
          }
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
        const userId = 'user123'; 
        const response = await axios.get(`${API_URL}/${userId}`);
        const data = response.data;
        
        if (data) {
          setImportantDates(data.importantDates || []);
          setLearningThoughts(data.thoughts || []);
          setSkincareGoalsState(data.skincareGoals || []); 
          setGeneralPersonalGoals(data.goals || []); 
          setAchievements(data.achievements || []);
          setDiaryEntries(data.diary || []);
          setMoodHistory(data.moods || []);
          setPastMeditations(data.pastMeditations || []);
          setWorkoutLog(data.workouts || []);
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
      const userId = 'user123'; 
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
        setIsLoading(true);
        setError(null);

        // Save to backend
        const response = await axios.post(`${API_URL}/diary`, {
          userId: 'user123', // This should come from your auth system
          content: diaryEntry,
          date: new Date().toLocaleDateString()
        });

        // If successful, update local state
        if (response.data.message === "Diary entry added") {
          setDiaryEntries(response.data.diary);
          setDiaryEntry(''); // Clear the input field
          setFormStatus('Diary entry saved successfully!');
        } else {
          setError('Failed to save diary entry. Please try again.');
        }
      } catch (error) {
        console.error('Error saving diary entry:', error);
        setError('Failed to save diary entry. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please enter some text before saving.');
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      console.log('Attempting to delete entry:', entryId);
      
      // First update local state for immediate feedback
      const updatedEntries = diaryEntries.filter(entry => entry._id !== entryId);
      setDiaryEntries(updatedEntries);

      // Then save to backend
      const response = await axios.post(`${API_URL}/diary/delete`, {
        userId: 'user123',
        entryId: entryId
      });

      console.log('Delete response:', response.data);

      // If the backend update was successful, we can keep the local state update
      if (response.data.success) {
        setFormStatus('Entry deleted successfully!');
        // Update the diary entries with the response from backend
        if (response.data.diary) {
          setDiaryEntries(response.data.diary);
        }
      } else {
        // If there was an error, revert the local state
        setDiaryEntries(diaryEntries);
        setError('Failed to delete entry. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting diary entry:', error);
      setError('Failed to delete diary entry. Please try again.');
      // Revert to previous state if there's an error
      setDiaryEntries(diaryEntries);
    }
  };

  // Update mood handler
  const handleMoodSelect = async (mood) => {
    try {
      setSelectedMood(mood);
      const newMoodEntry = {
        mood,
        date: new Date().toLocaleDateString()
      };

      // Save to backend
      const response = await axios.post(`${API_URL}/mood`, {
        userId: 'user123', // This should come from your auth system
        mood: mood,
        date: new Date().toLocaleDateString()
      });

      // If successful, update local state
      if (response.data.moods) {
        setMoodHistory(response.data.moods);
      } else {
        // If the response doesn't include the updated moods, add the new mood to existing history
        setMoodHistory(prevMoods => [...prevMoods, { ...newMoodEntry, id: Date.now() }]);
      }
    } catch (error) {
      console.error('Error saving mood:', error);
      setError('Failed to save mood. Please try again.');
    }
  };

  // Personal Space functionality
  const handleAddDate = async () => {
    if (newDate.title.trim() && newDate.date.trim()) {
      try {
        const response = await axios.post(`${API_URL}/important-date`, {
          userId: 'user123',
          title: newDate.title,
          date: new Date(newDate.date).toLocaleDateString(),
          description: newDate.description
        });

        if (response.data.success) {
          setImportantDates(response.data.importantDates);
          setNewDate({ title: '', date: '', description: '' });
          setFormStatus('Date added successfully!');
        }
      } catch (error) {
        console.error('Error saving date:', error);
        setError('Failed to save date. Please try again.');
      }
    }
  };

  const handleDeleteDate = async (dateId) => {
    try {
      const response = await axios.post(`${API_URL}/important-date/delete`, {
        userId: 'user123',
        dateId: dateId
      });

      if (response.data.success) {
        setImportantDates(response.data.importantDates);
        setFormStatus('Date deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting date:', error);
      setError('Failed to delete date. Please try again.');
    }
  };

  const handleEditDate = (date) => {
    setEditingDateId(date.id);
    setEditedDate(date);
  };

  const handleCancelEditDate = () => {
    setEditingDateId(null);
    setEditedDate({ title: '', date: '', description: '' });
  };

  const handleSaveEditedDate = async (dateId) => {
    try {
      const response = await axios.post(`${API_URL}/important-date/update`, {
        userId: 'user123',
        dateId: dateId,
        title: editedDate.title,
        date: new Date(editedDate.date).toLocaleDateString(),
        description: editedDate.description
      });

      if (response.data.success) {
        setImportantDates(response.data.importantDates);
        setEditingDateId(null);
        setEditedDate({ title: '', date: '', description: '' });
        setFormStatus('Date updated successfully!');
      }
    } catch (error) {
      console.error('Error updating date:', error);
      setError('Failed to update date. Please try again.');
    }
  };

  // Update thought handler
  const handleAddThought = async () => {
    if (newThought.content.trim()) {
      try {
        const response = await axios.post(`${API_URL}/learning-thought`, {
          userId: 'user123',
          content: newThought.content,
          category: newThought.category
        });

        if (response.data.success) {
          setLearningThoughts(response.data.thoughts);
          setNewThought({ content: '', category: 'general' });
          setFormStatus('Thought added successfully!');
        }
      } catch (error) {
        console.error('Error saving thought:', error);
        setError('Failed to save thought. Please try again.');
      }
    }
  };

  const handleDeleteThought = async (thoughtId) => {
    try {
      console.log('Attempting to delete thought:', thoughtId);
      
      // First update local state for immediate feedback
      const updatedThoughts = learningThoughts.filter(thought => thought._id !== thoughtId);
      setLearningThoughts(updatedThoughts);

      // Then save to backend
      const response = await axios.post(`${API_URL}/learning-thought/delete`, {
        userId: 'user123',
        thoughtId: thoughtId
      });

      console.log('Delete response:', response.data);

      if (response.data.success) {
        setFormStatus('Thought deleted successfully!');
        if (response.data.thoughts) {
          setLearningThoughts(response.data.thoughts);
        }
      } else {
        setLearningThoughts(learningThoughts);
        setError('Failed to delete thought. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting thought:', error);
      setError('Failed to delete thought. Please try again.');
      setLearningThoughts(learningThoughts);
    }
  };

  // Update goal handler (for skincare goals) - this function is now only for skincare goals
  const handleAddGoal = async () => {
    if (skincareGoalInput.trim()) {
      try {
        // Save to backend
        const response = await axios.post(`${API_URL}/skincare`, {
          userId: 'user123', // This should come from your auth system
          content: skincareGoalInput,
          completed: false
        });

        // If successful, update local state
        if (response.data.skincareGoals) {
          setSkincareGoalsState(response.data.skincareGoals);
        } else {
          // If the response doesn't include the updated goals, add the new goal to existing ones
          setSkincareGoalsState(prevGoals => [
            {
              id: Date.now(),
              content: skincareGoalInput,
              completed: false
            },
            ...prevGoals
          ]);
        }
        setSkincareGoalInput(''); // Clear the input field
        setFormStatus('Goal added successfully!'); // Show success message
      } catch (error) {
        console.error('Error saving skincare goal:', error);
        setError('Failed to save skincare goal. Please try again.');
      }
    } else {
      setError('Please enter a goal before adding.');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      // First update local state for immediate feedback
      const updatedGoals = skincareGoalsState.filter(goal => goal.id !== goalId);
      setSkincareGoalsState(updatedGoals);

      // Then save to backend
      await axios.post(`${API_URL}/skincare/delete`, {
        userId: 'user123',
        goalId: goalId
      });
    } catch (error) {
      console.error('Error deleting skincare goal:', error);
      setError('Failed to delete skincare goal. Please try again.');
      // Revert to previous state if there's an error
      setSkincareGoalsState(skincareGoalsState);
    }
  };

  // Update the handleAddPersonalGoal function
  const handleAddPersonalGoal = async () => {
    if (newGoal.content.trim()) {
      try {
        console.log('Adding new personal goal:', newGoal);
        
        const goalData = {
          userId: 'user123',
          content: newGoal.content,
          deadline: newGoal.deadline,
          priority: newGoal.priority,
          completed: false
        };

        // Save to backend
        const response = await axios.post(`${API_URL}/personal-goal`, goalData);

        console.log('Goal save response:', response.data);

        if (response.data.success) {
          // Update local state with the response from backend
          if (response.data.goals) {
            setGeneralPersonalGoals(response.data.goals);
          } else {
            // If the response doesn't include the updated goals, add the new goal to existing ones
            setGeneralPersonalGoals(prevGoals => [...prevGoals, {
              _id: Date.now().toString(),
              ...goalData
            }]);
          }
          setNewGoal({ content: '', deadline: '', priority: 'medium' });
          setFormStatus('Goal added successfully!');
        } else {
          setError('Failed to save goal. Please try again.');
        }
      } catch (error) {
        console.error('Error saving personal goal:', error);
        setError('Failed to save personal goal. Please try again.');
      }
    }
  };

  // Update the handleDeletePersonalGoal function
  const handleDeletePersonalGoal = async (goalId) => {
    try {
      console.log('Attempting to delete personal goal:', goalId);
      
      // First update local state for immediate feedback
      const updatedGoals = generalPersonalGoals.filter(goal => goal._id !== goalId);
      setGeneralPersonalGoals(updatedGoals);

      // Then save to backend
      const response = await axios.post(`${API_URL}/personal-goal/delete`, {
        userId: 'user123',
        goalId: goalId
      });

      console.log('Delete response:', response.data);

      if (response.data.success) {
        setFormStatus('Goal deleted successfully!');
        if (response.data.goals) {
          setGeneralPersonalGoals(response.data.goals);
        }
      } else {
        setGeneralPersonalGoals(generalPersonalGoals);
        setError('Failed to delete goal. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting personal goal:', error);
      setError('Failed to delete personal goal. Please try again.');
      setGeneralPersonalGoals(generalPersonalGoals);
    }
  };

  // Update achievement handler
  const handleAddAchievement = async () => {
    if (newAchievement.content.trim()) {
      try {
        const response = await axios.post(`${API_URL}/achievement`, {
          userId: 'user123',
          content: newAchievement.content,
          category: newAchievement.category
        });

        if (response.data.success) {
          setAchievements(response.data.achievements);
          setNewAchievement({ content: '', category: 'general' });
          setFormStatus('Achievement added successfully!');
        }
      } catch (error) {
        console.error('Error saving achievement:', error);
        setError('Failed to save achievement. Please try again.');
      }
    }
  };

  const handleDeleteAchievement = async (achievementId) => {
    try {
      console.log('Attempting to delete achievement:', achievementId);
      
      // First update local state for immediate feedback
      const updatedAchievements = achievements.filter(achievement => achievement._id !== achievementId);
      setAchievements(updatedAchievements);

      // Then save to backend
      const response = await axios.post(`${API_URL}/achievement/delete`, {
        userId: 'user123',
        achievementId: achievementId
      });

      console.log('Delete response:', response.data);

      if (response.data.success) {
        setFormStatus('Achievement deleted successfully!');
        if (response.data.achievements) {
          setAchievements(response.data.achievements);
        }
      } else {
        setAchievements(achievements);
        setError('Failed to delete achievement. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting achievement:', error);
      setError('Failed to delete achievement. Please try again.');
      setAchievements(achievements);
    }
  };

  // Workout data is loaded via the main useEffect for all data, so remove redundant localStorage logic here
  useEffect(() => {
    // This useEffect is now empty as workout data is loaded in the main useEffect
  }, []);

  // Workout data is saved via handleLogWorkout using backend API, so remove redundant localStorage logic here
  useEffect(() => {
    // This useEffect is now empty as workout data is saved in handleLogWorkout
  }, [workoutLog]);

  const handleLogWorkout = async () => {
    if (newWorkoutEntry.trim() !== '') {
      try {
        const workoutData = {
          userId: 'user123',
          note: newWorkoutEntry,
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString()
        };

        console.log('Sending workout data:', workoutData);

        // Save to backend
        const response = await axios.post(`${API_URL}/workout`, workoutData);

        console.log('Workout save response:', response.data);

        if (response.data.success) {
          // Update local state with the response from backend
          if (response.data.workouts) {
            setWorkoutLog(response.data.workouts);
          } else {
            // If the response doesn't include the updated workouts, add the new workout to existing ones
            setWorkoutLog(prevLog => [...prevLog, {
              _id: Date.now().toString(),
              note: newWorkoutEntry,
              time: new Date().toLocaleTimeString(),
              date: new Date().toLocaleDateString()
            }]);
          }
          setNewWorkoutEntry('');
          setFormStatus('Workout logged successfully!');
        } else {
          setError('Failed to save workout. Please try again.');
        }
      } catch (error) {
        console.error('Error saving workout:', error);
        setError('Failed to save workout. Please try again.');
      }
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      console.log('Attempting to delete workout:', workoutId);

      // First update local state for immediate feedback
      const updatedLog = workoutLog.filter(workout => workout._id !== workoutId);
      setWorkoutLog(updatedLog);

      // Then save to backend
      const response = await axios.post(`${API_URL}/workout/delete`, {
        userId: 'user123',
        workoutId: workoutId
      });

      console.log('Delete response:', response.data);

      if (response.data.success) {
        setFormStatus('Workout deleted successfully!');
        if (response.data.workouts) {
          setWorkoutLog(response.data.workouts);
        }
      } else {
        setWorkoutLog(workoutLog);
        setError('Failed to delete workout. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
      setError('Failed to delete workout. Please try again.');
      setWorkoutLog(workoutLog);
    }
  };

  // Update the handleDeleteMood function
  const handleDeleteMood = async (moodId) => {
    try {
      console.log('Attempting to delete mood:', moodId);
      
      // First update local state for immediate feedback
      const updatedMoods = moodHistory.filter(mood => mood._id !== moodId);
      setMoodHistory(updatedMoods);

      // Then save to backend
      const response = await axios.post(`${API_URL}/mood/delete`, {
        userId: 'user123',
        moodId: moodId
      });

      console.log('Delete response:', response.data);

      if (response.data.success) {
        setFormStatus('Mood entry deleted successfully!');
        if (response.data.moods) {
          setMoodHistory(response.data.moods);
        }
      } else {
        setMoodHistory(moodHistory);
        setError('Failed to delete mood entry. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting mood entry:', error);
      setError('Failed to delete mood entry. Please try again.');
      setMoodHistory(moodHistory);
    }
  };

  const handleDeleteMeditation = async (meditationId) => {
    try {
      console.log('Attempting to delete meditation:', meditationId);
      
      // First update local state for immediate feedback
      const updatedMeditations = pastMeditations.filter(med => med._id !== meditationId);
      setPastMeditations(updatedMeditations);

      // Then save to backend
      const response = await axios.post(`${API_URL}/meditation/delete`, {
        userId: 'user123',
        meditationId: meditationId
      });

      console.log('Delete response:', response.data);

      if (response.data.success) {
        setFormStatus('Meditation entry deleted successfully!');
        if (response.data.pastMeditations) {
          setPastMeditations(response.data.pastMeditations);
        }
      } else {
        setPastMeditations(pastMeditations);
        setError('Failed to delete meditation entry. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting meditation entry:', error);
      setError('Failed to delete meditation entry. Please try again.');
      setPastMeditations(pastMeditations);
    }
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
              disabled={isLoading}
            ></textarea>
            {error && <p className="error-message">{error}</p>}
            {formStatus && <p className="success-message">{formStatus}</p>}
            <button 
              className="save-button" 
              onClick={handleSaveDiary}
              disabled={isLoading}
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-save"></i>
              )} Save Entry
            </button>
            
            {diaryEntries.length > 0 && (
              <div className="diary-history">
                <h3>Previous Entries</h3>
                {diaryEntries.map((entry) => (
                  <div key={entry._id} className="diary-entry">
                    <button 
                      className="delete-entry"
                      onClick={() => handleDeleteEntry(entry._id)}
                      title="Delete entry"
                      disabled={isLoading}
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
                    value={skincareGoalInput}
                    onChange={(e) => setSkincareGoalInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddGoal();
                      }
                    }}
                  />
                  <button 
                    onClick={handleAddGoal}
                  >
                    Add Goal
                  </button>
                </div>
                <div className="goals-list">
                  {skincareGoalsState.map((goal) => (
                    <div
                      key={goal._id}
                      className={`goal-item ${goal.completed ? 'completed' : ''}`}
                      onClick={async () => {
                        const updatedGoals = skincareGoalsState.map(g =>
                          g._id === goal._id ? { ...g, completed: !g.completed } : g
                        );
                        setSkincareGoalsState(updatedGoals);
                        
                        try {
                          await axios.post(`${API_URL}/skincare/update`, {
                            userId: 'user123',
                            goalId: goal._id,
                            completed: !goal.completed
                          });
                        } catch (error) {
                          console.error('Error updating goal status:', error);
                          setError('Failed to update goal status. Please try again.');
                          setSkincareGoalsState(skincareGoalsState); // Revert on error
                        }
                      }}
                    >
                      <span>{goal.content}</span>
                      <button
                        className="delete-goal"
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            console.log('Attempting to delete skincare goal:', goal._id);
                            
                            // First update local state for immediate feedback
                            const updatedGoals = skincareGoalsState.filter(g => g._id !== goal._id);
                            setSkincareGoalsState(updatedGoals);
                          
                            // Then save to backend
                            const response = await axios.post(`${API_URL}/skincare/delete`, {
                              userId: 'user123',
                              goalId: goal._id
                            });

                            console.log('Delete response:', response.data);

                            if (response.data.success) {
                              setFormStatus('Goal deleted successfully!');
                              if (response.data.skincareGoals) {
                                setSkincareGoalsState(response.data.skincareGoals);
                              }
                            } else {
                              setSkincareGoalsState(skincareGoalsState);
                              setError('Failed to delete goal. Please try again.');
                            }
                          } catch (error) {
                            console.error('Error deleting skincare goal:', error);
                            setError('Failed to delete goal. Please try again.');
                            setSkincareGoalsState(skincareGoalsState);
                          }
                        }}
                      >
                        <i className="fas fa-trash"></i>
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
    
        {activeTab === 'workout' && (
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
                  {workoutLog.map((entry) => (
                    <li key={entry._id}>
                      <span className="log-date">{entry.date}:</span>
                      <span className="log-workout">{entry.note}</span>
                      <button 
                        className="delete-log-entry" 
                        onClick={() => handleDeleteWorkout(entry._id)}
                      >
                        🗑️
                      </button>
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
                    <div key={entry._id} className="mood-history-item">
                      <div className="mood-icon">
                        <i className={`fas fa-${getMoodIcon(entry.mood)}`}></i>
                      </div>
                      <div className="mood-details">
                        <span className="mood-text">{entry.mood}</span>
                        <span className="mood-date">{entry.date}</span>
                      </div>
                      <button 
                        className="delete-mood"
                        onClick={() => handleDeleteMood(entry._id)}
                        title="Delete mood entry"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
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
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <div>
                      <span><i className="fas fa-clock"></i> {video.duration}</span>
                      <span><i className="fas fa-tag"></i> {video.type}</span>
                    </div>
                    <button onClick={() => window.open(video.url, '_blank')}>Start Meditation</button>
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
                <button onClick={() => handleTimerControl('start')} disabled={isTimerRunning}>Start</button>
                <button onClick={() => handleTimerControl('pause')} disabled={!isTimerRunning}>Pause</button>
                <button onClick={() => handleTimerControl('reset')}>Reset</button>
              </div>
              {pastMeditations.length > 0 && (
                <div className="past-meditations">
                  <h4>Past Meditations</h4>
                  <ul>
                    {pastMeditations.map(med => (
                      <li key={med._id}>
                        <span>{med.duration} on {med.date}</span>
                        <button 
                          className="delete-meditation"
                          onClick={() => handleDeleteMeditation(med._id)}
                          title="Delete meditation entry"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
    
        {activeTab === 'personal' && (
          <div className="personal-space-section">
            <h2 className="text-center text-white">Your Personal Space</h2>
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
                    <div key={dateItem._id} className="date-card">
                      {editingDateId === dateItem._id ? (
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
                            <button onClick={() => handleSaveEditedDate(dateItem._id)}>Save</button>
                            <button onClick={() => handleCancelEditDate()}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h4>{dateItem.title}</h4>
                          <p className="date">{dateItem.date}</p>
                          {dateItem.description && <p className="description">{dateItem.description}</p>}
                          <div className="date-actions">
                            <button onClick={() => handleDeleteDate(dateItem._id)} className="delete-button">Delete</button>
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
                        <span className="date">{thought.date}</span>
                        <div className="thought-actions">
                          <span className="category">{thought.category}</span>
                          <button onClick={() => handleDeleteThought(thought._id)} className="delete-button">Delete</button>
                        </div>
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
                  <button onClick={handleAddPersonalGoal}>Add Goal</button>
                </div>
                <div className="goal-list">
                  {generalPersonalGoals.map((goal) => (
                    <div key={goal._id} className={`goal-card ${goal.priority} ${goal.completed ? 'completed' : ''}`}>
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={async () => {
                          try {
                            const response = await axios.post(`${API_URL}/personal-goal/update`, {
                              userId: 'user123',
                              goalId: goal._id,
                              completed: !goal.completed
                            });

                            if (response.data.success) {
                              const updatedGoals = generalPersonalGoals.map(g =>
                                g._id === goal._id ? { ...g, completed: !g.completed } : g
                              );
                              setGeneralPersonalGoals(updatedGoals);
                            }
                          } catch (error) {
                            console.error('Error updating goal status:', error);
                            setError('Failed to update goal status. Please try again.');
                          }
                        }}
                      />
                      <span className="goal-content">
                        <div className="goal-main-info">
                          <span className="goal-text">{goal.content}</span>
                        </div>
                        {goal.deadline && <span className="goal-deadline">Deadline: {goal.deadline}</span>}
                        <div className="goal-action-row">
                          <span className="goal-priority">{goal.priority} Priority</span>
                          <button onClick={() => handleDeletePersonalGoal(goal._id)} className="delete-button">Delete</button>
                        </div>
                      </span>
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
                  <input
                    type="date"
                    value={newAchievement.date}
                    onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
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
                      <span className="achievement-date">{achievement.date}</span>
                      <div className="achievement-meta">
                        <span className="category">{achievement.category}</span>
                        <button onClick={() => handleDeleteAchievement(achievement._id)} className="delete-button">Delete</button>
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