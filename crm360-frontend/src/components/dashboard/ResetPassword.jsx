import { useState } from "react";
import "./ResetPassword.css";

function ResetPassword({ token, onBackToLogin }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please enter both passwords.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://cmr360.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            newPassword: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to reset password.");
        return;
      }

      setMessage(
        data.message || "Password reset successfully."
      );

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Unable to connect to CRM360 backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h2>Reset Password</h2>

        <p>Create a new password for your account.</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <div className="reset-message">
            {message}
          </div>
        )}

        {error && (
          <div className="reset-error">
            {error}
          </div>
        )}

        <button
          type="button"
          className="reset-back"
          onClick={onBackToLogin}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
