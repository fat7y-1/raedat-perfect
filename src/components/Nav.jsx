import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Nav = () => {
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

          <Link to="/about">{t("nav.about")}</Link>
          <Link to="/activities">{t("nav.activities")}</Link>
          <Link to="/community">{t("nav.community")}</Link>
          <Link to="/contactUs">{t("nav.contact")}</Link>
          <Link to="/newsletter">{t("nav.newsletter")}</Link>
          <Link to="/partners">{t("nav.partners")}</Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav
