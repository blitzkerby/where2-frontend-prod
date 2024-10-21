import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ButtonComponent from "./../reusable/Button";
import { LoadingOverlay } from "./../reusable/Loading";
import DiscussionCard from "./DiscussionCard";
import WrapperComponent from "./../reusable/WrapperComponent";
import useDiscussions from "./../../hooks/useDiscussions";
import useAuth from "./../../hooks/useAuth";

const DiscussionList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { discussions, isLoading, setDiscussions } = useDiscussions();
  const { role } = useAuth();

  const isPostCreate = location.pathname === "/discussions/create";

  const handleDeleteSuccess = async (deletedDiscussionId) => {
    setDiscussions((prevDiscussions) =>
      prevDiscussions.filter((disc) => disc.id !== deletedDiscussionId)
    );
  };

  if (isLoading) {
    return <LoadingOverlay className="h-screen"/>;
  }

  return (
    <div className="w-[90%] py-4 mx-auto min-h-full mt-[64px]">
      <div className="flex justify-between h-full items-center">
        <h2 className="text-xl font-semibold mt-4 sm:hidden">Your Posts</h2>
        {!(isPostCreate) && (role === "admin" || role === "developer") && (
          <ButtonComponent
            variant="primary"
            className="mt-2 w-[197px] sm:w-full h-[38px] lg:w-[343px] sm:h-[50px]"
            onClick={() => navigate("/discussions/create")}
          >
            New Post
          </ButtonComponent>
        )}
      </div>
      <WrapperComponent>
        <div className="space-y-8 mt-[64px]">
          {discussions.map((discussion) => (
            <DiscussionCard
              key={discussion.id}
              discussion={discussion}
              onDeleteSuccess={handleDeleteSuccess}
            />
          ))}
        </div>
      </WrapperComponent>
    </div>
  );
};


export default DiscussionList;
