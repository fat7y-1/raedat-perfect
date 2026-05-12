import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "../Home.css"

const EditContent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const getSection = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/content/${id}`)
        setFormData(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getSection()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3000/content/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("section Updated successfully !!")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items]
    newItems[index][field] = value
    setFormData({ ...formData, items: newItems })
  }

  if (loading) {
    return <div>Loading Edit Mode ..................</div>
  }

  return (
    <div
      className="edit-container"
      style={{
        padding: "100px 10%",
        background: "#1a0a3d",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h2>Edit Section: {formData.layoutType}</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <label>Section Header</label>
        <input
          type="text"
          value={formData.header}
          onChange={(e) => setFormData({ ...formData, header: e.target.value })}
          style={{ padding: "12px", borderRadius: "8px" }}
        />

        {formData.layoutType === "standard" && (
          <>
            <label>Description Text</label>
            <textarea
              rows="5"
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              style={{ padding: "12px", borderRadius: "8px" }}
            />
            <label>Main Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              style={{ padding: "12px", borderRadius: "8px" }}
            />
          </>
        )}

        {(formData.layoutType === "grid-text" ||
          formData.layoutType === "grid-header") && (
          <div className="edit-grid-items">
            <h3>Grid Items</h3>
            {formData.items.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ff7b00",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                }}
              >
                <label>Item Image URL</label>
                <input
                  type="text"
                  value={item.image}
                  onChange={(e) =>
                    handleItemChange(index, "image", e.target.value)
                  }
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <label>Item Title/Desc</label>
                <input
                  type="text"
                  value={
                    formData.layoutType === "grid-header"
                      ? item.title
                      : item.desc
                  }
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      formData.layoutType === "grid-header" ? "title" : "desc",
                      e.target.value
                    )
                  }
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* --- STYLING OPTIONS --- */}
        <div className="edit-card">
          <h3>Text Styling</h3>
          <div className="flex-row">
            <label>Text Color: </label>
            <input
              type="color"
              value={formData.textColor || "#000000"}
              onChange={(e) =>
                setFormData({ ...formData, textColor: e.target.value })
              }
            />

            <label>Font Family: </label>
            <select
              value={formData.fontFamily}
              onChange={(e) =>
                setFormData({ ...formData, fontFamily: e.target.value })
              }
            >
              <option value="'Inter', sans-serif">Standard</option>
              <option value="'Playfair Display', serif">Elegant (Serif)</option>
              <option value="'Courier New', monospace">Technical (Mono)</option>
            </select>
          </div>
        </div>

        {/* --- BUTTON OPTIONS --- */}
        <div className="edit-card">
          <h3>Call to Action (Button)</h3>
          <input
            type="text"
            placeholder="Button Text (Leave empty to hide)"
            value={formData.buttonText || ""}
            onChange={(e) =>
              setFormData({ ...formData, buttonText: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Link Path (e.g. /about or /contact)"
            value={formData.buttonLink || ""}
            onChange={(e) =>
              setFormData({ ...formData, buttonLink: e.target.value })
            }
          />
        </div>

        {/* --- IMAGE LAYOUT --- */}
        <div className="edit-card">
          <h3>Image Shape</h3>
          <select
            value={formData.imageStyle}
            onChange={(e) =>
              setFormData({ ...formData, imageStyle: e.target.value })
            }
          >
            <option value="default-rect">Rectangle (Default)</option>
            <option value="image-rounded">Rounded Corners</option>
            <option value="image-circle">Circle</option>
          </select>
        </div>
        {/* --- IMAGE SIZE OPTIONS --- */}
        <div className="edit-card">
          <h3>Image Size</h3>
          <select
            value={formData.imageSize || "medium"}
            onChange={(e) =>
              setFormData({ ...formData, imageSize: e.target.value })
            }
          >
            <option value="small">Small </option>
            <option value="medium">Medium </option>
            <option value="big">Big </option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button type="submit" className="primary-orange-btn">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              background: "grey",
              color: "white",
              padding: "10px 25px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditContent
