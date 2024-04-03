import { useState, useEffect } from "react";
import "../css/RoomFilter.css";

const BookingFilter = ({ updateBookings }) => {
  const [startDateFilter, setStartDate] = useState("2024-01-01");
  const [endDateFilter, setEndDate] = useState("2024-12-31");
  const [roomCapacity, setRoomCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [area, setArea] = useState("");
  const [hotelChain, setHotelChain] = useState("");
  const [category, setCategory] = useState(0);

  useEffect(() => {
    updateBookings({
      startDateFilter,
      endDateFilter,
      roomCapacity,
      price,
      area,
      hotelChain,
      category,
    });
  }, [
    startDateFilter,
    endDateFilter,
    roomCapacity,
    price,
    area,
    hotelChain,
    category,
  ]);

  return (
    <div>
      <label htmlFor="start-date" className="label-text">
        Start Date:
      </label>
      <input
        type="date"
        className="date-filter-text"
        id="start-date"
        value={startDateFilter}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      />
      <label htmlFor="end-date" className="label-text">
        End Date:
      </label>
      <input
        type="date"
        className="date-filter-text"
        id="end-date"
        value={endDateFilter}
        onChange={(e) => setEndDate(e.target.value)}
      />
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
        Area:
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
    </div>
  );
};

export default BookingFilter;
