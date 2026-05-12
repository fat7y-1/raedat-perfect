import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"

const About = ({ user }) => {
  const { t } = useTranslation()

  const [content, setContent] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ header: "", text: "", image: "" })

  const token = localStorage.getItem("token")

  // 1. READ -
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/content/page/about")
        setContent(res.data)
      } catch (err) {
        console.error("Error fetching data", err)
      }
    }
    getData()
  }, [])

  // 2. CREATE - إضافة قسم جديد
  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/content",
        { page: "about", header: "New Header", text: "New text content" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setContent([...content, res.data])
    } catch (err) {
      console.error("Add failed", err)
    }
  }

  // 3. UPDATE - تحديث البيانات
  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/content/${id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setContent(content.map((item) => (item._id === id ? res.data : item)))
      setEditingId(null)
    } catch (err) {
      console.error("Update failed", err)
    }
  }

  // 4. DELETE - حذف قسم
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`http://localhost:3000/content/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setContent(content.filter((item) => item._id !== id))
      } catch (err) {
        console.error("Delete failed", err)
      }
    }
  }

  return (
    <div className="about-container">
      <h1>About Page</h1>
      {user?.admin && (
        <button onClick={handleAdd} className="add-btn">
          + Add Section
        </button>
      )}

      {content.map((item) => (
        <div
          key={item._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          {editingId === item._id ? (
            <div className="edit-form">
              <input
                value={editForm.header}
                onChange={(e) =>
                  setEditForm({ ...editForm, header: e.target.value })
                }
              />
              <textarea
                value={editForm.text}
                onChange={(e) =>
                  setEditForm({ ...editForm, text: e.target.value })
                }
              />
              <button onClick={() => handleUpdate(item._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div className="content-view">
              <h2>{item.header}</h2>
              <p>{item.text}</p>
              {user?.admin && (
                <>
                  <button
                    onClick={() => {
                      setEditingId(item._id)
                      setEditForm(item)
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      <hr />
      {/* Dynamic Translations Part */}
      <h1>{t("about.title")}</h1>
      <p>{t("about.description")}</p>

      <h1>{t("about.vision_mission")}</h1>
      <h2>{t("about.vision_title")}</h2>
      <p>{t("about.vision_text")}</p>

      <h2>{t("about.mission_title")}</h2>
      <p>{t("about.mission_text")}</p>

      <h1>{t("about.team_title")}</h1>
    </div>
  )
}

export default About
