import { useState, useEffect } from "react";
import "./AttendanceRecord.css"; // Import component CSS

function AttendanceRecord() {
  const [attendanceRecords, setAttendanceRecords] = useState([
    { createdAt: "", checkIn: "", checkOut: "" },
  ]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      const payload = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      };
      try {
        const response = await fetch(
          `http://localhost:3000/attendance`,
          payload
        );
        if (response.ok) {
          console.log("Attendance records fetched successfully");
          const data = await response.json();
          setAttendanceRecords(data);
        } else {
          console.log("Something Something"); // Throw an error if response is not ok
        }
      } catch (error) {
        console.log(error);
        setError(error as any); // Set the error state
      }
    };

    fetchAttendanceRecords();
  }, []);

  // Group attendance records by date
  const groupedRecords: {
    [key: string]: { date: string; checkIn: string; checkOut: string };
  } = attendanceRecords.reduce((acc, record) => {
    const date = record.createdAt.split("T")[0] as string;
    if (!acc[date]) {
      acc[date] = {
        date,
        checkIn: record.checkIn,
        checkOut: record.checkOut,
      };
    } else {
      if (record.checkIn < acc[date].checkIn) {
        acc[date].checkIn = record.checkIn;
      }
      if (record.checkOut > acc[date].checkOut) {
        acc[date].checkOut = record.checkOut;
      }
    }
    return acc;
  }, {} as { [key: string]: { date: string; checkIn: string; checkOut: string } });

  const groupedAttendanceRecords: {
    date: string;
    checkIn: string;
    checkOut: string;
  }[] = Object.values(groupedRecords).reverse(); // Reverse the array

  return (
    <div className="attendance-record">
      <h2 className="attendance-record-title">Attendance Record</h2>
      {error && (
        <p className="attendance-record-error">
          Error fetching attendance records: {error}
        </p>
      )}{" "}
      {/* Display error message if there is an error */}
      <table className="attendance-record-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-in Time</th>
            <th>Check-out Time</th>
          </tr>
        </thead>
        <tbody>
          {groupedAttendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{new Date(record.checkIn).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
              <td>
                {record.checkOut
                  ? new Date(record.checkOut).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })
                  : "Not checked out yet"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceRecord;
