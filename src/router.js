// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';  // Your Landing component
import ExerciseLib from './components/ExerciseLib'; // The ExerciseLib component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Landing />} /> {/* The route for the landing page */}
        <Route path="/exercise-lib" element={<ExerciseLib />} /> {/* The route for the ExerciseLib page */}
      </Routes>
    </Router>
  );
}

export default App;
