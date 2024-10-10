import React, { useState } from 'react';
import Button from './ButtonComponent';
import CommentSection from './CommentSectionComponent';

const DiscussionCard = ({ discussion }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [localComments, setLocalComments] = useState(discussion.comments);
  
    const handleCommentAdded = (newComment) => {
      setLocalComments(prevComments => [...prevComments, newComment]);
    };
  
    return (
      <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
        <h3 className="text-xl font-semibold mb-2">{discussion.title}</h3>
        <p className="text-gray-600 mb-4">{discussion.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Posted by {discussion.user.email}</span>
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {localComments.length} comments
          </Button>
        </div>
        
        {isExpanded && (
          <CommentSection
            discussionId={discussion.id}
            comments={localComments}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    );
  };

export default DiscussionCard;