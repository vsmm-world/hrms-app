import { useEffect, useState } from "react";
import AttendanceRecord from "./AttendanceRecord";
import CheckInOut from "./CheckInOut";
import LeaveRequest from "./LeaveRequest";
import ViewLeaves from "./ViewLeaves";
import "./EmployeeDashboard.css";
import AccessDenied from "../../shared/components/AccessDenied";

function EmployeeDashboard() {
  const [selectedComponent, setSelectedComponent] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

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
          const role = await data.user.Role.name;
          if (role === "employee") {
            setIsEmployee(true);
          }
        }
      } catch (error) {
        console.log("Failed to fetch user data", error);
      }
    }
    checkUser();
  }, []);


  const handleComponentClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  return (
    <>
      {!isEmployee && <AccessDenied />}
      <div className="employee-dashboard">
        {showSidebar && (
          <div className="sidebar">
            <div className="sidebar-buttons">
              <button
                className="sidebar-button"
                onClick={() => handleComponentClick("AttendanceRecord")}
              >
                Attendance Record
              </button>
              <button
                className="sidebar-button"
                onClick={() => handleComponentClick("CheckInOut")}
              >
                Check In/Out
              </button>
              <button
                className="sidebar-button"
                onClick={() => handleComponentClick("LeaveRequest")}
              >
                Leave Request
              </button>
              <button
                className="sidebar-button"
                onClick={() => handleComponentClick("ViewLeaves")}
              >
                View Leaves
              </button>
            </div>
          </div>
        )}

        <div className="content">
          {selectedComponent === "AttendanceRecord" && <AttendanceRecord />}
          {selectedComponent === "CheckInOut" && <CheckInOut />}
          {selectedComponent === "LeaveRequest" && <LeaveRequest />}
          {selectedComponent === "ViewLeaves" && <ViewLeaves />}
        </div>
      </div>
    </>
  );
}

export default EmployeeDashboard;
