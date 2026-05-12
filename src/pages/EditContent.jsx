import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "../Home.css"

const EditContent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editLang, setEditLang] = useState("en")
  const token = localStorage.getItem("token")

  useEffect(() => {
    const getSection = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/content/${id}`)
        setFormData(res.data)
      } catch (error) {
        console.error("Fetch Error:", error)
        setError("Could not load section data. Please check the backend.")
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
      alert("Section Updated successfully !!")
      navigate("/")
    } catch (error) {
      console.error("Save Error:", error)
      alert(error.response?.data?.message || "Failed to save changes.")
    }
  }

  const handleItemChange = (index, field, value) => {
    const currentItems = formData.items || []
    const newItems = [...currentItems]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData({ ...formData, items: newItems })
  }

  if (loading) {
    return (
      <div
        className="home-full-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "var(--text-main)" }}>Loading Editor...</h2>
      </div>
    )
  }

  if (error || !formData) {
    return (
      <div
        className="home-full-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#FF3B30" }}>{error || "Data not found."}</h2>
      </div>
    )
  }

  return (
    <div
      className="home-full-wrapper"
      style={{
        padding: "100px 5%",
        background: "var(--bg-secondary)",
        minHeight: "100vh",
      }}
    >
      <div
        className="premium-card"
        style={{
          padding: "50px",
          borderRadius: "24px",
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            borderBottom: "1px solid #EAEAEA",
            paddingBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              color: "var(--text-main)",
              fontWeight: "800",
              margin: 0,
            }}
          >
            Edit Section:{" "}
            <span style={{ color: "var(--brand-orange)" }}>
              {formData.layoutType || "standard"}
            </span>
          </h2>

          {/* Clean Toggle Buttons */}
          <div
            style={{
              display: "flex",
              gap: "5px",
              background: "#F0F0F5",
              padding: "5px",
              borderRadius: "12px",
            }}
          >
            <button
              type="button"
              onClick={() => setEditLang("en")}
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                transition: "0.2s",
                background: editLang === "en" ? "white" : "transparent",
                color:
                  editLang === "en" ? "var(--text-main)" : "var(--text-light)",
                boxShadow:
                  editLang === "en" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              }}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setEditLang("ar")}
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                transition: "0.2s",
                background: editLang === "ar" ? "white" : "transparent",
                color:
                  editLang === "ar" ? "var(--text-main)" : "var(--text-light)",
                boxShadow:
                  editLang === "ar" ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              }}
            >
              العربية
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{
                color: "var(--text-main)",
                fontWeight: "700",
                fontSize: "1rem",
              }}
            >
              Section Header ({editLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={
                editLang === "en"
                  ? formData.header || ""
                  : formData.headerAr || ""
              }
              onChange={(e) =>
                setFormData(
                  editLang === "en"
                    ? { ...formData, header: e.target.value }
                    : { ...formData, headerAr: e.target.value }
                )
              }
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #EAEAEA",
                background: "#FAFAFA",
                color: "var(--text-main)",
                direction: editLang === "ar" ? "rtl" : "ltr",
                fontSize: "1.1rem",
                outline: "none",
                transition: "0.2s",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--brand-orange)")
              }
              onBlur={(e) => (e.target.style.borderColor = "#EAEAEA")}
            />
          </div>

          {(!formData.layoutType || formData.layoutType === "standard") && (
            <>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  style={{
                    color: "var(--text-main)",
                    fontWeight: "700",
                    fontSize: "1rem",
                  }}
                >
                  Description Text ({editLang.toUpperCase()})
                </label>
                <textarea
                  rows="5"
                  value={
                    editLang === "en"
                      ? formData.text || ""
                      : formData.textAr || ""
                  }
                  onChange={(e) =>
                    setFormData(
                      editLang === "en"
                        ? { ...formData, text: e.target.value }
                        : { ...formData, textAr: e.target.value }
                    )
                  }
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #EAEAEA",
                    background: "#FAFAFA",
                    color: "var(--text-main)",
                    direction: editLang === "ar" ? "rtl" : "ltr",
                    fontSize: "1.1rem",
                    outline: "none",
                    resize: "vertical",
                    transition: "0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--brand-orange)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "#EAEAEA")}
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  style={{
                    color: "var(--text-main)",
                    fontWeight: "700",
                    fontSize: "1rem",
                  }}
                >
                  Main Image URL
                </label>
                <input
                  type="text"
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #EAEAEA",
                    background: "#FAFAFA",
                    color: "var(--text-main)",
                    fontSize: "1.1rem",
                    outline: "none",
                  }}
                />
              </div>
            </>
          )}

          {(formData.layoutType === "grid-text" ||
            formData.layoutType === "grid-header") && (
            <div
              style={{
                background: "#F9F9FB",
                padding: "30px",
                borderRadius: "16px",
                border: "1px solid #EAEAEA",
              }}
            >
              <h3
                style={{
                  marginBottom: "25px",
                  color: "var(--text-main)",
                  fontSize: "1.3rem",
                  fontWeight: "800",
                }}
              >
                Grid Items
              </h3>
              {(formData.items || []).map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #EAEAEA",
                    padding: "20px",
                    marginBottom: "15px",
                    borderRadius: "12px",
                    background: "white",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "var(--text-light)",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                    }}
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={item.image || ""}
                    onChange={(e) =>
                      handleItemChange(index, "image", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginBottom: "15px",
                      borderRadius: "8px",
                      border: "1px solid #EAEAEA",
                      background: "#FAFAFA",
                      color: "var(--text-main)",
                      outline: "none",
                    }}
                  />
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "var(--text-light)",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                    }}
                  >
                    Title / Description
                  </label>
                  <input
                    type="text"
                    value={
                      formData.layoutType === "grid-header"
                        ? item.title || ""
                        : item.desc || ""
                    }
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        formData.layoutType === "grid-header"
                          ? "title"
                          : "desc",
                        e.target.value
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #EAEAEA",
                      background: "#FAFAFA",
                      color: "var(--text-main)",
                      outline: "none",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label style={{ color: "var(--text-main)", fontWeight: "700" }}>
                Text Color
              </label>
              <input
                type="color"
                value={formData.textColor || "#1D1D1F"}
                onChange={(e) =>
                  setFormData({ ...formData, textColor: e.target.value })
                }
                style={{
                  width: "100%",
                  height: "55px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border: "1px solid #EAEAEA",
                  padding: "2px",
                }}
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label style={{ color: "var(--text-main)", fontWeight: "700" }}>
                Font Family
              </label>
              <select
                value={formData.fontFamily || "'Inter', sans-serif"}
                onChange={(e) =>
                  setFormData({ ...formData, fontFamily: e.target.value })
                }
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #EAEAEA",
                  background: "#FAFAFA",
                  color: "var(--text-main)",
                  outline: "none",
                }}
              >
                <option value="'Inter', sans-serif">Standard (Inter)</option>
                <option value="'Tajawal', sans-serif">Arabic (Tajawal)</option>
                <option value="'Playfair Display', serif">
                  Elegant (Serif)
                </option>
              </select>
            </div>
          </div>

          <div
            style={{
              background: "#F9F9FB",
              padding: "30px",
              borderRadius: "16px",
              border: "1px solid #EAEAEA",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                color: "var(--text-main)",
                fontSize: "1.3rem",
                fontWeight: "800",
              }}
            >
              Call to Action (Button)
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "var(--text-light)",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  Button Text ({editLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={
                    editLang === "en"
                      ? formData.buttonText || ""
                      : formData.buttonTextAr || ""
                  }
                  onChange={(e) =>
                    setFormData(
                      editLang === "en"
                        ? { ...formData, buttonText: e.target.value }
                        : { ...formData, buttonTextAr: e.target.value }
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #EAEAEA",
                    background: "white",
                    color: "var(--text-main)",
                    direction: editLang === "ar" ? "rtl" : "ltr",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "var(--text-light)",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  Link Path (e.g. /about)
                </label>
                <input
                  type="text"
                  value={formData.buttonLink || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, buttonLink: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #EAEAEA",
                    background: "white",
                    color: "var(--text-main)",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {(!formData.layoutType || formData.layoutType === "standard") && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "30px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label style={{ color: "var(--text-main)", fontWeight: "700" }}>
                  Image Shape
                </label>
                <select
                  value={formData.imageStyle || "default-rect"}
                  onChange={(e) =>
                    setFormData({ ...formData, imageStyle: e.target.value })
                  }
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #EAEAEA",
                    background: "#FAFAFA",
                    color: "var(--text-main)",
                    outline: "none",
                  }}
                >
                  <option value="default-rect">Rectangle (Default)</option>
                  <option value="image-rounded">Rounded Corners</option>
                  <option value="image-circle">Circle</option>
                </select>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label style={{ color: "var(--text-main)", fontWeight: "700" }}>
                  Image Size
                </label>
                <select
                  value={formData.imageSize || "medium"}
                  onChange={(e) =>
                    setFormData({ ...formData, imageSize: e.target.value })
                  }
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #EAEAEA",
                    background: "#FAFAFA",
                    color: "var(--text-main)",
                    outline: "none",
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="big">Big</option>
                </select>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "20px",
              justifyContent: "flex-end",
              borderTop: "1px solid #EAEAEA",
              paddingTop: "30px",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-outline"
              style={{ padding: "14px 30px" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: "14px 40px" }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditContent
