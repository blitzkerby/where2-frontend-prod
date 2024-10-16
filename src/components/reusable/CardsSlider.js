import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DefaultCard from './DefaultCard';
import DefaultCardToptitle from './DefaultCardTopTiltle';
const CardSlider = ({ cards,cardFeature, header }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef(null);
  const totalCardsFeature = cardFeature.length;
  // We duplicate the card list by appending the first few cards at the end and the last few at the beginning
  const clonedCards = [
    ...cards.slice(-3), // Last 3 cards prepended
    ...cards,
    ...cards.slice(0, 3), // First 3 cards appended
  ];
  const totalCards = clonedCards.length;
  const actualCards = cards.length;

  const isMobile = window.innerWidth < 768;

  // Initial offset, so we start at the first "real" card in the cloned list
  const initialIndex = 3;

  useEffect(() => {
    // Set the initial index to the first "real" card.
    setCurrentIndex(initialIndex);
  }, []);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };


  // Auto slide functionality with setInterval
  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 3000); // 1 second interval for auto slide

    return () => clearInterval(autoSlide); // Cleanup the interval on component unmount
  }, []);

  // Reset the transition to create an infinite loop effect
  useEffect(() => {
    if (currentIndex === totalCards - 3) {
      // If we've reached the end of the cloned list, reset to the first "real" card
      setTimeout(() => {
        setIsTransitioning(false); // Disable animation
        setCurrentIndex(initialIndex); // Reset to the first real card
      }, 300); // Timeout should match the `transition-duration` for smooth effect
    } else if (currentIndex === 0) {
      // If we've reached the start of the cloned list, reset to the last "real" card
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalCards - 6); // Set to the last real card
      }, 300);
    }
  }, [currentIndex, totalCards, initialIndex]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="p-5 text-blue-900 text-[38px] sm:text-[35.8px]">
      {header.map((item, index) => (
        <b key={index}>{item.suggested}</b>
      ))}
      </div>
      <div className="overflow-hidden w-full">
        <div
          ref={containerRef}
          className={`flex transition-transform duration-300 ease-in-out ${
            !isTransitioning && 'transition-none' // Disable transition when resetting
          }`}
          style={{
            transform: `translateX(-${currentIndex * (isMobile ? 100 : 100 / 3)}%)`,
          }}
        >
          {clonedCards.map((card, index) => (
            <div
            key={index}
            className={`flex-shrink-0 p-2 ${isMobile ? "w-full" : "w-1/3"}`}
          >
            <DefaultCard card={card}/>
            </div>
          ))}
          {totalCardsFeature.map((card,index)=>(
            <div
            key={index}
            className={``}
            
            >
              <DefaultCardToptitle card={card}/>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={prevSlide}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CardSlider;
