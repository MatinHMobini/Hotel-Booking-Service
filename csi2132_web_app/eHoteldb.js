import knex from "knex";
import creds from "./knexfile.cjs";
import express from "express";
import cors from "cors";

const db = knex(creds);
const app = express();

app.use(express.json());
app.use(cors());

app.post("/hotel", async (req, res) => {
  try {
    const { roomCapacity, price, area, hotelChain, category } = req.body;

    let filteredRooms = db("room")
        .join("hotel", "room.hotel_id", "hotel.hotel_id");

    if (roomCapacity) {
      filteredRooms = filteredRooms.where("room.capacity", "=", roomCapacity);
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

    // Selecting all desired attributes
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});




//filteredRooms.select("*").then(console.log)
//db("hotel_chain").select("*").then(console.log)
