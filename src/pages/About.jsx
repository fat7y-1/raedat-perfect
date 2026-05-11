import React from "react"
import { useTranslation } from "react-i18next"

const About = () => {
  const { t } = useTranslation()
import react from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"

const About = ({ user }) => {
  const { t } = useTranslation()

  const [content, setContent] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ header: "", text: "", image: "" })

  const token = localStorage.getItem("token")

  // 1. READ
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/content/page/about")
      setContent(res.data)
    }
    getData()
  }, [])

  // 2. CREATE
  const handleAdd = async () => {
    const res = await axios.post(
      "http://localhost:3000/content",
      { page: "about", header: "New Header", text: "New text content" },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setContent([...content, res.data])
  }

  // 3. UPDATE
  const handleUpdate = async (id) => {
    const res = await axios.put(
      `http://localhost:3000/content/${id}`,
      editForm,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    setContent(content.map((item) => (item._id === id ? res.data : item)))
    setEditingId(null)
  }

  // 4. DELETE
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/content/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setContent(content.filter((item) => item._id !== id))
  }

  return (
    <div>
      <h1>About Page</h1>
      {user?.admin && <button onClick={handleAdd}>+ Add Section</button>}

      {content.map((item) => (
        <div
          key={item._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          {editingId === item._id ? (
            <div>
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
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      ))}
    </div>
    // <div>
    //   <h1>{t("about.title")}</h1>
    //   <p>{t("about.description")}</p>

    //   <h1>{t("about.vision_mission")}</h1>
    //   <h2>{t("about.vision_title")}</h2>
    //   <p>{t("about.vision_text")}</p>

    //   <h2>{t("about.mission_title")}</h2>
    //   <p>{t("about.mission_text")}</p>

    //   <h1>{t("about.orange_title")}</h1>
    //   <p>{t("about.orange_p1")}</p>
    //   <p>{t("about.orange_p2")}</p>

    //   <h4>"{t("about.quote")}"</h4>

    //   <h1>{t("about.uniqueness_title")}</h1>
    //   <p>{t("about.uniqueness_text")}</p>

      <h1>{t("about.team_title")}</h1>
    </div>
    //   <h1>{t("about.team_title")}</h1>
    // </div>
  )
}

export default About
