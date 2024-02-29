import { useState } from "react";
import AttendanceRecord from "./AttendanceRecord";
import CheckInOut from "./CheckInOut";
import LeaveRequest from "./LeaveRequest";
import ViewLeaves from "./ViewLeaves";
import "./EmployeeDashboard.css";

function Sidebar({
  handleComponentClick,
}: {
  handleComponentClick: (componentName: string) => void;
}) {
  return (
    <div className="sidebar">
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
  );
}

function EmployeeDashboard() {
  const [selectedComponent, setSelectedComponent] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleComponentClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="employee-dashboard">
      <div className="sidebar-toggle" onClick={handleToggleSidebar}>
        Toggle Sidebar
      </div>

      {showSidebar && (
        <div className="sidebar">
          <Sidebar handleComponentClick={handleComponentClick} />
        </div>
      )}

      <div className="content">
        {selectedComponent === "AttendanceRecord" && <AttendanceRecord />}
        {selectedComponent === "CheckInOut" && <CheckInOut />}
        {selectedComponent === "LeaveRequest" && <LeaveRequest />}
        {selectedComponent === "ViewLeaves" && <ViewLeaves />}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
