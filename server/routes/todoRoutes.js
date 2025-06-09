const express = require('express');
const router = express.Router();

const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const requireAuth = require('../middleware/requireAuth');

// Protect all routes
router.use(requireAuth);

// POST - create new todo
router.post('/', createTodo);

// GET - fetch all todos
router.get('/', getTodos);

// PATCH - update a todo by ID
router.patch('/:id', updateTodo);

// DELETE - delete a todo by ID
router.delete('/:id', deleteTodo);

module.exports = router;
