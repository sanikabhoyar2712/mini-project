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
  const [timerInterval, setTimerInterval] = useState(null);

  // Add new state variables for personal space
  const [importantDates, setImportantDates] = useState([]);
  const [newDate, setNewDate] = useState({ title: '', date: '', description: '' });
  const [learningThoughts, setLearningThoughts] = useState([]);
  const [newThought, setNewThought] = useState({ content: '', category: 'general' });
  const [personalGoals, setPersonalGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ content: '', deadline: '', priority: 'medium' });

  // Add new state variables for achievements
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({ content: '', category: 'general' });

  // Workout videos
  const workoutVideos = {
    beginner: {
      title: "Beginner Full Body Workout",
      duration: "20 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=2pLT-olgUJs",
      description: "Perfect for those just starting their fitness journey",
      thumbnail: "https://img.youtube.com/vi/2pLT-olgUJs/maxresdefault.jpg"
    },
    beginnerFatBurn: {
      title: "20 min Fat Burning Workout for TOTAL BEGINNERS",
      duration: "20 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=IT94xC35u6k",
      description: "A 20-minute workout to burn fat, designed for total beginners.",
      thumbnail: "https://img.youtube.com/vi/IT94xC35u6k/maxresdefault.jpg"
    },
    beginnerLowImpact: {
      title: "Fun, low impact workout for TOTAL beginners",
      duration: "~20 minutes", // Approximating duration
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=H0c-4nZjIWQ",
      description: "A fun and gentle workout suitable for those new to exercise.",
      thumbnail: "https://img.youtube.com/vi/H0c-4nZjIWQ/maxresdefault.jpg"
    },
    weightLoss: {
      title: "WEIGHT LOSS in 7 DAYS - 40MIN Full Body Fat Burn",
      duration: "40 minutes",
      level: "Intermediate",
      url: "https://www.youtube.com/watch?v=Ammb_7sv_KA",
      description: "Effective full body workout for fat burning",
      thumbnail: "https://img.youtube.com/vi/Ammb_7sv_KA/maxresdefault.jpg"
    },
    weightLossStanding: {
      title: "FULL BODY FAT LOSS in 14 Days - Standing",
      duration: "30 minutes",
      level: "Intermediate",
      url: "https://www.youtube.com/watch?v=-qcA-GqCVeI",
      description: "A non-stop standing full body workout for fat loss.",
      thumbnail: "https://img.youtube.com/vi/-qcA-GqCVeI/maxresdefault.jpg"
    },
    weightLoss10Days: {
      title: "Lose 5 Kg in 10 Days - At Home Workout",
      duration: "~30 minutes", // Approximating duration
      level: "Intermediate", // Assuming Intermediate
      url: "https://www.youtube.com/watch?v=emtmqKFGhw4",
      description: "An effective at-home workout routine for weight loss.",
      thumbnail: "https://img.youtube.com/vi/emtmqKFGhw4/maxresdefault.jpg"
    },
    weightLossBellyFat: {
      title: "7 DAY CHALLENGE 7 MINUTE WORKOUT TO LOSE BELLY FAT",
      duration: "7 minutes",
      level: "Beginner", // Assuming Beginner based on title
      url: "https://www.youtube.com/watch?v=yL_dE81O_mw",
      description: "A quick 7-minute workout focusing on losing belly fat.",
      thumbnail: "https://img.youtube.com/vi/yL_dE81O_mw/maxresdefault.jpg"
    },
    weightLossExercises: {
      title: "14 BEST EXERCISES TO LOSE WEIGHT AT HOME",
      duration: "~10 minutes", // Approximating duration based on typical exercise lists
      level: "All Levels", // Exercises can often be modified
      url: "https://www.youtube.com/watch?v=TM4WOHTnnFU",
      description: "Learn 14 effective exercises you can do at home for weight loss.",
      thumbnail: "https://img.youtube.com/vi/TM4WOHTnnFU/maxresdefault.jpg"
    },
    weightGain: {
      title: "Strength Training for Muscle Gain",
      duration: "30 minutes",
      level: "Intermediate",
      url: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
      description: "Build muscle and increase strength",
      thumbnail: "https://img.youtube.com/vi/3VcKaXpzqRo/maxresdefault.jpg"
    },
    yoga: {
      title: "Morning Yoga Flow",
      duration: "15 minutes",
      level: "All Levels",
      url: "https://www.youtube.com/watch?v=sTANio_2E0Q",
      description: "Start your day with energy and flexibility",
      thumbnail: "https://img.youtube.com/vi/sTANio_2E0Q/maxresdefault.jpg"
    },
    core: {
      title: "Core Strength & Planks",
      duration: "15 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
      description: "Strengthen your core and improve posture",
      thumbnail: "https://img.youtube.com/vi/ASdvN_XEl_c/maxresdefault.jpg"
    },
    legs: {
      title: "20 Min Lower Body Workout - Glutes & Legs",
      duration: "20 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=AA3WRECMiSg",
      description: "Effective no-equipment workout for toning legs and glutes",
      thumbnail: "https://img.youtube.com/vi/AA3WRECMiSg/maxresdefault.jpg"
    },
    fullBodySmallSpace: {
      title: "30 Min Full Body Workout - Small Space",
      duration: "30 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=73NEi4HzHPs",
      description: "A complete full body workout suitable for small spaces.",
      thumbnail: "https://img.youtube.com/vi/73NEi4HzHPs/maxresdefault.jpg"
    },
    beginnerNoEquipment: {
      title: "20 min TOTAL BEGINNER FULL BODY Workout (No Equipment)",
      duration: "20 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=ZeJLIdQenTo",
      description: "A full body workout perfect for total beginners with no equipment.",
      thumbnail: "https://img.youtube.com/vi/ZeJLIdQenTo/maxresdefault.jpg"
    },
    fullBodyStrength1: {
      title: "FULL BODY Workout To Strengthen Muscle!",
      duration: "~45 minutes", // Approximating duration
      level: "Intermediate", // Assuming Intermediate
      url: "https://m.youtube.com/watch?v=ryIe1i91EbM",
      description: "A full body workout focused on building muscle strength.",
      thumbnail: "https://img.youtube.com/vi/ryIe1i91EbM/maxresdefault.jpg"
    },
    fullBodyStrength2: {
      title: "30 minute NO REPEAT Full Body Strength Training",
      duration: "30 minutes",
      level: "Intermediate", // Assuming Intermediate
      url: "https://www.youtube.com/watch?v=tj0o8aH9vJw",
      description: "A 30 minute no repeat full body strength training routine.",
      thumbnail: "https://img.youtube.com/vi/tj0o8aH9vJw/maxresdefault.jpg"
    },
    yogaFlow: {
      title: "20 MIN FEEL GOOD YOGA",
      duration: "20 minutes",
      level: "All Levels",
      url: "https://www.youtube.com/watch?v=poZBpvLTHNw",
      description: "A yoga flow to stretch and feel good.",
      thumbnail: "https://img.youtube.com/vi/poZBpvLTHNw/maxresdefault.jpg"
    },
    yogaStrength: {
      title: "40 MIN YOGA WORKOUT",
      duration: "40 minutes",
      level: "Intermediate", // Assuming Intermediate
      url: "https://www.youtube.com/watch?v=uqJ-jANozcE",
      description: "A full body yoga flow for strength.",
      thumbnail: "https://img.youtube.com/vi/uqJ-jANozcE/maxresdefault.jpg"
    },
    weightLossBeginnerFatBurn: {
      title: "20 min Fat Burning Workout for TOTAL BEGINNERS",
      duration: "20 minutes",
      level: "Beginner",
      url: "https://www.youtube.com/watch?v=IT94xC35u6k",
      description: "A 20-minute workout to burn fat, designed for total beginners.",
      thumbnail: "https://img.youtube.com/vi/IT94xC35u6k/maxresdefault.jpg"
    },
    weightLossBellyFat: {
      title: "7 DAY CHALLENGE 7 MINUTE WORKOUT TO LOSE BELLY FAT",
      duration: "7 minutes",
      level: "Beginner", // Assuming Beginner based on title
      url: "https://www.youtube.com/watch?v=yL_dE81O_mw",
      description: "A quick 7-minute workout focusing on losing belly fat.",
      thumbnail: "https://img.youtube.com/vi/yL_dE81O_mw/maxresdefault.jpg"
    },
    weightLossExercises: {
      title: "14 BEST EXERCISES TO LOSE WEIGHT AT HOME",
      duration: "~10 minutes", // Approximating duration based on typical exercise lists
      level: "All Levels", // Exercises can often be modified
      url: "https://www.youtube.com/watch?v=TM4WOHTnnFU",
      description: "Learn 14 effective exercises you can do at home for weight loss.",
      thumbnail: "https://img.youtube.com/vi/TM4WOHTnnFU/maxresdefault.jpg"
    },
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
    ],
    healthyDiet: [
      "Eat plenty of fruits and vegetables",
      "Choose lean protein sources",
      "Include healthy fats in your diet",
      "Limit processed foods and sugary drinks",
      "Control portion sizes"
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

  // Update skincare state
  const [skincareStreak, setSkincareStreak] = useState(0);
  const [lastSkincareDate, setLastSkincareDate] = useState(null);
  const [selectedSkinType, setSelectedSkinType] = useState('');
  const [personalMotivation, setPersonalMotivation] = useState('');
  const [skincareGoals, setSkincareGoals] = useState([]);
  const [newSkincareGoal, setNewSkincareGoal] = useState('');

  // Add state for editing personal motivation
  const [isEditingMotivation, setIsEditingMotivation] = useState(false);
  const [editedMotivation, setEditedMotivation] = useState('');
  const [motivationDate, setMotivationDate] = useState(null); // Add state for motivation date

  // Add state for editing important dates
  const [editingDateId, setEditingDateId] = useState(null);
  const [editedDate, setEditedDate] = useState({ title: '', date: '', description: '' });

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

  // Update skincare images with professional images
  const skincareImages = {
    morning: null,
    evening: null,
    weekly: null,
    masks: null,
    serums: null,
    tools: null
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

  const handleDeleteEntry = (entryId) => {
    const updatedEntries = diaryEntries.filter(entry => entry.id !== entryId);
    setDiaryEntries(updatedEntries);
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
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
    const savedMotivation = localStorage.getItem('personalMotivation'); // This will now be a stringified object
    const savedAchievements = localStorage.getItem('achievements');
    
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
      try {
        const motivationObject = JSON.parse(savedMotivation);
        // Check if the parsed object has a 'content' property before setting state
        if (motivationObject && motivationObject.content !== undefined) {
          setPersonalMotivation(motivationObject.content);
          setMotivationDate(motivationObject.date || null); // Load saved date, default to null if not present
        } else {
          // Handle case where savedMotivation is an empty object or missing content
          setPersonalMotivation('');
          setMotivationDate(null);
        }
      } catch (e) {
        // Handle case where savedMotivation is not a valid JSON object (e.g., from before the update)
        setPersonalMotivation(savedMotivation);
        setMotivationDate(null); // Set date to null if old format
      }
    }
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
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

  const handleDeleteDate = (dateId) => {
    const updatedDates = importantDates.filter(date => date.id !== dateId);
    setImportantDates(updatedDates);
    localStorage.setItem('importantDates', JSON.stringify(updatedDates));
  };

  // Add handlers for editing important dates
  const handleEditDate = (date) => {
    setEditingDateId(date.id);
    setEditedDate({ title: date.title, date: date.date, description: date.description });
  };

  const handleCancelEditDate = () => {
    setEditingDateId(null);
    setEditedDate({ title: '', date: '', description: '' });
  };

  const handleSaveEditedDate = (dateId) => {
    const updatedDates = importantDates.map(date =>
      date.id === dateId ? { ...date, ...editedDate } : date
    );
    setImportantDates(updatedDates);
    localStorage.setItem('importantDates', JSON.stringify(updatedDates));
    setEditingDateId(null);
    setEditedDate({ title: '', date: '', description: '' });
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

  const handleDeleteThought = (thoughtId) => {
    const updatedThoughts = learningThoughts.filter(thought => thought.id !== thoughtId);
    setLearningThoughts(updatedThoughts);
    localStorage.setItem('learningThoughts', JSON.stringify(updatedThoughts));
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

  const handleDeleteGoal = (goalId) => {
    const updatedGoals = personalGoals.filter(goal => goal.id !== goalId);
    setPersonalGoals(updatedGoals);
    localStorage.setItem('personalGoals', JSON.stringify(updatedGoals));
  };

  // Update handlers for personal motivation
  const handleSaveMotivation = () => {
    if (personalMotivation.trim()) {
      const saveObject = { content: personalMotivation, date: new Date().toLocaleDateString() }; // Save content and date
      localStorage.setItem('personalMotivation', JSON.stringify(saveObject));
      setMotivationDate(saveObject.date); // Update date state
    }
  };

  // Add handler to start editing motivation
  const handleEditMotivation = () => {
    setEditedMotivation(personalMotivation);
    setIsEditingMotivation(true);
  };

  // Add handler to cancel editing motivation
  const handleCancelEditMotivation = () => {
    setIsEditingMotivation(false);
    setEditedMotivation('');
  };

  // Add handler to save edited motivation
  const handleSaveEditedMotivation = () => {
    if (editedMotivation.trim()) {
      const saveObject = { content: editedMotivation, date: new Date().toLocaleDateString() }; // Save edited content and new date
      setPersonalMotivation(saveObject.content);
      setMotivationDate(saveObject.date); // Update date state
      localStorage.setItem('personalMotivation', JSON.stringify(saveObject));
      setIsEditingMotivation(false);
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

  // Add handler for achievements
  const handleAddAchievement = () => {
    if (newAchievement.content.trim()) {
      const achievementToAdd = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        ...newAchievement,
      };
      setAchievements([...achievements, achievementToAdd]);
      localStorage.setItem('achievements', JSON.stringify([...achievements, achievementToAdd]));
      setNewAchievement({ content: '', category: 'general' });
    }
  };

  const handleDeleteAchievement = (achievementId) => {
    const updatedAchievements = achievements.filter(achievement => achievement.id !== achievementId);
    setAchievements(updatedAchievements);
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const singleHeroImageUrl = "https://images.pexels.com/photos/6005013/pexels-photo-6005013.jpeg?cs=srgb&dl=pexels-ds-stories-6005013.jpg&fm=jpg&_gl=1*zsfih9*_ga*NTI5NjI5NjY4LjE3NDgzMzIwNzg.*_ga_8JE65Q40S6*czE3NDgzMzcxNTQkbzIkZzEkdDE3NDgzMzgyMTIkajAkbDAkaDA.";

  return (
    <div className="selfcare-container">
      {/* Personal Motivation Section - Moved back inside skincare tab */}
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
                  <a href={workoutVideos.beginner.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.beginner.thumbnail} alt={workoutVideos.beginner.title} />
                    </div>
                    <h3>{workoutVideos.beginner.title}</h3>
                    <p>{workoutVideos.beginner.duration} • {workoutVideos.beginner.level}</p>
                    <p className="workout-description">{workoutVideos.beginner.description}</p>
                  </a>
                  <a href={workoutVideos.core.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.core.thumbnail} alt={workoutVideos.core.title} />
                    </div>
                    <h3>{workoutVideos.core.title}</h3>
                    <p>{workoutVideos.core.duration} • {workoutVideos.core.level}</p>
                    <p className="workout-description">{workoutVideos.core.description}</p>
                  </a>
                   <a href={workoutVideos.legs.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.legs.thumbnail} alt={workoutVideos.legs.title} />
                    </div>
                    <h3>{workoutVideos.legs.title}</h3>
                    <p>{workoutVideos.legs.duration} • {workoutVideos.legs.level}</p>
                    <p className="workout-description">{workoutVideos.legs.description}</p>
                  </a>
                  <a href={workoutVideos.fullBodySmallSpace.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.fullBodySmallSpace.thumbnail} alt={workoutVideos.fullBodySmallSpace.title} />
                    </div>
                    <h3>{workoutVideos.fullBodySmallSpace.title}</h3>
                    <p>{workoutVideos.fullBodySmallSpace.duration} • {workoutVideos.fullBodySmallSpace.level}</p>
                    <p className="workout-description">{workoutVideos.fullBodySmallSpace.description}</p>
                  </a>
                  <a href={workoutVideos.beginnerFatBurn.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.beginnerFatBurn.thumbnail} alt={workoutVideos.beginnerFatBurn.title} />
                    </div>
                    <h3>{workoutVideos.beginnerFatBurn.title}</h3>
                    <p>{workoutVideos.beginnerFatBurn.duration} • {workoutVideos.beginnerFatBurn.level}</p>
                    <p className="workout-description">{workoutVideos.beginnerFatBurn.description}</p>
                  </a>
                   <a href={workoutVideos.beginnerLowImpact.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.beginnerLowImpact.thumbnail} alt={workoutVideos.beginnerLowImpact.title} />
                    </div>
                    <h3>{workoutVideos.beginnerLowImpact.title}</h3>
                    <p>{workoutVideos.beginnerLowImpact.duration} • {workoutVideos.beginnerLowImpact.level}</p>
                    <p className="workout-description">{workoutVideos.beginnerLowImpact.description}</p>
                  </a>
                </div>
              </div>

              <div className="category-section">
                <h3>Weight Loss</h3>
                <div className="workout-cards">
                  <a href={workoutVideos.weightLoss.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.weightLoss.thumbnail} alt={workoutVideos.weightLoss.title} />
                    </div>
                    <h3>{workoutVideos.weightLoss.title}</h3>
                    <p>{workoutVideos.weightLoss.duration} • {workoutVideos.weightLoss.level}</p>
                    <p className="workout-description">{workoutVideos.weightLoss.description}</p>
                  </a>
                  <a href={workoutVideos.weightLossStanding.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.weightLossStanding.thumbnail} alt={workoutVideos.weightLossStanding.title} />
                    </div>
                    <h3>{workoutVideos.weightLossStanding.title}</h3>
                    <p>{workoutVideos.weightLossStanding.duration} • {workoutVideos.weightLossStanding.level}</p>
                    <p className="workout-description">{workoutVideos.weightLossStanding.description}</p>
                  </a>
                  <a href={workoutVideos.weightLoss10Days.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.weightLoss10Days.thumbnail} alt={workoutVideos.weightLoss10Days.title} />
                    </div>
                    <h3>{workoutVideos.weightLoss10Days.title}</h3>
                    <p>{workoutVideos.weightLoss10Days.duration} • {workoutVideos.weightLoss10Days.level}</p>
                    <p className="workout-description">{workoutVideos.weightLoss10Days.description}</p>
                  </a>
                  <a href={workoutVideos.weightLossBeginnerFatBurn.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.weightLossBeginnerFatBurn.thumbnail} alt={workoutVideos.weightLossBeginnerFatBurn.title} />
                    </div>
                    <h3>{workoutVideos.weightLossBeginnerFatBurn.title}</h3>
                    <p>{workoutVideos.weightLossBeginnerFatBurn.duration} • {workoutVideos.weightLossBeginnerFatBurn.level}</p>
                    <p className="workout-description">{workoutVideos.weightLossBeginnerFatBurn.description}</p>
                  </a>
                  <a href={workoutVideos.weightLossBellyFat.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.weightLossBellyFat.thumbnail} alt={workoutVideos.weightLossBellyFat.title} />
                    </div>
                    <h3>{workoutVideos.weightLossBellyFat.title}</h3>
                    <p>{workoutVideos.weightLossBellyFat.duration} • {workoutVideos.weightLossBellyFat.level}</p>
                    <p className="workout-description">{workoutVideos.weightLossBellyFat.description}</p>
                  </a>
                  <a href={workoutVideos.weightLossExercises.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.weightLossExercises.thumbnail} alt={workoutVideos.weightLossExercises.title} />
                    </div>
                    <h3>{workoutVideos.weightLossExercises.title}</h3>
                    <p>{workoutVideos.weightLossExercises.duration} • {workoutVideos.weightLossExercises.level}</p>
                    <p className="workout-description">{workoutVideos.weightLossExercises.description}</p>
                  </a>
                </div>
              </div>

              <div className="category-section">
                <h3>Weight Gain & Strength</h3>
                <div className="workout-cards">
                  <a href={workoutVideos.weightGain.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.weightGain.thumbnail} alt={workoutVideos.weightGain.title} />
                    </div>
                    <h3>{workoutVideos.weightGain.title}</h3>
                    <p>{workoutVideos.weightGain.duration} • {workoutVideos.weightGain.level}</p>
                    <p className="workout-description">{workoutVideos.weightGain.description}</p>
                  </a>
                  <a href={workoutVideos.yoga.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.yoga.thumbnail} alt={workoutVideos.yoga.title} />
                    </div>
                    <h3>{workoutVideos.yoga.title}</h3>
                    <p>{workoutVideos.yoga.duration} • {workoutVideos.yoga.level}</p>
                    <p className="workout-description">{workoutVideos.yoga.description}</p>
                  </a>
                  <a href={workoutVideos.fullBodyStrength1.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.fullBodyStrength1.thumbnail} alt={workoutVideos.fullBodyStrength1.title} />
                    </div>
                    <h3>{workoutVideos.fullBodyStrength1.title}</h3>
                    <p>{workoutVideos.fullBodyStrength1.duration} • {workoutVideos.fullBodyStrength1.level}</p>
                    <p className="workout-description">{workoutVideos.fullBodyStrength1.description}</p>
                  </a>
                  <a href={workoutVideos.fullBodyStrength2.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.fullBodyStrength2.thumbnail} alt={workoutVideos.fullBodyStrength2.title} />
                    </div>
                    <h3>{workoutVideos.fullBodyStrength2.title}</h3>
                    <p>{workoutVideos.fullBodyStrength2.duration} • {workoutVideos.fullBodyStrength2.level}</p>
                    <p className="workout-description">{workoutVideos.fullBodyStrength2.description}</p>
                  </a>
                  <a href={workoutVideos.yogaFlow.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.yogaFlow.thumbnail} alt={workoutVideos.yogaFlow.title} />
                    </div>
                    <h3>{workoutVideos.yogaFlow.title}</h3>
                    <p>{workoutVideos.yogaFlow.duration} • {workoutVideos.yogaFlow.level}</p>
                    <p className="workout-description">{workoutVideos.yogaFlow.description}</p>
                  </a>
                  <a href={workoutVideos.yogaStrength.url} target="_blank" rel="noopener noreferrer" className="workout-card">
                    <div className="workout-video">
                      <img src={workoutVideos.yogaStrength.thumbnail} alt={workoutVideos.yogaStrength.title} />
                    </div>
                    <h3>{workoutVideos.yogaStrength.title}</h3>
                    <p>{workoutVideos.yogaStrength.duration} • {workoutVideos.yogaStrength.level}</p>
                    <p className="workout-description">{workoutVideos.yogaStrength.description}</p>
                  </a>
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
                  <div className="tips-category">
                    <h4>Healthy Diet Tips</h4>
                    <ul>
                      {workoutTips.healthyDiet.map((tip, index) => (
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
            {/* Personal Motivation Section */}
            <div className="motivation-section">
              <h3>Personal Motivation</h3>
              {isEditingMotivation ? (
                <div className="edit-motivation">
                  <textarea
                    value={editedMotivation}
                    onChange={(e) => setEditedMotivation(e.target.value)}
                    placeholder="Write your personal motivation..."
                  />
                  <button onClick={handleSaveMotivation}>Save</button>
                </div>
              ) : (
                <div className="motivation-content">
                  <p>{personalMotivation || "Add your personal motivation to stay committed to your skincare journey."}</p>
                  <button onClick={() => setIsEditingMotivation(true)}>Edit</button>
                </div>
              )}
            </div>

            {/* Skincare Streak Section */}
            <div className="streak-section">
              <h3>Skincare Streak</h3>
              <div className="streak-content">
                <div className="streak-counter">
                  <span className="streak-number">{skincareStreak}</span>
                  <span className="streak-label">Days</span>
                </div>
                <p className="streak-message">Keep up the great work! Your skin is thanking you.</p>
              </div>
            </div>

            {/* Skincare Goals Section */}
            <div className="goals-section">
              <h3>Skincare Goals</h3>
              <div className="goals-content">
                <div className="add-goal">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Add a new goal..."
                  />
                  <button onClick={handleAddGoal}>Add</button>
                </div>
                {skincareGoals
                  .sort((a, b) => {
                    // Move blackheads goal to the bottom
                    if (a.content.toLowerCase().includes('blackheads')) return 1;
                    if (b.content.toLowerCase().includes('blackheads')) return -1;
                    return 0;
                  })
                  .map((goal, index) => (
                    <div key={index} className="goal-item">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => handleToggleGoal(index)}
                      />
                      <span className={goal.completed ? 'completed' : ''}>
                        {goal.content}
                      </span>
                      <button 
                        className="delete-goal"
                        onClick={() => {
                          const newGoals = [...skincareGoals];
                          newGoals.splice(index, 1);
                          setSkincareGoals(newGoals);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Routine Steps and Skincare Tips remain below */}
            <div className="routine-steps">
              {skincareCategories.map((category, index) => (
                <div key={index} className="routine-category">
                  <h4><i className={`fas fa-${category.icon}`}></i> {category.title}</h4>
                  <ul>
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex}>
                        <i className="fas fa-check"></i>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
              <div className="meditation-card">
                <div className="meditation-video">
                  <iframe 
                    src="https://www.youtube.com/embed/64ZU2UCQdmQ" 
                    title="Mindfulness Meditation in 20 Minutes"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3>{meditationVideos.mindfulness20Min.title}</h3>
                <p>{meditationVideos.mindfulness20Min.duration} • {meditationVideos.mindfulness20Min.type}</p>
                <a href={meditationVideos.mindfulness20Min.url} target="_blank" rel="noopener noreferrer" className="start-button">
                  Watch on YouTube
                </a>
              </div>
              <div className="meditation-card">
                <div className="meditation-video">
                  <iframe 
                    src="https://www.youtube.com/embed/inpok4MKVLM" 
                    title="5-Minute Meditation You Can Do Anywhere"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3>{meditationVideos.fiveMinMeditation.title}</h3>
                <p>{meditationVideos.fiveMinMeditation.duration} • {meditationVideos.fiveMinMeditation.type}</p>
                <a href={meditationVideos.fiveMinMeditation.url} target="_blank" rel="noopener noreferrer" className="start-button">
                  Watch on YouTube
                </a>
              </div>
              <div className="meditation-card">
                <div className="meditation-video">
                  <iframe 
                    src="https://www.youtube.com/embed/Jyy0ra2WcQQ" 
                    title="Guided Meditation - Blissful Deep Relaxation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3>{meditationVideos.blissfulRelaxation.title}</h3>
                <p>{meditationVideos.blissfulRelaxation.duration} • {meditationVideos.blissfulRelaxation.type}</p>
                <a href={meditationVideos.blissfulRelaxation.url} target="_blank" rel="noopener noreferrer" className="start-button">
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
                      
                      {editingDateId === date.id ? (
                        // Edit mode
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
                            placeholder="Description"
                            value={editedDate.description}
                            onChange={(e) => setEditedDate({ ...editedDate, description: e.target.value })}
                          ></textarea>
                          <button onClick={() => handleSaveEditedDate(date.id)}>Save</button>
                          <button onClick={handleCancelEditDate}>Cancel</button>
                        </>
                      ) : (
                        // View mode
                        <>
                           <button 
                              className="delete-item"
                              onClick={() => handleDeleteDate(date.id)}
                              title="Delete date"
                           >
                              <i className="fas fa-trash"></i>
                           </button>
                          <h4>{date.title}</h4>
                          <p className="date">{new Date(date.date).toLocaleDateString()}</p>
                          <p className="description">{date.description}</p>
                          <button 
                             className="edit-item"
                             onClick={() => handleEditDate(date)}
                             title="Edit date"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        </>
                      )}
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
                       <button 
                         className="delete-item"
                         onClick={() => handleDeleteThought(thought.id)}
                         title="Delete thought"
                      >
                         <i className="fas fa-trash"></i>
                      </button>
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
                       <button 
                         className="delete-item"
                         onClick={() => handleDeleteGoal(goal.id)}
                         title="Delete goal"
                      >
                         <i className="fas fa-trash"></i>
                      </button>
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

              {/* New Achievements Section */}
              <div className="achievements">
                <h3>Achievements</h3>
                <div className="add-achievement-form">
                  <input
                    type="text"
                    placeholder="Describe your achievement..."
                    value={newAchievement.content}
                    onChange={(e) => setNewAchievement({...newAchievement, content: e.target.value})}
                  />
                   <select
                    value={newAchievement.category}
                    onChange={(e) => setNewAchievement({...newAchievement, category: e.target.value})}
                  >
                    <option value="general">General</option>
                    <option value="personal">Personal Growth</option>
                    <option value="professional">Professional</option>
                    <option value="fitness">Fitness & Health</option>
                    <option value="creative">Creative</option>
                  </select>
                  <button onClick={handleAddAchievement}>Add Achievement</button>
                </div>
                <div className="achievements-list">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="achievement-card">
                       <button 
                         className="delete-item"
                         onClick={() => handleDeleteAchievement(achievement.id)}
                         title="Delete achievement"
                      >
                         <i className="fas fa-trash"></i>
                      </button>
                      <p className="achievement-content">{achievement.content}</p>
                       <div className="achievement-meta">
                         <span className="category">{achievement.category}</span>
                         <span className="date">{achievement.date}</span>
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