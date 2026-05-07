import { Link } from "react-router"

import { useNavigate } from "react-router-dom"

const Nav = () => {
    const navigate = useNavigate()
  return (
    <div>
      <nav className="navbar">

        <div className="nav-links">

       <img
              className="logo-img"
              src="src/assets/logo.png"
              alt="logo img"  onClick={() => navigate("/")}
            />

          <Link to="/about">About</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/community">Community</Link>
          <Link to="/contactUs">Contact Us</Link>
          <Link to="/newsletter">News letter</Link>
          <Link to="/partners">Partners</Link>
        </div>
      </nav>
    </div>
  )
}

export default Nav
