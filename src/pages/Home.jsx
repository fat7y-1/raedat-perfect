import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Home = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t("home.title_unlock")}</h1>
      <br />

      <img
        className="app-img"
        src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
        alt="app img"
      />

      <Link to="https://apps.apple.com/us/app/raedat/id6742032306">
        <img className="store-img" src="src/assets/store.png" alt="store img" />
      </Link>

      <Link to="https://play.google.com/store/apps/details?id=online.raedat.app&pli=1">
        <img className="google-img" src="src/assets/google.png" alt="google img" />
      </Link>

      <h1>{t("home.title_hello")}</h1>
      <br />
      <br />
      <br />
      <br />
      <p>{t("home.desc_initiative")}</p>

      <button onClick={() => navigate("/about")}>
        {t("home.btn_read_more")}
      </button>

      <img
        className="home-img"
        src="https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg"
        alt="home img"
      />

      <img
        className="home-log1"
        src="https://www.raedat.online/MediaManager/Media/assest/icon-primaryColor.svg"
        alt="home log1"
      />

      <img
        className="home-log2"
        src="https://www.raedat.online/MediaManager/Media/assest/secondaryiconColor.svg"
        alt="home log1"
      />

      <h2>{t("home.title_community")}</h2>
      <br />
      <button onClick={() => navigate("/community")}>
        {t("home.btn_read_more")}
      </button>

      <img
        className="community-img"
        src="https://www.raedat.online/MediaManager/Media/home/lower_homescreen_banner_new.png"
        alt="community-img"
      />

      <h2>{t("home.title_benefits")}</h2>

      <h2>{t("home.title_jobs")}</h2>
    </div>
  );
};

export default Home
