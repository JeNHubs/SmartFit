// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional global styles
import App from './App'; // Correct the import path if needed

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
