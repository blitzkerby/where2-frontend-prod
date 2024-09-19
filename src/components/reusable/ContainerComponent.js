import React from 'react';

const ContainerComponent = ({ children, title, className = "" }) => {
  return (
    <div className="flex justify-center items-center mt-[64px] w-full">
      <div className={`flex flex-col justify-evenly w-[895px] sm:w-[95vw] min-h-[63vh] sm:h-auto mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border-2 border-black ${className}`}>
        {title && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center text-gray-800">{title}</h2>
            <div className="w-1/4 h-0.5 bg-slate-500 mx-auto mt-4"></div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ContainerComponent;