const express = require("express");
const router = express.Router();

const {
  getSelfCareData,
  saveSelfCareData,
  addDiaryEntry,
  getDiaryEntries,
  deleteDiaryEntry,
  addMood,
  getMoods,
  deleteMood,
  addMeditationEntry,
  getMeditationEntries,
  deleteMeditationEntry,
  addSkincareGoal,
  getSkincareGoals,
  addWorkout,              // ✅ NEW: Import add workout
  getWorkouts,              // ✅ NEW: Import get workouts
  deleteSkincareGoal,
  updateSkincareGoal,
  deleteWorkout,
  addPersonalGoal,
  deletePersonalGoal,
  updatePersonalGoal,
  // Add new controller functions
  addImportantDate,
  deleteImportantDate,
  updateImportantDate,
  addLearningThought,
  deleteLearningThought,
  addAchievement,
  deleteAchievement
} = require("../controllers/selfCareController");

// ✅ Get all self-care data for a specific user
router.get("/:userId", getSelfCareData);

// ✅ Save or update self-care data
router.post("/", saveSelfCareData);

// ✅ Diary routes
router.post("/diary", addDiaryEntry);
router.get("/diary/:userId", getDiaryEntries);
router.post("/diary/delete", deleteDiaryEntry);

// ✅ Mood routes
router.post("/mood", addMood);
router.get("/mood/:userId", getMoods);
router.post("/mood/delete", deleteMood);

// ✅ Meditation routes
router.post("/meditation", addMeditationEntry);
router.get("/meditation/:userId", getMeditationEntries);
router.post("/meditation/delete", deleteMeditationEntry);

// ✅ Skincare routes
router.post("/skincare", addSkincareGoal);
router.get("/skincare/:userId", getSkincareGoals);
router.post("/skincare/delete", deleteSkincareGoal);
router.post("/skincare/update", updateSkincareGoal);

// ✅ Workout routes
router.post("/workout", addWorkout);           // 👈 POST workout
router.get("/workout/:userId", getWorkouts);   // 👈 GET workouts
router.post("/workout/delete", deleteWorkout);

// ✅ Personal goal routes
router.post("/personal-goal", addPersonalGoal);
router.post("/personal-goal/delete", deletePersonalGoal);
router.post("/personal-goal/update", updatePersonalGoal);

// Important Dates routes
router.post("/important-date", addImportantDate);
router.post("/important-date/delete", deleteImportantDate);
router.post("/important-date/update", updateImportantDate);

// Learning Thoughts routes
router.post("/learning-thought", addLearningThought);
router.post("/learning-thought/delete", deleteLearningThought);

// Achievements routes
router.post("/achievement", addAchievement);
router.post("/achievement/delete", deleteAchievement);

module.exports = router;
