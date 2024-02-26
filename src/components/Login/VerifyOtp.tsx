import { useState } from "react";
import "./VerifyOtp.css";

function VerifyOtp(props: any) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const otpRef = props.otpref;
    const userData = {
      otp: otp,
      otpRef: otpRef,
    };
    try {
      const response = await fetch("http://localhost:3000/auth/validate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      console.log(userData);
      const data = await response.json();
      if (response.ok) {
        console.log("OTP verified successfully", data);
        setError("");
        document.cookie = `token=${data.token}`;
        window.location.href = "/user-dashboard";
      } else {
        console.log("Failed to verify OTP", response.statusText);
        setError("Invalid OTP! Please try again.");
      }
    } catch (error) {
      console.log("Failed to verify OTP", error);
      setError("Failed to verify OTP. Please try again later.");
    }
  };
  const handleChange = async (e: any) => {
    e.preventDefault();
    setOtp(e.target.value);
  };

  return (
    <>
      <div className="verify-otp-container">
        <h2>Verify OTP</h2>
        <form className="verify-otp-form" onSubmit={handleSubmit}>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleChange}
            required
          />
          <button type="submit">Verify</button>
          <div>{error}</div>
        </form>
      </div>
    </>
  );
}

export default VerifyOtp;
