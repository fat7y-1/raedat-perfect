import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "/src/SignIn.css"

const SignIn = ({ setUser }) => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/auth/sign-in", formValues)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userID", res.data.user.id)
      setUser(res.data.user)
      navigate("/")
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || "Login failed. Please try again.")
    }
  }

  return (
    <div className="venice-signin-page">
      <header className="venice-signin-hero">
        <div className="hero-text-side">
          <img src="src/assets/logo.png" alt="Logo" className="signin-mini-logo" />
          <h1 className="hero-main-title">Ra'edat Admin</h1>
          <p className="hero-tagline">Access the central management hub</p>
        </div>
        <div className="hero-image-frame">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070"
            alt="Professional Workspace"
            className="signin-hero-img"
          />
        </div>
      </header>

      <div className="intro-accent-bar">
        <span>Authorized Personnel Only • Secure Dashboard Access</span>
      </div>

      <main className="venice-signin-main">
        <section className="signin-info-content">
          <h2 className="venice-heading">Welcome <br /> Back</h2>
          <p className="venice-description">
            Please enter your administrative credentials to manage community content
            and oversee the Ra'edat ecosystem.
          </p>
          <div className="gold-accent-line"></div>
        </section>

        <section className="signin-form-section">
          <div className="form-decorative-box">
            <form className="venice-login-form" onSubmit={handleSubmit}>
              <h3 className="form-internal-title">Sign In</h3>
              <div className="venice-input-group">
                <label>Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="admin@raedat.online"
                  onChange={handleChange}
                  value={formValues.email}
                  required
                />
              </div>
              <div className="venice-input-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  value={formValues.password}
                  required
                />
              </div>
              {errorMessage && <p className="venice-error-msg">{errorMessage}</p>}
              <button
                type="submit"
                className="venice-access-btn"
                disabled={!formValues.email || !formValues.password}
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SignIn
