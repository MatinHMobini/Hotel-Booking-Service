import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "../css/Slideshow.css";

const Slideshow = () => {
  const images = [
    "toronto.jpg",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    <Slide
      autoplay={true}
      duration={5000}
      onChange={function noRefCheck() {}}
      onStartChange={function noRefCheck() {}}
    >
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[0]})` }}>
          <span>Hotel Services</span>
        </div>
        <p className="caption">Toronto</p>
      </div>
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[1]})` }}>
          <span>Slide 2</span>
        </div>
        <p className="caption">City Name</p>
      </div>
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[2]})` }}>
          <span>Slide 3</span>
        </div>
        <p className="caption">City Name</p>
      </div>
    </Slide>
  );
};

export default Slideshow;
