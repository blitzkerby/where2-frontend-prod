import React from "react";
import { Link } from "react-router-dom";
const DefaultCardToptitle= ({card}) =>{
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-[#13188C]">{card.title}</h3>
        <p className="text-sm text-[#255BAB]">{card.description}</p>
      </div>
      <Link to={card.path}>
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-96 object-fill"
        />
      </Link>
    </div>
  );
}
export default DefaultCardToptitle