import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./../config";

const useDiscussions = (pathname) => {
    const [discussions, setDiscussions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchDiscussions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${config.community.getDiscussions}?pathname=${pathname}`);
        setDiscussions(response.data.data.discussions);
      } catch (error) {
        setError("Failed to fetch discussions");
        console.error("Error fetching discussions:", error);
      } finally {
        setIsLoading(false);
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