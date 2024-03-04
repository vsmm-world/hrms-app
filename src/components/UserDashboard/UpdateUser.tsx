import { useEffect, useState } from "react";
import './UpdateUser.css'

function UpdateUser(props: any) {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [user, setUser] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    setUser(props.user);
  }, []);

  const updateUser = async (x: any) => {
    try {
      setIsLoading(true);
      console.log(props.user);
      const response = await fetch(`https://api.ravindravaland.co/user/${user.id}`, {
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
        setUpdateMessage("User updated successfully");
        console.log("User updated", data);
      } else {
        setUpdateMessage("Failed to update user");
        console.log("Failed to update user", data);
      }
    } catch (error) {
      setUpdateMessage("Failed to update user");
      console.log("Failed to update user", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newName.trim() !== "") {
      const x = JSON.stringify({ name: newName, email: user.email });
      updateUser(x);
      return;
    } else {
      setUpdateMessage("Name field is empty");
      console.log("Name field is empty");
    }
    if (newEmail.trim() !== "") {
      const x = JSON.stringify({ email: newEmail, name: user.name });
      updateUser(x);
      return;
    } else {
      setUpdateMessage("Email field is empty");
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
      <h3 className="update-form__title">Update Details</h3>
      <form className="update-form__form" onSubmit={handleSubmit}>
        <label htmlFor="newName" className="update-form__label">New Name:</label>
        <input
          type="text"
          id="newName"
          value={newName}
          onChange={handleNameChange}
          className="update-form__input"
        />
        <label htmlFor="newEmail" className="update-form__label">New Email:</label>
        <input
          type="email"
          id="newEmail"
          value={newEmail}
          onChange={handleEmailChange}
          className="update-form__input"
        />
        <button type="submit" className="update-form__button">Update</button>
      </form>
      {isLoading && <div className="loader">Loading...</div>}
      {updateMessage && <div className="update-message">{updateMessage}</div>}
    </div>
  );
}

export default UpdateUser;
