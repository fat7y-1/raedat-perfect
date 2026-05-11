import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "../userPages/Home.css"

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-wrapper">
          <div className="hero-content">
            <h1>
              {t("home.title_unlock")}
              <span> {t("home.raedat")}</span>
            </h1>

            <Link to="/community" className="join-btn">
              {t("home.Join")}
            </Link>

            <div className="store-links">
              <Link
                to="https://apps.apple.com/us/app/raedat/id6742032306"
                target="_blank"
              >
                <img
                  className="store-img"
                  src="/src/assets/home/store.png"
                  alt="App Store"
                />
              </Link>

              <Link
                to="https://play.google.com/store/apps/details?id=online.raedat.app"
                target="_blank"
              >
                <img
                  className="google-img"
                  src="/src/assets/home/google.png"
                  alt="Google Play"
                />
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              className="app-img"
              src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
              alt="app img"
            />
          </div>
        </div>
      </section>

      {/* HELLO */}
      <section className="hello-section">
        <div className="hello-wrapper">
          <div className="hello-text">
            <h2>{t("home.title_hello")}</h2>
            <p>{t("home.desc_initiative")}</p>

            <Link to="/about" className="read-more-btn">
              {t("home.btn_read_more")}
            </Link>
          </div>

          <div className="hello-image">
            <img
              className="home-img"
              src="https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg"
              alt="home img"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
