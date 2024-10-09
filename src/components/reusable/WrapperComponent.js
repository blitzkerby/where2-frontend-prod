import React, { useRef } from "react";
import useOnScreen from "../../hooks/useOnScreen";

const WrapperComponent = ({ children }) => {
    const ref = useRef();
    const isVisible = useOnScreen(ref, '-50px'); // Adjusted rootMargin for earlier trigger
  
    return (
      <div
        ref={ref}
        className={`transition-all duration-700 ease-out transform ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-32'
        }`}
      >
        {children}
      </div>
    );
  };
  
  export default WrapperComponent;
  