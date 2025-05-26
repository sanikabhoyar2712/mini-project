import React, { useState, useEffect } from 'react';
import './Todo.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('personal');

  useEffect(() => {
    // Load todos from localStorage
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      category,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Task Manager</h1>
        <p>Organize your tasks and boost productivity</p>
      </div>

      <div className="todo-content">
        <div className="todo-sidebar">
          <div className="category-section">
            <h3>Categories</h3>
            <div className="category-list">
              <button 
                className={`category-btn ${category === 'personal' ? 'active' : ''}`}
                onClick={() => setCategory('personal')}
              >
                Personal
              </button>
              <button 
                className={`category-btn ${category === 'work' ? 'active' : ''}`}
                onClick={() => setCategory('work')}
              >
                Work
              </button>
              <button 
                className={`category-btn ${category === 'study' ? 'active' : ''}`}
                onClick={() => setCategory('study')}
              >
                Study
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Filter Tasks</h3>
            <div className="filter-list">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Tasks
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
        </div>

        <div className="todo-main">
          <form onSubmit={handleSubmit} className="todo-form">
            <div className="input-group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task..."
                className="todo-input"
              />
              <button type="submit" className="add-button">
                <i className="fas fa-plus"></i> Add Task
              </button>
            </div>
          </form>

          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-tasks"></i>
                <p>No tasks to display</p>
                <span>Add a new task to get started</span>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <div className="todo-checkbox">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        id={`todo-${todo.id}`}
                      />
                      <label htmlFor={`todo-${todo.id}`}></label>
                    </div>
                    <div className="todo-details">
                      <span className="todo-text">{todo.text}</span>
                      <div className="todo-meta">
                        <span className="todo-category">{todo.category}</span>
                        <span 
                          className="todo-priority"
                          style={{ backgroundColor: getPriorityColor(todo.priority) }}
                        >
                          {todo.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo; 