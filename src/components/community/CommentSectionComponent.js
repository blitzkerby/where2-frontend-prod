import React, { useState, useEffect, useCallback } from "react";
import ButtonComponent from "../reusable/Button";
import useAuth from "../../hooks/useAuth";
import ProfilePicture from "../reusable/PictureUpload";
import ReplyForm from "../reusable/ReplyForm";
import { Reply } from "lucide-react";
import config from "./../../config";
import axios from "axios";

const CommentSectionComponent = ({ discussionId, comments, onCommentAdded }) => {
  const { isLoggedIn, userId, role, token } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingComments, setDeletingComments] = useState({});
  const [localComments, setLocalComments] = useState(comments);

  const fetchComments = async (discussionId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(config.community.getAllComments(discussionId));
      setLocalComments(response.data.data);
      onCommentAdded(response.data.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Error fetching comments");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleReplySubmitted = useCallback(
    (newComment) => {
      setLocalComments((prevComments) => [newComment, ...prevComments]);
      onCommentAdded((prevComments) => [newComment, ...prevComments]);
      setShowReplyForm(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1000);
      fetchComments(discussionId);
    },
    [onCommentAdded, discussionId]
  );
  

  const handleDelete = useCallback(async (commentId) => {
    try {
      setDeletingComments((prev) => ({ ...prev, [commentId]: true }));
      await axios.delete(config.community.deleteComment(commentId), {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': role,
        },
      });
      setLocalComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1000);
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("Error deleting comment");
      setTimeout(() => setError(""), 1000);
    } finally {
      setDeletingComments((prev) => ({ ...prev, [commentId]: false }));
    }
  }, [token, role]);

  const canDeleteComment = (comment) => {
    return comment.user && (userId === comment.user.id || role === 'developer');
  };

  useEffect(() => {
    fetchComments(discussionId);
  }, [discussionId]);

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);


  return (
    <div className="mt-6 space-y-8">
      <h2 className="text-sm tracking-tighter">Comments ({localComments.length})</h2>
      {isLoggedIn && !showReplyForm && (
        <div className="w-full flex justify-end">
          <ButtonComponent
            variant="ghost"
            className="hover:visible text-sm text-gray-500 text-opacity-70 flex"
            onClick={() => setShowReplyForm(true)}
          >
            <Reply className="mt-1" size={18}/>
            <span className="mt-1 ml-1">reply</span>
          </ButtonComponent>
        </div>
      )}

      {showReplyForm && (
        <ReplyForm
          discussionId={discussionId}
          onReplySubmitted={handleReplySubmitted}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {isSuccess && <div className="text-green-500 text-sm">Reply deletion was successful!</div>}
      {isLoading && <div className="text-gray-500 text-sm">Loading comments...</div>}

      <div className="space-y-4 pl-8">
        {localComments
          .filter((comment) => comment && comment.user)
          .map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg relative">
              <div className="flex items-center gap-2 mb-2">
                <ProfilePicture userId={comment.user.id} size={6} />
                <span className="text-sm text-gray-600 truncate max-w-[200px]">
                  {comment.user.profile?.entity || comment.user.profile?.userName}
                </span>
              </div>
              {canDeleteComment(comment) && (
                <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
                  <ButtonComponent
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(comment.id)}
                    disabled={deletingComments[comment.id]}
                  >
                    {deletingComments[comment.id] ? 'Deleting...' : 'Delete'}
                  </ButtonComponent>
                </div>
              )}
              <div className="text-gray-700 whitespace-pre-wrap break-all w-full">
                {comment.content.split(' ').map((word, index) => (
                  <React.Fragment key={index}>
                    <span className="break-all w-[90%] h-fit">{word}</span>
                    {index !== comment.content.split(' ').length - 1 && ' '}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentSectionComponent;

