import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/CustomerPage.css";
import RoomFilter from "../components/RoomFilter";
import Slideshow from "../components/Slideshow";

const CustomerPage = () => {
  return (
    <AnimationFadeIn>
      <Slideshow />
      <h1>
        <b>Available Rooms: [INSERT NUMBER OF ROOMS HERE]</b>
      </h1>
      <RoomFilter />
    </AnimationFadeIn>
  );
};

export default CustomerPage;
