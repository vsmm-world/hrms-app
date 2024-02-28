import { useEffect, useState } from "react";

function UpdateUser(props: any) {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [user, setUser] = useState({} as any);
  const [Udata, setUData] = useState({} as any);

  useEffect(() => {
    setUser(props.user);
    setUData({
      name: props.user.name,
      email: props.user.email,
    });
  }, []);

  const updateUser = async (x: any) => {
    try {
      console.log(props.user);
      const response = await fetch(`http://localhost:3000/user/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: x,
      });
      const data = await response.json();
      console.log("Data", data);
      if (response.ok) {
        console.log("User updated", data);
      }
    } catch (error) {
      console.log("Failed to update user", error);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newName.trim() !== "") {
      const x = JSON.stringify({ name: newName, email: user.email });
      updateUser(x);
      return;
    } else {
      console.log("Name field is empty");
    }
    if (newEmail.trim() !== "") {
      const x = JSON.stringify({ email: newEmail, name: user.name });
      updateUser(x);
      return;
    } else {
      console.log("Email field is empty");
    }
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
