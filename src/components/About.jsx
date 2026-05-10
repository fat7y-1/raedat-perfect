import { useState, useEffect } from "react"
import axios from "axios"

const About = ({ user }) => {
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
  )
}

export default About
