import React, { useEffect, useState } from "react";
import './ActionToLeave.css';

const LeaveApproval: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(true);

  const commonHeaders = { "Content-Type": "application/json", Authorization: `Bearer ${document.cookie.split("=")[1]}` };

  useEffect(() => {
    async function fetchLeaveRequests() {
      try {
        const response = await fetch("https://api.ravindravaland.co/leave", {
          method: "GET",
          headers: commonHeaders
        });
        const data = await response.json();
        if (response.ok) {
          setLeaveRequests(data.reverse());
        }
      } catch (error) {
        console.log("Failed to fetch leave requests", error);
      } finally {
        setIsLoading(false); // Set isLoading to false after data is fetched
      }
    }
    fetchLeaveRequests();
  }, []);

  const approveLeave = (id: string) => {
    const payload = {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify({ id: id }),
    };
    async function approveLeaveRequest() {
      try {
        const response = await fetch("https://api.ravindravaland.co/leave/approve", payload);
        if (response.ok) {
          setLeaveRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.id === id ? { ...request, status: "Approved" } : request
            )
          );
        } else {
          console.log("Failed to approve leave request", response);
        }
      } catch (error) {
        console.log("Failed to approve leave request", error);
      }
    }
    approveLeaveRequest();
  };

  const rejectLeave = (id: string) => {
    const payload = {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify({ id: id }),
    };
    async function rejectLeaveRequest() {
      try {
        const response = await fetch("https://api.ravindravaland.co/leave/reject", payload);
        if (response.ok) {
          setLeaveRequests((prevRequests) =>
            prevRequests.map((request) =>
              request.id === id ? { ...request, status: "Rejected" } : request
            )
          );
        }
      } catch (error) {
        console.log("Failed to reject leave request", error);
      }
    }
    rejectLeaveRequest();
  };

  return (
    <div className="leave-aprroval-container">
      <h1 className="leave-approval-title">Leave Approval</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
              <tr key={request.id} className={`leave-request ${request.status === "Approved" ? "Approved-leave" : ""} ${request.status === "Rejected" ? "Rejected-leave" : ""}`}>
                <td>{request.User.name}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.status}</td>
                <td>{request.reason}</td>
                <td>
                  {request.status !== "Approved" && request.status !== "Rejected" && (
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
      )}
    </div>
  );
};

export default LeaveApproval;
