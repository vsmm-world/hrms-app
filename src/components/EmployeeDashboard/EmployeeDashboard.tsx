import { useEffect, useState } from "react";
import AttendanceRecord from "./AttendanceRecord";
import CheckInOut from "./CheckInOut";
import LeaveRequest from "./LeaveRequest";
import ViewLeaves from "./ViewLeaves";
import './EmployeeDashboard.css'
import AccessDenied from "../../shared/components/AccessDenied";

function EmployeeDashboard() {
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");
  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({} as any);

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
          setUser(data.user);
          const role = await data.user.Role.name;
          if (role === "employee") {
            setIsEmployee(true);
          }
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.log("Failed to fetch user data", error);
      } finally {
        setIsLoading(false);
      }
    }
    checkUser();
  }, []);

  const handleComponentClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!isEmployee ? (
            <AccessDenied />
          ) : (
            <div className="employee-dashboard">
              <div className="sidebar">
                <div className="sidebar-buttons">
                  <button
                    className={`sidebar-button ${selectedComponent === "Dashboard" ? "active" : ""
                      }`}
                    onClick={() => handleComponentClick("Dashboard")}
                  >
                    Dashboard
                  </button>
                  <button
                    className={`sidebar-button ${selectedComponent === "AttendanceRecord" ? "active" : ""
                      }`}
                    onClick={() => handleComponentClick("AttendanceRecord")}
                  >
                    Attendance Record
                  </button>
                  <button
                    className={`sidebar-button ${selectedComponent === "CheckInOut" ? "active" : ""
                      }`}
                    onClick={() => handleComponentClick("CheckInOut")}
                  >
                    Check In/Out
                  </button>
                  <button
                    className={`sidebar-button ${selectedComponent === "LeaveRequest" ? "active" : ""
                      }`}
                    onClick={() => handleComponentClick("LeaveRequest")}
                  >
                    Leave Request
                  </button>
                  <button
                    className={`sidebar-button ${selectedComponent === "ViewLeaves" ? "active" : ""
                      }`}
                    onClick={() => handleComponentClick("ViewLeaves")}
                  >
                    View Leaves
                  </button>
                </div>
              </div>

              <div className="content">
                {(selectedComponent === "Dashboard" || selectedComponent === "") && (
                  <div>
                    <h2>User Information</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.Role.name}</p>
                  </div>
                )}
                {selectedComponent === "AttendanceRecord" && <AttendanceRecord />}
                {selectedComponent === "CheckInOut" && <CheckInOut />}
                {selectedComponent === "LeaveRequest" && <LeaveRequest />}
                {selectedComponent === "ViewLeaves" && <ViewLeaves />}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default EmployeeDashboard;
