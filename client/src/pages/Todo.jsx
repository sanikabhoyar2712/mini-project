import React, { useState, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health', 'General'];
  const filters = ['All', 'Active', 'Completed'];

  // Load tasks from local storage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const loadedTasks = JSON.parse(savedTasks);
      const tasksWithProps = loadedTasks.map(task => ({
        ...task,
        category: task.category || 'General',
        isCut: task.isCut || false
      }));
      setTasks(tasksWithProps);
    }
  }, []);

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        category: selectedCategory === 'All' ? 'General' : selectedCategory,
        isCut: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const handleToggleCut = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, isCut: !task.isCut } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    const categoryMatch = selectedCategory === 'All' || task.category === selectedCategory;
    let filterMatch = false;
    if (selectedFilter === 'All') {
      filterMatch = true;
    } else if (selectedFilter === 'Active') {
      filterMatch = !task.completed && !task.isCut;
    } else if (selectedFilter === 'Completed') {
      filterMatch = task.completed && !task.isCut;
    }
    return categoryMatch && filterMatch;
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>To Do List</h1>
        <p>Organize your tasks and boost productivity</p>
      </div>

      <div className="todo-main-content">
        <div className="task-input">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleAddTask(); }}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 && tasks.length > 0 && (
            <div className="empty-state">
              <i className="fas fa-filter"></i>
              <p>No tasks match the current filters.</p>
              <span>Try adjusting your category or filter selections.</span>
            </div>
          )}
          {tasks.length === 0 && filteredTasks.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-clipboard-list"></i>
              <p>Your To Do list is empty!</p>
              <span>Add a task above to get started.</span>
            </div>
          )}
          {filteredTasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''} ${task.isCut ? 'cut' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                disabled={task.isCut}
              />
              <span className="task-text">{task.text}</span>
              {task.category && <span className="task-category-badge">{task.category}</span>}
              <button className="delete-task" onClick={() => handleToggleCut(task.id)} title={task.isCut ? 'Uncut Task' : 'Cut Task'}>
                <i className={`fas ${task.isCut ? 'fa-minus-circle' : 'fa-trash'}`}></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="todo-sidebar">
        <div className="sidebar-section category-section">
            <h3>Categories</h3>
            <ul>
               {categories.map(category => (
                   <li key={category} onClick={() => handleCategoryClick(category)} className={selectedCategory === category ? 'active' : ''}>
                       {category}
                   </li>
               ))}
            </ul>
        </div>
        <div className="sidebar-section filter-section">
            <h3>Filters</h3>
            <ul>
               {filters.map(filter => (
                   <li key={filter} onClick={() => handleFilterClick(filter)} className={selectedFilter === filter ? 'active' : ''}>
                       {filter}
                   </li>
               ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo; 