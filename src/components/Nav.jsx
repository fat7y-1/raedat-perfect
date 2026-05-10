// Nav.js
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "/src/Nav.css"


const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar-transparent">
      <div className="nav-container">
        <img
          src="src/assets/logo.png"
          className="logo-main"
          alt="raedat logo"
          onClick={() => navigate("/")}
        />
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/community">Community</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/newsletter">Newsletter</Link>
          <Link to="/contactUs" className="nav-contact-btn">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
