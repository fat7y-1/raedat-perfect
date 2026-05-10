import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

const Home = ({ user }) => {
  const navigate = useNavigate()
  const [sections, setSections] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    const getHomeContent = async () => {
      const res = await axios.get("http://localhost:3000/content/page/home")
      setSections(res.data)
    }
    getHomeContent()
  }, [])

  const addNewSection = async () => {
    const newBlock = {
      page: "Home",
      header: "New Title",
      text: "New description goes here...",
      image: "Add URL Image ",
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

  // return (
  //   <section className="hero-section">
  //     <div className="hero-content">
  //       <h1>
  //         Unlock your <br /> potential
  //       </h1>

  //       <p>
  //         Dedicated to fostering collaborations within the{" "}
  //         <strong>Orange Economy</strong>. Empowering members and organizations
  //         to build meaningful partnerships.
  //       </p>

  //       <button className="btn-primary" onClick={() => navigate("/about")}>
  //         Get Started
  //       </button>
  //     </div>

  //     <div className="hero-image-wrapper">
  //       <div className="orange-blob"></div>

  //       <img
  //         className="modern-image"
  //         src="https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg"
  //         alt="Community"
  //       />
  //     </div>
  //   </section>
  // )

  return (
    <section className="home-container">
      {/* Admin "Add" Button */}
      {user?.admin && (
        <div className="admin-add-bar">
          {sections.length === 0 && <p>No content yet. Click + to add some!</p>}
          <button className="add-btn" onClick={addNewSection}>
            + Add New Section
          </button>
        </div>
      )}

      {/* Render all the dynamic sections */}
      {sections.map((section) => (
        <div key={section._id} className="hero-section dynamic-block">
          <div className="hero-content">
            <h1>{section.header}</h1>
            <p>{section.text}</p>

            {user?.admin && (
              <div className="admin-actions">
                <button onClick={() => navigate(`/edit/${section._id}`)}>
                  Edit
                </button>
                <button
                  onClick={() => deleteSection(section._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="hero-image-wrapper">
            <img className="modern-image" src={section.image} alt="Content" />
          </div>
        </div>
      ))}

      {/* Your static footer button if needed */}
      <div className="home-footer">
        <button className="btn-primary" onClick={() => navigate("/about")}>
          Get Started
        </button>
      </div>
    </section>
  )
}

export default Home
