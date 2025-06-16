const SelfCare = require("../models/selfCareModel");

// Create an object to hold all controller functions
const selfCareController = {};

// GET full self-care data for a user
selfCareController.getSelfCareData = async (req, res) => {
  try {
    const data = await SelfCare.findOne({ userId: req.params.userId });
    res.json({ success: true, data: data || {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// SAVE or UPDATE self-care data
selfCareController.saveSelfCareData = async (req, res) => {
  try {
    const { userId, updatedData } = req.body;
    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ userId, ...updatedData });
    } else {
      Object.assign(selfCare, updatedData);
    }

    await selfCare.save();
    res.json({ success: true, message: "Data saved successfully", selfCare });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ADD a new diary entry
selfCareController.addDiaryEntry = async (req, res) => {
  try {
    const { userId, date, content } = req.body;
    const entryDate = date || new Date();

    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ userId, diary: [{ date: entryDate, content }] });
    } else {
      selfCare.diary.push({ date: entryDate, content });
    }

    await selfCare.save();
    res.status(201).json({ success: true, message: "Diary entry added", diary: selfCare.diary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET all diary entries
selfCareController.getDiaryEntries = async (req, res) => {
  try {
    const selfCare = await SelfCare.findOne({ userId: req.params.userId });
    if (!selfCare || !selfCare.diary) {
      return res.status(404).json({ success: false, message: "No diary entries found" });
    }
    res.json({ success: true, diary: selfCare.diary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE a diary entry
selfCareController.deleteDiaryEntry = async (req, res) => {
  try {
    const { userId, entryId } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Find and remove the entry
    const entryIndex = selfCare.diary.findIndex(entry => entry._id.toString() === entryId);
    if (entryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Entry not found"
      });
    }

    selfCare.diary.splice(entryIndex, 1);
    await selfCare.save();

    res.json({ 
      success: true,
      message: "Diary entry deleted successfully",
      diary: selfCare.diary 
    });
  } catch (err) {
    console.error('Error in deleteDiaryEntry:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete diary entry", 
      details: err.message 
    });
  }
};

// ADD mood entry
selfCareController.addMood = async (req, res) => {
  try {
    const { userId, mood, date } = req.body;
    const entryDate = date || new Date();

    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ userId, moods: [{ mood, date: entryDate }] });
    } else {
      selfCare.moods.push({ mood, date: entryDate });
    }

    await selfCare.save();
    res.status(201).json({ success: true, message: "Mood entry added", moods: selfCare.moods });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET all mood entries
selfCareController.getMoods = async (req, res) => {
  try {
    const selfCare = await SelfCare.findOne({ userId: req.params.userId });
    if (!selfCare || !selfCare.moods) {
      return res.status(404).json({ success: false, message: "No mood entries found" });
    }
    res.json({ success: true, moods: selfCare.moods });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE a mood entry
selfCareController.deleteMood = async (req, res) => {
  try {
    const { userId, moodId } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Find and remove the mood
    const moodIndex = selfCare.moods.findIndex(mood => mood._id.toString() === moodId);
    if (moodIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Mood entry not found"
      });
    }

    selfCare.moods.splice(moodIndex, 1);
    await selfCare.save();

    res.json({ 
      success: true,
      message: "Mood entry deleted successfully",
      moods: selfCare.moods 
    });
  } catch (err) {
    console.error('Error in deleteMood:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete mood entry", 
      details: err.message 
    });
  }
};

// ADD meditation session
selfCareController.addMeditationEntry = async (req, res) => {
  try {
    const { userId, duration, date } = req.body;
    const entryDate = date || new Date();

    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ userId, pastMeditations: [{ duration, date: entryDate }] });
    } else {
      selfCare.pastMeditations.push({ duration, date: entryDate });
    }

    await selfCare.save();
    res.status(201).json({ success: true, message: "Meditation entry added", pastMeditations: selfCare.pastMeditations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET all meditation entries
selfCareController.getMeditationEntries = async (req, res) => {
  try {
    const selfCare = await SelfCare.findOne({ userId: req.params.userId });
    if (!selfCare || !selfCare.pastMeditations) {
      return res.status(404).json({ success: false, message: "No meditation entries found" });
    }
    res.json({ success: true, pastMeditations: selfCare.pastMeditations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE a meditation entry
selfCareController.deleteMeditationEntry = async (req, res) => {
  try {
    const { userId, meditationId } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Find and remove the meditation
    const meditationIndex = selfCare.pastMeditations.findIndex(med => med._id.toString() === meditationId);
    if (meditationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Meditation entry not found"
      });
    }

    selfCare.pastMeditations.splice(meditationIndex, 1);
    await selfCare.save();

    res.json({ 
      success: true,
      message: "Meditation entry deleted successfully",
      pastMeditations: selfCare.pastMeditations 
    });
  } catch (err) {
    console.error('Error in deleteMeditationEntry:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete meditation entry", 
      details: err.message 
    });
  }
};

// ADD a skincare goal
selfCareController.addSkincareGoal = async (req, res) => {
  try {
    const { userId, content, completed } = req.body;

    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ 
        userId, 
        skincareGoals: [{ content, completed: completed || false }] 
      });
    } else {
      selfCare.skincareGoals.unshift({ content, completed: completed || false });
    }

    await selfCare.save();
    res.status(201).json({ 
      message: "Skincare goal added successfully", 
      skincareGoals: selfCare.skincareGoals 
    });
  } catch (err) {
    console.error('Error in addSkincareGoal:', err);
    res.status(500).json({ 
      error: "Failed to save skincare goal", 
      details: err.message 
    });
  }
};

// GET all skincare goals
selfCareController.getSkincareGoals = async (req, res) => {
  try {
    const selfCare = await SelfCare.findOne({ userId: req.params.userId });
    if (!selfCare || !selfCare.skincareGoals) {
      return res.status(200).json({ skincareGoals: [] });
    }
    res.status(200).json({ skincareGoals: selfCare.skincareGoals });
  } catch (err) {
    console.error('Error in getSkincareGoals:', err);
    res.status(500).json({ 
      error: "Failed to fetch skincare goals", 
      details: err.message 
    });
  }
};

// DELETE a skincare goal
selfCareController.deleteSkincareGoal = async (req, res) => {
  try {
    const { userId, goalId } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ message: "User not found" });
    }

    selfCare.skincareGoals = selfCare.skincareGoals.filter(
      goal => goal._id.toString() !== goalId
    );

    await selfCare.save();
    res.json({ 
      success: true,
      message: "Skincare goal deleted successfully",
      skincareGoals: selfCare.skincareGoals 
    });
  } catch (err) {
    console.error('Error in deleteSkincareGoal:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete skincare goal", 
      details: err.message 
    });
  }
};

