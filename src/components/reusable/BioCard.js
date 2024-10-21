import React from "react";

const BioCard = ({ children, variant = "left", bioCard, className = "" }) => {
  const baseStyle = `flex items-center justify-center  sm:w-full sm:flex-col m-auto p-6 gap-6`;


  const variants = {
    right: `lg:flex-row-reverse`,
  };

  const componentStyle = `${className} ${baseStyle} ${variants[variant]}`;

  return (
    <div className={componentStyle}>
      <div className="w-[50%] h-[50%] lg:h-full sm:h-auto">
        <img
          src={bioCard.image}
          alt={bioCard.title}
          className="w-full h-full "
        />
      </div>
      <div className="w-full p-4 rounded-md shadow-md sm:w-full lg:w-1/3">
        <h1 className="flex items-center justify-center w-full h-full ">
          {bioCard.title}
        </h1>
        <div>
          <p
            className="flex items-center justify-center w-full h-full "
            dangerouslySetInnerHTML={{
              __html: bioCard.description.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BioCard;