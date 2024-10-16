import React from "react";
import { Link } from "react-router-dom";
import ArticleList from "./ArticleList";
import ArticlePage from "./ArticlePage";

const Health = () => {
  return (
    <>
      <div className="w-full py-[64px] min-h-screen bg-slate-950 font-light tracking-[-0.08em] text-white">
        <ArticleList />
        <Link to="/article/:id" element={<ArticlePage />} />
      </div>
    </>
  );
};

export default Health;
