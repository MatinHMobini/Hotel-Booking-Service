import { useState } from "react";
import { useEffect } from "react";
import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/InputForm.css";

const CustomerInput = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3000/customers");
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        console.error("Failed to fetch customers");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        id: parseInt(e.target.id.value),
        name: e.target.name.value,
        address: e.target.address.value,
        date: e.target.date.value,
      };

      const response = await fetch("http://localhost:3000/insert-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Customer inserted successfully");
        // Reset form data
        e.target.reset();
        // Refresh customer list
        fetchCustomers();
      } else {
        console.error("Failed to insert customer");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (customerId) => {
    // Logic for deleting customer
    console.log("Delete customer with ID:", customerId);
  };

  const handleUpdate = async (customerId) => {
    // Logic for updating customer
    console.log("Update customer with ID:", customerId);
  };

  return (
      <AnimationFadeIn>
        <div>
          <form className="inputForm" onSubmit={handleSubmit} method="post">
            <div className="container">
              <div className="form-group">
                <label htmlFor="id">
                  <b>Customer ID</b>
                </label>
                <input
                    className="inputBlank"
                    type="number"
                    placeholder="Enter Customer ID"
                    name="id"
                    min={0}
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">
                  <b>Customer Name</b>
                </label>
                <input
                    className="inputBlank"
                    type="text"
                    placeholder="Enter Full Name"
                    name="name"
                    required
                />
              </div>

              <div className="form-group">
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
              </div>

              <div className="form-group">
                <label htmlFor="date">
                  <b>Date of Registration</b>
                </label>
                <input className="inputBlank" type="date" name="date" required />
              </div>

              <button type="submit">Insert</button>
            </div>
          </form>
          <div>
            <h2>Customer Information:</h2>
            <table>
              <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Date of Registration</th>
                <th className="actionColumn">Actions</th>
              </tr>
              </thead>
              <tbody>
              {customers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_name}</td>
                    <td>{customer.customer_address}</td>
                    <td>{customer.registration_date}</td>
                    <td>
                      <button
                          className="deleteButton"
                          style={{ width: "100px", fontSize: "16px" }}
                          onClick={() => handleDelete(customer.customer_id)}
                      >
                        DELETE
                      </button>
                      <button
                          className="updateButton"
                          style={{ width: "100px", fontSize: "16px" }}
                          onClick={() => handleUpdate(customer.customer_id)}
                      >
                        UPDATE
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

export default CustomerInput;



