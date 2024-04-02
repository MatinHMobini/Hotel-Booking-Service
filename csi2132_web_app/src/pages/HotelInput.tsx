import { useState, useEffect } from "react";
import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/InputForm.css";

const HotelInput = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:3000/hotels");
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
      } else {
        console.error("Failed to fetch hotels");
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
        address: e.target.address.value,
        category: e.target.category.value,
        numberOfRooms: parseInt(e.target.numberOfRooms.value),
        emailAddress: e.target.emailAddress.value,
        phoneNumber: e.target.phoneNumber.value,
      };

      const response = await fetch("http://localhost:3000/hotels", {
        method: "GET",
      });

      if (response.ok) {
        const existingHotels = await response.json();
        const existingHotel = existingHotels.find(
          (hotel) => hotel.hotel_id === formData.id
        );

        if (existingHotel) {
          // Hotel ID exists, make PUT request to update
          const updateResponse = await fetch(
            `http://localhost:3000/hotels/${formData.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (updateResponse.ok) {
            console.log("Hotel updated successfully");
            fetchHotels(); // Refresh hotel list
          } else {
            console.error("Failed to update hotel");
          }
        } else {
          // Hotel ID doesn't exist, make POST request to insert
          const insertResponse = await fetch(
            "http://localhost:3000/hotels",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (insertResponse.ok) {
            console.log("Hotel inserted successfully");
            fetchHotels(); // Refresh hotel list
          } else {
            console.error("Failed to insert hotel");
          }
        }
      } else {
        console.error("Failed to fetch existing hotels");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (hotelId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/hotels/${hotelId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Hotel deleted successfully");
        // Refresh hotel list
        fetchHotels();
      } else {
        console.error("Failed to delete hotel");
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
            <div className="form-group">
              <label htmlFor="id">
                <b>Hotel ID</b>
              </label>
              <input
                className="inputBlank"
                type="number"
                placeholder="Enter Hotel ID"
                name="id"
                min={0}
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
              <label htmlFor="category">
                <b>Category</b>
              </label>
              <input
                className="inputBlank"
                type="text"
                placeholder="Enter Category"
                name="category"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="numberOfRooms">
                <b>Number of Rooms</b>
              </label>
              <input
                className="inputBlank"
                type="number"
                placeholder="Enter Number of Rooms"
                name="numberOfRooms"
                min={0}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress">
                <b>Email Address</b>
              </label>
              <input
                className="inputBlank"
                type="email"
                placeholder="Enter Email Address"
                name="emailAddress"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                <b>Phone Number</b>
              </label>
              <input
                className="inputBlank"
                type="tel"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                required
              />
            </div>

            <button type="submit">Insert/Update</button>
          </div>
        </form>
        <div>
          <h2>Hotel Information:</h2>
          <table>
            <thead>
              <tr>
                <th>Hotel ID</th>
                <th>Address</th>
                <th>Category</th>
                <th>Number of Rooms</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th className="actionColumn">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.hotel_id}>
                  <td>{hotel.hotel_id}</td>
                  <td>{hotel.address}</td>
                  <td>{hotel.category}</td>
                  <td>{hotel.number_of_rooms}</td>
                  <td>{hotel.email_address}</td>
                  <td>{hotel.phone_number}</td>
                  <td>
                    <button
                      className="deleteButton"
                      style={{ width: "100px", fontSize: "16px" }}
                      onClick={() => handleDelete(hotel.hotel_id)}
                    >
                      DELETE
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

export default HotelInput;
