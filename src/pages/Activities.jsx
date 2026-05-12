import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import "../Activities.css"

const Activities = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const isAr = i18n.language === "ar"
  const token = localStorage.getItem("token")

  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editLang, setEditLang] = useState("en")

  const [formData, setFormData] = useState({
    header: "",
    headerAr: "",
    text: "",
    textAr: "",
    image: "",
  })

  const fetchActivities = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/content/page/activities"
      )
      setActivities(
        res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/content/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await axios.post(
          "http://localhost:3000/content",
          { ...formData, page: "activities" },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
      fetchActivities()
      setShowModal(false)
      setEditingId(null)
      setFormData({ header: "", headerAr: "", text: "", textAr: "", image: "" })
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (actId) => {
    if (!window.confirm(isAr ? "حذف؟" : "Delete?")) return
    try {
      await axios.delete(`http://localhost:3000/content/${actId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchActivities()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="loading-screen">...</div>

  // --- DETAIL VIEW LOGIC ---
  const singleActivity = activities.find((a) => a._id === id)
  if (id && singleActivity) {
    return (
      <div className={`activity-detail-page ${isAr ? "rtl-theme" : ""}`}>
        <div className="detail-hero">
          <img src={singleActivity.image} alt="" className="detail-hero-img" />
          <button
            className="back-nav-btn"
            onClick={() => navigate("/activities")}
          >
            {isAr ? "← العودة" : "← Back"}
          </button>
        </div>
        <div className="detail-content-container">
          <h1 className="detail-main-title">
            {isAr ? singleActivity.headerAr : singleActivity.header}
          </h1>
          <p className="detail-full-text">
            {isAr ? singleActivity.textAr : singleActivity.text}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`activities-hub ${isAr ? "rtl-theme" : ""}`}>
      {/* Admin Panel */}
      {user?.admin && (
        <div className="admin-add-bar premium-card">
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            + {isAr ? "نشاط جديد" : "New Activity"}
          </button>
        </div>
      )}

      {/* Admin Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="custom-popup-overlay">
            <div className="admin-modal-box premium-card">
              {/* Use the same form logic as Newsletter, setting page to 'activities' */}
              <form onSubmit={handleSave}>
                <input
                  className="clean-input"
                  placeholder="Title"
                  value={isAr ? formData.headerAr : formData.header}
                  onChange={(e) =>
                    isAr
                      ? setFormData({ ...formData, headerAr: e.target.value })
                      : setFormData({ ...formData, header: e.target.value })
                  }
                />
                <textarea
                  className="clean-input"
                  placeholder="Text"
                  value={isAr ? formData.textAr : formData.text}
                  onChange={(e) =>
                    isAr
                      ? setFormData({ ...formData, textAr: e.target.value })
                      : setFormData({ ...formData, text: e.target.value })
                  }
                />
                <input
                  className="clean-input"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
                <button type="submit" className="btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      <section className="activities-hero">
        <h1 className="heading-primary">
          {isAr ? "أنشطتنا" : "Our Activities"}
        </h1>
      </section>

      <section className="activities-grid-section">
        <div className="activities-grid">
          {activities.map((item) => (
            <div
              key={item._id}
              className="activity-card premium-card"
              onClick={() => navigate(`/activities/${item._id}`)}
            >
              {user?.admin && (
                <div
                  className="admin-card-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="action-circle-btn edit"
                    onClick={() => {
                      setFormData(item)
                      setEditingId(item._id)
                      setShowModal(true)
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    className="action-circle-btn delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    🗑️
                  </button>
                </div>
              )}
              <div className="activity-img-box">
                <img src={item.image} alt="" />
              </div>
              <div className="activity-info">
                <h3>{isAr ? item.headerAr : item.header}</h3>
                <span className="activity-link">
                  {isAr ? "التفاصيل" : "Details"} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Activities
