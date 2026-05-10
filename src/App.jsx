import "./App.css"
import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import axios from "axios"

// Components
import Home from "./components/Home"
import About from "./components/About"
import Activities from "./components/Activities"
import Community from "./components/Community"
import ContactUs from "./components/ContactUs"
import Newsletter from "./components/Newsletter"
import Partners from "./components/Partners"
import Nav from "./components/Nav"
import SignIn from "./components/SignIn"

const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const res = await axios.get("http://localhost:3000/auth/session", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(res.data)
      } catch (error) {
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
  }

  return (
    <main>
      <Nav user={user} handleLogOut={handleLogOut} />

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
  )
}

export default App
