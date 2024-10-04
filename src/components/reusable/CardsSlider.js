import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CardSlider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
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
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <img src={card} alt={`University Image ${index + 1}`} className="w-full h-64 object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button variant="outline" size="icon" onClick={prevSlide}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextSlide}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const UniversityInfo = ({ name, description, images, links, socialLinks }) => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardSlider cards={images} />
        <CardDescription className="mt-4">{description}</CardDescription>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Relevant Links</h4>
          <ul className="list-disc pl-5">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.url} className="text-blue-600 hover:underline">{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-start space-x-4">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
            {link.icon}
          </a>
        ))}
      </CardFooter>
    </Card>
  );
};