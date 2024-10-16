import React from "react";
import WrapperComponent from "./../reusable/WrapperComponent";

const Article = ({ image, title, content }) => {
  return (
    <WrapperComponent>
      <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden lg:max-h-[380px]">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 truncate">
            {title}
          </h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            {content}
          </div>
        </div>
      </article>
    </WrapperComponent>
  );
};

export default Article;
