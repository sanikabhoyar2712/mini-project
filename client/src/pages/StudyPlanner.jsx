import React, { useState, useEffect } from 'react';
import './StudyPlanner.css';

const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium',
    category: 'study',
    dueDate: '',
    completed: false
  });
  const [newHabit, setNewHabit] = useState({
    title: '',
    category: 'daily',
    target: 1,
    streak: 0,
    completed: false
  });
  const [activeTab, setActiveTab] = useState('tasks');
  const [filter, setFilter] = useState('all');

  // Load data from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('studyTasks');
    const savedHabits = localStorage.getItem('studyHabits');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedHabits) setHabits(JSON.parse(savedHabits));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('studyTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('studyHabits', JSON.stringify(habits));
  }, [habits]);

  // Handle task submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      progress: 0
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      priority: 'medium',
      category: 'study',
      dueDate: '',
      completed: false
    });
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Update task progress
  const updateTaskProgress = (taskId, progress) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, progress: Math.min(100, Math.max(0, progress)) }
        : task
    ));
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handle habit submission
  const handleHabitSubmit = (e) => {
    e.preventDefault();
    if (!newHabit.title.trim()) return;

    const habit = {
      ...newHabit,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      currentCount: 0
    };

    setHabits([...habits, habit]);
    setNewHabit({
      title: '',
      category: 'daily',
      target: 1,
      streak: 0,
      completed: false
    });
  };

  // Toggle habit completion
  const toggleHabitCompletion = (habitId) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newStreak = habit.completed ? habit.streak - 1 : habit.streak + 1;
        const newCount = habit.completed ? habit.currentCount - 1 : habit.currentCount + 1;
        return {
          ...habit,
          completed: !habit.completed,
          streak: Math.max(0, newStreak),
          currentCount: Math.max(0, newCount)
        };
      }
      return habit;
    }));
  };

  // Delete habit
  const deleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return task.category === filter;
  });

  return (
    <div className="study-planner">
      <div className="planner-header">
        <h1>Study Planner</h1>
        <p>Organize your study tasks and track your habits</p>
      </div>

      <div className="planner-tabs">
        <button
          className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button
          className={`tab-button ${activeTab === 'habits' ? 'active' : ''}`}
          onClick={() => setActiveTab('habits')}
        >
          Habits
        </button>
      </div>

      <div className="planner-content">
        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <div className="section-header">
              <h2>Study Tasks</h2>
              <div className="filter-controls">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="active">Active</option>
                  <option value="study">Study</option>
                  <option value="assignment">Assignment</option>
                  <option value="project">Project</option>
                </select>
              </div>
            </div>

            <form onSubmit={handleTaskSubmit} className="task-form">
              <input
                type="text"
                placeholder="Add a new task"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              >
                <option value="study">Study</option>
                <option value="assignment">Assignment</option>
                <option value="project">Project</option>
              </select>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
              <button type="submit">Add Task</button>
            </form>

            <div className="tasks-list">
              {filteredTasks.map(task => (
                <div key={task.id} className={`task-card ${task.priority} ${task.category}`}>
                  <div className="task-header">
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                      />
                      <span className={task.completed ? 'completed' : ''}>
                        {task.title}
                      </span>
                    </label>
                    <div className="task-badges">
                      <span className={`priority-badge ${task.priority}`}>
                        {task.priority}
                      </span>
                      <span className={`category-badge ${task.category}`}>
                        {task.category}
                      </span>
                    </div>
                  </div>
                  {task.dueDate && (
                    <div className="task-due-date">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                  <div className="task-progress">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={task.progress}
                      onChange={(e) => updateTaskProgress(task.id, parseInt(e.target.value))}
                    />
                    <span className="progress-text">{task.progress}%</span>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => deleteTask(task.id)} className="delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'habits' && (
          <div className="habits-section">
            <div className="section-header">
              <h2>Study Habits</h2>
            </div>

            <form onSubmit={handleHabitSubmit} className="habit-form">
              <input
                type="text"
                placeholder="Add a new habit"
                value={newHabit.title}
                onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                required
              />
              <select
                value={newHabit.category}
                onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <input
                type="number"
                min="1"
                value={newHabit.target}
                onChange={(e) => setNewHabit({ ...newHabit, target: parseInt(e.target.value) })}
                placeholder="Target count"
              />
              <button type="submit">Add Habit</button>
            </form>

            <div className="habits-list">
              {habits.map(habit => (
                <div key={habit.id} className={`habit-card ${habit.category}`}>
                  <div className="habit-header">
                    <label>
                      <input
                        type="checkbox"
                        checked={habit.completed}
                        onChange={() => toggleHabitCompletion(habit.id)}
                      />
                      <span className={habit.completed ? 'completed' : ''}>
                        {habit.title}
                      </span>
                    </label>
                    <div className="habit-badges">
                      <span className="streak-badge">
                        {habit.streak} days
                      </span>
                      <span className="category-badge">
                        {habit.category}
                      </span>
                    </div>
                  </div>
                  <div className="habit-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(habit.currentCount / habit.target) * 100}%` }}
                      />
                    </div>
                    <span className="progress-text">
                      {habit.currentCount}/{habit.target}
                    </span>
                  </div>
                  <div className="habit-actions">
                    <button onClick={() => deleteHabit(habit.id)} className="delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlanner; 