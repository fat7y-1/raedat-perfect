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
import { useTranslation } from "react-i18next"
import { Route, Routes } from "react-router"
import i18next from "i18next"
import { useEffect } from "react"
const App = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr"
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <main>
      <div>
        <h1>{i18next.t("welcome")}</h1>
        <button onClick={() => i18n.changeLanguage("ar")}>العربية</button>
        <button onClick={() => i18n.changeLanguage("en")}>English</button>
      </div>

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
