import React from 'react';
import './Workout.css';

const Workout = () => {
  return (
    <div className="workout-container">
      <div className="workout-header">
        <h1>Workout Section</h1>
        <p>Your personal fitness journey starts here</p>
      </div>
      
      <div className="workout-content">
        <div className="workout-categories">
          <h2>Workout Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Beginner Friendly</h3>
              <p>Perfect for those just starting their fitness journey</p>
            </div>
            <div className="category-card">
              <h3>Weight Loss</h3>
              <p>Effective workouts to help you reach your weight goals</p>
            </div>
            <div className="category-card">
              <h3>Strength Training</h3>
              <p>Build muscle and increase your overall strength</p>
            </div>
            <div className="category-card">
              <h3>Core & Planks</h3>
              <p>Strengthen your core and improve stability</p>
            </div>
          </div>
        </div>

        <div className="workout-tips">
          <h2>Pro Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Stay Hydrated</h3>
              <p>Drink water before, during, and after your workout</p>
            </div>
            <div className="tip-card">
              <h3>Proper Form</h3>
              <p>Focus on correct form rather than quantity</p>
            </div>
            <div className="tip-card">
              <h3>Rest Days</h3>
              <p>Give your body time to recover and rebuild</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout; 