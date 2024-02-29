import React, { useEffect, useState } from "react";
import "./ViewEmployees.css";

function ViewEmployees() {
  const [employees, setEmployees] = useState([] as any);
  const [editableEmployees, setEditableEmployees] = useState([] as any);

  useEffect(() => {
    // Fetch employees
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
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
          setEditableEmployees(data);
          console.log("Employees", data);
        }
      } catch (error) {
        console.log("Failed to fetch employees", error);
      }
    }
    fetchEmployees();
  }, []);

  const handleEmailChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEmployees = [...editableEmployees];
    updatedEmployees[index].email = event.target.value;
    setEditableEmployees(updatedEmployees);
  };

  const handleEdit = (index: number) => {
    const updatedEmployees = [...editableEmployees];
    updatedEmployees[index].isEditable = true;
    setEditableEmployees(updatedEmployees);
  };

  const handleSave = (index: number) => {
    const updatedEmployees = [...editableEmployees];
    updatedEmployees[index].isEditable = false;
    // Add your logic to save the updated employee data
    console.log("Save employee at index:", index);
    setEditableEmployees(updatedEmployees);
  };

  const handleRemove = (index: number) => {
    const updatedEmployees = [...editableEmployees];
    // Add your logic to handle remove action for the employee at the given index
    console.log("Remove employee at index:", index);
  };

  const handleFirstNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEmployees = [...editableEmployees];
    updatedEmployees[index].firstName = event.target.value;
    setEditableEmployees(updatedEmployees);
  };

  const handleLastNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEmployees = [...editableEmployees];
    updatedEmployees[index].lastName = event.target.value;
    setEditableEmployees(updatedEmployees);
  };

  return (
    <>
      <div className="employees">
        <h2>Employees</h2>
        <table className="employees-table">
          <thead>
            <tr>
              <th className="table-header">First Name</th>
              <th className="table-header">Last Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {editableEmployees.map((employee: any, index: number) => {
              return (
                <tr key={employee.id}>
                  <td>
                    {employee.isEditable ? (
                      <input
                        type="text"
                        value={employee.firstName}
                        onChange={(event) => handleFirstNameChange(index, event)}
                        className="input-field"
                      />
                    ) : (
                      employee.firstName
                    )}
                  </td>
                  <td>
                    {employee.isEditable ? (
                      <input
                        type="text"
                        value={employee.lastName}
                        onChange={(event) => handleLastNameChange(index, event)}
                        className="input-field"
                      />
                    ) : (
                      employee.lastName
                    )}
                  </td>
                  <td>
                    {employee.isEditable ? (
                      <input
                        type="text"
                        value={employee.email}
                        onChange={(event) => handleEmailChange(index, event)}
                        className="input-field"
                      />
                    ) : (
                      employee.email
                    )}
                  </td>
                  <td>
                    {employee.isEditable ? (
                      <button onClick={() => handleSave(index)} className="save-button">
                        Save
                      </button>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(index)} className="edit-button">
                          Edit
                        </button>
                        <button onClick={() => handleRemove(index)} className="remove-button">
                          Remove
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewEmployees;
