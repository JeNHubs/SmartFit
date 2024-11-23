
//Pag display nung exercise dun sa exerciseLib pinaghiwalay ko lng.


import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../assets/css/exerciselib.css';
import '../assets/css/exercise.css';


const Exercise = ({ id, title, workoutType, muscleGroups, duration, setsReps, level, imageUrl }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [createdWorkouts, setCreatedWorkouts] = useState([]);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  
  const handleCreateWorkoutModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCreateWorkout = () => {
    if (newWorkoutName.trim()) {
      setCreatedWorkouts((prevWorkouts) => [
        ...prevWorkouts,
        { workoutName: newWorkoutName, exercises: [{ title }] }
      ]);
      setNewWorkoutName('');
    }
  };

  const toggleExercisesVisibility = (index) => {
    const updatedWorkouts = [...createdWorkouts];
    updatedWorkouts[index].isOpen = !updatedWorkouts[index].isOpen;
    setCreatedWorkouts(updatedWorkouts);
  };

  const handleAddToWorkout = () => {
    setShowModal(true); // Show the first modal when "Add to Workout" is clicked
  };


  return (
    <div className="exercise-box-container">
      <div className="exercise-box">
        <div className="exercise-details-text">
          <div className="exercise-title">{title}</div>
          <div className="exercise-subtitle">{workoutType}</div>
          <div className="exercise-info">{muscleGroups}</div>
          <div className="duration">{duration}</div>
          <div className="sets-reps">{setsReps}</div>
          <div className="hardcore-label">{level}</div>
        </div>
        <div className="exercise-image">
          <img src={imageUrl} alt={title} />
        </div>
      </div>

      <div className="exercise-button">
        {/* Add a link to the details page */}
        <Link to={`/exercise/${id}`} className='toggle-details-btn'>
          View Details
        </Link>

        <button className="toggle-add-btn" onClick={handleAddToWorkout}>
          {showDetails ? 'Added to Workout' : 'Add to Workout'}
        </button>
      </div>
     
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create a New Workout</h2>
            <input
              type="text"
              placeholder="Enter Workout Name"
              value={newWorkoutName}
              onChange={(e) => setNewWorkoutName(e.target.value)}
              className="workout-name-input"
            />
            <button className="create-workout-btn" onClick={handleCreateWorkout}>
              Create Workout
            </button>
            <button className="close-modal-btn" onClick={handleModalClose}>
              Close
            </button>

            {/* Display Created Workouts */}
            {createdWorkouts.length > 0 && (
              <div className="created-workouts">
                <h3>Created Workouts</h3>
                {createdWorkouts.map((workout, index) => (
                  <div key={index} className="created-workout">
                    {/* Workout Name as Button */}
                    <button
                      className="workout-name-btn"
                      onClick={() => toggleExercisesVisibility(index)}
                    >
                      {workout.workoutName}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;