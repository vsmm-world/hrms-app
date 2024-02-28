import React, { useState, useEffect } from "react";
import "./AttendanceRecord.css"; // Import component CSS

function AttendanceRecord() {
  const [attendanceRecords, setAttendanceRecords] = useState([
    { date: "", checkInTime: "", checkOutTime: "" },
  ]);

  useEffect(() => {
    // Fetch attendance records from backend API
    // Example: fetchAttendanceRecords();
    // Make sure to replace the example with your actual API call
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch("/api/attendance");
        if (!response.ok) {
          throw new Error("Failed to fetch attendance records");
        }
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (error) {
        console.error(error);
        // Handle error fetching attendance records
      }
    };

    fetchAttendanceRecords();
  }, []);

  return (
    <div className="attendance-record">
      <h2>Attendance Record</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-in Time</th>
            <th>Check-out Time</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.checkInTime}</td>
              <td>{record.checkOutTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceRecord;
