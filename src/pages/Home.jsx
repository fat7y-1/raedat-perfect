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
        header: layoutType === "standard" ? "New ra'edat Section" : "",
        text: layoutType === "standard" ? "Standard layout description." : "",
        image: "https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg",
        items: layoutType !== "standard" ? [{ image: "https://via.placeholder.com/300", title: "Item 1", desc: "Description 1" }] : [],
      };
      const res = await axios.post("http://localhost:3000/content", newBlock, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSections((prev) => [...prev, res.data]);
      setShowLayoutPicker(false);
    } catch (error) {
      console.error("Failed to add section", error);
      alert("Error adding section.");
    }
  };

  const deleteSection = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      await axios.delete(`http://localhost:3000/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSections(sections.filter((s) => s._id !== id));
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="home-full-wrapper">

      {user?.admin && (
        <div className="admin-add-bar">
          <div className="admin-status">
            <span className="dot"></span> ADMIN PANEL
          </div>
          {!showLayoutPicker ? (
            <button className="add-btn" onClick={() => setShowLayoutPicker(true)}>+ Add Section</button>
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


      <section className="hero-section-custom">

        <div className="content-side">
          <h1 className="hero-main-text">
            Unlock your potential <br />
            with <span>ra'edat</span>
          </h1>
          <p className="description-p">
            Empowering your journey through innovation and community support.
          </p>
          <button className="primary-orange-btn" onClick={() => navigate("/about")}>
            Join ra'edat
          </button>
        </div>


        <div className="right-wrapper">
          <div className="visual-side">
            <img
              className="phone-mockup"
              src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
              alt="App Interface"
            />
          </div>

          <div className="download-wrapper">
            <a href="https://apps.apple.com/us/app/raedat/id6742032306" target="_blank" rel="noreferrer" className="store-link">
              <img src="/src/assets/store.png" alt="App Store" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=online.raedat.app" target="_blank" rel="noreferrer" className="store-link">
              <img src="/src/assets/google.png" alt="Google Play" />
            </a>
          </div>
        </div>
      </section>


      {sections.map((section, index) => (
        <section
          key={section._id}
          className={`section-layout-${section.layoutType || "standard"} about-section-custom`}
          style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f5f5f7" }}
        >
          {(!section.layoutType || section.layoutType === "standard") && (
            <div className="standard-flex" style={{ display: 'flex', alignItems: 'center', gap: '50px', padding: '0 8%', flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row' }}>
              <div className="about-text-content" style={{ flex: 1 }}>
                <h2 className="section-title-alt">{section.header}</h2>
                <p className="description-p">{section.text}</p>
                {user?.admin && <AdminActions id={section._id} onDelete={deleteSection} navigate={navigate} />}
              </div>
              <div className="about-image-content" style={{ flex: 1 }}>
                <img src={section.image} className="about-main-img" alt="" style={{ width: '100%', borderRadius: '20px' }} />
              </div>
            </div>
          )}

       
          {(section.layoutType === "grid-text" || section.layoutType === "grid-header") && (
            <div className="grid-layout-container" style={{ padding: '40px 8%' }}>
              {user?.admin && <AdminActions id={section._id} onDelete={deleteSection} navigate={navigate} />}
              <div className="custom-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
                {section.items?.map((item, i) => (
                  <div key={i} className="grid-item" style={{ textAlign: 'center' }}>
                    <img src={item.image} alt="" style={{ width: '100%', borderRadius: '15px' }} />
                    {section.layoutType === "grid-header" ? <h3>{item.title}</h3> : <p>{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/*  */}
        </section>
      ))}
    </div>
  );
};

const AdminActions = ({ id, onDelete, navigate }) => (
  <div className="admin-actions" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
    <button className="edit-btn" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
    <button className="btn-delete" onClick={() => onDelete(id)}>Delete</button>
  </div>
);

export default Home;
