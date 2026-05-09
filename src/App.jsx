import "./App.css"
import Home from "./components/Home"
import About from "./components/About"
import Activities from "./components/Activities"
import Community from "./components/Community"
import ContactUs from "./components/ContactUs"
import Newsletter from "./components/Newsletter"
import Partners from "./components/Partners"
import Nav from "./components/Nav"
import { Route, Routes } from "react-router"
import Footer from "./components/Footer"

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
      <Footer/>

    </main>
  )
}

export default App
