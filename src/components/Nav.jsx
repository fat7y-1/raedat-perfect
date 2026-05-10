import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "/src/Nav.css"

const Nav = ({ user, handleLogOut }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <nav className="navbar-transparent">
      <div className="nav-container">

        <img
          className="logo-main"
          src="src/assets/logo.png"
          alt="raedat logo"
          onClick={() => navigate("/")}
        />

        <div className="nav-links">
          <Link to="/">{t('Home') || 'Home'}</Link>
          <Link to="/about">About</Link>
          <Link to="/community">Community</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/newsletter">Newsletter</Link>
          <Link to="/partners">Partners</Link>


          <Link to="/contactUs" className="nav-contact-btn">
            Contact Us
          </Link>

          {user && (
            <button
              onClick={handleLogOut}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                fontWeight: '700'
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
