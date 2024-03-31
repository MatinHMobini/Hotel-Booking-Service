import { useState } from "react";
import "../css/RoomFilter.css";
import Dropdown from "./Dropdown";

const RoomFilter = () => {
  const [startDateFilter, setStartDate] = useState("2023-01-01");
  const [endDateFilter, setEndDate] = useState("2023-12-31");
  const [roomCapacity, setRoomCapacity] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [price, setPrice] = useState(0);

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
      <label className="label-text">Area:</label>
      <Dropdown
        dropdownTitles={["All", "Toronto", "City Name 2", "City Name 3"]}
        onClick={(filter) => console.log(filter)}
      />
      <label className="label-text">Hotel Chain:</label>
      <Dropdown
        dropdownTitles={["All", "Hotel Chain 1", "Hotel Chain 2"]}
        onClick={(filter) => console.log(filter)}
      />
      <label className="label-text">Category:</label>
      <Dropdown
        dropdownTitles={[
          "All",
          "\u2B50",
          "\u2B50 \u2B50",
          "\u2B50 \u2B50 \u2B50",
          "\u2B50 \u2B50 \u2B50 \u2B50",
          "\u2B50 \u2B50 \u2B50 \u2B50 \u2B50",
        ]}
        onClick={(filter) => console.log(filter)}
      />
      <label htmlFor="number-of-rooms" className="label-text">
        Number of Rooms:
      </label>
      <input
        type="number"
        style={{ width: 50 }}
        id="number-of-rooms"
        min={0}
        value={numberOfRooms}
        onChange={(e) => setNumberOfRooms(e.target.valueAsNumber)}
      />
      <label htmlFor="price" className="label-text">
        Price:
      </label>
      <input
        type="number"
        style={{ width: 60 }}
        id="price"
        min={0}
        value={price}
        onChange={(e) => setPrice(e.target.valueAsNumber)}
      />
    </div>
  );
};

export default RoomFilter;
