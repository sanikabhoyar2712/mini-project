const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Make sure your user model is registered as 'User'
    },
    task: {
        type: String,
        required: [true, 'Task is required'],
        trim: true,
        minlength: [1, 'Task cannot be empty']
    },
    category: {
        type: String,
        enum: ['Work', 'Personal', 'Shopping', 'Others'],
        default: 'Others'
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// 🔍 Indexes for optimized queries by user
todoSchema.index({ userId: 1, completed: 1 });
todoSchema.index({ userId: 1, category: 1 });

// ⏰ Method to check if task is overdue
todoSchema.methods.isOverdue = function () {
    if (!this.dueDate) return false;
    return !this.completed && new Date() > this.dueDate;
};

module.exports = mongoose.model('Todo', todoSchema);
