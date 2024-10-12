import React, { useState } from "react";
import ButtonComponent from "../reusable/Button";
import useAuth from "../../hooks/useAuth";
import ProfilePicture from "../reusable/ProfilePicture";
import ReplyForm from "../reusable/ReplyForm";

const CommentSectionComponent = ({
  discussionId,
  comments,
  onCommentAdded,
}) => {
  const { isLoggedIn } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReplySubmitted = (newComment) => {
    onCommentAdded(newComment);
    setShowReplyForm(false);
    setLoading(false);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>

      {isLoggedIn && !showReplyForm && (
        <ButtonComponent
          variant="ghost"
          className="text-blue-600 hover:text-blue-700"
          onClick={() => setShowReplyForm(true)}
        >
          Add a reply
        </ButtonComponent>
      )}

      {showReplyForm && (
        <ReplyForm
          discussionId={discussionId}
          onReplySubmitted={handleReplySubmitted}
          onCancel={() => setShowReplyForm(false)}
          onError={handleError}
        />
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ProfilePicture userId={comment.user.id} size={6} />
              <span className="text-sm text-gray-600">
                {comment.user.email}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSectionComponent;
