import "./App.css"
import { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import axios from "axios"

// Pages
import Home from "./pages/userPages/Home"
import About from "./pages/userPages/About"
import Activities from "./pages/userPages/Activities"
import Community from "./pages/userPages/Community"
import ContactUs from "./pages/userPages/ContactUs"
import Newsletter from "./pages/userPages/Newsletter"
import Partners from "./pages/userPages/Partners"
import SignIn from "./pages/authPages/SignIn"

// Components
import Nav from "./components/Nav"
import Footer from "./components/Footer"

const App = () => {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const { i18n } = useTranslation()

  // RTL / LTR
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr"

    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  // Check session
  const checkToken = async () => {
    const token = localStorage.getItem("token")

    if (token) {
      try {
        const res = await axios.get("http://localhost:3000/auth/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUser(res.data)
      } catch (error) {
        console.error("Session expired or invalid token")

        localStorage.clear()
        setUser(null)
      }
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  // Logout
  const handleLogOut = () => {
    setUser(null)

    localStorage.clear()

    navigate("/")
  }

  return (
    <div className="App">
      {/* Navbar */}
      <Nav user={user} handleLogOut={handleLogOut} i18n={i18n} />

      {/* Main */}
      <main style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />

          <Route path="/about" element={<About user={user} />} />

          <Route path="/activities" element={<Activities user={user} />} />

          <Route path="/community" element={<Community user={user} />} />

          <Route path="/contactUs" element={<ContactUs user={user} />} />

          <Route path="/newsletter" element={<Newsletter user={user} />} />

          <Route path="/partners" element={<Partners user={user} />} />

          <Route path="/admin" element={<SignIn setUser={setUser} />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
