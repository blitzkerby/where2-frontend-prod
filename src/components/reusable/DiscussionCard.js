import React, { useState } from "react";
import Button from "./ButtonComponent";
import { useNavigate } from "react-router-dom";
import CommentSectionComponent from "./CommentSectionComponent";
import ProfilePicture from "./ProfilePicture";

const DiscussionCard = ({ discussion }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localComments, setLocalComments] = useState(discussion.comments);
  const navigate = useNavigate();

  const handleCommentAdded = (newComment) => {
    setLocalComments((prevComments) => [...prevComments, newComment]);
  };

  const handleUserClick = () => {
    navigate(`/user/${discussion.user.id}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{discussion.title}</h3>
      <p className="text-gray-600 mb-4">{discussion.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
          <ProfilePicture
            userId={discussion.user.id}
            size={12}
            onClick={handleUserClick}
          />
          <span>Posted by {discussion.user.email}</span>
        </div>
        <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
          {localComments.length} comments
        </Button>
      </div>

      {isExpanded && (
        <CommentSectionComponent
          discussionId={discussion.id}
          comments={localComments}
          onCommentAdded={handleCommentAdded}
        />
      )}
    </div>
  );
};

export default DiscussionCard;
