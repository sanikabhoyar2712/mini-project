const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Mood', moodSchema);
