import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import "/src/Home.css"

// SMOOTH, ELEGANT ANIMATIONS (No more bouncy springs)
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const bentoContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const bentoCardAnim = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const Home = ({ user }) => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLayoutPicker, setShowLayoutPicker] = useState(false)
  const token = localStorage.getItem("token")

  const [popup, setPopup] = useState({
    isOpen: false,
    type: "alert",
    message: "",
    onConfirm: null,
  })
  const isAr = i18n.language === "ar"

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/content/page/home")
        setSections(res.data)
      } catch (err) {
        console.error("Error fetching content", err)
      } finally {
        setLoading(false)
      }
    }
    getHomeContent()
  }, [])

  const closePopup = () => setPopup({ ...popup, isOpen: false })
  const showAlert = (message) =>
    setPopup({ isOpen: true, type: "alert", message, onConfirm: null })
  const showConfirm = (message, onConfirmCallback) =>
    setPopup({
      isOpen: true,
      type: "confirm",
      message,
      onConfirm: onConfirmCallback,
    })

  const moveSection = async (index, direction) => {
    const newSections = [...sections]
    let newIndex = index
    if (direction === "up" && index > 0) {
      newIndex = index - 1
      ;[newSections[index - 1], newSections[index]] = [
        newSections[index],
        newSections[index - 1],
      ]
    } else if (direction === "down" && index < newSections.length - 1) {
      newIndex = index + 1
      ;[newSections[index + 1], newSections[index]] = [
        newSections[index],
        newSections[index + 1],
      ]
    } else return

    setSections(newSections)
    setTimeout(() => {
      const element = document.getElementById(
        `section-${newSections[newIndex]._id}`
      )
      if (element)
        element.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 300)

    try {
      await axios.put(
        "http://localhost:3000/content/reorder",
        { orderedSections: newSections },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (err) {
      showAlert(isAr ? "فشل في حفظ الترتيب." : "Failed to save order.")
    }
  }

  const addNewSection = async (layoutType) => {
    try {
      const newBlock = {
        page: "home",
        layoutType,
        header: "New Section",
        headerAr: "قسم جديد",
        text: "Tell your story here.",
        textAr: "أخبر قصتك هنا.",
        image:
          "https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg",
        imageSize: "medium",
        imageStyle: "default-rect",
        textColor: "#1D1D1F",
        fontFamily: "'Inter', sans-serif",
        position: sections.length,
        items:
          layoutType !== "standard"
            ? [
                {
                  image: "https://placehold.co/800x600",
                  title: "Premium Feature",
                  desc: "Showcase your best tools here.",
                },
                {
                  image: "https://placehold.co/800x600",
                  title: "Dynamic Layout",
                  desc: "Adapts perfectly to any screen.",
                },
              ]
            : [],
      }
      const res = await axios.post("http://localhost:3000/content", newBlock, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSections((prev) => [...prev, res.data])
      setShowLayoutPicker(false)
      setTimeout(
        () =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          }),
        300
      )
    } catch (error) {
      console.error(error)
    }
  }

  const deleteSection = (id) => {
    showConfirm(isAr ? "حذف هذا القسم؟" : "Delete this section?", async () => {
      try {
        await axios.delete(`http://localhost:3000/content/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setSections((prev) => prev.filter((s) => s._id !== id))
      } catch (error) {
        showAlert(isAr ? "فشل الحذف." : "Deletion failed.")
      }
      closePopup()
    })
  }

  const addGridItem = async (sectionId) => {
    const sectionIndex = sections.findIndex((s) => s._id === sectionId)
    const updatedItems = [
      ...(sections[sectionIndex].items || []),
      {
        image: "https://placehold.co/800x600",
        title: "New Box",
        desc: "Details here.",
      },
    ]
    const updatedSections = [...sections]
    updatedSections[sectionIndex] = {
      ...sections[sectionIndex],
      items: updatedItems,
    }
    setSections(updatedSections)
    try {
      await axios.put(
        `http://localhost:3000/content/${sectionId}`,
        { items: updatedItems },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (error) {
      showAlert(isAr ? "فشل." : "Failed.")
    }
  }

  const removeGridItem = (sectionId, itemIndex) => {
    showConfirm(isAr ? "حذف؟" : "Delete?", async () => {
      const sectionIndex = sections.findIndex((s) => s._id === sectionId)
      const updatedItems = sections[sectionIndex].items.filter(
        (_, i) => i !== itemIndex
      )
      const updatedSections = [...sections]
      updatedSections[sectionIndex] = {
        ...sections[sectionIndex],
        items: updatedItems,
      }
      setSections(updatedSections)
      try {
        await axios.put(
          `http://localhost:3000/content/${sectionId}`,
          { items: updatedItems },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } catch (error) {}
      closePopup()
    })
  }

  if (loading)
    return (
      <div className="loading-screen">
        {isAr ? "جاري التحميل..." : "Loading..."}
      </div>
    )

  return (
    <div className={`home-full-wrapper ${isAr ? "rtl-theme" : ""}`}>
      <AnimatePresence>
        {popup.isOpen && (
          <motion.div
            className="custom-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="custom-popup-box premium-card"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h3>{isAr ? "تنبيه" : "Notice"}</h3>
              <p>{popup.message}</p>
              <div className="popup-actions">
                {popup.type === "confirm" ? (
                  <>
                    <button
                      className="popup-btn popup-cancel"
                      onClick={closePopup}
                    >
                      {isAr ? "إلغاء" : "Cancel"}
                    </button>
                    <button
                      className="popup-btn popup-confirm"
                      onClick={popup.onConfirm}
                    >
                      {isAr ? "تأكيد" : "Confirm"}
                    </button>
                  </>
                ) : (
                  <button className="popup-btn popup-ok" onClick={closePopup}>
                    {isAr ? "حسناً" : "OK"}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {user?.admin && (
        <div className="admin-add-bar premium-card">
          <div className="admin-status">
            <span className="dot"></span> {isAr ? "لوحة التحكم" : "ADMIN"}
          </div>
          {!showLayoutPicker ? (
            <button
              className="btn-primary"
              style={{ padding: "8px 16px", fontSize: "0.9rem" }}
              onClick={() => setShowLayoutPicker(true)}
            >
              + {isAr ? "إضافة قسم" : "Add Section"}
            </button>
          ) : (
            <div className="layout-options">
              <button
                className="btn-outline"
                onClick={() => addNewSection("standard")}
              >
                Standard
              </button>
              <button
                className="btn-outline"
                onClick={() => addNewSection("grid-text")}
              >
                Bento Grid
              </button>
              <button
                className="popup-cancel"
                style={{
                  padding: "8px 16px",
                  borderRadius: "50px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setShowLayoutPicker(false)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}

      {/* CLEAN APPLE-STYLE HERO */}
      <section className="hero-section-custom">
        <div className="hero-content-wrapper">
          <motion.div
            className="content-side"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.h1 variants={itemReveal} className="heading-primary">
              {isAr ? (
                <>
                  أطلقي العنان لإمكانياتك <br /> مع{" "}
                  <span className="text-accent">رائدات</span>
                </>
              ) : (
                <>
                  Unlock your potential <br /> with{" "}
                  <span className="text-accent">ra'edat</span>
                </>
              )}
            </motion.h1>
            <motion.p variants={itemReveal} className="description-p">
              {isAr
                ? "تمكين رحلتك من خلال الابتكار ودعم المجتمع وبناء مستقبل مشرق معاً."
                : "Empowering your journey through seamless innovation, community support, and cutting-edge design."}
            </motion.p>
            <motion.div variants={itemReveal} className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/about")}
              >
                {isAr ? "استكشفي المزيد" : "Discover More"}
              </button>
              <button
                className="btn-outline"
                style={{
                  marginLeft: isAr ? "0" : "15px",
                  marginRight: isAr ? "15px" : "0",
                }}
                onClick={() =>
                  document
                    .getElementById("first-section")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                {isAr ? "تعرفي علينا" : "How it works"}
              </button>
            </motion.div>
          </motion.div>

          <div className="right-wrapper">
            <motion.div
              className="visual-side"
              initial={{ opacity: 0, x: isAr ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                className="phone-mockup"
                src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
                alt="App"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SECTIONS */}
      <div className="sections-container" id="first-section">
        {sections.map((section, index) => {
          const displayHeader = isAr
            ? section.headerAr || section.header
            : section.header
          const displayText = isAr
            ? section.textAr || section.text
            : section.text
          const displayBtnText = isAr
            ? section.buttonTextAr || section.buttonText
            : section.buttonText

          return (
            <motion.section
              layout
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              key={section._id}
              id={`section-${section._id}`}
              className={`about-section-custom section-bg-${index % 2 === 0 ? "white" : "gray"}`}
            >
              {user?.admin && (
                <div
                  className="reorder-controls premium-card"
                  style={{ [isAr ? "left" : "right"]: "30px" }}
                >
                  <button
                    onClick={() => moveSection(index, "up")}
                    disabled={index === 0}
                    className="reorder-btn"
                  >
                    ↑
                  </button>
                  <div className="reorder-divider"></div>
                  <button
                    onClick={() => moveSection(index, "down")}
                    disabled={index === sections.length - 1}
                    className="reorder-btn"
                  >
                    ↓
                  </button>
                </div>
              )}

              {!section.layoutType || section.layoutType === "standard" ? (
                <div
                  className="standard-flex"
                  style={{
                    flexDirection: index % 2 !== 0 ? "row-reverse" : "row",
                  }}
                >
                  <div className="about-text-content">
                    <motion.h2
                      variants={itemReveal}
                      className="heading-secondary"
                      style={{
                        color: section.textColor,
                        fontFamily: section.fontFamily,
                      }}
                    >
                      {displayHeader}
                    </motion.h2>
                    <motion.p
                      variants={itemReveal}
                      className="description-p"
                      style={{
                        color: section.textColor,
                        fontFamily: section.fontFamily,
                      }}
                    >
                      {displayText}
                    </motion.p>
                    {displayBtnText && (
                      <motion.div
                        variants={itemReveal}
                        style={{ marginTop: "40px" }}
                      >
                        <button
                          className="btn-primary"
                          onClick={() => navigate(section.buttonLink || "/")}
                        >
                          {displayBtnText}
                        </button>
                      </motion.div>
                    )}
                    {user?.admin && (
                      <motion.div variants={itemReveal}>
                        <AdminActions
                          id={section._id}
                          onDelete={() => deleteSection(section._id)}
                          navigate={navigate}
                          isAr={isAr}
                        />
                      </motion.div>
                    )}
                  </div>
                  <motion.div
                    variants={itemReveal}
                    className="about-image-content"
                  >
                    <img
                      src={section.image}
                      className={`premium-img ${section.imageStyle} size-${section.imageSize || "medium"}`}
                      alt=""
                    />
                  </motion.div>
                </div>
              ) : (
                <div className="bento-container">
                  <motion.div
                    variants={itemReveal}
                    className="bento-header-wrapper"
                  >
                    <h2
                      className="heading-secondary text-center"
                      style={{
                        color: section.textColor,
                        fontFamily: section.fontFamily,
                      }}
                    >
                      {displayHeader}
                    </h2>
                  </motion.div>

                  <motion.div className="bento-grid" variants={bentoContainer}>
                    <AnimatePresence>
                      {section.items?.map((item, i) => {
                        const bentoPattern = [
                          "bento-large",
                          "bento-tall",
                          "bento-square",
                          "bento-wide",
                          "bento-square",
                          "bento-tall",
                        ]
                        const bentoClass = bentoPattern[i % bentoPattern.length]

                        return (
                          <motion.div
                            layout
                            variants={bentoCardAnim}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={i}
                            className={`bento-card premium-card ${bentoClass}`}
                          >
                            {user?.admin && (
                              <button
                                className="mini-delete-btn"
                                onClick={() => removeGridItem(section._id, i)}
                              >
                                ✕
                              </button>
                            )}
                            <div className="bento-img-wrapper">
                              <img
                                src={item.image}
                                className={section.imageStyle}
                                alt=""
                              />
                            </div>
                            <div className="bento-card-content">
                              <h3 style={{ color: section.textColor }}>
                                {item.title}
                              </h3>
                              <p>{item.desc}</p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                    {user?.admin && (
                      <motion.div
                        layout
                        variants={bentoCardAnim}
                        className="bento-card add-new-bento bento-square"
                        onClick={() => addGridItem(section._id)}
                      >
                        <div className="add-icon-circle">+</div>
                        <h3 style={{ marginTop: "15px" }}>
                          {isAr ? "إضافة" : "Add Box"}
                        </h3>
                      </motion.div>
                    )}
                  </motion.div>

                  {displayBtnText && (
                    <motion.div
                      variants={itemReveal}
                      style={{ textAlign: "center", marginTop: "60px" }}
                    >
                      <button
                        className="btn-primary"
                        onClick={() => navigate(section.buttonLink || "/")}
                      >
                        {displayBtnText}
                      </button>
                    </motion.div>
                  )}
                  {user?.admin && (
                    <motion.div
                      variants={itemReveal}
                      className="center-actions"
                    >
                      <AdminActions
                        id={section._id}
                        onDelete={() => deleteSection(section._id)}
                        navigate={navigate}
                        isAr={isAr}
                      />
                    </motion.div>
                  )}
                </div>
              )}
            </motion.section>
          )
        })}
      </div>
    </div>
  )
}

const AdminActions = ({ id, onDelete, navigate, isAr }) => (
  <div className="admin-actions">
    <button className="btn-outline" onClick={() => navigate(`/edit/${id}`)}>
      {isAr ? "تعديل" : "Edit"}
    </button>
    <button className="btn-danger" onClick={onDelete}>
      {isAr ? "حذف" : "Delete"}
    </button>
  </div>
)

export default Home
