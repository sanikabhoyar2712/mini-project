import axios from 'axios';

// Set base URL for all requests
const API = axios.create({
  baseURL: 'http://localhost:5000/api/todos',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get all todos
export const fetchTodos = async () => {
  try {
    const response = await API.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todoData) => {
  try {
    const response = await API.post('/', todoData);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update a todo by id
export const updateTodo = async (id, updateData) => {
  try {
    const response = await API.patch(`/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// Delete a todo by id
export const deleteTodo = async (id) => {
  try {
    const response = await API.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}; 