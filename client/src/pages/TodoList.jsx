import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete React Hooks tutorial', completed: false },
    { id: 2, text: 'Practice CSS Grid', completed: true },
    { id: 3, text: 'Read JavaScript documentation', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false
        }
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>My Learning Tasks</h1>
        <p>Keep track of your learning goals</p>
      </div>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          <i className="fas fa-plus"></i>
        </button>
      </form>

      <div className="todo-list">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="todo-stats">
        <div className="stat">
          <i className="fas fa-tasks"></i>
          <span>{todos.length} Total Tasks</span>
        </div>
        <div className="stat">
          <i className="fas fa-check-circle"></i>
          <span>{todos.filter(todo => todo.completed).length} Completed</span>
        </div>
      </div>
    </div>
  );
};

export default TodoList; 