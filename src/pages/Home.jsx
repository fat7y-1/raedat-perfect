import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import "/src/Home.css"


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-full-wrapper">
      {/* --- القسم الأول: الهيرو (Hero Section) --- */}
      <section className="hero-section-custom">
        <div className="content-side">
          <h1 className="hero-main-text">
            Unlock your potential <br />
            with <span>ra'edat</span>
          </h1>

          <div className="action-buttons">
            <button className="primary-orange-btn" onClick={() => navigate("/about")}>
              Join ra'edat
            </button>

            <div className="app-download-links">
              <Link to='https://apps.apple.com/us/app/raedat/id6742032306' target="_blank">
                <img src="src/assets/store.png" alt="App Store" />
              </Link>
              <Link to='https://play.google.com/store/apps/details?id=online.raedat.app' target="_blank">
                <img src="src/assets/google.png" alt="Google Play" />
              </Link>
            </div>
          </div>
        </div>

        {/* عرض صورة التلفون بشكل كبير وواضح في المنتصف */}
        <div className="visual-side">
          <img
            className="phone-mockup"
            src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
            alt="App Interface"
          />
        </div>
      </section>

      {/* --- القسم الثاني: Say Hello (قسم المعلومات) --- */}
      <section className="about-section-custom">
        <div className="about-text-content">
          <h2 className="section-title-alt">
            Say Hello to <span>ra'edat</span>
          </h2>
          <p className="description-p">
            ra'edat is an innovative initiative dedicated to fostering collaborations among members and organisations,
            empowering them to achieve shared goals and build meaningful partnerships within the creative economy,
            more specifically, the orange economy.
          </p>
          <button className="read-more-btn" onClick={() => navigate("/about")}>
            Read More
          </button>
        </div>

        <div className="about-image-content">
          <div className="styled-image-container">
            <img
              src="https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg"
              alt="Community Members"
              className="about-main-img"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
