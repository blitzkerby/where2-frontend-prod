import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ButtonComponent from "./../reusable/Button";
import { LoadingOverlay } from "./../reusable/Loading";
import DiscussionCard from "./DiscussionCard";
import WrapperComponent from "./../reusable/WrapperComponent";
import useDiscussions from "./../../hooks/useDiscussions";
import useAuth from "./../../hooks/useAuth";

const DiscussionList = ({ isCreatingDiscussion, toggleDiscussionView }) => {
  const location = useLocation();
  const { discussions, loading, error, setDiscussions } = useDiscussions(location.pathname);
  const { role } = useAuth();

  const isDiscussionsPath = location.pathname === "/discussions";

  const handleDeleteSuccess = async (deletedDiscussionId) => {
    setDiscussions((prevDiscussions) =>
      prevDiscussions.filter((disc) => disc.id !== deletedDiscussionId)
    );
  };

  if (loading) {
    return <LoadingOverlay className="min-h-screen" message="We are fetching posts..." />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-[90%] py-4 mx-auto min-h-full mt-[128px] mb-[64px]">
      <div className="flex justify-between h-full items-center">
        <h2 className="text-xl font-semibold mt-4 sm:hidden">
          {isDiscussionsPath ? "Community Posts" : "Related Posts"}
        </h2>
        {!isCreatingDiscussion && (role === "admin" || role === "developer") && (
          <ButtonComponent
            variant="primary"
            className="mt-2 w-[197px] sm:w-full h-[38px] lg:w-[343px] sm:h-[50px]"
            onClick={toggleDiscussionView} // Toggle the discussion view instead of navigating
          >
            New Post
          </ButtonComponent>
        )}
      </div>
      <WrapperComponent>
        <div className="space-y-8 mt-[64px]">
          {discussions?.map((discussion) => (
            <DiscussionCard
              key={discussion.id}
              discussion={discussion}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ))}
          <span className="font-light tracking-[-0.08em]">
            {discussions.length === 0 ? 'No posts available for this page.' : ''}
          </span>
        </div>
      </WrapperComponent>
    </div>
  );
};

export default DiscussionList;