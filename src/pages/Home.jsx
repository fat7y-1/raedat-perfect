import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import "/src/Home.css"

const Home = ({ user }) => {
  const navigate = useNavigate()
  const [sections, setSections] = useState([])
  const [showLayoutPicker, setShowLayoutPicker] = useState(false)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/content/page/home")
        setSections(res.data)
      } catch (err) {
        console.error("Error fetching content", err)
      }
    }
    getHomeContent()
  }, [])

  const addNewSection = async (layoutType) => {
    try {
      const newBlock = {
        page: "home",
        layoutType: layoutType, // 'standard', 'grid-text', or 'grid-header'
        header: layoutType === "standard" ? "New ra'edat Section" : "",
        text: layoutType === "standard" ? "Standard layout description." : "",
        image:
          "https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg",
        items:
          layoutType !== "standard"
            ? [
                {
                  image: "https://via.placeholder.com/300",
                  title: "Item 1",
                  desc: "Description 1",
                },
              ]
            : [],
      }
      const res = await axios.post("http://localhost:3000/content", newBlock, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.data) {
        setSections((prev) => [...prev, res.data])
      }
    } catch (error) {
      // Fixed typo here (error instead of err)
      console.error("Failed to add section", error)
      alert("Session expired. Please sign in again.")
    }
  }

  const deleteSection = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      await axios.delete(`http://localhost:3000/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSections(sections.filter((s) => s._id !== id))
    }
  }

  return (
    <div className="home-full-wrapper">
      {/* ADMIN PANEL WITH LAYOUT PICKER */}
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
              <button onClick={() => addNewSection("standard")}>
                1. Standard
              </button>
              <button onClick={() => addNewSection("grid-text")}>
                2. Multi Image+Text
              </button>
              <button onClick={() => addNewSection("grid-header")}>
                3. Multi Image+Header
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

      <section className="hero-section-custom">
        <div className="content-side">
          <h1 className="hero-main-text">
            Unlock your potential <br />
            with <span>ra'edat</span>
          </h1>

          <div className="action-buttons">
            <button
              className="primary-orange-btn"
              onClick={() => navigate("/about")}
            >
              Join ra'edat
            </button>

            <div
              className="app-download-links"
              style={{ marginTop: "30px", display: "flex", gap: "20px" }}
            >
              <Link
                to="https://apps.apple.com/us/app/raedat/id6742032306"
                target="_blank"
              >
                <img
                  src="src/assets/store.png"
                  alt="App Store"
                  style={{ height: "45px" }}
                />
              </Link>
              <Link
                to="https://play.google.com/store/apps/details?id=online.raedat.app"
                target="_blank"
              >
                <img
                  src="src/assets/google.png"
                  alt="Google Play"
                  style={{ height: "45px" }}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="visual-side">
          <img
            className="phone-mockup"
            src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
            alt="App Interface"
          />
        </div>
      </section>

      {sections.map((section, index) => (
        <section
          key={section._id}
          className={`section-layout-${section.layoutType || "standard"} about-section-custom`}
          style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9" }}
        >
          {/* LAYOUT 1: STANDARD */}
          {(!section.layoutType || section.layoutType === "standard") && (
            <div className="standard-flex">
              <div className="about-text-content">
                <h2 className="section-title-alt">{section.header}</h2>
                <p className="description-p">{section.text}</p>
                {user?.admin && (
                  <AdminActions
                    id={section._id}
                    onDelete={deleteSection}
                    navigate={navigate}
                  />
                )}
              </div>
              <div className="about-image-content">
                <img src={section.image} className="about-main-img" alt="" />
              </div>
            </div>
          )}

          {/* LAYOUT 2 & 3: GRID SYSTEMS */}
          {(section.layoutType === "grid-text" ||
            section.layoutType === "grid-header") && (
            <div className="grid-layout-container">
              {user?.admin && (
                <AdminActions
                  id={section._id}
                  onDelete={deleteSection}
                  navigate={navigate}
                />
              )}
              <div className="custom-grid">
                {section.items?.map((item, i) => (
                  <div key={i} className="grid-item">
                    <img src={item.image} alt="" />
                    {section.layoutType === "grid-header" ? (
                      <h3>{item.title}</h3>
                    ) : (
                      <p>{item.desc}</p>
                    )}
                  </div>
                ))}
                {user?.admin && (
                  <button className="add-sub-item">+ Add Div</button>
                )}
              </div>
            </div>
          )}
        </section>
      ))}

      {!sections.length && (
        <div style={{ textAlign: "center", padding: "50px", color: "#ccc" }}>
          No dynamic sections found.
        </div>
      )}
    </div>
  )
}

// Small helper component for Admin Buttons
const AdminActions = ({ id, onDelete, navigate }) => (
  <div className="admin-actions">
    <button className="edit-btn" onClick={() => navigate(`/edit/${id}`)}>
      Edit
    </button>
    <button className="btn-delete" onClick={() => onDelete(id)}>
      Delete
    </button>
  </div>
)

export default Home
