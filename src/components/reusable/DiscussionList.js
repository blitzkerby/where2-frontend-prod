import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './ButtonComponent';
import config from './../../config';
import { LoadingOverlay } from './Loading';
import useAuth from './../../hooks/useAuth';

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showDashboard } = useAuth();

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get(config.community.getDiscussions);
      setDiscussions(response.data.data.discussions); 
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }


  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between h-full items-center">
        <h2 className="text-xl sm:hidden">Community Discussions</h2>
        { showDashboard &&          <Button
          variant="primary"
          className="mt-2 w-[197px] sm:w-full h-[38px] sm:w-[343px] sm:h-[50px]"
          onClick={() => {/* Navigate to create discussion */}}
        >
          New Discussion
        </Button>}
      </div>

      <div className="space-y-4">
        {discussions.map(discussion => (
          <div 
            key={discussion.id} 
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{discussion.title}</h3>
            <p className="text-gray-600 mb-4">{discussion.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Posted by {discussion.user.email}</span>
              <span>{discussion.comments.length} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionList;
