import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ButtonComponent from "./Button";
import useComments from "./../../hooks/useComments";
import useAuth from "./../../hooks/useAuth";
import config from "./../../config";

const ReplyForm = ({ discussionId, onReplySubmitted, onCancel }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { userId, token } = useAuth();
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    setError("");

    const newCommentId = uuidv4();

    try {
      const response = await axios.post(
        config.community.addComment(discussionId, newCommentId),
        {
          content: content.trim(),
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.id) {
        onReplySubmitted(response.data);
        setContent("");
        if (onCancel) {
          onCancel();
        }
        
        // Invalidate the comments query to trigger a refetch
        queryClient.invalidateQueries(["comments", discussionId]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      setError(
        error.response?.data?.message ||
          "Failed to post reply. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 px-2 space-y-4">
      <div className="space-y-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Max length 200 characters"
          className="w-full min-h-[100px] mb-2 border rounded-md p-4"
          disabled={isSubmitting}
          maxLength={200}
        />
        <div className="text-sm text-gray-500 text-right">
          {content.length}/200 characters
        </div>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
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
          {isSubmitting ? "Replying..." : "Reply"}
        </ButtonComponent>
      </div>
    </form>
  );
};

export default ReplyForm;
