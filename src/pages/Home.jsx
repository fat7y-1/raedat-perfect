// import React from 'react';
// import { useNavigate, Link } from "react-router-dom";
// import "/src/Home.css"

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="home-full-wrapper">
//       {/* --- القسم الأول: الهيرو (Hero Section) --- */}
//       <section className="hero-section-custom">
//         <div className="content-side">
//           <h1 className="hero-main-text">
//             Unlock your potential <br />
//             with <span>ra'edat</span>
//           </h1>

//           <div className="action-buttons">
//             <button className="primary-orange-btn" onClick={() => navigate("/about")}>
//               Join ra'edat
//             </button>

//             <div className="app-download-links">
//               <Link to='https://apps.apple.com/us/app/raedat/id6742032306' target="_blank">
//                 <img src="src/assets/store.png" alt="App Store" />
//               </Link>
//               <Link to='https://play.google.com/store/apps/details?id=online.raedat.app' target="_blank">
//                 <img src="src/assets/google.png" alt="Google Play" />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* عرض صورة التلفون بشكل كبير وواضح في المنتصف */}
//         <div className="visual-side">
//           <img
//             className="phone-mockup"
//             src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
//             alt="App Interface"
//           />
//         </div>
//       </section>

//       {/* --- القسم الثاني: Say Hello (قسم المعلومات) --- */}
//       <section className="about-section-custom">
//         <div className="about-text-content">
//           <h2 className="section-title-alt">
//             Say Hello to <span>ra'edat</span>
//           </h2>
//           <p className="description-p">
//             ra'edat is an innovative initiative dedicated to fostering collaborations among members and organisations,
//             empowering them to achieve shared goals and build meaningful partnerships within the creative economy,
//             more specifically, the orange economy.
//           </p>
//           <button className="read-more-btn" onClick={() => navigate("/about")}>
//             Read More
//           </button>
//         </div>

//         <div className="about-image-content">
//           <div className="styled-image-container">
//             <img
//               src="https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg"
//               alt="Community Members"
//               className="about-main-img"
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };
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
