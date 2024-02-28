import React, { useEffect, useState } from "react";

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
    // setLeaveRequests((prevRequests) =>
    //   prevRequests.map((request) =>
    //     request.id === id ? { ...request, status: "Approved" } : request
    //   )
    // );
  };

  const rejectLeave = (id: string) => {
    // setLeaveRequests((prevRequests) =>
    //   prevRequests.map((request) =>
    //     request.id === id ? { ...request, status: "Rejected" } : request
    //   )
    // );
  };

  return (
    <div>
      <h1>Leave Approval</h1>
      {leaveRequests.map((request) => (
        <div key={request.id}>
          <h3>{request.employeeName}</h3>
          <p>Start Date: {request.startDate}</p>
          <p>End Date: {request.endDate}</p>
          <p>Status: {request.status}</p>
          <p>Reason : {request.reason}</p>

          <div>
            <button onClick={() => approveLeave(request.id)}>Approve</button>
            <button onClick={() => rejectLeave(request.id)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveApproval;
