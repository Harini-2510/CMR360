import { useState } from "react";
import "./ResetPassword.css";

function ResetPassword() {
const token = localStorage.getItem("crm360_reset_token");

const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] =
useState("");

const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();

setMessage("");
setError("");

if (!token) {
  setError("Invalid or missing reset token.");
  return;
}

if (!newPassword || !confirmPassword) {
  setError("Please enter both password fields.");
  return;
}

if (newPassword.length < 6) {
  setError(
    "Password must be at least 6 characters long."
  );
  return;
}

if (newPassword !== confirmPassword) {
  setError("Passwords do not match.");
  return;
}

try {
  setLoading(true);

  const response = await fetch("https://cmr360.onrender.com/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to reset password."
    );
  }

  setMessage(
    data.message ||
      "Password reset successfully."
  );

  setNewPassword("");
  setConfirmPassword("");
} catch (error) {
  setError(
    error.message ||
      "Unable to reset password."
  );
} finally {
  setLoading(false);
}

};

return (
<div className="reset-password-page">
<div className="reset-password-card">

    <h2>Reset Password</h2>

    <p>
      Enter your new password below.
    </p>

    <form onSubmit={handleSubmit}>

      <label htmlFor="newPassword">
        New Password
      </label>

      <input
        id="newPassword"
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) =>
          setNewPassword(e.target.value)
        }
      />

      <label htmlFor="confirmPassword">
        Confirm Password
      </label>

      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(e.target.value)
        }
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Resetting..."
          : "Reset Password"}
      </button>

    </form>

    {message && (
      <div className="success-message">
        {message}
      </div>
    )}

    {error && (
      <div className="error-message">
        {error}
      </div>
    )}

  </div>
</div>

);
}

export default ResetPassword;
