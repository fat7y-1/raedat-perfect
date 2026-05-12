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

  const handleLinkClick = () => setOpen(false)

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-pinterest-p"></i>
        </div>
      </div>

      {/* NAV */}
      <nav className="navbar-main">
        <div className="nav-container">
          {/* ROW 1: لانج + لوقو + منيو */}
          <div className="nav-top-row">
            <div className="lang-switch">
              <button
                className={i18n.language === "ar" ? "active" : ""}
                onClick={() => i18n.changeLanguage("ar")}
              >
                AR
              </button>
              <button
                className={i18n.language === "en" ? "active" : ""}
                onClick={() => i18n.changeLanguage("en")}
              >
                EN
              </button>
            </div>

            <div className="logo-center">
              <img
                src="src/assets/logo.png"
                className="logo-main"
                alt="logo"
                onClick={() => navigate("/")}
              />
            </div>

            {/* زر المنيو — موبايل فقط */}
            {isMobile && (
              <button
                className={`menu-btn ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
                aria-label="القائمة"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}

            {/* placeholder ديسكتوب عشان اللوقو يبقى في المنتصف */}
            {!isMobile && <div className="nav-placeholder" />}
          </div>

          {/* ROW 2: لنكات ديسكتوب تحت اللوقو */}
          {!isMobile && (
            <div className="nav-links desktop">
              <Link to="/">{t("nav.home")}</Link>
              <Link to="/about">{t("nav.about")}</Link>
              <Link to="/activities">{t("nav.activities")}</Link>
              <Link to="/community">{t("nav.community")}</Link>
              <Link to="/newsletter">{t("nav.newsletter")}</Link>
              <Link to="/partners">{t("nav.partners")}</Link>
              <Link to="/contactUs">{t("nav.contact")}</Link>
              {user?.admin && (
                <Link to="/admin/messages">{t("nav.adminMessages")}</Link>
              )}
              {user && !user.admin && (
                <Link to="/admin/messages">{t("nav.messages")}</Link>
              )}
              {user && (
                <button className="logout-btn" onClick={handleLogOut}>
                  {t("nav.logout")}
                </button>
              )}
            </div>
          )}

          {/* DRAWER — موبايل */}
          {isMobile && (
            <div className={`nav-links mobile ${open ? "active" : ""}`}>
              <Link to="/" onClick={handleLinkClick}>
                {t("nav.home")}
              </Link>
              <Link to="/about" onClick={handleLinkClick}>
                {t("nav.about")}
              </Link>
              <Link to="/activities" onClick={handleLinkClick}>
                {t("nav.activities")}
              </Link>
              <Link to="/community" onClick={handleLinkClick}>
                {t("nav.community")}
              </Link>
              <Link to="/newsletter" onClick={handleLinkClick}>
                {t("nav.newsletter")}
              </Link>
              <Link to="/partners" onClick={handleLinkClick}>
                {t("nav.partners")}
              </Link>
              <Link to="/contactUs" onClick={handleLinkClick}>
                {t("nav.contact")}
              </Link>
              {user?.admin && (
                <Link to="/admin/messages" onClick={handleLinkClick}>
                  {t("nav.adminMessages")}
                </Link>
              )}
              {user && !user.admin && (
                <Link to="/admin/messages" onClick={handleLinkClick}>
                  {t("nav.messages")}
                </Link>
              )}
              {user && (
                <button className="logout-btn" onClick={handleLogOut}>
                  {t("nav.logout")}
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Nav
