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
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
        } else {
          setErrorMessage("Failed to fetch user data");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data");
        console.log("Failed to fetch user data", error);
      } finally {
        setIsLoading(false);
      }
    }
    checkUser();
  }, []);

  const handleContentChange = (content: string) => {
    setSelectedContent(content);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || !isAdmin) {
    return <AccessDenied />;
  }

  return (
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
              {<ViewEmployees />}
            </>
          )}
          {selectedContent === "leaves" && (
            <>
              {<LeaveApproval />}
            </>
          )}
          {selectedContent === "addEmployee" && (
            <>
              {<AddEmployee />}
            </>
          )}
          {selectedContent === "users" && (
            <>
              {<ViewUsers />}
            </>
          )}
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </>
  );
}

export default AdminDashboard;
