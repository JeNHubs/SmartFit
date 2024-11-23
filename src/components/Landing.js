import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'; // Import the icons you need
import AuthModal from '../components/AuthModal'; // Import the AuthModal component
import '../assets/css/landing.css'; // Make sure this is properly linked to your CSS
import 'font-awesome/css/font-awesome.min.css';


const Landing = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isSignUp, setIsSignUp] = useState(false);
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  
    const email = localStorage.getItem('userEmail');
    console.log('Email from localStorage:', email); // Check the value of userEmail
    if (email) {
      setUserEmail(email); // Store email in state
    } else {
      setUserEmail('Guest'); // Fallback if no email is found
    }
  }, []);
  
  

  console.log('User Email Stored:', userEmail);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleForm = () => setIsSignUp(!isSignUp);

  const handleSearch = async () => {
    if (location) {
      try {
        const response = await axios.get(`http://api.example.com/gyms?location=${location}`);
        setResults(response.data.gyms);
      } catch (error) {
        setError("Failed to fetch gyms.");
      }
    }
  };
  

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);
 

  

  
  return (
    <div>
     <div className="navbar">
      <div className="brand">
        <span className="smart">Smart</span><span className="fit">Fit</span>
      </div>

      {/* Hamburger icon for mobile */}
      <div className="menu-toggle" onClick={handleMenuToggle}>
        &#9776; {/* This is the hamburger icon */}
      </div>

      {/* Nav links */}
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <div className="nav-link home"><Link className="link-button" to="/Landing">Home</Link></div>
        <div className="nav-link exercise"><Link className="link-button" to="/exerciseLib">Exercise</Link></div>
        <div className="nav-link workout"><Link className="link-button" to="/workout">Workout</Link></div>
        <div className="nav-link progress"><Link className="link-button" to="/progress">Progress</Link></div>
        <div className="nav-link about"><Link className="link-button" to="/about">About</Link></div>
       
          
        {/* Login link in menu that opens the modal */}
        <div className="nav-link login">
          {isLoggedIn ? (
            <button className="link-button" onClick={() => navigate('/profile')}>My Profile</button>
          ) : (
            <button className="link-button" onClick={openModal}>Login</button>
          )}
        </div>
      </div>

      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaInstagram />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaTiktok />
        </a>
        <p className="Welcome-user">Welcome, {userEmail}</p> 
      </div>
    </div>

      <div className="header-content">
        <div className="overlay"></div>
        <div className="headline">
          <h1>
            <span className="transform-body">Transform Your Body</span>
            <span className="transform-life">Transform Your Life</span>
          </h1>
          <p>Achieve your fitness goals with our easy-to-use workout planner.</p>
          <p>Customized routines, progress tracking, and expert guidance all in one place.</p>
          <div className="buttons">
            <a href="#get-started" className="get-started-btn" onClick={openModal}>Get Started</a>
            <a href="#learn-more" className="learn-more-btn">Learn More</a>
          </div>
        </div>
      </div>

      <div className="why-choose-smartfit">
        <h1>Why Choose SmartFit</h1>
        <div className="why-choose-smartfit-container">
          <div className="section">
            <div className="personalized-plan">
              <div className="section-icon"/>
            </div>
            <h2>Personalized Plans</h2>
            <p className="description">Tailored workout and nutrition plans that adapt to your progress and goals.</p>
          </div>
          <div className="section">
          <div className="progress-tracking">
              <div className="section-icon"/>
            </div>
            <h2>Progress Tracking</h2>
            <p className="description">Monitor your improvements with detailed analytics and milestone tracking.</p>
          </div>
          <div className="section">
          <div className="discover-workouts">
              <div className="section-icon"/>
            </div>
            <h2>Discover Workouts</h2>
            <p className="description">Collection of workouts with proper form guidance</p>
          </div>
        </div>  
      </div>  

      <div className="locate-gym">
        <div className="locate-gym-container2">
          <div className="find-gym-text">
            <h2>Find Gym Near You</h2>
            <p>Locate the perfect workout spot with our extensive network of partner gyms.</p>
            <div className="land-search-bar" >
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="search-button" onClick={handleSearch}></button>
            </div>
          </div>

          <div className="result">
            {/* <h2>.</h2>
            {results.length > 0 ? (
              <ul>
                {results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            ) : (
              <p>No gyms found.</p>
            )} */}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        toggleForm={toggleForm}
        isSignUp={isSignUp}
        setIsLoggedIn={setIsLoggedIn}
      />



      <footer className="footer">
        <p>Terms of Policy</p>
      </footer>
    </div>
  );
};


export default Landing;