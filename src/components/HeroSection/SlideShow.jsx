import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; 
import backgroundImage1 from "./assets/back.jpg"; 
import backgroundImage2 from "./assets/background.jpg"; 

const SlideShow = () => {
  const slideImages = [backgroundImage1, backgroundImage2]; 

  return (
    <Slide 
      easing="ease" 
      duration={3000} 
      transitionDuration={500} 
      autoplay={true}
      arrows={true} 
      prevArrow={<div className="arrow arrow-left" />}
      nextArrow={<div className="arrow arrow-right" />} 
    >
      {slideImages.map((image, index) => (
        <div className="each-slide" key={index}>
          <div
            style={{ backgroundImage: `url(${image})`, height: "50vh" }} 
            className="bg-cover bg-no-repeat bg-center flex items-center justify-center"
          >
            <span className="text-white text-2xl"></span>
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default SlideShow;
