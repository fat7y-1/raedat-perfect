import "./App.css"
import { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import axios from "axios"

// Components
import Home from "./pages/Home"
import About from "./pages/About"
import Activities from "./pages/Activities"
import Community from "./pages/Community"
import ContactUs from "./pages/ContactUs"
import Newsletter from "./pages/Newsletter"
import Partners from "./pages/Partners"
import Nav from "./components/Nav"
import SignIn from "./pages/SignIn"
import Footer from "./components/Footer"

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const checkToken = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const res = await axios.get("http://localhost:3000/auth/session", {
          headers: { Authorization: `Bearer ${token}` },
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

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />

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

      <Footer />
    </div>
  )
}

export default App
