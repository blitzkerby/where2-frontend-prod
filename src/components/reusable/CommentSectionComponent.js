import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonComponent from "./Button";
import FormInput from "./InputField";
import useAuth from "./../../hooks/useAuth";
import config from "./../../config";
import { LoadingOverlay } from "./Loading";

const CommentSectionComponent = ({ discussionId, comments, onCommentAdded }) => {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { username, userId } = useAuth();
    const navigate = useNavigate();

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
    
        setIsSubmitting(true);
        try {
          const response = await axios.post(`${config.community.addComment}`, {
            discussionId,
            content: newComment
          });
          
          onCommentAdded(response.data.data.comment);
          setNewComment('');
        } catch (error) {
          console.error('Error posting comment:', error);
        } finally {
          setIsSubmitting(false);
        }
      };

      <div className="mt-4 space-y-4">
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="pl-4 border-l-2 border-gray-200">
            <p className="text-gray-700">{comment.content}</p>
            <div className="text-sm text-gray-500 mt-1">
              <span>{comment.user.email}</span> • 
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
      
      {userId && (
        <form onSubmit={handleSubmitComment} className="mt-4">
          <FormInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full min-h-[100px]"
          />
          <ButtonComponent
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="mt-2"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </ButtonComponent>
        </form>
      )}
    </div>
}

export default CommentSectionComponent;
