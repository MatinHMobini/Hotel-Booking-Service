import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/CustomerPage.css";
import RoomFilter from "../components/RoomFilter";
import Slideshow from "../components/Slideshow";

const CustomerPage = () => {
  // Make a GET request to the server to fetch hotel data
  fetch("/hotel")
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      // Use the fetched data in your UI
      console.log(data); // For example, log the data to the console
      // Now you can manipulate the DOM or update your UI using the fetched data
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch
      console.error("Error fetching hotel data:", error);
    });
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
