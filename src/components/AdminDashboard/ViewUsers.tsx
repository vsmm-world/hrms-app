import React, { useEffect, useState } from "react";
import "./ViewUsers.css";

function ViewUsers() {
    const [editableUsers, setEditableUsers] = useState([] as any);
    const commonpayload = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
    }

    useEffect(() => {
        // Fetch users
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "http://localhost:3000/user", commonpayload
                );
                if (response.ok) {
                    const data = await response.json();
                    setEditableUsers(data);
                    console.log("Users", data);
                }
            } catch (error) {
                console.log("Failed to fetch users", error);
            }
        }
        fetchUsers();
    }, [setEditableUsers]);

    // const handleEmailChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    //     const updatedUsers = [...editableUsers];
    //     updatedUsers[index].email = event.target.value;
    //     setEditableUsers(updatedUsers);
    // };
    const handleEmailChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleSave = (index: number) => {
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
            async function updateUser() {
                const response = await fetch(
                    `http://localhost:3000/user/${updatedUsers[index].id}`,
                    payload
                );
                if (response.ok) {
                    console.log("User updated");
                }
            }
            updateUser();
        } catch (error) {
            console.log("Failed to update user", error);
        }
        console.log("Save user at index:", index);
        setEditableUsers(updatedUsers);
    };

    const handleRemove = (index: number) => {
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
        async function removeUser() {
            try {
                const response = await fetch(
                    `http://localhost:3000/user/${updatedUsers[index].id}`,
                    payload
                );
                if (response.ok) {
                    console.log("User removed");
                }
            } catch (error) {
                console.log("Failed to remove user", error);
            }
        }
        removeUser();
        updatedUsers.splice(index, 1);
        setEditableUsers(updatedUsers);
        console.log("Remove user at index:", index);
    };
    const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedUsers = [...editableUsers];
        updatedUsers[index].name = event.target.value;
        setEditableUsers(updatedUsers);
    };

    return (
        <>
            <div className="users">
                <h2>Users</h2>
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
                            if (user.Role.name === "admin") {
                                return null;
                            }

                            return (
                                <tr key={user.id}>
                                    <td className="table-data">
                                        {user.isEditable ? (
                                            <input
                                                type="text"
                                                value={user.name}
                                                onChange={(event) => handleNameChange(index, event)}
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
                                                onChange={(event) => handleEmailChange(index, event)}
                                                className="input-field"
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td className="table-data">
                                        {user.isEditable ? (
                                            <button onClick={() => handleSave(index)} className="save-button">
                                                Save
                                            </button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(index)} className="edit-button">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleRemove(index)} className="remove-button">
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
        </>
    );
}

export default ViewUsers;
