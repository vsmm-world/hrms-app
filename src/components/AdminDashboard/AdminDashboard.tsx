import { useEffect, useState } from "react";
import AccessDenied from "../../shared/components/AccessDenied";
import "./AdminDashboard.css";
import ViewEmployees from "./ViewEmployees";
import AddEmployee from "./AddEmployee";
import LeaveApproval from "./ActionToLeave";
import ViewUsers from "./ViewUsers";

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
  const [selectedContent, setSelectedContent] = useState("dashboard");

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

  const handleContentChange = (content: string) => {
    setSelectedContent(content);
  };

  return (
    <>
      {!isLoggedIn && <AccessDenied />}
      {!isAdmin && <AccessDenied />}
      {isAdmin && (
        <>
          <div className="admin-dashboard-container">
            <div className="sidebar">
              <ul>
                <li
                  className={`sidebar-item ${selectedContent === "dashboard" ? "active" : ""}`}
                  onClick={() => handleContentChange("dashboard")}
                >
                  Dashboard
                </li>
                <li
                  className={`sidebar-item ${selectedContent === "employees" ? "active" : ""}`}
                  onClick={() => handleContentChange("employees")}
                >
                  Employees
                </li>
                <li
                  className={`sidebar-item ${selectedContent === "leaves" ? "active" : ""}`}
                  onClick={() => handleContentChange("leaves")}
                >
                  Leaves
                </li>
                <li
                  className={`sidebar-item ${selectedContent === "addEmployee" ? "active" : ""}`}
                  onClick={() => handleContentChange("addEmployee")}
                >
                  Add Employee
                </li>
                <li
                  className={`sidebar-item ${selectedContent === "users" ? "active" : ""}`}
                  onClick={() => handleContentChange("users")}
                >
                  Users
                </li>
              </ul>
            </div>
            <div className="admin-content">
              {selectedContent === "dashboard" && (
                <>
                  <h2 className="admin-title">Admin Dashboard</h2>
                  <div className="admin-details">
                    <h3>Admin Details</h3>
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                  </div>
                </>
              )}
              {selectedContent === "employees" && (
                <>
                  <h2 className="admin-title">Employees</h2>
                  {<ViewEmployees />}
                </>
              )}
              {selectedContent === "leaves" && (
                <>
                  <h2 className="admin-title">Leaves</h2>
                  {<LeaveApproval />}
                </>
              )}
              {selectedContent === "addEmployee" && (
                <>
                  <h2 className="admin-title">Add Employee</h2>
                  {<AddEmployee />}
                </>
              )}
              {selectedContent === "users" && (
                <>
                  <h2 className="admin-title">Users</h2>
                  {<ViewUsers />}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminDashboard;
