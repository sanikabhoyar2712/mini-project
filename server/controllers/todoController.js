const Todo = require('../models/todoModel');
const mongoose = require('mongoose');

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
    try {
        const { task, category, priority, dueDate } = req.body;

        // Validate required fields
        if (!task || !category) {
            return res.status(400).json({ error: 'Task and category are required' });
        }

        // Validate dueDate if provided
        if (dueDate && isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: 'Invalid dueDate format' });
        }

        console.log('req.user in createTodo:', req.user);

        const todo = await Todo.create({
            userId: req.user._id,
            task,
            category,
            priority,
            dueDate
        });

        console.log('Todo created:', { id: todo._id, task: todo.task });

        const todoObj = todo.toObject();
        delete todoObj.__v;

        res.status(201).json(todoObj);
    } catch (err) {
        console.error("Error creating todo:", {
            message: err.message,
            stack: err.stack
        });
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

// @desc    Get all todos for the logged-in user
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .select('-__v');

        console.log(`Fetched ${todos.length} todos for user:`, req.user._id);
        res.status(200).json(todos);
    } catch (err) {
        console.error("Error fetching todos:", {
            message: err.message,
            stack: err.stack
        });
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

// @desc    Update a todo by ID
// @route   PATCH /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid todo ID format' });
        }

        if (updates.dueDate && isNaN(Date.parse(updates.dueDate))) {
            return res.status(400).json({ error: 'Invalid dueDate format' });
        }

        const todo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.user._id },
            updates,
            { new: true, runValidators: true }
        ).select('-__v');

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found or unauthorized' });
        }

        console.log('Todo updated successfully:', { id: todo._id, task: todo.task });
        res.status(200).json(todo);
    } catch (err) {
        console.error("Error updating todo:", {
            message: err.message,
            stack: err.stack
        });
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

// @desc    Delete a todo by ID
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
    console.log("Delete Request Details:", {
        userId: req.user?._id,
        todoId: req.params.id,
        method: req.method,
        path: req.path
    });

    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid todo ID format' });
        }

        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found or unauthorized' });
        }

        console.log('Todo deleted successfully:', {
            id: todo._id,
            task: todo.task,
            deletedAt: new Date().toISOString()
        });
        res.status(200).json({ message: 'Todo deleted successfully', id: todo._id });
    } catch (err) {
        console.error("Error deleting todo:", {
            message: err.message,
            stack: err.stack,
            todoId: req.params.id,
            userId: req.user?._id
        });
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};
