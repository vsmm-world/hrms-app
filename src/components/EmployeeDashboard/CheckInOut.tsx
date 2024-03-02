import React, { useState, useEffect, useRef } from "react";
import "./CheckInOut.css"; // Import component CSS

function CheckInOut() {

  const isCheckedInRef = useRef(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [message, setMessage] = useState(""); // Add message state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/attendance/chekIt/isCheckedIn", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          isCheckedInRef.current = data;
        } else {
          console.log("Failed to fetch check-in status");
        }
      } catch (error) {
        console.log("Error fetching check-in status", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchData();
  }, []);

  const handleCheckIn = async () => {
    try {
      setIsLoading(true); // Set loading state to true before making the request

      const response = await fetch("http://localhost:3000/attendance/chekIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });

      if (response.ok) {
        isCheckedInRef.current = true;
        setIsCheckedOut(false);
        setMessage("Checked in successfully");
        setTimeout(() => {
          setMessage(""); // Clear the message after 3 seconds
        }, 1500);
      } else {
        setMessage("Failed to check in");
      }
    } catch (error) {
      console.log("Error checking in", error);
      setMessage("Error checking in");
    } finally {
      setIsLoading(false); // Set loading state to false after the request is completed
    }
  };

  const handleCheckOut = async () => {
    try {
      setIsLoading(true); // Set loading state to true before making the request

      const response = await fetch("http://localhost:3000/attendance/chekOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });

      if (response.ok) {
        isCheckedInRef.current = false;
        setIsCheckedOut(true);
        setMessage("Checked out successfully");
        setTimeout(() => {
          setMessage(""); // Clear the message after 3 seconds
        }, 1500);
      } else {
        setMessage("Failed to check out");
      }
    } catch (error) {
      console.log("Error checking out", error);
      setMessage("Error checking out");
    } finally {
      setIsLoading(false); // Set loading state to false after the request is completed
    }
  };

  console.log(isCheckedInRef.current);
  return (
    <div className="check-in-out">
      {/* Loader */}
      {isLoading && <div>Loading...</div>}


      {/* Check-in button */}
      {!isLoading && !isCheckedInRef.current && (
        <button className="check-in-button" onClick={handleCheckIn}>
          Check In
        </button>
      )}

      {/* Check-out button */}
      {!isLoading && isCheckedInRef.current && (
        <button className="check-out-button" onClick={handleCheckOut}>
          Check Out
        </button>
      )}
      {/* Message */}
      {message && <div className="checkin-message">{message}</div>}
    </div>
  );
}

export default CheckInOut;
