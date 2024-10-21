import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommentSectionComponent from "./CommentSectionComponent";
import ProfilePicture from "../reusable/PictureUpload";
import { useFetchBatchPhotos } from "./../../hooks/useFetchPhoto";
import WrapperComponent from "./../reusable/WrapperComponent";
import useIsMobile from "./../../hooks/useIsMobile";
import useAuth from "./../../hooks/useAuth";
import ButtonComponent from "./../reusable/Button";
import config from "./../../config";
import axios from "axios";

const DiscussionCard = ({ discussion, onDeleteSuccess }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localComments, setLocalComments] = useState(discussion.comments || []);
  const { isMobile, isDesktop } = useIsMobile();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // CURRENT USERID
  const { userId, token, role } = useAuth();

  // MEMOIZED USER IDS
  const userIds = useMemo(() => {
    return [
      discussion.user?.id,
      ...(localComments || []).map((comment) => comment?.user?.id),
    ].filter(Boolean);
  }, [discussion.user?.id, localComments]);

  // Fetch batch photos only when userIds change
  const { photoUrls, isLoading, error } = useFetchBatchPhotos(userIds);

  const handleCommentAdded = (newComment) => {
    setLocalComments((prevComments) => [newComment, ...prevComments]);
  };


  const handleUserClick = (userId) => (e) => {
    e.stopPropagation();
    navigate(`/user/${userId}`);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentSectionClick = (e) => {
    e.stopPropagation();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this discussion?')) {
      setIsDeleting(true);
    }
    try {
      await axios.delete(config.community.deleteDiscussion(discussion.id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDeleteSuccess(discussion.id)
      window.location.reload();
    } catch (error) {
      console.error("Error deleting discussion:", error);
      alert("Failed to delete discussion")
    } finally {
      setIsDeleting(false);
    }
  };

  // useEffect(() => {
  //   console.log("Comment updated: ", localComments)
  // }, [localComments])

  const isCurrentUserPost = discussion.user?.id === userId;

  return (
            <div
              className={`lg:p-5 sm:p-1 bg-white hover:scale-100 ${
                isExpanded ? "min-h-fit" : ""
              } rounded-lg shadow hover:shadow-lg cursor-pointer relative`}
              onClick={toggleExpand}
            >
              <h3 className="text-xl font-semibold mb-2 truncate">
                {discussion.title}
              </h3>
              <p
          className={`text-gray-600 mb-4 text-justify ${
            isExpanded
              ? "whitespace-normal" 
              : "overflow-hidden whitespace-nowrap text-ellipsis"
          }`}
        >
          {discussion.content}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500">
        {discussion.user && (
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
          onClick={handleUserClick(discussion.user.id)}
        >
          { isMobile ? <span>By </span> : <span>Posted by </span>}
          <ProfilePicture
            userId={discussion.user.id}
            photoUrl={photoUrls[discussion.user.id]}
            size={20}
          />
          <span>
            {discussion.user?.profile?.entity 
              ? discussion.user.profile.entity 
              : discussion.user?.profile?.userName}
          </span>
        </div>
      )}
          <span>{localComments.length} replies</span>
        </div>
        {isExpanded && (
          <div onClick={handleCommentSectionClick}>
            <CommentSectionComponent
              discussionId={discussion.id}
              comments={localComments}
              onCommentAdded={handleCommentAdded}
              photoUrls={photoUrls}
            />
          </div>
        )}
        {isCurrentUserPost && role === "developer" && (
          <div className="absolute lg:top-4 lg:right-4 sm:top-2 sm:right-2" onClick={(e) => e.stopPropagation()}>
            <ButtonComponent
              variant="danger"
              size="small"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </ButtonComponent>
          </div>
        )}
      </div>
  );
};

export default DiscussionCard;

