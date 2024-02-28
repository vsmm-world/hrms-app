import { useState } from "react";
import "./CheckInOut.css"; // Import component CSS

function CheckInOut() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setIsCheckedOut(false);
    // Add your logic for Check-in action here
  };

  const handleCheckOut = () => {
    setIsCheckedOut(true);
    setIsCheckedIn(false);
    // Add your logic for Check-out action here
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
