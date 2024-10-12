import React, { useState } from "react";
import ButtonComponent from "./Button";
import { useNavigate } from "react-router-dom";
import CommentSectionComponent from "../community/CommentSectionComponent";
import ProfilePicture from "./ProfilePicture";
const DiscussionCard = ({ discussion }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localComments, setLocalComments] = useState(discussion.comments);
  const navigate = useNavigate();

  const handleCommentAdded = (newComment) => {
    setLocalComments((prevComments) => [...prevComments, newComment]);
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    navigate(`/user/${discussion.user.id}`);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentSectionClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`p-6 bg-white ${
        isExpanded === true ? "" : "lg:max-h-[144px]"
      }  rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer`}
      onClick={toggleExpand}
    >
      <h3 className="text-xl font-semibold mb-2 truncate">
        {discussion.title}
      </h3>
      <p
        className={`text-gray-600 mb-4 ${
          isExpanded === true ? "" : "truncate text-ellipsis"
        }`}
      >
        {discussion.content}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
          onClick={handleUserClick}
        >
          <span>Posted by </span>
          <ProfilePicture userId={discussion.user.id} size={20} />
          <span>{discussion.user.email}</span>
        </div>
        <span>{localComments.length} comments</span>
      </div>

      {isExpanded && (
        <div onClick={handleCommentSectionClick}>
          <CommentSectionComponent
            discussionId={discussion.id}
            comments={localComments}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      )}
    </div>
  );
};

export default DiscussionCard;
