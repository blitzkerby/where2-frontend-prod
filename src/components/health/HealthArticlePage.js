import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import { LoadingSpinner } from "../reusable/Loading";
import { useParams, useNavigate } from "react-router-dom";
import WrapperComponent from "./../reusable/WrapperComponent";
import ButtonComponent from "./../reusable/Button";
import HealthNavbar from "./HealthNavbar";
import Footer from "./../reusable/Footer";
import config from "./../../config";

const HealthArticlePage = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(config.health.getHealthArticleById(id));
        if (response.data.status === 'success' && response.data.data) {
          setArticle(response.data.data);
        } else {
          throw new Error('Invalid data format received from the server');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch article. Please try again later.');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <LoadingSpinner className="h-screen" />;
  
  if (error) {
    return (
      <WrapperComponent>
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <ButtonComponent
            variant="primary"
            size="lg"
            onClick={() => navigate("/")}
            className="mt-4"
          >
            Back to Articles
          </ButtonComponent>
        </div>
      </WrapperComponent>
    );
  }

  if (!article) {
    return (
      <WrapperComponent>
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <ButtonComponent
            variant="primary"
            size="lg"
            onClick={() => navigate("/")}
          >
            Back to Articles
          </ButtonComponent>
        </div>
      </WrapperComponent>
    );
  }

  // Improved date handling
  const formattedDate = article.date
    ? format(new Date(article.date), 'MMMM d, yyyy')
    : 'Publication date unavailable';

  return (
    <>
    <HealthNavbar/>
      <div className="max-w-4xl h-screen mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <WrapperComponent>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-80 object-cover rounded-xl mb-8 shadow-lg"
        />
        </WrapperComponent>

        <WrapperComponent>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        </WrapperComponent>

        <WrapperComponent>
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <span className="font-medium">{article.author}</span>
          <span className="mx-2">•</span>
          <span>{formattedDate}</span>
        </div>
        </WrapperComponent>

        <WrapperComponent>
        <div className="prose prose-lg max-w-none text-gray-800">
          {article.content}
        </div>
        </WrapperComponent>
      </div>
      <Footer/>
    </>
  );
};

export default HealthArticlePage;
