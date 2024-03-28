import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "../css/Slideshow.css";

const Slideshow = () => {
  const images = ["toronto.jpg", "vancouver.jpg", "ottawa.jpg"];

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
          <span>Beautiful Locations</span>
        </div>
        <p className="caption">Vancouver</p>
      </div>
      <div className="each-slide-effect">
        <div style={{ backgroundImage: `url(${images[2]})` }}>
          <span>Perfect Vacations</span>
        </div>
        <p className="caption">Ottawa</p>
      </div>
    </Slide>
  );
};

export default Slideshow;
