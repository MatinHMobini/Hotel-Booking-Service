import { useState, useEffect } from "react";
import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/InputForm.css";

const RoomInput = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:3000/rooms");
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        console.error("Failed to fetch rooms");
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
        capacity: parseInt(e.target.capacity.value),
        price: parseFloat(e.target.price.value),
        amenities: e.target.amenities.value,
        viewType: e.target.viewType.value,
        canExtend: e.target.canExtend.checked,
        hotelId: parseInt(e.target.hotelId.value) // Include hotelId in formData
      };

      const response = await fetch("http://localhost:3000/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Room inserted successfully");
        fetchRooms(); // Refresh room list
      } else {
        console.error("Failed to insert room");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:3000/rooms/${roomId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Room deleted successfully");
        fetchRooms(); // Refresh room list
      } else {
        console.error("Failed to delete room");
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
                  <b>Room ID</b>
                </label>
                <input
                    className="inputBlank"
                    type="number"
                    placeholder="Enter Room ID"
                    name="id"
                    min={0}
                    required
                />
              </div>
              <div className="form-group">
                <label htmlFor="capacity">
                  <b>Capacity</b>
                </label>
                <input
                    className="inputBlank"
                    type="number"
                    placeholder="Enter Capacity"
                    name="capacity"
                    min={0}
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">
                  <b>Price</b>
                </label>
                <input
                    className="inputBlank"
                    type="number"
                    placeholder="Enter Price"
                    name="price"
                    min={0}
                    step="0.01"
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="amenities">
                  <b>Amenities</b>
                </label>
                <input
                    className="inputBlank"
                    type="text"
                    placeholder="Enter Amenities"
                    name="amenities"
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="viewType">
                  <b>View Type</b>
                </label>
                <input
                    className="inputBlank"
                    type="text"
                    placeholder="Enter View Type"
                    name="viewType"
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="canExtend">
                  <b>Can Extend</b>
                </label>
                <input
                    className="inputCheckbox"
                    type="checkbox"
                    name="canExtend"
                />
              </div>

              <div className="form-group">
                <label htmlFor="hotelId">
                  <b>Hotel ID</b>
                </label>
                <input
                    className="inputBlank"
                    type="number"
                    placeholder="Enter Hotel ID"
                    name="hotelId"
                    min={0}
                    required
                />
              </div>

              <button type="submit">Insert/Update</button>
            </div>
          </form>
          <div>
            <h2>Room Information:</h2>
            <table>
              <thead>
              <tr>
                <th>Room ID</th>
                <th>Capacity</th>
                <th>Price</th>
                <th>Amenities</th>
                <th>View Type</th>
                <th>Can Extend</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {rooms.map((room) => (
                  <tr key={room.room_id}>
                    <td>{room.room_id}</td>
                    <td>{room.capacity}</td>
                    <td>{room.price}</td>
                    <td>{room.amenities}</td>
                    <td>{room.view_type}</td>
                    <td>{room.can_extend ? "Yes" : "No"}</td>
                    <td>
                      <button
                          style={{ width: "100px", fontSize: "16px" }}
                          onClick={() => handleDelete(room.room_id)}
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

export default RoomInput;


