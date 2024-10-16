import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import WrapperComponent from "./../reusable/WrapperComponent";
import ButtonComponent from "./../reusable/Button";

const HealthArticlePage = ({ articles }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) {
    return (
      <WrapperComponent>
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <ButtonComponent
            variant="primary"
            size="medium"
            onClick={() => navigate("/")}
          >
            Back to Articles
          </ButtonComponent>
        </div>
      </WrapperComponent>
    );
  }

  return (
    <WrapperComponent>
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 tracking-tightest">
        <ButtonComponent
          variant="secondary"
          size="small"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          Back to Articles
        </ButtonComponent>

        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        <div className="flex items-center text-sm text-gray-600 mb-8">
          <span>{article.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800">
          {article.content}
        </div>
      </div>
    </WrapperComponent>
  );
};

export default HealthArticlePage;
