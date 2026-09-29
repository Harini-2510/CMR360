import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import ResetPassword from "./components/dashboard/ResetPassword";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Login / Register / Forgot Password / Reset Password
  const [currentPage, setCurrentPage] = useState("login");

  // Store reset token
  const [resetToken, setResetToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("crm360_token");

    if (savedToken) {
      setIsLoggedIn(true);
    }

    setIsCheckingSession(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        "https://cmr360.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Login failed. Please check your email and password."
        );
        return;
      }

      localStorage.setItem("crm360_token", data.token);
      localStorage.setItem("crm360_logged_in", "true");

      if (data.user) {
        localStorage.setItem(
          "crm360_user",
          JSON.stringify(data.user)
        );
      }

      alert("Login successful!");

      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login connection error:", error);

      alert(
        "Unable to connect to CRM360 backend. Please make sure the backend server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return null;
  }

  if (isLoggedIn) {
    return <Dashboard />;
  }

  // REGISTER PAGE
  if (currentPage === "register") {
    return (
      <Register
        onBackToLogin={() => setCurrentPage("login")}
      />
    );
  }

  // FORGOT PASSWORD PAGE
  if (currentPage === "forgot") {
    return (
      <ForgotPassword
        onBackToLogin={() => setCurrentPage("login")}
        onReset={(token) => {
          setResetToken(token);
          setCurrentPage("reset");
        }}
      />
    );
  }

  // RESET PASSWORD PAGE
  if (currentPage === "reset") {
    return (
      <ResetPassword
        token={resetToken}
        onBackToLogin={() => {
          setResetToken("");
          setCurrentPage("login");
        }}
      />
    );
  }

  // LOGIN PAGE
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="logo-circle">C</div>

        <h1>
          CRM<span>360</span>
        </h1>

        <p className="subtitle">
          Customer Relationship Management
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <span
              className="forgot-link"
              onClick={() => setCurrentPage("forgot")}
            >
              Forgot password?
            </span>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In →"}
          </button>
        </form>

        <p className="signup">
          Don't have an account?

          <button
            type="button"
            className="register-link"
            onClick={() => setCurrentPage("register")}
          >
            Create account
          </button>
        </p>

      </div>
    </div>
  );
}

export default App;