import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

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
      <div className="signin-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={formValues.email}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>

          {errorMessage && <p className="error-text">{errorMessage}</p>}

          <button
            type="submit"
            disabled={!formValues.email || !formValues.password}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
