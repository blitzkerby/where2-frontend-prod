import React from 'react';
import HealthArticleCard from './reusable/HealthArticleCard';
import WrapperComponent from './reusable/WrapperComponent';

const articles = [
    {
        id: 1,
      image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-09/apples-mc-220921-e7070f.jpg",
      title: "Reizmagen: Symptome erkennen und behandeln",
      description: "Schmerzen und Unwohlsein nach dem Essen können Symptome eines Reizmagens sein. Welche Rolle spielen Ernährung und Stress?"
    },
    {
        id: 2,
      image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-09/apples-mc-220921-e7070f.jpg",
      title: "Sport trotz Infekt: So riskieren Zverev und Co. ihre Gesundheit",
      description: "Husten, Schnupfen, Herzprobleme - auch leichte Infekte können für Athleten gefährlich werden. Mediziner warnen Sportler davor, ihre Gesundheit aufs Spiel zu setzen."
    },
    {
        id: 3,
      image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-09/apples-mc-220921-e7070f.jpg",
      title: "Ozempic: Für wen eignet sich die Abnehmspritze?",
      description: "Ozempic wurde als Diabetes-Medikament entwickelt, wird aber auch zum Abnehmen genutzt. Was sollten Sie wissen?"
    },
    {
        id:4,
      image: "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2022-09/apples-mc-220921-e7070f.jpg",
      title: "Reha beantragen: Was sollten Patienten beachten?",
      description: "Eine Reha kann nach Krankheit oder OP den Heilungsprozess unterstützen. Wie Sie die Rehabilitation beantragen."
    }
  ];



const Health = () => {
  return (
    <div className="w-full h-full mt-16 bg-slate-950 font-light tracking-[-0.08em]">
        <WrapperComponent  
        >
                  <div className="lg:w-[750px] sm:w-full mx-auto h-auto lg:h-[341px] sm:h-[242px] flex flex-col justify-center items-center">
        <h1 className="lg:w-full sm:w-[90%] lg:h-[198px] sm:h-[128px] mx-[10px] lg:text-[48px] sm:text-[31px] lg:font-bold sm:font-semibold flex align-center justify-center text-center text-white my-[10px] py-[16px]">
            Mental Health and Health Services and Product Reviews
        </h1>
        <div className='lg:h-[132px] sm:h-[100px] w-full px-4'>
            <p className="text-center text-black lg:h-[56px] sm:min-h-fit my-auto sm:my-[20px] text-white sm:text-[16px]">
            Our mission is to provide exceptional health and wellness services to our user, community and nation. We only publish truthworthy articles and publications, translated from realiable well-known research centre and institutions.
            </p>
        </div>
      </div>
        </WrapperComponent>
      <div className="w-full h-full py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-white text-[22px] font-bold text-center lg:mb-12 sm:py-6 underline">
              Health Article
            </h1>
            
            <WrapperComponent>
            <div className="grid lg:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <HealthArticleCard
                id={article.id}
                  key={index}
                  image={article.image}
                  title={article.title}
                  description={article.description}
                />
              ))}
            </div>
            </WrapperComponent>
          </div>
        </div>
    </div>
  );
};

export default Health;

