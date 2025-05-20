const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/tasksdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

// Schema
const taskSchema = new mongoose.Schema({
    title: String
});
const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/api/tasks', async(req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/api/tasks', async(req, res) => {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.json(newTask);
});

app.delete('/api/tasks/:id', async(req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});