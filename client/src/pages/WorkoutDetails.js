import React from 'react';
import { useParams } from 'react-router-dom';
import './WorkoutDetails.css';

// Workout videos data (copied from SelfCare.jsx for now)
const workoutVideos = {
  beginner: {
    title: "Beginner Full Body Workout",
    duration: "20 minutes",
    level: "Beginner",
    url: "https://www.youtube.com/watch?v=2pLT-olgUJs",
    description: "Perfect for those just starting their fitness journey",
    thumbnail: "https://img.youtube.com/vi/2pLT-olgUJs/maxresdefault.jpg"
  },
  weightLoss: {
    title: "WEIGHT LOSS in 7 DAYS - 40MIN Full Body Fat Burn",
    duration: "40 minutes",
    level: "Intermediate",
    url: "https://www.youtube.com/watch?v=Ammb_7sv_KA",
    description: "Effective full body workout for fat burning",
    thumbnail: "https://img.youtube.com/vi/Ammb_7sv_KA/maxresdefault.jpg"
  },
  weightLossStanding: {
    title: "FULL BODY FAT LOSS in 14 Days - Standing",
    duration: "30 minutes",
    level: "Intermediate",
    url: "https://www.youtube.com/watch?v=-qcA-GqCVeI",
    description: "A non-stop standing full body workout for fat loss.",
    thumbnail: "https://img.youtube.com/vi/-qcA-GqCVeI/maxresdefault.jpg"
  },
  weightLoss10Days: {
    title: "Lose 5 Kg in 10 Days - At Home Workout",
    duration: "~30 minutes", // Approximating duration
    level: "Intermediate", // Assuming Intermediate
    url: "https://www.youtube.com/watch?v=emtmqKFGhw4",
    description: "An effective at-home workout routine for weight loss.",
    thumbnail: "https://img.youtube.com/vi/emtmqKFGhw4/maxresdefault.jpg"
  },
  weightGain: {
    title: "Strength Training for Muscle Gain",
    duration: "30 minutes",
    level: "Intermediate",
    url: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    description: "Build muscle and increase strength",
    thumbnail: "https://img.youtube.com/vi/3VcKaXpzqRo/maxresdefault.jpg"
  },
  yoga: {
    title: "Morning Yoga Flow",
    duration: "15 minutes",
    level: "All Levels",
    url: "https://www.youtube.com/watch?v=sTANio_2E0Q",
    description: "Start your day with energy and flexibility",
    thumbnail: "https://img.youtube.com/vi/sTANio_2E0Q/maxresdefault.jpg"
  },
  core: {
    title: "Core Strength & Planks",
    duration: "15 minutes",
    level: "Beginner",
    url: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
    description: "Strengthen your core and improve posture",
    thumbnail: "https://img.youtube.com/vi/ASdvN_XEl_c/maxresdefault.jpg"
  },
  legs: {
    title: "20 Min Lower Body Workout - Glutes & Legs",
    duration: "20 minutes",
    level: "Beginner",
    url: "https://www.youtube.com/watch?v=AA3WRECMiSg",
    description: "Effective no-equipment workout for toning legs and glutes",
    thumbnail: "https://img.youtube.com/vi/AA3WRECMiSg/maxresdefault.jpg"
  },
  fullBodySmallSpace: {
    title: "30 Min Full Body Workout - Small Space",
    duration: "30 minutes",
    level: "Beginner",
    url: "https://www.youtube.com/watch?v=73NEi4HzHPs",
    description: "A complete full body workout suitable for small spaces.",
    thumbnail: "https://img.youtube.com/vi/73NEi4HzHPs/maxresdefault.jpg"
  },
  beginnerNoEquipment: {
    title: "20 min TOTAL BEGINNER FULL BODY Workout (No Equipment)",
    duration: "20 minutes",
    level: "Beginner",
    url: "https://www.youtube.com/watch?v=ZeJLIdQenTo",
    description: "A full body workout perfect for total beginners with no equipment.",
    thumbnail: "https://img.youtube.com/vi/ZeJLIdQenTo/maxresdefault.jpg"
  },
  fullBodyStrength1: {
    title: "FULL BODY Workout To Strengthen Muscle!",
    duration: "~45 minutes", // Approximating duration
    level: "Intermediate", // Assuming Intermediate
    url: "https://m.youtube.com/watch?v=ryIe1i91EbM",
    description: "A full body workout focused on building muscle strength.",
    thumbnail: "https://img.youtube.com/vi/ryIe1i91EbM/maxresdefault.jpg"
  },
  fullBodyStrength2: {
    title: "30 minute NO REPEAT Full Body Strength Training",
    duration: "30 minutes",
    level: "Intermediate", // Assuming Intermediate
    url: "https://www.youtube.com/watch?v=tj0o8aH9vJw",
    description: "A 30 minute no repeat full body strength training routine.",
    thumbnail: "https://img.youtube.com/vi/tj0o8aH9vJw/maxresdefault.jpg"
  },
  yogaFlow: {
    title: "20 MIN FEEL GOOD YOGA",
    duration: "20 minutes",
    level: "All Levels",
    url: "https://www.youtube.com/watch?v=poZBpvLTHNw",
    description: "A yoga flow to stretch and feel good.",
    thumbnail: "https://img.youtube.com/vi/poZBpvLTHNw/maxresdefault.jpg"
  },
  yogaStrength: {
    title: "40 MIN YOGA WORKOUT",
    duration: "40 minutes",
    level: "Intermediate", // Assuming Intermediate
    url: "https://www.youtube.com/watch?v=uqJ-jANozcE",
    description: "A full body yoga flow for strength.",
    thumbnail: "https://img.youtube.com/vi/uqJ-jANozcE/maxresdefault.jpg"
  }
};

function WorkoutDetails() {
  const { workoutId } = useParams();
  const workout = workoutVideos[workoutId];

  if (!workout) {
    return <div>Workout not found!</div>;
  }

  // Extract video ID from YouTube URL
  const videoIdMatch = workout.url.match(/(?:\?v=|&v=|youtu\.be\/)([^&]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  return (
    <div className="workout-details-container">
      <h1>{workout.title}</h1>
      <p>Duration: {workout.duration}</p>
      <p>Level: {workout.level}</p>
      <p>{workout.description}</p>

      {videoId ? (
        <div className="video-responsive">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={workout.title}
          ></iframe>
        </div>
      ) : (
        <p>Could not load video.</p>
      )}

      {/* Optional: Add workout tips related to this workout */}
      {/* You would need to pass or fetch workout tips data here */}

    </div>
  );
}

export default WorkoutDetails; 