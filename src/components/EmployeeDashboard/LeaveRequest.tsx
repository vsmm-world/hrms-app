import { useEffect, useState } from "react";
import "./LeaveRequest.css"; // Import component CSS

const LeaveTypes = {
  ANNUAL: "Annual Leave",
  SICK: "Sick Leave",
  MATERNITY: "Maternity Leave",
  PATERNITY: "Paternity Leave",
  UNPAID: "Unpaid Leave",
} as any;

function LeaveRequest() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [submitMessage, setSubmitMessage] = useState("");
  const [employees, setEmployees] = useState([] as any);
  const [selectedEmployee, setSelectedEmployee] = useState([] as any);
  const [currentUser, setCurrentUser] = useState({} as any);

  useEffect(() => {

    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/auth/whoami", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
          fetchEmployees();

        } else {
          setWarningMessage("Failed to fetch user");
        }
      } catch (error) {
        setWarningMessage("Error while fetching user");
      } finally {

        setIsLoading(false);
      }
    }
    fetchUser();

    setIsLoading(true);
    async function fetchEmployees() {
      try {
        const response = await fetch("http://localhost:3000/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const employees = data.filter((employee: any) => employee.Role.name === "employee" && employee.id !== currentUser.id);
          console.log(employees);
          console.log(currentUser);
          setEmployees(employees);
        } else {
          setWarningMessage("Failed to fetch employees");
        }
      } catch (error) {
        setWarningMessage("Error while fetching employees");
      }
      finally {
        setIsLoading(false);
      }
    }
  }, []);
  const handleLeaveSubmit = async (e: any) => {
    e.preventDefault();

    const currentDate = new Date(Date.now());
    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);
    console.log(selectedEmployee);

    if (selectedStartDate < currentDate) {
      if (selectedStartDate.getDate() !== currentDate.getDate()) {
        setWarningMessage("Start date cannot be in the past");
        return;
      }
    }

    if (selectedEndDate <= selectedStartDate) {
      setWarningMessage("End date must be after start date");
      return;
    }

    if (!leaveType) {
      setWarningMessage("Please select a leave type");
      return;
    }

    if (!startDate || !endDate || !reason) {
      setWarningMessage("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setSubmitMessage("");

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: JSON.stringify({
        startDate,
        endDate,
        reason,
        alsoNotify: selectedEmployee,
      }),
    };

    try {
      const response = await fetch(`http://localhost:3000/leave?type=${leaveType}`, payload);
      if (response.ok) {
        setSubmitMessage("Leave Request Submitted");
      } else {
        setSubmitMessage("Leave Request Failed");
      }
    } catch (error) {
      console.log("Error submitting leave request", error);
      setSubmitMessage("Error submitting leave request");
    }

    setIsLoading(false);
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setWarningMessage("");
  };

  return (
    <div className="leave-request">
      <h2>Leave Request</h2>
      {warningMessage && <div className="warning-message">{warningMessage}</div>}
      {submitMessage && <div className="submit-message">{submitMessage}</div>}
      <form onSubmit={handleLeaveSubmit}>
        <div className="form-group">
          <label htmlFor="leaveType">Leave Type:</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="">Select Leave Type</option>
            {Object.keys(LeaveTypes).map((key) => (
              <option key={key} value={key}>
                {LeaveTypes[key]}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <label htmlFor="employee">Mention:</label>
        {employees.map((employee: any) => (<>

          {employee.id === currentUser.id ? null : (

            <div key={employee.id}>
              <input
                type="checkbox"
                id={employee.email}
                name="employee"
                value={employee.email}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (isChecked) {
                    selectedEmployee.push(employee.email);
                    setSelectedEmployee(selectedEmployee);
                  }
                }}
              />
              <label htmlFor={employee.email}>{employee.name}</label>
            </div>
          )}
        </>
        ))}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default LeaveRequest;
