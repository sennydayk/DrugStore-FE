import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftarrow from "../../assets/png/leftarrow.png";
import rightarrow from "../../assets/png/rightarrow.png";

interface photosType {
  src: string;
}

const ImageSlider = ({ adphotos }: { adphotos: photosType[] }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <img src={leftarrow} alt="leftarrow" style={{ left: '-25px' }} />,
    nextArrow: <img src={rightarrow} alt="rightarrow" style={{ left: '-25px' }} />,
  };


  return (
    <div className="slider-container">
      <Slider {...settings}>
        {adphotos.map((adphotos, index) => (
          <div key={index} className='slider_background'>
            <img height={'300px'} className="imageslider_img" src={adphotos.src} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