// UPDATE a skincare goal
selfCareController.updateSkincareGoal = async (req, res) => {
  try {
    const { userId, goalId, completed } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ message: "User not found" });
    }

    const goal = selfCare.skincareGoals.find(
      goal => goal._id.toString() === goalId
    );

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    goal.completed = completed;
    await selfCare.save();
    
    res.json({ 
      success: true,
      message: "Skincare goal updated successfully",
      skincareGoals: selfCare.skincareGoals 
    });
  } catch (err) {
    console.error('Error in updateSkincareGoal:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to update skincare goal", 
      details: err.message 
    });
  }
};

// ADD a workout
selfCareController.addWorkout = async (req, res) => {
  try {
    const { userId, note, time, date } = req.body;
    const entryDate = date || new Date().toLocaleDateString();
    const entryTime = time || new Date().toLocaleTimeString();

    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ 
        userId, 
        workouts: [{ note, time: entryTime, date: entryDate }] 
      });
    } else {
      selfCare.workouts.push({ note, time: entryTime, date: entryDate });
    }

    await selfCare.save();
    res.status(201).json({ 
      success: true,
      message: "Workout added successfully", 
      workouts: selfCare.workouts 
    });
  } catch (err) {
    console.error('Error in addWorkout:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to save workout", 
      details: err.message 
    });
  }
};

