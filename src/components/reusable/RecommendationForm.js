import React, { useState } from "react";
import axios from "axios";
import config from "../../config";

const DegreeRecommendationForm = () => {
  const [answers, setAnswers] = useState(Array(10).fill(3));
  const [recommendation, setRecommendation] = useState("");

  const questions = [
    "How much do you enjoy mathematics?",
    "How interested are you in technology and computers?",
    "How much do you enjoy reading and analyzing literature?",
    "How interested are you in understanding human behavior and society?",
    "How much do you enjoy conducting scientific experiments?",
    "How interested are you in creating art or design?",
    "How much do you enjoy debating and public speaking?",
    "How interested are you in business and entrepreneurship?",
    "How much do you enjoy learning about living organisms and ecosystems?",
    "How interested are you in understanding how machines and structures work?",
  ];

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(config.analytics.getRecommendation, {
        answers,
      });
      setRecommendation(response.data.recommendedDegree);
    } catch (error) {
      console.error("Error getting recommendation:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Degree Recommendation Quiz</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">{question}</label>
            <input
              type="range"
              min="1"
              max="5"
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="w-full"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Recommendation
        </button>
      </form>
      {recommendation && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Recommended Degree:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default DegreeRecommendationForm;
