import { useEffect, useState } from "react";

function ViewEmployees() {
  const [Employees, setEmployees] = useState([]);

  async function fetchEmployees() {
    try {
      const response = await fetch(
        "http://localhost:3000/administrator/eployees",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEmployees(data);
        console.log("Employees", data);
      }
    } catch (error) {
      console.log("Failed to fetch employees", error);
    }
  }
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      {Employees.map((employee: any) => {
        return (
          <div key={employee.id}>
            <h3>Employee Details</h3>
            <p>
              <strong>Name:</strong> {employee.firstName}
            </p>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default ViewEmployees;
