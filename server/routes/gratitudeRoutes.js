const express = require('express');
const router = express.Router();
const Gratitude = require('../models/Gratitude');
const protect = require('../middleware/authMiddleware');

// Get all gratitude entries for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    console.log('GET /gratitude - User ID:', req.user.id);
    const entries = await Gratitude.find({ user: req.user.id }).sort({ date: -1 });
    console.log('Found entries:', entries.length);
    res.json(entries);
  } catch (error) {
    console.error('Error in GET /gratitude:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new gratitude entry
router.post('/', protect, async (req, res) => {
  console.log('POST /gratitude - Request received');
  console.log('Headers:', req.headers);
  console.log('User ID:', req.user.id);
  console.log('Request body:', req.body);
  
  try {
    const { text, color, flowerEmoji } = req.body;
    
    if (!text || !color || !flowerEmoji) {
      console.log('Missing required fields:', { text, color, flowerEmoji });
      return res.status(400).json({ 
        message: 'All fields are required',
        received: { text, color, flowerEmoji }
      });
    }

    const newEntry = new Gratitude({
      user: req.user.id,
      text,
      color,
      flowerEmoji
    });

    console.log('Creating new entry:', newEntry);
    const savedEntry = await newEntry.save();
    console.log('Entry saved successfully:', savedEntry);
    
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error('Error in POST /gratitude:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Delete a gratitude entry
router.delete('/:id', protect, async (req, res) => {
  try {
    console.log('DELETE /gratitude/:id - Request received');
    console.log('Entry ID:', req.params.id);
    console.log('User ID:', req.user.id);

    const entry = await Gratitude.findById(req.params.id);
    
    if (!entry) {
      console.log('Entry not found');
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Check if the entry belongs to the logged-in user
    if (entry.user.toString() !== req.user.id) {
      console.log('User not authorized to delete this entry');
      return res.status(401).json({ message: 'Not authorized' });
    }

    await entry.deleteOne();
    console.log('Entry deleted successfully');
    res.json({ message: 'Entry removed' });
  } catch (error) {
    console.error('Error in DELETE /gratitude:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 