// GET all workouts
selfCareController.getWorkouts = async (req, res) => {
  try {
    const selfCare = await SelfCare.findOne({ userId: req.params.userId });
    if (!selfCare || !selfCare.workouts) {
      return res.status(200).json({ workouts: [] });
    }
    res.status(200).json({ workouts: selfCare.workouts });
  } catch (err) {
    console.error('Error in getWorkouts:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch workouts", 
      details: err.message 
    });
  }
};

// DELETE a workout
selfCareController.deleteWorkout = async (req, res) => {
  try {
    const { userId, workoutId } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    selfCare.workouts = selfCare.workouts.filter(
      workout => workout._id.toString() !== workoutId
    );

    await selfCare.save();
    res.json({ 
      success: true,
      message: "Workout deleted successfully",
      workouts: selfCare.workouts 
    });
  } catch (err) {
    console.error('Error in deleteWorkout:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete workout", 
      details: err.message 
    });
  }
};

// ADD a personal goal
selfCareController.addPersonalGoal = async (req, res) => {
  try {
    const { userId, content, deadline, priority, completed } = req.body;

    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ 
        userId, 
        goals: [{ content, deadline, priority, completed: completed || false }] 
      });
    } else {
      selfCare.goals.push({ content, deadline, priority, completed: completed || false });
    }

    await selfCare.save();
    res.status(201).json({ 
      success: true,
      message: "Personal goal added successfully", 
      goals: selfCare.goals 
    });
  } catch (err) {
    console.error('Error in addPersonalGoal:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to save personal goal", 
      details: err.message 
    });
  }
};

// DELETE a personal goal
selfCareController.deletePersonalGoal = async (req, res) => {
  try {
    const { userId, goalId } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Find and remove the goal
    const goalIndex = selfCare.goals.findIndex(goal => goal._id.toString() === goalId);
    if (goalIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Goal not found"
      });
    }

    selfCare.goals.splice(goalIndex, 1);
    await selfCare.save();

    res.json({ 
      success: true,
      message: "Personal goal deleted successfully",
      goals: selfCare.goals 
    });
  } catch (err) {
    console.error('Error in deletePersonalGoal:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete personal goal", 
      details: err.message 
    });
  }
};

// UPDATE a personal goal
selfCareController.updatePersonalGoal = async (req, res) => {
  try {
    const { userId, goalId, completed } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    const goal = selfCare.goals.find(
      goal => goal._id.toString() === goalId
    );

    if (!goal) {
      return res.status(404).json({ 
        success: false,
        message: "Goal not found" 
      });
    }

    goal.completed = completed;
    await selfCare.save();
    
    res.json({ 
      success: true,
      message: "Personal goal updated successfully",
      goals: selfCare.goals 
    });
  } catch (err) {
    console.error('Error in updatePersonalGoal:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to update personal goal", 
      details: err.message 
    });
  }
};

// ADD an important date
selfCareController.addImportantDate = async (req, res) => {
  try {
    const { userId, title, date, description } = req.body;
    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ 
        userId, 
        importantDates: [{ title, date, description }] 
      });
    } else {
      selfCare.importantDates.push({ title, date, description });
    }

    await selfCare.save();
    res.status(201).json({ 
      success: true,
      message: "Important date added successfully", 
      importantDates: selfCare.importantDates 
    });
  } catch (err) {
    console.error('Error in addImportantDate:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to save important date", 
      details: err.message 
    });
  }
};

