import { useState } from "react";
import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/CustomerPage.css";
import BookingFilter from "../components/BookingFilter";

const EmployeePage = () => {
    // State to hold the list of bookings
    const [bookings, setBookings] = useState([]);

    // Function to update the list of bookings based on filters
    const updateBookings = (filters) => {
        // Check if all search criteria are empty
        const allEmpty = Object.values(filters).every(value => value === "" || value === 0);

        // If all criteria are empty, set bookings to an empty array and return
        if (allEmpty) {
            setBookings([]);
            return;
        }

        // Fetch filtered bookings from the server
        fetch("http://localhost:3000/booking", {
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
                    setBookings(data);
                } else {
                    setBookings([]);
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };

    return (
        <AnimationFadeIn>
            <h1><b>Search Bookings</b></h1>
            <BookingFilter updateBookings={updateBookings} />
            <div>
                <h3>Matching Bookings:</h3>
                {bookings.length === 0 ? (
                    <p key="no-match">No Matching Bookings</p>
                ) : (
                    <div>
                        {bookings.map((booking) => (
                            // Display booking details for each matching booking
                            <p key={booking.booking_id}>
                                Booking ID: {booking.booking_id}, Room ID: {booking.room_id},
                                Booking Date: {booking.booking_date}, Hotel Address: {booking.hotel_address},
                                Capacity: {booking.capacity}, Price: {booking.price}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </AnimationFadeIn>
    );
};

export default EmployeePage;
