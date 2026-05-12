import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "/src/components/Nav";

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
      alert("Session expired or invalid user. Please login again.");
      return navigate("/sign-in");
    }


    if (password.newPassword !== password.confirmPassword) {
      return alert("New passwords do not match!");
    }

    try {
      const { oldPassword, newPassword } = password;


      const response = await axios.put(
        `http://localhost:3000/auth/update-password/${id}`,
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Password successfully updated!");
      setPassword(initialState);
      navigate("/"); 
    } catch (error) {
      console.error("Update error:", error);
      const errorMsg = error.response?.data || "Failed to update password.";
      alert(errorMsg);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <div className="page-layout">
      <Nav user={user} handleLogOut={handleLogOut} />

      <div className="update-form-wrapper" style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1 className="form-title">Update Password</h1>

        <form className="form-card" onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}>
          <div className="input-field" style={{ marginBottom: "15px" }}>
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password"
              onChange={handleChange}
              value={password.oldPassword}
              required
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>

          <div className="input-field" style={{ marginBottom: "15px" }}>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              onChange={handleChange}
              value={password.newPassword}
              required
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>

          <div className="input-field" style={{ marginBottom: "20px" }}>
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              onChange={handleChange}
              value={password.confirmPassword}
              required
              style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            />
          </div>

          <button type="submit" className="primary-orange-btn" style={{ width: "100%", padding: "12px", cursor: "pointer" }}>
            Update Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
