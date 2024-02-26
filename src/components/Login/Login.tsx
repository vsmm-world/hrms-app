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
      const response = await fetch("http://localhost:3000/auth/login", {
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
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit">Login</button>
            <div>{error}</div>
          </form>
        </div>
      )}
      {verify && <VerifyOTP otpref={otpRef} />}
    </>
  );
}

export default Login;
