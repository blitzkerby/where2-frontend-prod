import React, { useState , useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CardSlider = ({ cards,header }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768); 
      };
      
      handleResize(); 
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };
  
    return (
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="p-5 text-[#367588]"><b>{header}</b></div>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (isMobile ? 100 : 100 / 3)}%)`,
            }}
          >
            {cards.map((card, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 p-2 ${isMobile ? 'w-full' : 'w-1/3'}`}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                  <Link to={card.path}>
                    <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                </div>
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