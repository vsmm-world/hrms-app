import React, { useState } from "react";

const LeaveApproval: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 123,
      employeeName: "string",
      startDate: "string",
      endDate: "string",
      status: "Pending",
    },
  ]);

  const approveLeave = (id: number) => {
    // setLeaveRequests((prevRequests) =>
    //   prevRequests.map((request) =>
    //     request.id === id ? { ...request, status: "Approved" } : request
    //   )
    // );
  };

  const rejectLeave = (id: number) => {
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
          {request.status === "Pending" && (
            <div>
              <button onClick={() => approveLeave(request.id)}>Approve</button>
              <button onClick={() => rejectLeave(request.id)}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeaveApproval;
