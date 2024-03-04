import React, { useEffect, useState } from "react";
import "./ViewUsers.css";

function ViewUsers() {
    const [editableUsers, setEditableUsers] = useState([] as any);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    const commonpayload = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
    };

    useEffect(() => {
        // Fetch users
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "http://localhost:3000/user",
                    commonpayload
                );
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    const filteredUsers = data.filter(
                        (user: any) => !user.isEmployee && user.Role.name !== "admin"
                    );
                    setEditableUsers(filteredUsers);
                    if (filteredUsers.length === 0) {
                        setMessage("No users found");
                    }

                } else {
                    setMessage("Failed to fetch users");
                }
            } catch (error) {
                console.log("Failed to fetch users", error);
                setMessage("Failed to fetch users");
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchUsers();
    }, [setEditableUsers]);

    const handleEmailChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEditableUsers((prevUsers: any) => {
            const updatedUsers = [...prevUsers];
            updatedUsers[index].email = event.target.value;
            return updatedUsers;
        });
    };

    const handleEdit = (index: number) => {
        const updatedUsers = [...editableUsers];
        updatedUsers[index].isEditable = true;
        setEditableUsers(updatedUsers);
    };

    const handleSave = async (index: number) => {
        const updatedUsers = [...editableUsers];
        updatedUsers[index].isEditable = false;
        const payload = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
            body: JSON.stringify({
                name: updatedUsers[index].name,
                email: updatedUsers[index].email,
            }),
        };
        try {
            const response = await fetch(
                `http://localhost:3000/user/${updatedUsers[index].id}`,
                payload
            );
            if (response.ok) {
                console.log("User updated");
                setMessage("User updated");
            } else {
                setMessage("Failed to update user");
            }
        } catch (error) {
            console.log("Failed to update user", error);
            setMessage("Failed to update user");
        }
        setEditableUsers(updatedUsers);
    };

    const handleRemove = async (index: number) => {
        if (index < 0 || index >= editableUsers.length) {
            console.log("Invalid index");
            return;
        }
        const updatedUsers = [...editableUsers];

        const payload = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
        };
        try {
            const response = await fetch(
                `http://localhost:3000/user/${updatedUsers[index].id}`,
                payload
            );
            if (response.ok) {
                console.log("User removed");
                setMessage("User removed");
            } else {
                setMessage("Failed to remove user");
            }
        } catch (error) {
            console.log("Failed to remove user", error);
            setMessage("Failed to remove user");
        }
        updatedUsers.splice(index, 1);
        setEditableUsers(updatedUsers);
    };

    const handleNameChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const updatedUsers = [...editableUsers];
        updatedUsers[index].name = event.target.value;
        setEditableUsers(updatedUsers);
    };

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="users">
                    <h2>Users</h2>
                    {message && <div className="view-user-message">{message}</div>}
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th className="table-header">Name</th>
                                <th className="table-header">Email</th>
                                <th className="table-header">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {editableUsers.map((user: any, index: number) => {
                                if (user.Role.name === "admin" || user.isEmployee) {
                                    return null;
                                }

                                return (
                                    <tr key={user.id}>
                                        <td className="table-data">
                                            {user.isEditable ? (
                                                <input
                                                    type="text"
                                                    value={user.name}
                                                    onChange={(event) =>
                                                        handleNameChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    className="input-field"
                                                />
                                            ) : (
                                                user.name
                                            )}
                                        </td>
                                        <td className="table-data">
                                            {user.isEditable ? (
                                                <input
                                                    type="text"
                                                    value={user.email}
                                                    onChange={(event) =>
                                                        handleEmailChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    className="input-field"
                                                />
                                            ) : (
                                                user.email
                                            )}
                                        </td>
                                        <td className="table-data">
                                            {user.isEditable ? (
                                                <button
                                                    onClick={() =>
                                                        handleSave(index)
                                                    }
                                                    className="save-button"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(index)
                                                        }
                                                        className="edit-button"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleRemove(
                                                                index
                                                            )
                                                        }
                                                        className="remove-button"
                                                    >
                                                        Remove
                                                    </button>
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

export default ViewUsers;
