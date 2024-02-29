import React, { useEffect, useState } from "react";
import "./ViewLeaves.css";

function ViewLeaves() {
    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: "",
            startDate: "",
            endDate: "",
            reason: "",
            status: "",
            leaveType: "",
        },
    ] as any);
    const [editableLeaveRequests, setEditableLeaveRequests] = useState([] as any);

    useEffect(() => {
        // Fetch leave requests
        const user = JSON.parse(sessionStorage.getItem("user") as string);
        console.log("User", user);
        const payload = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
        };
        async function fetchLeaves() {
            try {
                const response = await fetch(
                    `http://localhost:3000/leave/${user.id}`,
                    payload
                );
                if (response.ok) {
                    const data = await response.json();
                    setLeaveRequests(data);
                    setEditableLeaveRequests(data);
                    console.log("Leave Requests", data);
                }
            } catch (error) {
                console.log("Failed to fetch leave requests", error);
            }
        }
        fetchLeaves();
    }, []);

    const handleEdit = (index: number) => {
        const updatedLeaveRequests = [...editableLeaveRequests];
        if (updatedLeaveRequests[index].status !== "approved") {
            updatedLeaveRequests[index].isEditable = true;
            setEditableLeaveRequests(updatedLeaveRequests);
        }
    };

    const handleSave = (index: number) => {
        const updatedLeaveRequests = [...editableLeaveRequests];
        updatedLeaveRequests[index].isEditable = false;
        setEditableLeaveRequests(updatedLeaveRequests);

        const payload = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
            body: JSON.stringify({
                startDate: updatedLeaveRequests[index].startDate,
                endDate: updatedLeaveRequests[index].endDate,
                reason: updatedLeaveRequests[index].reason,
            }),
        };
        async function updateLeave() {
            try {
                const response = await fetch(
                    `http://localhost:3000/leave/${updatedLeaveRequests[index].id}`,
                    payload
                );
                if (response.ok) {
                    console.log("Leave request updated");
                }
            } catch (error) {
                console.log("Failed to update leave request", error);
            }
        }
    };

    const handleDelete = (index: number) => {
        const updatedLeaveRequests = [...editableLeaveRequests];
        if (updatedLeaveRequests[index].status !== "approved") {
            updatedLeaveRequests.splice(index, 1);
            setEditableLeaveRequests(updatedLeaveRequests);
        }
    };

    const handleStartDateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedLeaveRequests = [...editableLeaveRequests];
        updatedLeaveRequests[index].startDate = e.target.value;
        if (updatedLeaveRequests[index].endDate < e.target.value) {
            updatedLeaveRequests[index].endDate = e.target.value;
        }
        setEditableLeaveRequests(updatedLeaveRequests);
    };

    const handleEndDateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedLeaveRequests = [...editableLeaveRequests];
        if (e.target.value >= updatedLeaveRequests[index].startDate) {
            updatedLeaveRequests[index].endDate = e.target.value;
        }
        setEditableLeaveRequests(updatedLeaveRequests);
    };

    return (
        <>
            <div className="leave-requests">
                <h2>Leave Requests</h2>
                <table className="leave-requests-table">
                    <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Leave Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editableLeaveRequests.map((leave: any, index: number) => {
                            return (
                                <tr key={leave.id}>
                                    <td>
                                        {leave.isEditable ? (
                                            <input
                                                type="date"
                                                value={leave.startDate}
                                                onChange={(e) => handleStartDateChange(e, index)}
                                                className="start-date-input"
                                            />
                                        ) : (
                                            leave.startDate.split("T")[0]
                                        )}
                                    </td>
                                    <td>
                                        {leave.isEditable ? (
                                            <input
                                                type="date"
                                                value={leave.endDate}
                                                onChange={(e) => handleEndDateChange(e, index)}
                                                className="end-date-input"
                                            />
                                        ) : (
                                            leave.endDate.split("T")[0]
                                        )}
                                    </td>
                                    <td>
                                        {leave.isEditable ? (
                                            <input
                                                type="text"
                                                value={leave.reason}
                                                onChange={(e) => {
                                                    const updatedLeaveRequests = [
                                                        ...editableLeaveRequests,
                                                    ];
                                                    updatedLeaveRequests[index].reason = e.target.value;
                                                    setEditableLeaveRequests(updatedLeaveRequests);
                                                }}
                                                className="reason-input"
                                            />
                                        ) : (
                                            leave.reason
                                        )}
                                    </td>
                                    <td>{leave.status}</td>
                                    <td>{leave.leaveType}</td>
                                    <td>
                                        {leave.status !== "approved" && leave.isEditable ? (
                                            <button
                                                onClick={() => handleSave(index)}
                                                className="save-button"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <>
                                                {leave.status !== "approved" && (
                                                    <button
                                                        onClick={() => handleEdit(index)}
                                                        className="edit-button"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {leave.status !== "approved" && (
                                                    <button
                                                        onClick={() => handleDelete(index)}
                                                        className="remove-button"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewLeaves;
