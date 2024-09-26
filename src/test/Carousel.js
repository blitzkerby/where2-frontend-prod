import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative overflow-hidden">
        <div className="flex animate-infinite-scroll">
            {images.map((image, index) => (
                <div key={index} className="flex-none w-full">
                    <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                </div>
            ))}
            {images.map((image, index) => (
                <div key={index + images.length} className="flex-none w-full">
                    <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    </div>
  );
};

export default Carousel;
