import { useState, useEffect } from "react";
import "../css/RoomFilter.css";

const RoomFilter = ({ updateRooms }) => {
  // State to hold filter values
  const [roomCapacity, setRoomCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [area, setArea] = useState("");
  const [hotelChain, setHotelChain] = useState("");
  const [category, setCategory] = useState(0);
  const [numberOfRoomsInHotel, setNumberOfRoomsInHotel] = useState(0);

  // Effect to update rooms when filters change
  useEffect(() => {
    updateRooms({
      roomCapacity,
      price,
      area,
      hotelChain,
      category,
      numberOfRoomsInHotel,
    });
  }, [roomCapacity, price, area, hotelChain, category, numberOfRoomsInHotel]);

  // JSX for the filter inputs
  return (
    <div>
      <label htmlFor="room-capacity" className="label-text">
        Room Capacity:
      </label>
      <input
        type="number"
        style={{ width: 40 }}
        id="room-capacity"
        min={0}
        value={roomCapacity}
        onChange={(e) => setRoomCapacity(e.target.valueAsNumber)}
      />
      <label htmlFor="price" className="label-text">
        Max-Price:
      </label>
      <input
        type="number"
        style={{ width: 60 }}
        id="price"
        min={0}
        value={price}
        onChange={(e) => setPrice(e.target.valueAsNumber)}
      />
      <label htmlFor="area" className="label-text">
        Address:
      </label>
      <input
        type="text"
        id="area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <label htmlFor="hotel-chain" className="label-text">
        Hotel Chain:
      </label>
      <input
        type="text"
        id="hotel-chain"
        value={hotelChain}
        onChange={(e) => setHotelChain(e.target.value)}
      />
      <label htmlFor="category" className="label-text">
        Category:
      </label>
      <input
        type="number"
        style={{ width: 40 }}
        id="category"
        min={0}
        max={5}
        value={category}
        onChange={(e) => setCategory(e.target.valueAsNumber)}
      />
      <label htmlFor="number-of-rooms" className="label-text">
        Number of Rooms in Hotel:
      </label>
      <input
        type="number"
        style={{ width: 40 }} // Adjusted width to accommodate the label
        id="number-of-rooms"
        min={0}
        value={numberOfRoomsInHotel}
        onChange={(e) => setNumberOfRoomsInHotel(e.target.valueAsNumber)}
      />
    </div>
  );
};

export default RoomFilter;
