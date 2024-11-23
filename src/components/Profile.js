import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaSearch } from 'react-icons/fa';


const Profile = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Menu toggle state

    const toggleMenu = () => {
      setMenuOpen(!menuOpen); // Toggle menu visibility
    };

  return (
    <div className="Profile-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="brand">
          <span className="smart">Smart</span>
          <span className="fit">Fit</span>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* This is the hamburger icon */}
        </div>

        <div className="nav-links">
        <div className="nav-link home"><Link className="link-button" to="/">Home</Link></div>
          <div className="nav-link exercise"><Link className="link-button" to="/exerciseLib">Exercise</Link></div>
          <div className="nav-link workout"><Link className="link-button" to="/workout">Workout</Link></div>
          <div className="nav-link progress"><Link className="link-button" to="/progress">Progress</Link></div>
          <div className="nav-link about"><Link className="link-button" to="/about">About</Link></div>
          <div className="nav-link profile">MyProfile</div>
          <div className="nav-link profile"><Link to="/logout">Logout</Link></div>
        </div>
        <div className="social-icons">
          <div className="social-icon icon-1" />
          <div className="social-icon icon-2" />
          <div className="social-icon icon-3" />
        </div>
      </div>
      {/* Hamburger icon for mobile */}
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* This is the hamburger icon */}
        </div>

     

      <footer className="footer">
        <p>Terms of Policy</p>
      </footer>
    </div>
  );
};

export default Profile;
