import { useState } from "react";
import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/CustomerPage.css";
import RoomFilter from "../components/RoomFilter";
import Slideshow from "../components/Slideshow";

const CustomerPage = () => {
    // State to hold the list of rooms
    const [rooms, setRooms] = useState([]);

    // Function to update the list of rooms based on filters
    const updateRooms = (filters) => {
        // Check if all search criteria are empty
        const allEmpty = Object.values(filters).every(value => value === "" || value === 0);

        // If all criteria are empty, set rooms to an empty array and return
        if (allEmpty) {
            setRooms([]);
            return;
        }

        // Fetch filtered rooms from the server
        fetch("http://localhost:3000/hotel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(filters),
        })
            .then((response) => response.json())
            .then((data) => {
                // Check if data is an array
                if (Array.isArray(data)) {
                    setRooms(data);
                } else {
                    setRooms([]);
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };


    return (
        <AnimationFadeIn>
            <Slideshow />
            <h1>
                <b>Available Rooms: {rooms.length}</b>
            </h1>
            <RoomFilter updateRooms={updateRooms} />
            <div>
                <h3>Matching Room IDs:</h3>
                {rooms.length === 0 ? (
                    <p key="no-match">No Matching Room IDs</p>
                ) : (
                    <div>
                        {rooms.map((room) => (
                            // Display room details for each matching room
                            <p key={room.room_id}>
                                Room ID: {room.room_id}, Capacity: {room.capacity},
                                Room Number: {room.room_number}, Hotel Address: {room.hotel_address},
                                Price: {room.price}, Amenities: {room.amenities},
                                View Type: {room.view_type}, Can Extend: {room.can_extend ? "Yes" : "No"}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </AnimationFadeIn>
    );
};

export default CustomerPage;



