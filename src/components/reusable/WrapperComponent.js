import React, { useRef } from "react";
import useOnScreen from "../../hooks/useOnScreen";

const WrapperComponent = ({ children }) => {
    const ref = useRef();
    const isVisible = useOnScreen(ref, '-100px');
  
    return (
      <div
        ref={ref}
        className={`transition-all duration-[450ms] ease-in transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-72'
        }`}
      >
        {children}
      </div>
    );
  };
  
  export default WrapperComponent;
  