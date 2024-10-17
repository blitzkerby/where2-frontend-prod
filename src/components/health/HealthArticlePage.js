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
        const apiUrl = config.health.getHealthArticleById(id);
        const response = await axios.get(apiUrl);

        if (response.data.status === 'success' && response.data.data) {
          setArticle(response.data.data.healthArticle);
          console.log("Article set:", response.data.data.healthArticle);
        } else {
          throw new Error('Invalid data format received from the server');
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err.message || 'Failed to fetch article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <LoadingSpinner className="h-screen" />;

  if (error) {
    navigate('/health')
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

  const formattedDate = article.date
    ? format(new Date(article.date), 'MMMM d, yyyy')
    : 'Publication date unavailable';

  return (
    <>
      <HealthNavbar />
      <div className="max-w-4xl h-screen mx-auto py-8 px-4 sm:px-6 lg:px-8 mt-[64px]">
        <WrapperComponent>
        <img
          src={article.image || 'default-image-url.jpg'}
          alt={article.title}
          className="w-full h-[360px] object-cover rounded-xl mb-8 shadow-lg"
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
      <Footer />
    </>
  );
};

export default HealthArticlePage