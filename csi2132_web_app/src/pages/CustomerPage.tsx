import { useState, useEffect } from "react";
import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/CustomerPage.css";
import RoomFilter from "../components/RoomFilter";
import Slideshow from "../components/Slideshow";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const CustomerPage = () => {
    // State to hold the list of rooms
    const [rooms, setRooms] = useState([]);
    // State to hold the list of rooms per area
    const [roomsPerArea, setRoomsPerArea] = useState([]);
    // State to hold the number of rooms in hotel input value
    //const [numberOfRoomsInHotel, setNumberOfRoomsInHotel] = useState("");

    useEffect(() => {
        fetchRoomsPerArea();
    }, []);

    const fetchRoomsPerArea = async () => {
        try {
            const response = await fetch("http://localhost:3000/roomsperarea");
            if (response.ok) {
                const data = await response.json();
                setRoomsPerArea(data);
            } else {
                console.error("Failed to fetch rooms per area");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Function to update the list of rooms based on filters
    const updateRooms = (filters) => {
        // Check if all search criteria are empty
        const allEmpty = Object.values(filters).every(
            (value) => value === "" || value === 0
        );

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
                <b>Rooms Per Area:</b>
            </h1>
            <div>
                {roomsPerArea.map((area) => (
                    <p key={area.central_address}>
                        {area.central_address}: {area.num_rooms}
                    </p>
                ))}
            </div>
            <h1>
                <b>Available Rooms: {rooms.length}</b>
            </h1>
            <div className="filter-container">
                <RoomFilter updateRooms={updateRooms} />
            </div>
            <div>
                <h3>Matching Room IDs:</h3>
                {rooms.length === 0 ? (
                    <p key="no-match">No Matching Room IDs</p>
                ) : (
                    <div>
                        {rooms.map((room) => (
                            <p key={room.room_id}>
                                Room ID: {room.room_id}, Capacity: {room.capacity}, Room Number:{" "}
                                {room.room_number}, Hotel Address: {room.hotel_address}, Price:{" "}
                                {room.price}, Amenities: {room.amenities}, View Type:{" "}
                                {room.view_type}, Can Extend: {room.can_extend ? "Yes" : "No"}
                                <Link aria-current="page" to="/booking" state={room}>
                                    <Button>Book Room</Button>
                                </Link>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </AnimationFadeIn>
    );
};

export default CustomerPage;

