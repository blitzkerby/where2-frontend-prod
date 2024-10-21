import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./../config";

const useDiscussions = (pathname) => {
    const [discussions, setDiscussions] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchDiscussions = async () => {
        try {
          setLoading(true);
          let url = config.community.getDiscussions;
          
          // If not on the main discussions page, fetch discussions for the specific pathname
          if (pathname !== '/discussions') {
            url += `?pathname=${encodeURIComponent(pathname)}`;
          }
          
          const response = await axios.get(url);
          setDiscussions(response.data.data.discussions);
        } catch (err) {
          setError('Failed to fetch discussions');
          console.error('Error fetching discussions:', err);
        } finally {
          setLoading(false);
        }
      };
  
    useEffect(() => {
      fetchDiscussions();
      const handleDiscussionCreated = () => {
        fetchDiscussions();
      };
      window.addEventListener("discussionCreated", handleDiscussionCreated);
      return () => {
        window.removeEventListener("discussionCreated", handleDiscussionCreated);
      };
    }, [pathname]);
  
    return { discussions, isLoading, fetchDiscussions, setDiscussions };
  };

export default useDiscussions