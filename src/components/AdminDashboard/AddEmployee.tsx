import { useEffect, useState } from "react";

function AddEmployee() {
  const [users, setUsers] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    userId: "string",
    firstName: "string",
    lastName: "string",
    email: "string",
    department: "string",
    jobTitle: "string",
    contactInfo: "string",
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
          setUsers(data);
          console.log("Users", data);
        }
      } catch (error) {
        console.log("Failed to fetch users", error);
      }
    }
    fetchUsers();
  }, []);
  const addEmployee = async (x: any) => {
    try {
      const response = await fetch(
        "http://localhost:3000/administrator/employee",
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
  };

  return (
    <>
      <div>
        <h1>Add Employee</h1>
        <form onSubmit={handelSubmit}>
          <label htmlFor="userId">User</label>
          <select
            name="userId"
            id="userId"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, userId: e.target.value })
            }
          >
            {users.map((user: any) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, firstName: e.target.value })
            }
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, lastName: e.target.value })
            }
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
          />
          <label htmlFor="department">Department</label>
          <input
            type="text"
            name="department"
            id="department"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, department: e.target.value })
            }
          />
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            id="jobTitle"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, jobTitle: e.target.value })
            }
          />
          <label htmlFor="contactInfo">Contact Info</label>
          <input
            type="text"
            name="contactInfo"
            id="contactInfo"
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, contactInfo: e.target.value })
            }
          />
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </>
  );
}

export default AddEmployee;
