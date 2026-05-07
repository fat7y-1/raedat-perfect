import './App.css'
import Home from './components/Home'
import About from './components/About'
import Activities from './components/Activities'
import Community from './components/Community'
import ContactUs from './components/ContactUs'
import Newsletter from './components/Newsletter'
import partners from './components/Partners'
import Nav from './components/Nav'
import { Route, Routes } from "react-router"


const App = () => {

  return (

      <main>
        <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/community" element={<Community />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/nav" element={<Nav/>} />
              </Routes>
      </main>

  )
}

export default App
