import { useState, useEffect } from "react";
import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/InputForm.css";

const EmployeeInput = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: e.target.name.value,
        sin: parseInt(e.target.sin.value),
        address: e.target.address.value,
        role: e.target.role.value,
        hotel_id: parseInt(e.target["hotel-id"].value),
        hotel_address: e.target["hotel-address"].value,
      };

      const response = await fetch("http://localhost:3000/employees", {
        method: "GET",
      });

      if (response.ok) {
        const existingEmployees = await response.json();
        const existingEmployee = existingEmployees.find(
            (employee) => employee.employee_sin ===formData.sin
        );
        if (existingEmployee) {
        const updateResponse = await fetch(
            `http://localhost:3000/update-employee/${formData.id}`,
            {
             method: "PUT",
             headers: {
             "Content-Type": "application/json",
             },
             body: JSON.stringify(formData),
            }
        );
        if (updateResponse.ok) {
            console.log("Employee updated successfully");
            fetchEmployees(); // Refresh customer list
        } else {
            console.error("Failed to update employee");
        }
        } else {
                  // Employee Sin doesn't exist, make POST request to insert
                  const insertResponse = await fetch(
                    "http://localhost:3000/insert-employee",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(formData),
                    }
                  );
        if (insertResponse.ok) {
                    console.log("employee inserted successfully");
                    fetchEmployees(); // Refresh customer list
                  } else {
                    console.error("Failed to insert employee");
                  }
                }
              } else {
                console.error("Failed to fetch existing employees");
              }
            } catch (error) {
              console.error("Error:", error);
            }
          };

      const handleDelete = async (employeeSin) => {
          try {
            const response = await fetch(
              `http://localhost:3000/employees/${employeeSin}`,
              {
                method: "DELETE",
              }
            );

            if (response.ok) {
              console.log("employee deleted successfully");
              // Refresh employee list
              fetchEmployees();
            } else {
              console.error("Failed to delete employee");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
  return (
    <AnimationFadeIn>
      <div>
        <form className="inputForm" onSubmit={handleSubmit} method="post">
          <div className="container">
            <label htmlFor="name">
              <b>Employee Name</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Full Name"
              name="name"
              required
            />

            <label htmlFor="sin">
              <b>SIN Number</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter SIN Number"
              name="sin"
              min={0}
              required
            />

            <label htmlFor="address">
              <b>Address</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Address"
              name="address"
              required
            />

            <label htmlFor="role">
              <b>Role</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Role"
              name="role"
              min={0}
              required
            />

            <label htmlFor="hotel-id">
              <b>Hotel ID</b>
            </label>
            <input
              className="inputBlank"
              type="number"
              placeholder="Enter Hotel ID"
              name="hotel-id"
              min={0}
              required
            />

            <label htmlFor="hotel-address">
              <b>Hotel Address</b>
            </label>
            <input
              className="inputBlank"
              type="text"
              placeholder="Enter Hotel Address"
              name="hotel-address"
              required
            />

            <button type="submit">Insert</button>
          </div>
        </form>

        <div>
          <h2>Employee Information:</h2>
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>SIN Number</th>
                <th>Address</th>
                <th>Role</th>
                <th>Hotel ID</th>
                <th>Hotel Address</th>
                <th className="actionColumn">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_name}</td>
                  <td>{employee.sin}</td>
                  <td>{employee.address}</td>
                  <td>{employee.role}</td>
                  <td>{employee.hotel_id}</td>
                  <td>{employee.hotel_address}</td>
                  <td>
                    <button
                      className="deleteButton"
                      style={{ padding: "10px 20px", fontSize: "16px" }}
                      onClick={() => handleDelete(employee.employee_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AnimationFadeIn>
  );
};

export default EmployeeInput;
