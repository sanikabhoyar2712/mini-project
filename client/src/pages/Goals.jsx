import React, { useState, useEffect } from 'react';
import './Goals.css';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratedGoal, setCelebratedGoal] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState({
    totalGoals: 0,
    completedGoals: 0,
    inProgressGoals: 0,
    upcomingDeadlines: 0
  });
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'academic',
    deadline: '',
    target: ''
  });
  const [newMilestone, setNewMilestone] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'grid'
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  useEffect(() => {
    const savedGoals = localStorage.getItem('goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
    calculateAnalytics();
  }, [goals]);

  const calculateAnalytics = () => {
    const total = goals.length;
    const completed = goals.filter(goal => goal.progress === 100).length;
    const inProgress = goals.filter(goal => goal.progress > 0 && goal.progress < 100).length;
    const upcoming = goals.filter(goal => {
      const deadline = new Date(goal.deadline);
      const today = new Date();
      const diffTime = deadline - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7 && diffDays > 0;
    }).length;

    setAnalytics({
      totalGoals: total,
      completedGoals: completed,
      inProgressGoals: inProgress,
      upcomingDeadlines: upcoming
    });
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (!newGoal.title.trim()) return;

    const goal = {
      id: Date.now(),
      title: newGoal.title,
      category: newGoal.category,
      deadline: newGoal.deadline,
      target: newGoal.target,
      progress: 0,
      milestones: [],
      createdAt: new Date().toISOString()
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      category: 'academic',
      deadline: '',
      target: ''
    });
  };

  const updateGoalProgress = (goalId, progress) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const newProgress = progress;
        if (newProgress === 100) {
          setCelebratedGoal(goal);
          setShowCelebration(true);
        }
        return { ...goal, progress: newProgress };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  const addMilestone = (goalId) => {
    if (!newMilestone.trim()) return;

    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          milestones: [...goal.milestones, { id: Date.now(), text: newMilestone, completed: false }]
        };
      }
      return goal;
    });
    setGoals(updatedGoals);
    setNewMilestone('');
  };

  const toggleMilestone = (goalId, milestoneId) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        return { ...goal, milestones: updatedMilestones };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') return goal.progress < 100;
    if (filter === 'completed') return goal.progress === 100;
    return true;
  });

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h1>Goal Tracker</h1>
        <p>Set, track, and achieve your goals</p>
      </div>

      <div className="goals-controls">
        <div className="view-controls">
          <button 
            className={`view-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            <i className="fas fa-list"></i> List
          </button>
          <button 
            className={`view-btn ${view === 'grid' ? 'active' : ''}`}
            onClick={() => setView('grid')}
          >
            <i className="fas fa-th-large"></i> Grid
          </button>
        </div>
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="goals-content">
        <div className="goals-sidebar">
          <div className="analytics-section">
            <button 
              className="analytics-toggle"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
            </button>
            
            {showAnalytics && (
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Overview</h3>
                  <div className="analytics-stats">
                    <div className="stat">
                      <span className="stat-value">{analytics.totalGoals}</span>
                      <span className="stat-label">Total Goals</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{analytics.completedGoals}</span>
                      <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{analytics.inProgressGoals}</span>
                      <span className="stat-label">In Progress</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{analytics.upcomingDeadlines}</span>
                      <span className="stat-label">Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="goal-form">
            <h2>Add New Goal</h2>
            <form onSubmit={handleGoalSubmit}>
              <div className="form-group">
                <label>Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="Enter your goal"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                >
                  <option value="academic">Academic</option>
                  <option value="exam">Exam</option>
                  <option value="skill">Skill</option>
                  <option value="project">Project</option>
                </select>
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Target</label>
                <input
                  type="text"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  placeholder="What do you want to achieve?"
                />
              </div>
              <button type="submit" className="submit-button">Add Goal</button>
            </form>
          </div>
        </div>

        <div className={`goals-list ${view}`}>
          {filteredGoals.map(goal => (
            <div 
              key={goal.id} 
              className={`goal-card ${goal.category}`}
              onClick={() => setSelectedGoal(goal)}
            >
              <div className="goal-header">
                <h3 className="goal-title">{goal.title}</h3>
                <div className="goal-badges">
                  <span className="goal-category-badge">{goal.category}</span>
                  {goal.deadline && (
                    <span className="goal-deadline-badge">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="goal-progress">
                <div className="progress-label">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                  className="progress-slider"
                />
              </div>

              {selectedGoal?.id === goal.id && (
                <div className="milestones-section">
                  <h4>Milestones</h4>
                  <div className="milestones-list">
                    {goal.milestones.map(milestone => (
                      <div key={milestone.id} className="milestone-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={milestone.completed}
                            onChange={() => toggleMilestone(goal.id, milestone.id)}
                          />
                          <span className={milestone.completed ? 'completed' : ''}>
                            {milestone.text}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="add-milestone">
                    <input
                      type="text"
                      value={newMilestone}
                      onChange={(e) => setNewMilestone(e.target.value)}
                      placeholder="Add a milestone"
                    />
                    <button onClick={() => addMilestone(goal.id)}>Add</button>
                  </div>
                </div>
              )}

              <div className="goal-actions">
                <button onClick={() => updateGoalProgress(goal.id, 100)}>
                  Complete
                </button>
                <button className="delete" onClick={() => deleteGoal(goal.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCelebration && (
        <div className="celebration-modal">
          <div className="celebration-content">
            <h2>🎉 Congratulations! 🎉</h2>
            <h3>You've completed your goal!</h3>
            <p>{celebratedGoal?.title}</p>
            <button onClick={() => setShowCelebration(false)}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals; 