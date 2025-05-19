import axios from "axios";
import { useState } from "react";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      setMessage("Please fill in all fields.");
      setVariant("danger");
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage("Password must be at least 6 characters long.");
      setVariant("danger");
      return;
    }

    try {
      await axios.put("http://localhost:8081/update-password-by-email", {
        email,
        password: newPassword,
      });
      setMessage("Password updated successfully ✅");
      setVariant("success");
      setEmail("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update password ❌");
      setVariant("danger");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Change Your Password</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3`}
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update Password
            </button>
          </form>
        </div>

        {message && (
          <div className={`alert alert-${variant} m-3 mb-0`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
