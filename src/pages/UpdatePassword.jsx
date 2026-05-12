import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "/src/components/Nav";
import "/src/UpdatePassword.css";

const UpdatePassword = ({ user, handleLogOut }) => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [password, setPassword] = useState(initialState);
  const navigate = useNavigate();

  const id = localStorage.getItem("userID");
  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || id === "null") {
      alert("Session expired. Please login again.");
      return navigate("/sign-in");
    }

    if (password.newPassword !== password.confirmPassword) {
      return alert("New passwords do not match!");
    }

    try {
      const { oldPassword, newPassword } = password;
      await axios.put(
        `http://localhost:3000/auth/update-password/${id}`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Password successfully updated!");
      setPassword(initialState);
      navigate("/");
    } catch (error) {
      alert(error.response?.data || "Failed to update password.");
    }
  };

  useEffect(() => {
    if (!token) navigate("/sign-in");
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="venice-page-wrapper">
      <Nav user={user} handleLogOut={handleLogOut} />

      <header className="venice-hero">
        <div className="hero-text-container">
          <h1 className="hero-main-title">Account Security</h1>
          <p className="hero-tagline">Manage your digital credentials</p>
        </div>
        <div className="hero-image-frame">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
            alt="Professional Cybersecurity"
            className="professional-security-img"
          />
        </div>
      </header>

      <div className="intro-bar">
        <span>Safeguard your presence online with professional encryption</span>
      </div>

      <main className="venice-main">
        <section className="venice-info-section">
          <h2 className="venice-heading">Update Your <br /> Access Password</h2>
          <p className="venice-description">
            Your security is our priority. Please use the secure form to the right
            to update your authentication details. We recommend a password length of
            at least 12 characters.
          </p>
          <div className="gold-accent-line"></div>
        </section>

        <section className="venice-form-section">
          <div className="form-bg-box">
            <form className="venice-secure-form" onSubmit={handleSubmit}>
              <div className="venice-input-field">
                <label>Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Enter current password"
                  onChange={handleChange}
                  value={password.oldPassword}
                  required
                />
              </div>

              <div className="venice-input-field">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  onChange={handleChange}
                  value={password.newPassword}
                  required
                />
              </div>

              <div className="venice-input-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Verify new password"
                  onChange={handleChange}
                  value={password.confirmPassword}
                  required
                />
              </div>

              <button type="submit" className="venice-submit-btn">
                Update Security Credentials
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UpdatePassword;
