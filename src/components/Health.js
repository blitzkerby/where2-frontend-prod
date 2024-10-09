import React from 'react';
import HealthArticleCard from './reusable/HealthArticleCard';

const articles = [
    {
      image: "/api/placeholder/400/300",
      title: "Reizmagen: Symptome erkennen und behandeln",
      description: "Schmerzen und Unwohlsein nach dem Essen können Symptome eines Reizmagens sein. Welche Rolle spielen Ernährung und Stress?"
    },
    {
      image: "/api/placeholder/400/300",
      title: "Sport trotz Infekt: So riskieren Zverev und Co. ihre Gesundheit",
      description: "Husten, Schnupfen, Herzprobleme - auch leichte Infekte können für Athleten gefährlich werden. Mediziner warnen Sportler davor, ihre Gesundheit aufs Spiel zu setzen."
    },
    {
      image: "/api/placeholder/400/300",
      title: "Ozempic: Für wen eignet sich die Abnehmspritze?",
      description: "Ozempic wurde als Diabetes-Medikament entwickelt, wird aber auch zum Abnehmen genutzt. Was sollten Sie wissen?"
    },
    {
      image: "/api/placeholder/400/300",
      title: "Reha beantragen: Was sollten Patienten beachten?",
      description: "Eine Reha kann nach Krankheit oder OP den Heilungsprozess unterstützen. Wie Sie die Rehabilitation beantragen."
    }
  ];



const Health = () => {
  return (
    <div className="w-full h-full mt-16 bg-black font-light">
      <div className="lg:w-[750px] sm:w-full mx-auto h-auto lg:h-[341px] sm:h-[242px] flex flex-col justify-center items-center">
        <h1 className="w-full lg:h-[198px] sm:h-[96px] mx-[10px] lg:text-[48px] sm:text-[28px] lg:font-bold sm:font-semibold flex align-center justify-center text-center text-white my-[10px] py-[16px]">
        Mental Health and Health Services and Product Reviews
        </h1>
        <div className='lg:h-[132px] sm:h-[100px] w-full px-4'>
            <p className="text-center text-black h-[72px] my-auto sm:my-[20px] text-white sm:text-[16px]">
            Our mission is to provide exceptional health and wellness services to our community.
            </p>
        </div>
      </div>
      <div className="w-full min-h-screen py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-white text-4xl font-bold text-center mb-12">
              Gesundheit
            </h1>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <HealthArticleCard
                  key={index}
                  image={article.image}
                  title={article.title}
                  description={article.description}
                />
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Health;

