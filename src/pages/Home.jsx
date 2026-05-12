import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "/src/Home.css";

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);

  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/content/page/home");
        setSections(res.data);
      } catch (err) {
        console.error("Error fetching content", err);
      } finally {
        setLoading(false);
      }
    };

    getHomeContent();
  }, []);

  const addNewSection = async (layoutType) => {
    try {
      const newBlock = {
        page: "home",
        layoutType: layoutType,
        header:
          layoutType === "standard" ? "New ra'edat Section" : "",
        text:
          layoutType === "standard"
            ? "Standard layout description."
            : "",
        image:
          "https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg",
        items:
          layoutType !== "standard"
            ? [
                {
                  image: "https://via.placeholder.com/300",
                  title: "New Item",
                  desc: "Item description",
                },
              ]
            : [],
      };

      const res = await axios.post(
        "http://localhost:3000/content",
        newBlock,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSections((prev) => [...prev, res.data]);
      setShowLayoutPicker(false);
    } catch (error) {
      console.error("Failed to add section", error);
    }
  };

  const deleteSection = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`http://localhost:3000/content/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSections(sections.filter((s) => s._id !== id));
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  if (loading)
    return <div className="loading-screen">Loading...</div>;

  return (
    <div className="home-full-wrapper">
      {user?.admin && (
        <div className="admin-add-bar">
          <div className="admin-status">
            <span className="dot"></span> ADMIN PANEL
          </div>

          {!showLayoutPicker ? (
            <button
              className="add-btn"
              onClick={() => setShowLayoutPicker(true)}
            >
              + Add Section
            </button>
          ) : (
            <div className="layout-options">
              <button
                onClick={() => addNewSection("standard")}
              >
                Standard
              </button>

              <button
                onClick={() => addNewSection("grid-text")}
              >
                Image+Text
              </button>

              <button
                onClick={() => addNewSection("grid-header")}
              >
                Image+Header
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowLayoutPicker(false)}
              >
                X
              </button>
            </div>
          )}
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero-section-custom">
        <div className="content-side">
          <h1 className="hero-main-text">
            Unlock your potential <br />
            with <span>ra'edat</span>
          </h1>

          <p className="description-p">
            Empowering your journey through innovation and
            community support.
          </p>

          <button
            className="primary-orange-btn"
            onClick={() => navigate("/about")}
          >
            Join ra'edat
          </button>
        </div>

        <div className="right-wrapper">
          <div className="visual-side">
            <img
              className="phone-mockup"
              src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
              alt="App"
            />

            <div className="download-wrapper">
              <a
                href="https://apps.apple.com/us/app/raedat/id6742032306"
                target="_blank"
                rel="noreferrer"
                className="store-link"
              >
                <img
                  className="logo-size-app"
                  src="/src/assets/home/store.png"
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
                  className="logo-size-app"
                  src="/src/assets/home/google.png"
                  alt="Google Play"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SECTIONS */}
      {sections.map((section, index) => (
        <section
          key={section._id}
          className={`about-section-custom section-layout-${
            section.layoutType || "standard"
          }`}
          style={{
            backgroundColor:
              index % 2 === 0 ? "#FFFFFF" : "#F5F5F7",
          }}
        >
          {!section.layoutType ||
          section.layoutType === "standard" ? (
            <div
              className="standard-flex"
              style={{
                flexDirection:
                  index % 2 !== 0 ? "row-reverse" : "row",
              }}
            >
              <div className="about-text-content">
                <h2 className="section-title-alt">
                  {section.header}
                </h2>

                <p className="description-p">
                  {section.text}
                </p>

                {user?.admin && (
                  <AdminActions
                    id={section._id}
                    onDelete={deleteSection}
                    navigate={navigate}
                  />
                )}
              </div>

              <div className="about-image-content">
                <img
                  src={section.image}
                  className="about-main-img"
                  alt=""
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>
          ) : (
            <div className="grid-layout-container">
              <h2
                className="section-title-alt"
                style={{
                  textAlign: "center",
                  marginBottom: "40px",
                }}
              >
                {section.header}
              </h2>

              <div className="custom-grid">
                {section.items?.map((item, i) => (
                  <div key={i} className="grid-item">
                    <img
                      src={item.image}
                      alt=""
                      style={{ width: "100%" }}
                    />

                    {section.layoutType ===
                    "grid-header" ? (
                      <h3>{item.title}</h3>
                    ) : (
                      <p>{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>

              {user?.admin && (
                <div className="center-actions">
                  <AdminActions
                    id={section._id}
                    onDelete={deleteSection}
                    navigate={navigate}
                  />
                </div>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

const AdminActions = ({
  id,
  onDelete,
  navigate,
}) => (
  <div
    className="admin-actions"
    style={{ marginTop: "15px" }}
  >
    <button
      className="edit-btn"
      onClick={() => navigate(`/edit/${id}`)}
      style={{ marginRight: "10px" }}
    >
      Edit
    </button>

    <button
      className="btn-delete"
      onClick={() => onDelete(id)}
      style={{ color: "red" }}
    >
      Delete
    </button>
  </div>
);

export default Home;
