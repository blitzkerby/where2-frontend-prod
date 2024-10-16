import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonComponent from "./../reusable/Button";
import config from "./../../config";
import { LoadingOverlay } from "./../reusable/Loading";
import useAuth from "./../../hooks/useAuth";
import DiscussionCard from "./../reusable/DiscussionCard";
import WrapperComponent from "./../reusable/WrapperComponent";

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showDashboard } = useAuth();
  const navigate = useNavigate();

  const handleDeleteSuccess = async (deletedDiscussionId) => {
    setDiscussions(prevDiscussions => 
      prevDiscussions.filter(disc => disc.id !== deletedDiscussionId)
    );
  }

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get(config.community.getDiscussions);
      setDiscussions(response.data.data.discussions);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();

    const handleDiscussionCreated = () => {
      fetchDiscussions();
    };

    window.addEventListener("discussionCreated", handleDiscussionCreated);

    return () => {
      window.removeEventListener("discussionCreated", handleDiscussionCreated);
    };
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between h-full items-center">
        <h2 className="text-xl sm:hidden">Community Discussions</h2>
        {showDashboard && (
          <ButtonComponent
            variant="primary"
            className="mt-2 w-[197px] sm:w-full h-[38px] lg:w-[343px] sm:h-[50px]"
            onClick={() => navigate("/discussions/create")}
          >
            New Discussion
          </ButtonComponent>
        )}
      </div>

      <WrapperComponent>
        <div className="space-y-8 mt-[64px]">
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} onDeleteSuccess={handleDeleteSuccess}/>
          ))}
        </div>
      </WrapperComponent>
    </div>
  );
};

export default DiscussionList;
