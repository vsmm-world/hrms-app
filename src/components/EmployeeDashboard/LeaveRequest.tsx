import { useState } from "react";
import "./LeaveRequest.css"; // Import component CSS

function LeaveRequest() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleLeaveSubmit = () => {
    // Here you can handle the submission of leave request,
    // you can send the data to your backend or handle it as per your requirement.
    console.log("Leave Request Submitted:", {
      leaveType,
      startDate,
      endDate,
      reason,
    });
    // You can also reset the form fields after submission if needed
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
          <input
            type="text"
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          />
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
