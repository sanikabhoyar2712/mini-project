import axios from 'axios';
import { useState, useEffect } from 'react';
import './Todo.css';

function Todo() {
  // Get JWT token from localStorage once
  const token = localStorage.getItem('token');

  // Axios config with auth header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // States
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [category, setCategory] = useState("Others");
  const [priority, setPriority] = useState("Low");

  // Fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/todos', config);
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []); // empty deps - run once

  // Add task handler
  const handleAddTask = async () => {
    console.log("Add Task clicked!");
    if (!taskText.trim()) return;

    try {
      const res = await axios.post(
        'http://localhost:5000/api/todos',
        { task: taskText, category, priority },
        config
      );

      setTasks([...tasks, res.data]);
      setTaskText("");
      setCategory("Others");
      setPriority("Low");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle complete status handler
  const toggleComplete = async (id, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/todos/${id}`,
        { completed: !currentStatus },
        config
      );

      setTasks(tasks.map(task =>
        task._id === id ? { ...task, completed: !currentStatus } : task
      ));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task handler
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, config);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="todo-container">
      {/* Header */}
      <div className="todo-header">
        <h1>My Tasks</h1>
        <p>Stay organized and focused!</p>
      </div>

      {/* Main Content */}
      <div className="todo-main-content">
        {/* Input to add task */}
        <div className="task-input">
          <input
            type="text"
            placeholder="Add a new task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        {/* Task list or empty state */}
        {tasks.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-tasks"></i>
            <p>No tasks yet!</p>
            <span>Add a task to get started</span>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task._id, task.completed)}
                />
                <span className="task-text">{task.task}</span>
                <button className="delete-task" onClick={() => deleteTask(task._id)}>🗑️</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="todo-sidebar">
        <div className="sidebar-section">
          <h3>Categories</h3>
          <ul>
            <li className="active">All</li>
            <li>Work</li>
            <li>Personal</li>
            <li>Others</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
