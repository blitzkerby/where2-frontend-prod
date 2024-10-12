import React from "react";

const Article = ({ image, title, content }) => {
  return (
    <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
        <div className="prose prose-lg max-w-none text-gray-600">{content}</div>
      </div>
    </article>
  );
};

export default Article;
