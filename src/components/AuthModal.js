// src/components/AuthModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, closeModal, toggleForm, isSignUp, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();


  

  const validateForm = () => {
    if (!email.includes('@')) {
      setError("Please enter a valid email.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
  
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
      });
  
      // Ensure the response is correct before proceeding
      if (response.data.success) {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userEmail', email); // Store email only after successful signup
        setIsLoggedIn(true);
        closeModal();
        navigate('/'); // Redirect after successful signup
      } else {
        setError(response.data.error || 'Signup failed');
      }
    } catch (error) {
      setError('Signup request failed');
    }
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });

      if (response.data.success) {

        // Store the token and user email in localStorage
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userEmail', email); // Store email here
        closeModal();
        setIsLoggedIn(true); // Update login state
        navigate('/'); // Redirect to Exercise Library after successful login
      } else {
        setError(response.data.error || 'Login failed');
      }
    } catch (error) {
      setError('Login request failed');
    }  
  };

  

  

  return (
    isOpen && (
      <div className="modal open">
        <div className="login-container">
          <div className="logo">
            <img src="/img/muscleman.png" alt="Logo" />
          </div>

          <div className="social-login">
            <button className="btn-facebook" onClick={() => console.log('Facebook login')}>
              <i className="fa fa-google"></i> Facebook
            </button>
            <button className="btn-google" onClick={() => console.log('Google login')}>
              <i className="fa fa-google"></i> Google
            </button>
          </div>

          <div className="or-container">
            <div className="line"></div>
            <div className="or-text">OR</div>
            <div className="line"></div>
          </div>

          {!isSignUp ? (
            <div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <button className="btn-signin" onClick={handleSignIn}>
                Sign In
              </button>
              <p>
                Don't have an account?{' '}
                <button onClick={toggleForm} className="link-button">
                  Sign Up
                </button>
              </p>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </div>
              <button className="btn-signup" onClick={handleSignUp}>
                Sign Up
              </button>
              <p>
                Already have an account?{' '}
                <button onClick={toggleForm} className="link-button">
                  Sign In
                </button>
              </p>
            </div>
          )}

          {error && <p className="error">{error}</p>}
          <button className="close-modal" onClick={closeModal}>
            X
          </button>
        </div>
      </div>
    )
  );
};
export default AuthModal;
