import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Register from "./Register";

function App() {
const [email, setEmail] =useState("");
const [password, setPassword] =useState("");
const [isLoggedIn, setIsLoggedIn] =useState(false);
const [isLoading, setIsLoading] =useState(false);
const [isCheckingSession, setIsCheckingSession] =useState(true);
const [currentPage, setCurrentPage] = useState(window.location.hash);

useEffect(() => {
const savedToken = localStorage.getItem("crm360_token");

if (savedToken) {  
  setIsLoggedIn(true);  
}  

setIsCheckingSession(false);

}, []);
useEffect(() => {
const handleHashChange = () => {
setCurrentPage(window.location.hash);
};

window.addEventListener("hashchange", handleHashChange);

return () => {
window.removeEventListener("hashchange", handleHashChange);
};
}, []);

const handleSubmit = async (e) => {
e.preventDefault();

if (!email || !password){  
  alert("please enter email and password");  
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
    alert(data.message || "Login failed. Please check your email and password.");  
    setIsLoading(false);  
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

  alert("login successful!");  

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
if (window.location.hash === "#forgot-password") {
return <ForgotPassword />;
}

if (window.location.hash === "#reset-password") {
return <ResetPassword />;
}
if (window.location.hash === "#register") {
  return <Register />;
}

if (isLoggedIn) {
return <Dashboard />;
}

return (
<div className="login-page">

<div className="login-card">  

    <div className="logo-circle">C</div>  

    <h1>CRM<span>360</span></h1>  

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

        <a

href="#"
onClick={(e) => {
e.preventDefault();
window.location.hash = "forgot-password";
}}

> 

Forgot password?
</a>
</div>

<button type="submit" disabled={isLoading}>  
        {isLoading ? "Signing In..." : "Sign In →"}  
      </button>  
    </form>  

    <p className="signup">  
      Don't have an account?  
      <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    window.location.hash = "register";
  }}
>
  Create account
</a> 
    </p>  

  </div>  

</div>

);
}

export default App;
