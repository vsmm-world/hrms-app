import { useState } from "react";
import "./Register.css"; // Import the CSS file

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("https://api.ravindravaland.co/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User registered successfully!");
        window.location.href = "/login";
        // Optionally, you can handle the response here, such as displaying a success message to the user
      } else {
        console.log("Failed to register user", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">User Registration</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="form-input"
          />
        </div>
        {passwordError && <p className="password-error">{passwordError}</p>}
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="register-login-link">Already have an account? <a href="/login" className="register-login">Login</a></p>
    </div>
  );
}

export default Register;
