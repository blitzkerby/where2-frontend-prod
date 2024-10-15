import { useParams, useNavigate } from "react-router-dom";
import Article from "./Article";

const ArticlePage = ({ articles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="py-8 px-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Back to Articles
      </button>
      <Article
        image={article.image}
        title={article.title}
        content={article.content}
        author={article.author}
        date={article.date}
      />
    </div>
  );
};

export default ArticlePage;
