import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ButtonComponent from './Button';
import FormInput from './InputField';
import useAuth from '../../hooks/useAuth';
import config from './../../config';

const ReplyForm = ({ discussionId, onReplySubmitted, onCancel }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { userId } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!content.trim()) return; 

    setIsSubmitting(true);
    setError('');

    const newCommentId = uuidv4();

    try {
      console.log('Comment being sent:', content.trim());

      const response = await axios.post(config.community.addComment(discussionId, newCommentId), {
        content: content.trim(),
        userId: userId,
      });
      
      if (response.data.data?.comment) {
        onReplySubmitted(response.data.data.comment);
        setContent('');
        if (onCancel) {
          onCancel(); 
        }
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Error posting reply:', error);
      setError(error.response?.data?.message || 'Failed to post reply. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="space-y-2">
        <FormInput
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your reply..."
          className="w-full min-h-[100px] mb-2"
          disabled={isSubmitting}
          maxLength={200}
        />
        <div className="text-sm text-gray-500 text-right">
          {content.length}/200 characters
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <ButtonComponent
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
          type="button"
        >
          Cancel
        </ButtonComponent>
        <ButtonComponent
          type="submit"
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? 'Posting...' : 'Post Reply'}
        </ButtonComponent>
      </div>
    </form>
  );
};

export default ReplyForm;
