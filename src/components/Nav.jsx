import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

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
          <Link to="/activities">Activities</Link>
          <Link to="/community">Community</Link>
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
