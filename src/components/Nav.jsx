import { Link } from "react-router"

const Nav = () => {
  return (
    <div>
      <nav className="navbar">

        <div className="nav-links">
          <Link to="/">Home</Link>
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
