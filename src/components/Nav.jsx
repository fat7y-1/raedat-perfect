import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "/src/Nav.css";

const Nav = ({ user, handleLogOut }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <nav className="navbar-transparent">
      <div className="nav-container">

        <img
          className="logo-main"
          src="/src/assets/logo.png"
          alt="raedat logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        <div className="nav-links">

          <Link to="/">{t("Home") || "Home"}</Link>
          <Link to="/about">About</Link>
          <Link to="/community">Community</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/newsletter">Newsletter</Link>
          <Link to="/partners">Partners</Link>


          {user && (
            <>

              <Link
                to="/update-password"
              >
                Update Password
              </Link>

              <button
                onClick={handleLogOut}
                className="logout-nav-btn"
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontWeight: "700",
                  padding: "0",
                  marginLeft: "15px"
                }}
              >
                Logout
              </button>
            </>
          )}

          <Link to="/contactUs" className="nav-contact-btn">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
