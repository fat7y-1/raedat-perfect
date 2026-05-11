import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "../components/Nav.css"

const Nav = ({ user, handleLogOut }) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 992
      setIsMobile(mobile)

      if (!mobile) setOpen(false)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav className="navbar-transparent">
      <div className="nav-container">
        <img
          className="logo-main"
          src="src/assets/logo.png"
          alt="raedat logo"
          onClick={() => navigate("/")}
        />

        {isMobile && (
          <button className="menu-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>
        )}

        <div
          className="nav-links"
          style={{
            display: !isMobile ? "flex" : open ? "flex" : "none",
          }}
        >
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/about">{t("nav.about")}</Link>
          <Link to="/community">{t("nav.community")}</Link>
          <Link to="/activities">{t("nav.activities")}</Link>
          <Link to="/newsletter">{t("nav.newsletter")}</Link>
          <Link to="/partners">{t("nav.partners")}</Link>

          <Link to="/contactUs" className="nav-contact-btn">
            {t("nav.contact")}
          </Link>

          <div className="nav-lang">
            <button onClick={() => i18n.changeLanguage("ar")}>العربية</button>
            <button onClick={() => i18n.changeLanguage("en")}>EN</button>
          </div>

          {user && (
            <button onClick={handleLogOut} className="logout-btn">
              {t("nav.logout")}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
