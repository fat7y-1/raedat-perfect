// // Nav.js
import React from "react"
// import { Link, useNavigate } from "react-router-dom";
// import "/src/Nav.css"

// const Nav = () => {
//   const navigate = useNavigate();

//   return (
//     <nav className="navbar-transparent">
//       <div className="nav-container">
//         <img
//           src="src/assets/logo.png"
//           className="logo-main"
//           alt="raedat logo"
//           onClick={() => navigate("/")}
//         />
//         <div className="nav-links">
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "/src/Nav.css"

const Nav = ({ user, handleLogOut }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div>
      <nav className="navbar">
        <div className="nav-links">
          <img
            className="logo-img"
            src="src/assets/logo.png"
            alt="logo img"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/community">Community</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/newsletter">Newsletter</Link>
          <Link to="/contactUs" className="nav-contact-btn">
            Contact Us
          </Link>
          <Link to="/contactUs">Contact Us</Link>
          <Link to="/newsletter">News letter</Link>
          <Link to="/partners">Partners</Link>
          {user && <button onClick={handleLogOut}>Logout</button>}
        </div>
      </nav>
    </div>
  )
}

export default Nav
