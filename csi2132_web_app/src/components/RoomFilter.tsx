import { useState } from "react";

const RoomFilter = () => {
  const [startDateFilter, setStartDate] = useState("2023-01-01");
  const [endDateFilter, setEndDate] = useState("2023-12-31");

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
    </div>
  );
};

export default RoomFilter;
