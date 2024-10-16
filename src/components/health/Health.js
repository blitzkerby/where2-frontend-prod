import React from "react";
import { Link } from "react-router-dom";
import ArticleList from "./ArticleList";
import ArticlePage from "./ArticlePage";

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

const Health = () => {
  return (
    <>
      <div className="w-full py-[64px] min-h-screen bg-slate-950 font-light tracking-[-0.08em] text-white">
        <ArticleList />
        <Link to="/article/:id" element={<ArticlePage articles={articles} />} />
      </div>
    </>
  );
};

export default Health;
