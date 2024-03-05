import { useEffect, useState } from "react";
import "./UserDashboard.css"; // Import CSS file for styling
import UpdateUser from "./UpdateUser";
import AccessDenied from "../../shared/components/AccessDenied";

function UserDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchUser();
  }, [user]);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/whoami", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const dt = await data.user;
        console.log("User data", dt);
        setUser(dt);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Failed to fetch user data", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  const [update, setUpdate] = useState(false);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!isLoggedIn && <AccessDenied />}
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
            <button className="update-button" onClick={() => setUpdate(!update)}>
              Update User
            </button>
            {update && <UpdateUser user={user} />}
          </div>
        </>
      )}
    </>
  );
}

export default UserDashboard;

