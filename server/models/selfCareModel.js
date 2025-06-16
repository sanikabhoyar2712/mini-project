const mongoose = require('mongoose');

// Sub-schemas

const skincareGoalSchema = new mongoose.Schema({
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const goalSchema = new mongoose.Schema({
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deadline: { type: String },
  priority: { type: String },
});

const moodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  date: { type: String },
});

const thoughtSchema = new mongoose.Schema({
  content: { type: String, required: true },
  category: { type: String },
  date: { type: String },
});

const achievementSchema = new mongoose.Schema({
  content: { type: String, required: true },
  category: { type: String },
  date: { type: String },
});

const importantDateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String },
  description: { type: String },
});

const meditationSchema = new mongoose.Schema({
  duration: { type: String, required: true },
  date: { type: String },
});

const diaryEntrySchema = new mongoose.Schema({
  date: { type: String },
  content: { type: String, required: true },
});

const workoutSchema = new mongoose.Schema({
  note: { type: String },
  time: { type: String },
  date: { type: String }
});

// Main SelfCare schema
const SelfCareSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    skincareGoals: [skincareGoalSchema],
    goals: [goalSchema],
    moods: [moodSchema],
    thoughts: [thoughtSchema],
    achievements: [achievementSchema],
    importantDates: [importantDateSchema],
    pastMeditations: [meditationSchema],
    diary: [diaryEntrySchema],
    workouts: [workoutSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('SelfCare', SelfCareSchema);
