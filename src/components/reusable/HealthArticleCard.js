const HealthArticleCard = ({ image, title, description }) => (
    <div className="bg-zinc-900 rounded-lg overflow-hidden cursor-pointer group h-[443px] mb-[30.72px]">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-[271px] object-cover" />
      </div>
      <div className="p-4">
        <h2 className="text-white text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );

export default HealthArticleCard;