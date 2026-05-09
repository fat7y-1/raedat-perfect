import "./App.css"
import Home from "./pages/Home"
import About from "./pages/About"
import Activities from "./pages/Activities"
import Community from "./pages/Community"
import ContactUs from "./pages/ContactUs"
import Newsletter from "./pages/Newsletter"
import Partners from "./pages/Partners"
import Nav from "./components/Nav"
import Footer from "./components/Footer"

import { Route, Routes } from "react-router"

const App = () => {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
