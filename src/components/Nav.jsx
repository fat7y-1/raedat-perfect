import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "/src/Nav.css"

const Nav = ({ user, handleLogOut }) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  // Change the page direction (RTL/LTR) whenever the language changes
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr"
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en"
    i18n.changeLanguage(newLang)
  }

  return (
    <nav className="navbar-transparent">
      <div className="nav-container">
        <img
          className="logo-main"
          src="src/assets/logo.png"
          alt="raedat logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        <div className="nav-links">
          {/* Using the keys from your translation.json */}
          <Link to="/">
            {i18n.language === "en" ? "Home" : "الصفحة الرئيسية"}
          </Link>
          <Link to="/about">{t("nav.about")}</Link>
          <Link to="/community">{t("nav.community")}</Link>
          <Link to="/activities">{t("nav.activities")}</Link>
          <Link to="/newsletter">{t("nav.newsletter")}</Link>
          <Link to="/partners">{t("nav.partners")}</Link>

          <Link to="/contactUs" className="nav-contact-btn">
            {t("nav.contact")}
          </Link>

          {/* Language Switch Button */}
          <button className="lang-toggle-btn" onClick={toggleLanguage}>
            {i18n.language === "en" ? "العربية" : "English"}
          </button>

          {user && (
            <button className="logout-btn" onClick={handleLogOut}>
              {i18n.language === "en" ? "Logout" : "تسجيل الخروج"}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
