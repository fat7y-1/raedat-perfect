import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "/src/Home.css";

const Home = ({ user }) => {
  const { ready } = useTranslation();
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/content/page/home"
        );
        setSections(res.data);
      } catch (err) {
        console.error("Error fetching content", err);
      } finally {
        setLoading(false);
      }
    };

    getHomeContent();
  }, []);

  const addNewSection = async () => {
    const newBlock = {
      page: "Home",
      header: "New Title with ra'edat",
      text: "New description goes here...",
      image: "https://via.placeholder.com/400",
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/content",
        newBlock,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSections([...sections, res.data]);
    } catch (err) {
      alert("Error adding section");
    }
  };

  const deleteSection = async (id) => {
    if (!window.confirm("Delete this section?")) return;

    await axios.delete(`http://localhost:3000/content/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSections(sections.filter((s) => s._id !== id));
  };

  if (!ready || loading) {
    return <div className="loading-screen">Loading ra'edat...</div>;
  }

  return (
    <div className="home-full-wrapper">

      {/* ADMIN */}
      {user?.admin && (
        <div className="admin-add-bar">
          <button className="add-btn" onClick={addNewSection}>
            + Add New Section to Home
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero-section-custom">

        {/* LEFT */}
        <div className="content-side">

          <h1 className="hero-main-text">
            Unlock your potential <br />
            with <span>ra'edat</span>
          </h1>

          <p className="description-p">
            Learn, grow and connect with inspiring women entrepreneurs.
          </p>

          <button
            className="primary-orange-btn"
            onClick={() => navigate("/about")}
          >
            Join ra'edat
          </button>

        </div>

        {/* RIGHT */}
        <div className="right-wrapper">

          {/* PHONE */}
          <div className="visual-side">

            <img
              className="phone-mockup"
              src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
              alt="App Interface"
            />

          </div>

          {/* STORE BUTTONS */}
          <div className="download-wrapper">

            <a
              href="https://apps.apple.com/us/app/raedat/id6742032306"
              target="_blank"
              rel="noreferrer"
              className="store-link"
            >
              <img
                src="/src/assets/store.png"
                alt="App Store"
              />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=online.raedat.app"
              target="_blank"
              rel="noreferrer"
              className="store-link"
            >
              <img
                src="/src/assets/google.png"
                alt="Google Play"
              />
            </a>

          </div>

        </div>

      </section>

      {/* DYNAMIC SECTIONS */}
      {sections.map((section, index) => (
        <section
          key={section._id}
          className="about-section-custom"
          style={{
            backgroundColor:
              index % 2 === 0 ? "#ffffff" : "#F3F0FA",

            flexDirection:
              index % 2 !== 0 ? "row-reverse" : "row",
          }}
        >

          <div className="about-text-content">

            <h2 className="section-title-alt">
              {section.header.includes("ra'edat") ? (
                <>
                  {section.header.split("ra'edat")[0]}
                  <span> ra'edat </span>
                  {section.header.split("ra'edat")[1]}
                </>
              ) : (
                section.header
              )}
            </h2>

            <p className="description-p">
              {section.text}
            </p>

            {user?.admin && (
              <div className="admin-actions">

                <button
                  onClick={() =>
                    navigate(`/edit/${section._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={() =>
                    deleteSection(section._id)
                  }
                >
                  Delete
                </button>

              </div>
            )}

            <button
              className="read-more-btn"
              onClick={() => navigate("/about")}
            >
              Read More
            </button>

          </div>

          <div className="about-image-content">

            <div className="styled-image-container">

              <img
                src={section.image}
                alt="Content"
                className="about-main-img"
              />

            </div>

          </div>

        </section>
      ))}
    </div>
  );
};

export default Home;
