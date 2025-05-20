import React, { useState } from 'react';
import './SelfCare.css';

const SelfCare = () => {
  const [activeTab, setActiveTab] = useState('diary');

  return (
    <div className="selfcare-container">
      <div className="selfcare-header">
        <h1>Self Care Hub</h1>
        <p>Take care of yourself, one day at a time</p>
      </div>

      <div className="selfcare-tabs">
        <button 
          className={`tab-btn ${activeTab === 'diary' ? 'active' : ''}`}
          onClick={() => setActiveTab('diary')}
        >
          <i className="fas fa-book"></i> Diary
        </button>
        <button 
          className={`tab-btn ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          <i className="fas fa-dumbbell"></i> Workout
        </button>
        <button 
          className={`tab-btn ${activeTab === 'mood' ? 'active' : ''}`}
          onClick={() => setActiveTab('mood')}
        >
          <i className="fas fa-smile"></i> Mood Tracker
        </button>
        <button 
          className={`tab-btn ${activeTab === 'meditation' ? 'active' : ''}`}
          onClick={() => setActiveTab('meditation')}
        >
          <i className="fas fa-spa"></i> Meditation
        </button>
      </div>

      <div className="selfcare-content">
        {activeTab === 'diary' && (
          <div className="diary-section">
            <h2>Daily Journal</h2>
            <div className="diary-entry">
              <textarea 
                placeholder="How are you feeling today?"
                className="diary-textarea"
              ></textarea>
              <button className="btn btn-primary">
                <i className="fas fa-save"></i> Save Entry
              </button>
            </div>
            <div className="diary-prompts">
              <h3>Today's Prompts</h3>
              <ul>
                <li>What made you smile today?</li>
                <li>What's one thing you're grateful for?</li>
                <li>What's your goal for tomorrow?</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'workout' && (
          <div className="workout-section">
            <h2>Workout Tracker</h2>
            <div className="workout-cards">
              <div className="workout-card">
                <i className="fas fa-running"></i>
                <h3>Quick Cardio</h3>
                <p>15 minutes</p>
                <button className="btn btn-outline">Start</button>
              </div>
              <div className="workout-card">
                <i className="fas fa-yoga"></i>
                <h3>Yoga Flow</h3>
                <p>20 minutes</p>
                <button className="btn btn-outline">Start</button>
              </div>
              <div className="workout-card">
                <i className="fas fa-dumbbell"></i>
                <h3>Strength Training</h3>
                <p>30 minutes</p>
                <button className="btn btn-outline">Start</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mood' && (
          <div className="mood-section">
            <h2>Mood Tracker</h2>
            <div className="mood-selector">
              <button className="mood-btn">
                <i className="fas fa-grin-stars"></i>
                <span>Great</span>
              </button>
              <button className="mood-btn">
                <i className="fas fa-smile"></i>
                <span>Good</span>
              </button>
              <button className="mood-btn">
                <i className="fas fa-meh"></i>
                <span>Okay</span>
              </button>
              <button className="mood-btn">
                <i className="fas fa-frown"></i>
                <span>Down</span>
              </button>
            </div>
            <div className="mood-calendar">
              <h3>Mood History</h3>
              {/* Calendar component will go here */}
            </div>
          </div>
        )}

        {activeTab === 'meditation' && (
          <div className="meditation-section">
            <h2>Meditation & Relaxation</h2>
            <div className="meditation-cards">
              <div className="meditation-card">
                <i className="fas fa-spa"></i>
                <h3>Breathing Exercise</h3>
                <p>5 minutes</p>
                <button className="btn btn-outline">Start</button>
              </div>
              <div className="meditation-card">
                <i className="fas fa-moon"></i>
                <h3>Sleep Meditation</h3>
                <p>10 minutes</p>
                <button className="btn btn-outline">Start</button>
              </div>
              <div className="meditation-card">
                <i className="fas fa-brain"></i>
                <h3>Mindfulness</h3>
                <p>15 minutes</p>
                <button className="btn btn-outline">Start</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfCare; 