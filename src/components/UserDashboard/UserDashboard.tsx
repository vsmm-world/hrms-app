import React, { useState } from "react";
import "./UserDashboard.css"; // Import CSS file for styling

function UserDashboard() {
  // Sample user data (replace with actual user data)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  // State variables to track input values
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Function to handle name change
  const handleNameChange = (e: any) => {
    setNewName(e.target.value);
  };

  // Function to handle email change
  const handleEmailChange = (e: any) => {
    setNewEmail(e.target.value);
  };

  // Function to handle form submission (update user details)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Update user details if input fields are not empty
    if (newName.trim() !== "") {
      setUser({ ...user, name: newName });
    }
    if (newEmail.trim() !== "") {
      setUser({ ...user, email: newEmail });
    }
    // Clear input fields
    setNewName("");
    setNewEmail("");
  };

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <div className="user-details">
        <h3>User Details</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div className="update-form">
        <h3>Update Details</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newName">New Name:</label>
          <input
            type="text"
            id="newName"
            value={newName}
            onChange={handleNameChange}
          />
          <label htmlFor="newEmail">New Email:</label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={handleEmailChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UserDashboard;
