import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiscussionCard from './DiscussionCard'
import { useNavigate } from 'react-router-dom';
import config from './../../config';

const UserDiscussions = ({ userId }) => {
    const [userDiscussions, setUserDiscussions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUserDiscussions = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get(config.community.getUserDiscussions(userId));
          if (response.data.status === "success" && Array.isArray(response.data.data.posts)) {
            setUserDiscussions(response.data.data.posts);
          } else {
            throw new Error("Unexpected data structure");
          }
        } catch (error) {
          console.error('Failed to fetch user discussions:', error);
          setError("Failed to load discussions. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUserDiscussions();
    }, [userId]);
  
    if (isLoading) {
      return <div>Loading your discussions...</div>;
    }
  
    if (error) {
      return <div className="text-red-500">{error}</div>;
    }
  
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Discussions</h2>
        {userDiscussions.length === 0 ? (
          <p>You haven't created any discussions yet.</p>
        ) : (
          userDiscussions.map(discussion => (
            <DiscussionCard 
              key={discussion.id} 
              discussion={discussion}
              onDeleteSuccess={(deletedId) => {
                setUserDiscussions(prev => prev.filter(d => d.id !== deletedId));
              }}
            />
          ))
        )}
      </div>
    );
  };
  
  export default UserDiscussions;
  