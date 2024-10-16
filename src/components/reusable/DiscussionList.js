import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './ButtonComponent';
import config from './../../config';
import { LoadingOverlay } from './Loading';
import useAuth from './../../hooks/useAuth';
import DiscussionCard from './DiscussionCard';
import CreateDiscussionComponent from './CreateDiscussionComponent';
import WrapperComponent from './WrapperComponent';

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showDashboard } = useAuth();
  const navigate = useNavigate();

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

    const handleDiscussionCreated = () => {
      fetchDiscussions();
    }

    window.addEventListener('discussionCreated', handleDiscussionCreated);

    return () => {
      window.removeEventListener('discussionCreated', handleDiscussionCreated);
    };
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between h-full items-center">
        <h2 className="text-xl sm:hidden">Community Discussions</h2>
        {showDashboard && (
          <Button
            variant="primary"
            className="mt-2 w-[197px] sm:w-full h-[38px] lg:w-[343px] sm:h-[50px]"
            onClick={() => navigate('/discussions/create')}
          >
            New Discussion
          </Button>
        )}
      </div>

        <WrapperComponent>
        <div className="space-y-4">
        {discussions.map(discussion => (
          <DiscussionCard 
            key={discussion.id}
            discussion={discussion}
          />
        ))}
      </div>
        </WrapperComponent>
    </div>
  );
};

export default DiscussionList;