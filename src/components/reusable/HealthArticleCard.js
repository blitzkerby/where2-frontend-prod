const HealthArticleCard = ({ image, title, description }) => (
    <div className="bg-zinc-900 rounded-lg overflow-hidden cursor-pointer group">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute bottom-3 right-3 bg-blue-600 p-2 rounded">
          <div className="w-4 h-4 bg-white mask-triangle"></div>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );

export default HealthArticleCard;