import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import { LoadingSpinner } from "./../reusable/Loading";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import VisitTracker from "./../reusable/VisitorTracker";
import WrapperComponent from "./../reusable/WrapperComponent";
import ButtonComponent from "./../reusable/Button";
import HealthNavbar from "./HealthNavbar";
import Footer from "./../reusable/Footer";
import DiscussionContainer from "./../reusable/DiscussionContainer";
import TextSummary from "./../reusable/TextSummary";
import config from "./../../config";

const HealthArticlePage = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const apiUrl = config.health.getHealthArticleById(id);
        const response = await axios.get(apiUrl);

        if (response.data.status === "success" && response.data.data) {
          setArticle(response.data.data.healthArticle);
          console.log("Article set:", response.data.data.healthArticle);
        } else {
          throw new Error("Invalid data format received from the server");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(
          err.message || "Failed to fetch article. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading)
    return (
      <LoadingSpinner
        className="h-screen"
        message="We are creating the health article for you..."
      />
    );

  if (error) {
    navigate("/health");
    return null;
  }

  if (!article) {
    return (
      <WrapperComponent>
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4 text-white">
            Article Not Found
          </h1>
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
    ? format(new Date(article.date), "MMMM d, yyyy")
    : "Publication date unavailable";

    ;

    return (
      <>
        <HealthNavbar />
        <div className="bg-black min-h-screen text-white">
          <div className="lg:w-[90%] sm:w-[99%] mx-auto lg:py-8 sm:py-3 px-4 sm:px-1 lg:px-8 mt-[64px]">
            <div className="lg:flex lg:space-x-8">
              {/* Main Article Content - Left Side */}
              <div className="lg:w-[65%] sm:w-full mb-8 lg:mb-0">
                <WrapperComponent>
                  <div className="bg-gray-900 w-full h-full rounded-xl shadow-lg">
                    <img
                      src={article.image || "default-image-url.jpg"}
                      alt={article.title}
                      className="w-full h-[400px] object-cover lg:rounded-xl sm:rounded-md shadow-lg mb-6"
                    />
                    <h1 className="text-3xl font-extrabold text-white mb-4 leading-tight tracking-tight p-4">
                      {article.title}
                    </h1>
                    <div className="flex items-center text-sm text-gray-400 mb-6 tracking-tighter p-4">
                      <span className="font-medium">{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{formattedDate}</span>
                    </div>
                    <div className="prose prose-lg max-w-none text-gray-300 tracking-tighter text-justify p-4">
                      {article.content}
                    </div>
                  </div>
                </WrapperComponent>
              </div>
    
              {/* Right Side Column - TextSummary and Discussion */}
              <div className="lg:w-[35%] space-y-6">
                <WrapperComponent>
                  <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
                    <TextSummary textToSummarize={article.content} />
                  </div>
                </WrapperComponent>
                
                {/* Discussion Container below TextSummary */}
                <div className="text-black">
                  <WrapperComponent>
                  <DiscussionContainer />
                  </WrapperComponent>
                </div>
              </div>
            </div>
            <VisitTracker path={location.pathname} />
          </div>
        </div>
        <Footer />
      </>
    )};
  
  export default HealthArticlePage