// DELETE an important date
selfCareController.deleteImportantDate = async (req, res) => {
  try {
    const { userId, dateId } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Find and remove the date
    const dateIndex = selfCare.importantDates.findIndex(date => date._id.toString() === dateId);
    if (dateIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Important date not found"
      });
    }

    selfCare.importantDates.splice(dateIndex, 1);
    await selfCare.save();

    res.json({ 
      success: true,
      message: "Important date deleted successfully",
      importantDates: selfCare.importantDates 
    });
  } catch (err) {
    console.error('Error in deleteImportantDate:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete important date", 
      details: err.message 
    });
  }
};

// UPDATE an important date
selfCareController.updateImportantDate = async (req, res) => {
  try {
    const { userId, dateId, title, date, description } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    const dateToUpdate = selfCare.importantDates.find(
      date => date._id.toString() === dateId
    );

    if (!dateToUpdate) {
      return res.status(404).json({ 
        success: false,
        message: "Important date not found" 
      });
    }

    dateToUpdate.title = title;
    dateToUpdate.date = date;
    dateToUpdate.description = description;

    await selfCare.save();
    res.json({ 
      success: true,
      message: "Important date updated successfully",
      importantDates: selfCare.importantDates 
    });
  } catch (err) {
    console.error('Error in updateImportantDate:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to update important date", 
      details: err.message 
    });
  }
};

// ADD a learning thought
selfCareController.addLearningThought = async (req, res) => {
  try {
    const { userId, content, category } = req.body;
    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ 
        userId, 
        thoughts: [{ content, category, date: new Date() }] 
      });
    } else {
      selfCare.thoughts.push({ content, category, date: new Date() });
    }

    await selfCare.save();
    res.status(201).json({ 
      success: true,
      message: "Thought added successfully", 
      thoughts: selfCare.thoughts 
    });
  } catch (err) {
    console.error('Error in addLearningThought:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to save thought", 
      details: err.message 
    });
  }
};

// DELETE a learning thought
selfCareController.deleteLearningThought = async (req, res) => {
  try {
    const { userId, thoughtId } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Find and remove the thought
    const thoughtIndex = selfCare.thoughts.findIndex(thought => thought._id.toString() === thoughtId);
    if (thoughtIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Thought not found"
      });
    }

    selfCare.thoughts.splice(thoughtIndex, 1);
    await selfCare.save();

    res.json({ 
      success: true,
      message: "Thought deleted successfully",
      thoughts: selfCare.thoughts 
    });
  } catch (err) {
    console.error('Error in deleteLearningThought:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete thought", 
      details: err.message 
    });
  }
};

// ADD an achievement
selfCareController.addAchievement = async (req, res) => {
  try {
    const { userId, content, category } = req.body;
    let selfCare = await SelfCare.findOne({ userId });

    if (!selfCare) {
      selfCare = new SelfCare({ 
        userId, 
        achievements: [{ content, category, date: new Date() }] 
      });
    } else {
      selfCare.achievements.push({ content, category, date: new Date() });
    }

    await selfCare.save();
    res.status(201).json({ 
      success: true,
      message: "Achievement added successfully", 
      achievements: selfCare.achievements 
    });
  } catch (err) {
    console.error('Error in addAchievement:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to save achievement", 
      details: err.message 
    });
  }
};

// DELETE an achievement
selfCareController.deleteAchievement = async (req, res) => {
  try {
    const { userId, achievementId } = req.body;
    const selfCare = await SelfCare.findOne({ userId });
    
    if (!selfCare) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Find and remove the achievement
    const achievementIndex = selfCare.achievements.findIndex(achievement => achievement._id.toString() === achievementId);
    if (achievementIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found"
      });
    }

    selfCare.achievements.splice(achievementIndex, 1);
    await selfCare.save();

    res.json({ 
      success: true,
      message: "Achievement deleted successfully",
      achievements: selfCare.achievements 
    });
  } catch (err) {
    console.error('Error in deleteAchievement:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete achievement", 
      details: err.message 
    });
  }
};

module.exports = selfCareController;
