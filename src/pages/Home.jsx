import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "/src/Home.css";

const Home = ({ user }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);


  const token = localStorage.getItem("token");

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/content/page/home");
        setSections(res.data);
      } catch (err) {
        console.error("Error fetching content", err);
      }
    };
    getHomeContent();
  }, []);

  const addNewSection = async (layoutType) => {
    try {
      const newBlock = {
        page: "home",
        layoutType: layoutType, // 'standard', 'grid-text', or 'grid-header'
        header: layoutType === "standard" ? "New ra'edat Section" : "",
        text: layoutType === "standard" ? "Standard layout description." : "",
        image: "https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg",
        items: layoutType !== "standard"
            ? [
                {
                  image: "https://via.placeholder.com/300",
                  title: "Item 1",
                  desc: "Description 1",
                },
              ]
            : [],
      };
      const res = await axios.post("http://localhost:3000/content", newBlock, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setSections((prev) => [...prev, res.data]);
        setShowLayoutPicker(false); // إغلاق القائمة بعد الإضافة بنجاح
      }
    } catch (error) {
      console.error("Failed to add section", error);
      alert("Session expired or Error. Please sign in again.");
    }
  };

  const deleteSection = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`http://localhost:3000/content/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSections(sections.filter((s) => s._id !== id));
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className="home-full-wrapper">

      <h1>{t("home.title_unlock")}</h1>
      <br />
      <img
        className="app-img"
        src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
        alt="app img"
      />

      <div className="store-links">
        <Link to="https://apps.apple.com/us/app/raedat/id6742032306" target="_blank">
          <img className="store-img" src="/src/assets/home/store.png" alt="App Store" />
        </Link>
        <Link to="https://play.google.com/store/apps/details?id=online.raedat.app" target="_blank">
          <img className="google-img" src="/src/assets/home/google.png" alt="Google Play" />
        </Link>
      </div>

      <h1>{t("home.title_hello")}</h1>
      <p>{t("home.desc_initiative")}</p>

      <button onClick={() => navigate("/about")}>
        {t("home.btn_read_more")}
      </button>

      <img
        className="home-img"
        src="https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg"
        alt="home img"
      />


      {user?.admin && (
        <div className="admin-add-bar">
          <div className="admin-status">
            <span className="dot"></span> ADMIN PANEL
          </div>
          {!showLayoutPicker ? (
            <button className="add-btn" onClick={() => setShowLayoutPicker(true)}>
              + Add Section
            </button>
          ) : (
            <div className="layout-options">
              <button onClick={() => addNewSection("standard")}>1. Standard</button>
              <button onClick={() => addNewSection("grid-text")}>2. Multi Image+Text</button>
              <button onClick={() => addNewSection("grid-header")}>3. Multi Image+Header</button>
              <button className="cancel-btn" onClick={() => setShowLayoutPicker(false)}>X</button>
            </div>
          )}
        </div>
      )}


      {sections.map((section, index) => (
        <section
          key={section._id}
          className={`section-layout-${section.layoutType || "standard"} about-section-custom`}
          style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9", padding: "40px 0" }}
        >

          {(!section.layoutType || section.layoutType === "standard") && (
            <div className="standard-flex" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div className="about-text-content">
                <h2 className="section-title-alt">{section.header}</h2>
                <p className="description-p">{section.text}</p>
                {user?.admin && (
                  <AdminActions id={section._id} onDelete={deleteSection} navigate={navigate} />
                )}
              </div>
              <div className="about-image-content">
                <img src={section.image} className="about-main-img" alt="" style={{ maxWidth: "100%" }} />
              </div>
            </div>
          )}

          {(section.layoutType === "grid-text" || section.layoutType === "grid-header") && (
            <div className="grid-layout-container">
              {user?.admin && (
                <AdminActions id={section._id} onDelete={deleteSection} navigate={navigate} />
              )}
              <div className="custom-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                {section.items?.map((item, i) => (
                  <div key={i} className="grid-item">
                    <img src={item.image} alt="" style={{ width: "100%" }} />
                    {section.layoutType === "grid-header" ? (
                      <h3>{item.title}</h3>
                    ) : (
                      <p>{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {sections.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px", color: "#ccc" }}>
          No dynamic sections found.
        </div>
      )}
    </div>
  );
};


const AdminActions = ({ id, onDelete, navigate }) => (
  <div className="admin-actions" style={{ marginTop: "15px" }}>
    <button className="edit-btn" onClick={() => navigate(`/edit/${id}`)} style={{ marginRight: "10px" }}>
      Edit
    </button>
    <button className="btn-delete" onClick={() => onDelete(id)} style={{ color: "red" }}>
      Delete
    </button>
  </div>
);

export default Home;
