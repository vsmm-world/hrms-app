import React, { useEffect, useState } from "react";
import "./ViewLeaves.css";

function ViewLeaves() {
    const [editableLeaveRequests, setEditableLeaveRequests] = useState([] as any);
    const [message, setMessage] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [reply, setReply] = useState('');
    const [visibleComments, setVisibleComments] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state
    const commonHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
    };

    useEffect(() => {
        // Fetch leave requests
        const user = JSON.parse(sessionStorage.getItem("user") as string);
        console.log("User", user);
        const payload = {
            method: "GET",
            headers: commonHeaders,
        };
        async function fetchLeaves() {
            try {
                const response = await fetch(
                    `https://api.ravindravaland.co/leave/${user.id}`,
                    payload
                );
                if (response.ok) {
                    const data = await response.json();
                    const array = data as any;
                    const updatedArray = array.reverse();
                    setEditableLeaveRequests(updatedArray); // Reverse the array
                    console.log("Leave Requests", updatedArray);
                }
            } catch (error) {
                console.log("Failed to fetch leave requests", error);
            } finally {
                setIsLoading(false); // Set isLoading to false after fetching data
            }
        }
        fetchLeaves();
    }, []);

    const handleEdit = (index: number) => {
        const updatedLeaveRequests = [...editableLeaveRequests];
        if (updatedLeaveRequests[index].status !== "Approved") {
            updatedLeaveRequests[index].isEditable = true;
            setEditableLeaveRequests(updatedLeaveRequests);
        }
    };

    const handleSave = (index: number) => {
        const updatedLeaveRequests = [...editableLeaveRequests];
        if (updatedLeaveRequests[index].status !== "Approved") {
            updatedLeaveRequests[index].isEditable = false;
            setEditableLeaveRequests(updatedLeaveRequests);

            const payload = {
                method: "PATCH",
                headers: commonHeaders,
                body: JSON.stringify({
                    startDate: updatedLeaveRequests[index].startDate,
                    endDate: updatedLeaveRequests[index].endDate,
                    reason: updatedLeaveRequests[index].reason,
                }),
            };
            async function updateLeave() {
                try {
                    const response = await fetch(
                        `https://api.ravindravaland.co/leave/${updatedLeaveRequests[index].id}`,
                        payload
                    );
                    if (response.ok) {
                        setMessage("Leave request updated");
                    }
                } catch (error) {
                    console.log("Failed to update leave request", error);
                }
            }
            updateLeave();
        }
    };

    const handleDelete = (index: number) => {
        const updatedLeaveRequests = [...editableLeaveRequests];
        const payload = {
            method: "DELETE",
            headers: commonHeaders,
        };
        async function deleteLeave() {
            try {
                const response = await fetch(
                    `https://api.ravindravaland.co/leave/${updatedLeaveRequests[index].id}`,
                    payload
                );
                if (response.ok) {
                    setMessage("Leave request deleted");
                }
            } catch (error) {
                console.log("Failed to delete leave request", error);
            }
        }
        deleteLeave();

        if (updatedLeaveRequests[index].status !== "Approved") {
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

    const handleExtend = (index: number, leaveId: string) => {
        setVisibleComments(leaveId)
        const updatedLeaveRequests = [...editableLeaveRequests];
        updatedLeaveRequests[index].isExtended = true;
        setShowComments(!showComments);
        setEditableLeaveRequests(updatedLeaveRequests);
    };

    const handleComment = async (index: number, leaveId: string) => {
        const comment = {
            reply: reply,
            LeaveId: leaveId,
            CommentId: index,
        };

        console.log("Comment", comment);
        const payload = {
            method: "POST",
            headers: commonHeaders,
            body: JSON.stringify(comment),
        };
        try {
            const response = await fetch(
                `http://localhost:3000/leave/replyOnComment`,
                payload
            );
            if (response.ok) {
                setMessage("Comment added");
                setTrigger(!trigger);
            } else {
                const data = await response.json();
                console.log("Data", data);
                setMessage("Failed to add comment");
            }
        } catch (error) {
            console.log("Failed to add comment", error);
        }

        setReply('');
    };

    return (
        <>
            {isLoading ? ( // Show loader while fetching data
                <div>Loading...</div>
            ) : (
                <div className="leave-requests">
                    <h2>Leave Requests</h2>
                    {message && <p className="leave-message">{message}</p>}
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
                            {editableLeaveRequests.length === 0 && (
                                <tr>
                                    <td colSpan={6}>No leave requests found</td>
                                </tr>
                            )}
                            {editableLeaveRequests.map((leave: any, index: number) => {
                                const isEditable = leave.isEditable;
                                const isApproved = leave.status === "Approved";
                                const isRejected = leave.status === "Rejected";
                                const startDate = leave.startDate.split("T")[0];
                                const endDate = leave.endDate.split("T")[0];
                                const reason = leave.reason;

                                return (
                                    <tr
                                        key={leave.id}
                                        className={`status-cell ${isApproved ? "status-approved" : ""
                                            } ${isRejected ? "status-rejected" : ""}`}
                                    >
                                        <td>
                                            {isEditable ? (
                                                <input
                                                    type="date"
                                                    value={leave.startDate}
                                                    onChange={(e) => handleStartDateChange(e, index)}
                                                    className="start-date-input"
                                                />
                                            ) : (
                                                startDate
                                            )}
                                        </td>
                                        <td>
                                            {isEditable ? (
                                                <input
                                                    type="date"
                                                    value={leave.endDate}
                                                    onChange={(e) => handleEndDateChange(e, index)}
                                                    className="end-date-input"
                                                />
                                            ) : (
                                                endDate
                                            )}
                                        </td>
                                        <td>
                                            {isEditable ? (
                                                <input
                                                    type="text"
                                                    value={reason}
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
                                                reason
                                            )}
                                        </td>
                                        <td
                                            className={`status-cell ${isApproved ? "status-approved" : ""
                                                } ${isRejected ? "status-rejected" : ""}`}
                                        >
                                            {leave.status}
                                        </td>
                                        <td>{leave.leaveType}</td>
                                        <td>
                                            {isApproved ? (
                                                <span className="status-approved">Approved</span>
                                            ) : isRejected ? (
                                                <span className="status-rejected">Rejected</span>
                                            ) : (
                                                <>
                                                    {isEditable ? (
                                                        <button
                                                            onClick={() => handleSave(index)}
                                                            className="save-button"
                                                        >
                                                            Save
                                                        </button>
                                                    ) : (
                                                        <div>
                                                            <button
                                                                onClick={() => handleEdit(index)}
                                                                className="edit-button"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(index)}
                                                                className="remove-button"
                                                            >
                                                                Remove
                                                            </button>
                                                            <button
                                                                onClick={() => handleExtend(index, leave.id)}
                                                                className="extend-button"
                                                            >
                                                                Extend
                                                            </button>
                                                        </div>
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
            )}
        </>
    );
}

export default ViewLeaves;
