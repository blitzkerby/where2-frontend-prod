import { useState } from "react";
import ButtonComponent from "./Button";
import FormInput from "./InputField";
import config from "./../../config";

const TextSummary = ({ textToSummarize }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!textToSummarize.trim()) {
      setError("No article content to summarize");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(config.chatbot.sendMessage, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToSummarize }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate summary");
      }

      if (data.success && data.summary) {
        setSummary(data.summary);
      } else {
        throw new Error("No summary was generated");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to generate summary. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        Article Summary
      </h2>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <ButtonComponent
        variant="primary"
        size="large"
        fullWidth
        disabled={isLoading}
        onClick={handleSummarize}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            <span>Generating Summary...</span>
          </div>
        ) : (
          "Generate Summary"
        )}
      </ButtonComponent>

      {summary && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-white">Summary</h3>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-300 whitespace-pre-wrap">{summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextSummary;
