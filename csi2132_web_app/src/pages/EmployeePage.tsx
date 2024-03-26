import AnimationFadeIn from "../components/AnimationFadeIn";
import RoomFilter from "../components/RoomFilter";

const EmployeePage = () => {
  return (
    <AnimationFadeIn>
      <h1>
        <b>Available Rooms</b>
      </h1>
      <RoomFilter />
    </AnimationFadeIn>
  );
};

export default EmployeePage;
