import { useState } from "react";
import "./LeaveRequest.css"; // Import component CSS

const LeaveTypes = {
  ANNUAL: "Annual Leave",
  SICK: "Sick Leave",
  MATERNITY: "Maternity Leave",
  PATERNITY: "Paternity Leave",
  UNPAID: "Unpaid Leave",
} as any;

function LeaveRequest() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleLeaveSubmit = (e: any) => {
    e.preventDefault();

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: JSON.stringify({
        startDate,
        endDate,
        reason,
        alsoNotify: ["vsmmworld@gmail.com"],
      }),
    };

    try {
      fetch(`http://localhost:3000/leave?type=${leaveType}`, payload)
        .then((response) => {
          if (response.ok) {
            console.log("Leave Request Submitted");
          } else {
            console.log("Leave Request Failed");
          }
        })
        .catch((error) => {
          console.log("Error submitting leave request", error);
        });
    } catch (error) {
      console.log("Error submitting leave request", error);
    }
    console.log("Leave Request Submitted:", {
      leaveType,
      startDate,
      endDate,
      reason,
    });
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <div className="leave-request">
      <h2>Leave Request</h2>
      <form onSubmit={handleLeaveSubmit}>
        <div className="form-group">
          <label htmlFor="leaveType">Leave Type:</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="">Select Leave Type</option>
            {Object.keys(LeaveTypes).map((key) => (
              <option key={key} value={key}>
                {LeaveTypes[key]}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LeaveRequest;
