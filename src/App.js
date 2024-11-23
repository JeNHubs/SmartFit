// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing'; // Your Landing component
import ExerciseLib from './components/ExerciseLib'; // The ExerciseLib component
import ExerciseDetails from './components/ExerciseDetails'; // New details page
import MyProfile from './components/Profile'; // The ExerciseLib component
import Logout from './components/logout'; // The ExerciseLib component
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Landing />} /> {/* The route for the landing page */}
        <Route path="/exerciseLib" element={<ExerciseLib />} /> {/* The route for the ExerciseLib page */}
        <Route path="/exercise/:id" element={<ExerciseDetails />} /> {/* Add route for details page */}
        <Route path="/Profile" element={<MyProfile />} /> {/* The route for the ExerciseLib page */}
        <Route path="/logout" element={<Logout />} /> {/* The route for the ExerciseLib page */}
      </Routes>
    </Router>
  );
};

export default App;
