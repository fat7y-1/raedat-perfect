import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import "/src/Home.css"

const Home = ({ user }) => {
  const navigate = useNavigate()
  const [sections, setSections] = useState([])
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

  const addNewSection = async () => {
    const newBlock = {
      page: "Home",
      header: "New Title",
      text: "New description goes here...",
      image: "https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg",
    }
    const res = await axios.post("http://localhost:3000/content", newBlock, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setSections([...sections, res.data])
  }

  const deleteSection = async (id) => {
    await axios.delete(`http://localhost:3000/content/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setSections(sections.filter((s) => s._id !== id))
  }

  return (
    <div className="home-full-wrapper">
 
      {user?.admin && (
        <div className="admin-add-bar" style={{ padding: '20px', textAlign: 'center', background: '#ff7b00' }}>
          <button className="add-btn" onClick={addNewSection} style={{ padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Add New Section to Home
          </button>
        </div>
      )}


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

            <div className="app-download-links" style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
              <Link to='https://apps.apple.com/us/app/raedat/id6742032306' target="_blank">
                <img src="src/assets/store.png" alt="App Store" style={{ height: '45px' }} />
              </Link>
              <Link to='https://play.google.com/store/apps/details?id=online.raedat.app' target="_blank">
                <img src="src/assets/google.png" alt="Google Play" style={{ height: '45px' }} />
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
          className="about-section-custom"
          style={{
            backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
            borderRadius: index === 0 ? '80px 80px 0 0' : '0'
          }}
        >
          <div className="about-text-content">
            <h2 className="section-title-alt">
              {section.header.includes("ra'edat") ? (
                 <> {section.header.split("ra'edat")[0]} <span>ra'edat</span> </>
              ) : section.header}
            </h2>
            <p className="description-p">{section.text}</p>

            {user?.admin && (
              <div className="admin-actions" style={{ marginBottom: '20px' }}>
                <button onClick={() => navigate(`/edit/${section._id}`)} style={{ marginRight: '10px' }}>Edit</button>
                <button onClick={() => deleteSection(section._id)} className="btn-delete" style={{ color: 'red' }}>Delete</button>
              </div>
            )}

            <button className="read-more-btn" onClick={() => navigate("/about")}>
              Read More
            </button>
          </div>

          <div className="about-image-content">
            <div className="styled-image-container">
              <img
                src={section.image}
                alt="Section Content"
                className="about-main-img"
              />
            </div>
          </div>
        </section>
      ))}


      {!sections.length && (
         <div style={{ textAlign: 'center', padding: '50px', color: '#ccc' }}>
           No dynamic sections found.
         </div>
      )}
    </div>
  )
}

export default Home
