import React, { useEffect, useState } from "react";
import './ActionToLeave.css';

const LeaveApproval: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: "123",
      employeeName: "string",
      startDate: "string",
      endDate: "string",
      status: "Pending",
      reason: "string",
    },
  ]);

  useEffect(() => {
    async function fetchLeaveRequests() {
      try {
        const response = await fetch("http://localhost:3000/leave", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setLeaveRequests(data);
          console.log("Leave Requests", data);
        }
      } catch (error) {
        console.log("Failed to fetch leave requests", error);
      }
    }
    fetchLeaveRequests();
  }, []);

  const approveLeave = (id: string) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: "approved" } : request
      )
    );
  };

  const rejectLeave = (id: string) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: "rejected" } : request
      )
    );
  };

  return (
    <div className="leave-aprroval-container">
      <h1 className="leave-approval-title">Leave Approval</h1>
      <table className="leave-approval-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id} className={`leave-request ${request.status === "approved" ? "approved-leave" : ""} ${request.status === "rejected" ? "rejected-leave" : ""}`}>
              <td>{request.employeeName}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.status}</td>
              <td>{request.reason}</td>
              <td>
                {request.status !== "approved" && request.status !== "rejected" && (
                  <div>
                    <button onClick={() => approveLeave(request.id)}>Approve</button>
                    <button onClick={() => rejectLeave(request.id)}>Reject</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveApproval;
