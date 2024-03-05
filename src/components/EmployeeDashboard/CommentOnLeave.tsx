import React, { useEffect, useState } from 'react';
import './CommentOnLeave.css';

const CommentOnLeave: React.FC = () => {
    const [leaves, setLeaves] = useState([] as any);
    const [currentUser, setCurrentUser] = useState({} as any);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState('');
    const commanHearder = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${document.cookie.split('=')[1]}`,
    };

    useEffect(() => {
        async function fetchLeaves() {
            try {
                const response = await fetch('http://localhost:3000/leave', {
                    method: 'GET',
                    headers: commanHearder
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setLeaves(data);

                } else {
                    setMessage('Failed to fetch leaves');
                }
            } catch (error) {
                setMessage('Error while fetching leaves');
            } finally {
                setLoading(false);
                console.log(leaves);
            }
        }
        async function fetchUser() {
            try {
                const response = await fetch('http://localhost:3000/auth/whoami', {
                    method: 'GET',
                    headers: commanHearder,
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data.user);
                    console.log(data.user);
                    fetchLeaves();
                } else {
                    setMessage('Failed to fetch user');
                }
            } catch (error) {
                setMessage('Error while fetching user');
            }
        }
        fetchUser();

        // Fetch current user

    }, [trigger]);

    const handleComment = async (leaveId: string, comment: string) => {
        console.log(leaveId, comment);
        const payload = {
            method: 'POST',
            headers: commanHearder,
            body: JSON.stringify({ LeaveId: leaveId, comment }),
        };
        try {
            const response = await fetch('http://localhost:3000/leave/commentOnLeave', payload);
            if (response.ok) {
                setMessage('Comment added successfully');
                setSelectedLeaveId(leaveId);
            } else {
                setMessage('Failed to add comment');
            }
        } catch (error) {
            setMessage(' Error While Adding the Comment');
        }
        finally {
            setTrigger(!trigger);
        }
    };

    return (
        <div>
            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <div className="card-container">
                    {leaves.length === 0 ? (
                        <p>No leaves found</p>
                    ) : (
                        leaves.filter((leave: any) => leave.mentionedEmplooyes.includes(currentUser.email) && leave.status === 'Pending').length === 0 ? (
                            <p>No leaves found that you are allowed to comment on  </p>
                        ) : (
                            leaves.map((leave: any) => (
                                (leave.mentionedEmplooyes.includes(currentUser.email) && leave.status === 'Pending') && (
                                    <div key={leave.id} className="card">
                                        <h3>Leave Applied by : {leave.User.name}</h3>
                                        <p>Leave Type: {leave.leaveType}</p>
                                        <p>Leave Status: {leave.status}</p>
                                        <div className="comments">
                                            <p>Leave Comments:</p>
                                            {leave.comments.map((comment: any) => (
                                                <div key={comment.id} className="comment">
                                                    <p>Employee Name: {comment.employeeName}</p>
                                                    <p>Comment: {comment.comment}</p>
                                                    {comment.reply && (<p>Replied by Leave Owner: {comment.reply}</p>)}
                                                </div>
                                            ))}
                                        </div>
                                        <p>Leave Start Date: {leave.startDate.split("T")[0]}</p>
                                        <p>Leave End Date: {leave.endDate.split("T")[0]}</p>
                                        <p>Leave Applied On: {leave.createdAt.split("T")[0]}</p>


                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                let comment = (e.target as HTMLFormElement).comment.value; // Use type casting
                                                handleComment(leave.id, comment);
                                                comment = '';
                                            }}
                                        >
                                            <input type="text" name="comment" placeholder="Enter your comment" />
                                            <button type="submit">Comment</button>

                                            {leave.id === selectedLeaveId && <p className='comment-on-leave-message'>{message}</p>}

                                        </form>

                                    </div>
                                )
                            ))
                        ))}
                </div>
            )}
        </div>
    );
};

export default CommentOnLeave;
