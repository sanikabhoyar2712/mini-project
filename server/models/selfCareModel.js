const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  content: String,
  completed: Boolean,
  deadline: String,
  priority: String,
});

const moodSchema = new mongoose.Schema({
  mood: String,
  date: String,
});

const thoughtSchema = new mongoose.Schema({
  content: String,
  category: String,
  date: String,
});

const achievementSchema = new mongoose.Schema({
  content: String,
  category: String,
  date: String,
});

const importantDateSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String,
});

const meditationSchema = new mongoose.Schema({
  duration: String,
  date: String,
});

const skincareGoalSchema = new mongoose.Schema({
  content: String,
  completed: Boolean,
});

const diaryEntrySchema = new mongoose.Schema({
  date: String,
  content: String,
});

const SelfCareSchema = new mongoose.Schema(
  {
    userId: String,
    skincareGoals: [skincareGoalSchema],
    goals: [goalSchema],
    moods: [moodSchema],
    thoughts: [thoughtSchema],
    achievements: [achievementSchema],
    importantDates: [importantDateSchema],
    pastMeditations: [meditationSchema],
    diary: [diaryEntrySchema], // ✅ NEW: diary support added
  },
  { timestamps: true }
);

module.exports = mongoose.model('SelfCare', SelfCareSchema);
