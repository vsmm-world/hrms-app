// LoginForm.js

import { useState } from "react";
import "./Login.css"; // Import the CSS file
import VerifyOTP from "./VerifyOtp";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verify, setVerify] = useState(false);
  const [otpRef, setOtpRef] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("https://api.ravindravaland.co/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("User logged in successfully", data);
        if (data.otpRef) {
          setVerify(true);
          setOtpRef(data.otpRef);
        }
        setError("");
      } else {
        console.log("Failed to login user", response.statusText);
        setError("Invalid Credentials! Please try again.");
      }
    } catch (error) {
      console.log("Failed to login user", error);
      setError("Failed to login user. Please try again later.");
    }
  };

  return (
    <>
      {!verify && (
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
            <div className="error-message">{error}</div>
          </form>
          <div>
            Don't have an account? <a href="/register" className="register-link">Register</a>
          </div>
        </div>
      )}
      {verify && <VerifyOTP otpref={otpRef} />}
    </>
  );
}

export default Login;
