import knex from "knex";
import creds from "./knexfile.cjs";
import express from "express";
import cors from "cors";

const db = knex(creds);
const app = express();

app.use(express.json());
app.use(cors());

// Import required modules and setup the server
app.post("/hotel", async (req, res) => {
  try {
    const { roomCapacity, price, area, hotelChain, category, numberOfRoomsInHotel } = req.body;

    let filteredRooms = db("room")
        .join("hotel as h1", "room.hotel_id", "h1.hotel_id"); // Alias the first hotel table as h1

    if (roomCapacity) {
      filteredRooms = filteredRooms.where("room.capacity", "=", roomCapacity);
    }
    if (price) {
      filteredRooms = filteredRooms.where("room.price", "<=", price);
    }
    if (area) {
      filteredRooms = filteredRooms.where("h1.address", "=", area); // Use the alias h1 for the first hotel table
    }
    if (hotelChain) {
      filteredRooms = filteredRooms
          .join("owns", "room.hotel_id", "owns.hotel_id")
          .join("hotel_chain", "owns.chain_name", "hotel_chain.chain_name")
          .where("hotel_chain.chain_name", "=", hotelChain);
    }
    if (category) {
      filteredRooms = filteredRooms.where("h1.category", "=", category); // Use the alias h1 for the first hotel table
    }
    if (numberOfRoomsInHotel) {
      // Filter rooms based on the number of rooms in the hotel
      filteredRooms = filteredRooms
          .join("hotel as h2", "room.hotel_id", "h2.hotel_id")
          .where("h2.number_of_rooms", "=", numberOfRoomsInHotel);
    }


    filteredRooms = filteredRooms.whereNull("room.booking_id")
        .select(
            "room.room_id",
            "room.capacity",
            "room.room_number",
            "room.price",
            "room.amenities",
            "room.view_type",
            "room.can_extend",
            "h1.address as hotel_address" // Use the alias h1 for the first hotel table
        );

    const result = await filteredRooms;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No Matching Room IDs");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/booking", async (req, res) => {
  try {
    const { roomCapacity, price, area, hotelChain, category } = req.body;

    let filteredBookings = db("room")
        .join("hotel", "room.hotel_id", "hotel.hotel_id")
        .leftJoin("booking", "room.booking_id", "booking.booking_id"); // Left join with booking table

    if (roomCapacity) {
      filteredBookings = filteredBookings.where("room.capacity", "=", roomCapacity);
    }
    if (price) {
      filteredBookings = filteredBookings.where("room.price", "<=", price);
    }
    if (area) {
      filteredBookings = filteredBookings.where("hotel.address", "=", area);
    }
    if (hotelChain) {
      filteredBookings = filteredBookings
          .join("owns", "room.hotel_id", "owns.hotel_id")
          .join("hotel_chain", "owns.chain_name", "hotel_chain.chain_name")
          .where("hotel_chain.chain_name", "=", hotelChain);
    }
    if (category) {
      filteredBookings = filteredBookings.where("hotel.category", "=", category);
    }

    filteredBookings = filteredBookings.whereNotNull("room.booking_id") // Disregard entries where booking_id is null
        .select(
            "room.room_id",
            "room.capacity",
            "room.room_number",
            "room.price",
            "room.amenities",
            "room.view_type",
            "room.can_extend",
            "hotel.address as hotel_address",
            "booking.booking_id" // Include booking_id
        );

    const result = await filteredBookings;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No Matching Booking IDs");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle customer info
app.get("/customers", async (req, res) => {
  try {
    const customers = await db("customer").select("*");
    res.json(customers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/update-customer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, date } = req.body;

    // Update the customer information in the database
    await db("customer")
        .where("customer_id", "=", id)
        .update({
          customer_name: name,
          customer_address: address,
          registration_date: date,
        });

    res.json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/insert-customer", async (req, res) => {
  try {
    const { id, name, address, date } = req.body;

    // Insert the new customer into the database
    await db("customer").insert({
      customer_id: id,
      customer_name: name,
      customer_address: address,
      registration_date: date,
    });

    res.status(201).json({ message: "Customer inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/customers/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Delete the customer from the database
    await db("customer").where("customer_id", customerId).del();

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/roomsperarea", async (req, res) => {
  try {
    const roomsPerArea = await db("roomsperareafixed").select("*");
    res.json(roomsPerArea);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to insert a new employee
app.post("/insert-employee", async (req, res) => {
  try {
    const { sin, name, address, role, hotelid, hoteladdress } = req.body;

    // Insert the new employee into the database
    await db("employee").insert({
      employee_sin: sin,
      employee_name: name,
      employee_address: address,
      e_role: role,
      hotel_id: hotelid,
      hotel_address: hoteladdress
    });

    res.status(201).json({ message: "Employee inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to update an existing employee
app.put("/update-employee/:sin", async (req, res) => {
  try {
    const { sin } = req.params;
    const { name, address, role, hotelid, hoteladdress } = req.body;

    // Update the employee information in the database
    await db("employee")
        .where("employee_sin", "=", sin)
        .update({
          employee_name: name,
          employee_address: address,
          e_role: role,
          hotel_id: hotelid,
          hotel_address: hoteladdress
        });

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete an employee
app.delete("/employees/:sin", async (req, res) => {
  try {
    const sin = req.params.sin;

    // Delete the employee from the database
    await db("employee").where("employee_sin", sin).del();

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await db("employee").select("*");
    res.json(employees);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch all hotels
app.get("/hotels", async (req, res) => {
  try {
    const hotels = await db("hotel").select("*");
    res.json(hotels);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to update a hotel
app.put("/hotels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { address, category, numberOfRooms, emailAddress, phoneNumber } = req.body;

    await db("hotel")
      .where("hotel_id", "=", id)
      .update({
        address,
        category,
        number_of_rooms: numberOfRooms,
        email_address: emailAddress,
        phone_number: phoneNumber
      });

    res.json({ message: "Hotel updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to insert a new hotel
app.post("/hotels", async (req, res) => {
  try {
    const { id, address, category, numberOfRooms, emailAddress, phoneNumber } = req.body;

    await db("hotel").insert({
      hotel_id: id,
      address,
      category,
      number_of_rooms: numberOfRooms,
      email_address: emailAddress,
      phone_number: phoneNumber
    });

    res.status(201).json({ message: "Hotel inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete a hotel
app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const hotelId = req.params.hotelId;

    await db("hotel").where("hotel_id", hotelId).del();

    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle room information
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await db("room").select("*");
    res.json(rooms);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/rooms", async (req, res) => {
  try {
    const { id, capacity, price, amenities, viewType, canExtend } = req.body;

    // Insert the new room into the database
    await db("room").insert({
      room_id: id,
      capacity,
      price,
      amenities,
      view_type: viewType,
      can_extend: canExtend,
    });

    res.status(201).json({ message: "Room inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/rooms/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;

    // Delete the room from the database
    await db("room").where("room_id", roomId).del();

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/totalcapacity", async (req, res) => {
  try {// Order by hotel_id in ascending order
    const totalCapacityPerHotel = await db("totalcapacity").orderBy("hotel_id", "asc").select("*");
    res.json(totalCapacityPerHotel);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


//filteredRooms.select("*").then(console.log)
//db("hotel_chain").select("*").then(console.log)
