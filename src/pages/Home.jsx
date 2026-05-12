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
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);

  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  useEffect(() => {
    const getHomeContent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/content/page/home")
        setSections(res.data)
      } catch (err) {
        console.error("Error fetching content", err);
      } finally {
        setLoading(false);
      }
    };

    getHomeContent();
  }, []);

  const addNewSection = async (layoutType) => {
    try {
      const newBlock = {
        page: "home",
        layoutType: layoutType,
        header:
          layoutType === "standard" ? "New ra'edat Section" : "",
        text:
          layoutType === "standard"
            ? "Standard layout description."
            : "",
        image:
          "https://www.raedat.online/MediaManager/Media/home/Home-sayHello.jpg",
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
      };

      const res = await axios.post(
        "http://localhost:3000/content",
        newBlock,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSections((prev) => [...prev, res.data]);
      setShowLayoutPicker(false);
    } catch (error) {
      console.error("Failed to add section", error);
    }
  }

  const deleteSection = (id) => {
    showConfirm(isAr ? "حذف هذا القسم؟" : "Delete this section?", async () => {
      try {
        await axios.delete(`http://localhost:3000/content/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSections(sections.filter((s) => s._id !== id));
      } catch (err) {
        console.error("Delete failed", err);
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
    return <div className="loading-screen">Loading...</div>;

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
              className="add-btn"
              onClick={() => setShowLayoutPicker(true)}
            >
              + Add Section
            </button>
          ) : (
            <div className="layout-options">
              <button
                onClick={() => addNewSection("standard")}
              >
                Standard
              </button>

              <button
                onClick={() => addNewSection("grid-text")}
              >
                Image+Text
              </button>

              <button
                onClick={() => addNewSection("grid-header")}
              >
                Image+Header
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

      {/* HERO SECTION */}
      <section className="hero-section-custom">
        <div className="content-side">
          <h1 className="hero-main-text">
            Unlock your potential <br />
            with <span>ra'edat</span>
          </h1>

          <p className="description-p">
            Empowering your journey through innovation and
            community support.
          </p>

          <button
            className="primary-orange-btn"
            onClick={() => navigate("/about")}
          >
            Join ra'edat
          </button>
        </div>

        <div className="right-wrapper">
          <div className="visual-side">
            <img
              className="phone-mockup"
              src="https://www.raedat.online/MediaManager/Media/home/homescreen_new%20screenshot.png"
              alt="App"
            />

            <div className="download-wrapper">
              <a
                href="https://apps.apple.com/us/app/raedat/id6742032306"
                target="_blank"
                rel="noreferrer"
                className="store-link"
              >
                <img
                  className="logo-size-app"
                  src="/src/assets/home/store.png"
                  alt="App Store"
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=online.raedat.app"
                target="_blank"
                rel="noreferrer"
                className="store-link"
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
      {sections.map((section, index) => (
        <section
          key={section._id}
          className={`about-section-custom section-layout-${
            section.layoutType || "standard"
          }`}
          style={{
            backgroundColor:
              index % 2 === 0 ? "#ffffff" : "#f5f5f7",
          }}
        >
          {!section.layoutType ||
          section.layoutType === "standard" ? (
            <div
              className="standard-flex"
              style={{
                flexDirection:
                  index % 2 !== 0 ? "row-reverse" : "row",
              }}
            >
              <div className="about-text-content">
                <h2 className="section-title-alt">
                  {section.header}
                </h2>

                <p className="description-p">
                  {section.text}
                </p>

                {user?.admin && (
                  <AdminActions
                    id={section._id}
                    onDelete={deleteSection}
                    navigate={navigate}
                  />
                )}
              </div>

              <div className="about-image-content">
                <img
                  src={section.image}
                  className="about-main-img"
                  alt=""
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>
          ) : (
            <div className="grid-layout-container">
              <h2
                className="section-title-alt"
                style={{
                  textAlign: "center",
                  marginBottom: "40px",
                }}
              >
                {section.header}
              </h2>

              <div className="custom-grid">
                {section.items?.map((item, i) => (
                  <div key={i} className="grid-item">
                    <img
                      src={item.image}
                      alt=""
                      style={{ width: "100%" }}
                    />

                    {section.layoutType ===
                    "grid-header" ? (
                      <h3>{item.title}</h3>
                    ) : (
                      <p>{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>

              {user?.admin && (
                <div className="center-actions">
                  <AdminActions
                    id={section._id}
                    onDelete={deleteSection}
                    navigate={navigate}
                  />
                </div>
              )}
            </motion.section>
          )
        })}
      </div>
    </div>
  );
};

const AdminActions = ({
  id,
  onDelete,
  navigate,
}) => (
  <div
    className="admin-actions"
    style={{ marginTop: "15px" }}
  >
    <button
      className="edit-btn"
      onClick={() => navigate(`/edit/${id}`)}
      style={{ marginRight: "10px" }}
    >
      Edit
    </button>

    <button
      className="btn-delete"
      onClick={() => onDelete(id)}
      style={{ color: "red" }}
    >
      Delete
    </button>
  </div>
)

export default Home
