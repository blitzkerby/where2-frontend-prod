import React from 'react';
import WrapperComponent from './WrapperComponent';

const ContainerComponent = ({ children, title, className = "" }) => {
  return (
    <WrapperComponent>
          <div className="flex justify-center items-center font-poppins mt-[128px] mb-[64px] relative">
      <div className={`flex flex-col justify-evenly w-[895px] sm:w-[356px] min-h-[63vh] sm:h-auto mx-auto mt-10 p-6 bg-white rounded-2xl border-2 sm:border-none shadow-md ${className}`}>
        {title && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-gray-800">{title}</h2>
            <div className="w-1/4 h-0.5 bg-slate-500 mx-auto mt-4"></div>
          </div>
        )}
        {children}
      </div>
    </div>
    </WrapperComponent>
  );
};

export default ContainerComponent;