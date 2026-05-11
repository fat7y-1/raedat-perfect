import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../SignIn.css"

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
      const res = await axios.post(
        "http://localhost:3000/auth/sign-in",
        formValues
      )
      localStorage.setItem("token", res.data.token)
      setUser(res.data.user)
      navigate("/")
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || "Login failed. Please try again."
      )
    }
  }
  return (
    <div className="signin-container">
      {/* COLUMN 1: VISUAL */}
      <div className="signin-visual-side">
        <div className="visual-content">
          <img
            src="src/assets/logo.png"
            alt="Logo"
            className="signin-logo-big"
          />
          <h1>
            Elevating <br />
            <span>Ra'edat</span> Admin
          </h1>
          <p>
            The central hub for managing community, content, and activities.
          </p>
        </div>
      </div>

      {/* COLUMN 2: FORM */}
      <div className="signin-form-side">
        <div className="signin-card">
          <h2>Sign In</h2>
          <p className="subtitle">Please enter your credentials below.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
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

            <div className="input-wrapper">
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

            {errorMessage && <p className="error-text">{errorMessage}</p>}

            <button
              type="submit"
              disabled={!formValues.email || !formValues.password}
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
