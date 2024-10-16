import { Link } from "react-router-dom";

const DefaultCard = ({ card }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
      <Link to={card.path}>
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
        <p className="text-sm text-gray-600 truncate">{card.description}</p>
      </div>
    </div>
  );
};

export default DefaultCard;

