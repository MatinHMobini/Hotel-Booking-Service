import knex from "knex";
import creds from "./knexfile.cjs";
import express from "express";
import cors from "cors";

// Create a knex instance using database credentials
const db = knex(creds);
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Route to handle hotel search
app.post("/hotel", async (req, res) => {
  try {
    // Destructure search criteria from request body
    const { roomCapacity, price, area, hotelChain, category } = req.body;

    // Begin building the query
    let filteredRooms = db("room")
        .join("hotel", "room.hotel_id", "hotel.hotel_id");

    // Apply filters based on search criteria
    if (roomCapacity) {
      filteredRooms = filteredRooms.where("room.capacity", ">=", roomCapacity);
    }
    if (price) {
      filteredRooms = filteredRooms.where("room.price", "<=", price);
    }
    if (area) {
      filteredRooms = filteredRooms.where("hotel.address", "=", area);
    }
    if (hotelChain) {
      filteredRooms = filteredRooms
          .join("owns", "room.hotel_id", "owns.hotel_id")
          .join("hotel_chain", "owns.chain_name", "hotel_chain.chain_name")
          .where("hotel_chain.chain_name", "=", hotelChain);
    }
    if (category) {
      filteredRooms = filteredRooms.where("hotel.category", "=", category);
    }

    // Select all desired attributes for the filtered rooms
    filteredRooms = filteredRooms
        .select(
            "room.room_id",
            "room.capacity",
            "room.room_number",
            "room.price",
            "room.amenities",
            "room.view_type",
            "room.can_extend",
            "hotel.address as hotel_address"
        );

    // Execute the query
    const result = await filteredRooms;

    // Respond with the result
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json("No Matching Room IDs");
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});




//filteredRooms.select("*").then(console.log)
//db("hotel_chain").select("*").then(console.log)
