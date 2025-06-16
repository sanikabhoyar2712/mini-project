import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterType, setFilterType] = useState('All'); // 'All', 'Active', 'Completed'

  const categories = ['All', 'Personal', 'Work', 'Others'];

  const thought = {
    text: "The best way to get something done is to begin.",
    author: ""
  };

  // 🟢 Load todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3002/api/todos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
      } catch (error) {
        console.error('❌ Failed to fetch todos:', error.response?.data || error.message);
      }
    };

    fetchTodos();
  }, []);

  // 🟢 Add a new task (connected to backend)
  const handleAddTask = async () => {
    if (!newTask.trim()) return;

    const token = localStorage.getItem('token');
    const category = selectedCategory === 'All' ? 'Personal' : selectedCategory;

    try {
      const res = await axios.post(
        'http://localhost:3002/api/todos',
        {
          task: newTask,
          category,
          priority: 'Medium',
          dueDate: null
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(prev => [...prev, res.data]);
      setNewTask('');
    } catch (error) {
      console.error('❌ Error adding task:', error.response?.data || error.message);
      alert('Failed to add task.');
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.patch(
        `http://localhost:3002/api/todos/${id}`,
        { completed: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTasks(prev =>
        prev.map(task => (task._id === id ? res.data : task))
      );
    } catch (err) {
      console.error('❌ Failed to toggle complete:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3002/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error('❌ Failed to delete task:', err);
    }
  };

  // ✅ Filtering
  const filteredTasks = tasks.filter(task => {
    const categoryMatch = selectedCategory === 'All' || task.category === selectedCategory;
    const filterMatch =
      filterType === 'All' ||
      (filterType === 'Active' && !task.completed) ||
      (filterType === 'Completed' && task.completed);
    return categoryMatch && filterMatch;
  });

  return (
    <>
      <div className="todo-thought-section">
        <p className="thought-text">"{thought.text}"</p>
        <p className="thought-author">- {thought.author}</p>
      </div>

      <div className="todo-content-wrapper">
        <div className="todo-container">
          <div className="todo-header">
            <h1>My To Do List</h1>
            <p>Organize your tasks and boost productivity</p>
          </div>

          <div className="todo-main-content">
            <div className="task-input-section">
              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleAddTask(); }}
              />
              <button onClick={handleAddTask}>Add Task</button>
            </div>

            <div className="task-list-section">
              {filteredTasks.length === 0 && (
                <div className="empty-state">
                  <i className="fas fa-clipboard-list"></i>
                  <p>No tasks yet!</p>
                  <span>Add a task above to get started.</span>
                </div>
              )}
              {filteredTasks.map(task => (
                <div key={task._id || task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task._id, task.completed)}
                  />
                  <span className="task-text">{task.task}</span>
                  {task.category && <span className="task-category-badge">{task.category}</span>}
                  <button className="delete-task" onClick={() => handleDeleteTask(task._id)}>
                    <i className="fas fa-trash-alt"></i>
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
                  <li
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'active' : ''}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-section">
              <h3>Filters</h3>
              <ul>
                {['All', 'Active', 'Completed'].map(type => (
                  <li
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={filterType === type ? 'active' : ''}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Todo;
