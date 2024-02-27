import { useState } from "react";

function UpdateUser() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newName.trim() !== "") {
      // Update user name
      console.log(`Updated name: ${newName}`);
    } else {
      console.log("Name field is empty");
    }
    if (newEmail.trim() !== "") {
      // Update user email
      console.log(`Updated email: ${newEmail}`);
    } else {
      console.log("Email field is empty");
    }
    setNewName("");
    setNewEmail("");
  };

  const handleNameChange = (e: any) => {
    setNewName(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    setNewEmail(e.target.value);
  };

  return (
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
  );
}

export default UpdateUser;
