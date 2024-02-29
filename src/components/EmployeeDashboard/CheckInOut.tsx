import { useState } from "react";
import "./CheckInOut.css"; // Import component CSS

function CheckInOut() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckIn = async () => {
    try {
      const response = await fetch("http://localhost:3000/attendance/checkIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });

      if (response.ok) {
        console.log("Check-in successful");
        setIsCheckedIn(true);
        setIsCheckedOut(false);
      } else {
        console.log("Check-in failed");
      }
    } catch (error) {
      console.log("Error checking in", error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/attendance/checkOut",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );

      if (response.ok) {
        console.log("Check-out successful");
        setIsCheckedOut(true);
        setIsCheckedIn(false);
      } else {
        console.log("Check-out failed");
      }
    } catch (error) {
      console.log("Error checking out", error);
    }
  };

  return (
    <div className="check-in-out">
      {/* Check-in button */}
      <button
        className={`check-in-button ${isCheckedIn ? "checked" : ""}`}
        onClick={handleCheckIn}
      >
        Check In
      </button>

      {/* Check-out button */}
      <button
        className={`check-out-button ${isCheckedOut ? "checked" : ""}`}
        onClick={handleCheckOut}
      >
        Check Out
      </button>
    </div>
  );
}

export default CheckInOut;
