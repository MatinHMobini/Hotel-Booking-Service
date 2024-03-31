import AnimationFadeIn from "../components/AnimationFadeIn";
import "../css/CustomerPage.css";
import RoomFilter from "../components/RoomFilter";
import Slideshow from "../components/Slideshow";

const CustomerPage = () => {
  // Make a GET request to the server to fetch hotel data
    fetch('http://localhost:3000/hotel')
        .then(response => {
            // Check if response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse JSON data
            return response.json();
        })
        .then(data => {
            // Handle JSON data received from the server
            console.log(data); // You can do whatever you want with the data here
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Fetch error:', error);
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
