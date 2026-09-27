import { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();

setMessage("");
setError("");

if (!email.trim()) {
  setError("Please enter your email address.");
  return;
}

try {
  setLoading(true);

  const response = await fetch("https://cmr360.onrender.com/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  setMessage(
    data.message || "Password reset token generated successfully." );
  localStorage.setItem("crm360_reset_token", data.resetToken);
window.location.hash = "reset-password";
    setEmail("");
} catch (error) {
  setError(
    error.message ||
      "Unable to process your request."
  );
} finally {
  setLoading(false);
}

};

return (
<div className="forgot-password-page">
<div className="forgot-password-card">

    <h2>Forgot Password?</h2>

    <p>
      Enter your registered email address to
      reset your password.
    </p>

    <form onSubmit={handleSubmit}>

      <label htmlFor="email">
        Email Address
      </label>

      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : "Send Reset Link"}
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

export default ForgotPassword;
