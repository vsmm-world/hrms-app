import { useEffect, useState } from "react";
import "./AddEmployee.css";

function AddEmployee() {
  const [users, setUsers] = useState([
    {
      id: "",
      name: "",
      isEmployee: false,
      email: "",
    },
  ]);
  const [newEmployee, setNewEmployee] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    jobTitle: "",
    contactInfo: "",
  } as any);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3000/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          const filteredUsers = data.filter((user: any) => !user.isEmployee && user.Role.name !== 'admin');
          setUsers(filteredUsers);
          console.log("Users", filteredUsers);
        }
      } catch (error) {
        console.log("Failed to fetch users", error);
      }
    }
    fetchUsers();
  }, [setNewEmployee]);

  const addEmployee = async (x: any) => {
    try {
      const response = await fetch(
        "http://localhost:3000/administrator/create-employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
          body: x,
        }
      );
      const data = await response.json();
      console.log("Data", data);
      if (response.ok) {
        console.log("Employee added", data);
      }
    } catch (error) {
      console.log("Failed to add employee", error);
    }
  };

  const handelSubmit = (e: any) => {
    e.preventDefault();
    const x = JSON.stringify(newEmployee);
    addEmployee(x);
    //clear the form
    setNewEmployee({
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      jobTitle: "",
      contactInfo: "",
    });
  };

  return (
    <>
      <div className="add-employee-container">
        <h1 className="add-employee-title">Add Employee</h1>
        <form onSubmit={handelSubmit}>
          <label htmlFor="userId" className="add-employee-label">User</label>
          <select
            name="userId"
            id="userId"
            className="add-employee-select"
            onChange={(e) => {
              const selectedUser = users.find(
                (user: any) => user.id === e.target.value
              );
              setNewEmployee({
                ...newEmployee,
                userId: e.target.value,
                firstName: selectedUser?.name.split(' ')[0] || "",
                lastName: selectedUser?.name.split(' ')[1] || "",
                email: selectedUser?.email || "",
              });
            }}
          >
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <label htmlFor="firstName" className="add-employee-label">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={newEmployee.firstName}
            className="add-employee-input"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, firstName: e.target.value })
            }
          />
          <label htmlFor="lastName" className="add-employee-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={newEmployee.lastName}
            className="add-employee-input"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, lastName: e.target.value })
            }
          />
          <label htmlFor="email" className="add-employee-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={newEmployee.email}
            className="add-employee-input"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
          />
          <label htmlFor="department" className="add-employee-label">Department</label>
          <input
            type="text"
            name="department"
            id="department"
            className="add-employee-input"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, department: e.target.value })
            }
          />
          <label htmlFor="jobTitle" className="add-employee-label">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            id="jobTitle"
            className="add-employee-input"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, jobTitle: e.target.value })
            }
          />
          <label htmlFor="contactInfo" className="add-employee-label">Contact Info</label>
          <input
            type="text"
            name="contactInfo"
            id="contactInfo"
            className="add-employee-input"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, contactInfo: e.target.value })
            }
          />
          <button type="submit" className="add-employee-button">Add Employee</button>
        </form>
      </div>
    </>
  );
}

export default AddEmployee;
