import { useEffect, useState } from "react";
import AccessDenied from "../../shared/components/AccessDenied";
import AdminSideBar from "./AdminSideBar";
import ViewEmployees from "./ViewEmployees";
import LeaveApproval from "./ActionToLeave";
import "./AdminDashboard.css";
import AddEmployee from "./AddEmployee";
function AdminDashboard() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    isDeleted: false,
    roleId: "",
  } as any);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    async function checkUser() {
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
          const role = await data.user.Role.name;
          console.log("Role", role);
          if (role === "admin") {
            setIsAdmin(true);
          }
          setUser(dt);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Failed to fetch user data", error);
      }
    }
    checkUser();
  }, []);

  return (
    <>
      {!isLoggedIn && <AccessDenied />}
      {!isAdmin && <AccessDenied />}
      {isAdmin && (
        <>
          {/* <ViewEmployees /> */}
          {/* <LeaveApproval /> */}
          {/* <AddEmployee /> */}
          <div className="adminContainer">
            <h2>Admin Dashboard</h2>
            <div className="adminDetails">
              <h3>Admin Details</h3>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminDashboard;
