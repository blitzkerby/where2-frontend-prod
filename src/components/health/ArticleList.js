import WrapperComponent from "./../reusable/WrapperComponent";
import { useNavigate } from "react-router-dom";
import HealthArticleCard from "./HealthArticleCard";

const articles = [
  {
    id: 1,
    image:
      "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-09/apples-mc-220921-e7070f.jpg",
    title: "Reizmagen: Symptome erkennen und behandeln",
    description:
      "Schmerzen und Unwohlsein nach dem Essen können Symptome eines Reizmagens sein. Welche Rolle spielen Ernährung und Stress?",
  },
  {
    id: 2,
    image:
      "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-09/apples-mc-220921-e7070f.jpg",
    title: "Sport trotz Infekt: So riskieren Zverev und Co. ihre Gesundheit",
    description:
      "Husten, Schnupfen, Herzprobleme - auch leichte Infekte können für Athleten gefährlich werden. Mediziner warnen Sportler davor, ihre Gesundheit aufs Spiel zu setzen.",
  },
  {
    id: 3,
    image:
      "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-09/apples-mc-220921-e7070f.jpg",
    title: "Ozempic: Für wen eignet sich die Abnehmspritze?",
    description:
      "Ozempic wurde als Diabetes-Medikament entwickelt, wird aber auch zum Abnehmen genutzt. Was sollten Sie wissen?",
  },
  {
    id: 4,
    image:
      "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-09/apples-mc-220921-e7070f.jpg",
    title: "Reha beantragen: Was sollten Patienten beachten?",
    description:
      "Eine Reha kann nach Krankheit oder OP den Heilungsprozess unterstützen. Wie Sie die Rehabilitation beantragen.",
  },
];

const ArticleList = () => {
  const navigate = useNavigate();

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <>
      <WrapperComponent>
        <header className="lg:w-[70%] sm:w-[80%] mx-auto py-16 text-center tracking-tightest">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Mental Health and Health Services and Product Reviews
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto text-balance">
            Our mission is to provide exceptional health and wellness services
            to our user, community and nation. We only publish trustworthy
            articles and publications, translated from reliable well-known
            research centers and institutions.
          </p>
        </header>
      </WrapperComponent>
      <div className="max-w-7xl mx-auto">
        <WrapperComponent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-2">
            {articles.map((article) => (
              <HealthArticleCard
                key={article.id}
                id={article.id}
                image={article.image}
                title={article.title}
                description={article.description}
                onClick={handleArticleClick}
              />
            ))}
          </div>
        </WrapperComponent>
      </div>
    </>
  );
};

export default ArticleList;
