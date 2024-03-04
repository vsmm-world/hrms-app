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
  const [warningMessage, setWarningMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleLeaveSubmit = async (e: any) => {
    e.preventDefault();

    const currentDate = new Date(Date.now());
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    if (selectedStartDate < currentDate) {
      if (selectedStartDate.getDate() !== currentDate.getDate()) {
        setWarningMessage("Start date cannot be in the past");
        return;
      }
    }

    if (selectedEndDate <= selectedStartDate) {
      setWarningMessage("End date must be after start date");
      return;
    }

    if (!leaveType) {
      setWarningMessage("Please select a leave type");
      return;
    }

    if (!startDate || !endDate || !reason) {
      setWarningMessage("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setSubmitMessage("");

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
      const response = await fetch(`https://api.ravindravaland.co/leave?type=${leaveType}`, payload);
      if (response.ok) {
        setSubmitMessage("Leave Request Submitted");
      } else {
        setSubmitMessage("Leave Request Failed");
      }
    } catch (error) {
      console.log("Error submitting leave request", error);
      setSubmitMessage("Error submitting leave request");
    }

    setIsLoading(false);
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setWarningMessage("");
  };

  return (
    <div className="leave-request">
      <h2>Leave Request</h2>
      {warningMessage && <div className="warning-message">{warningMessage}</div>}
      {submitMessage && <div className="submit-message">{submitMessage}</div>}
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default LeaveRequest;
