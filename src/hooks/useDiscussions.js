import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./../config";

const useDiscussions = () => {
    const [discussions, setDiscussions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get(config.community.getDiscussions);
        setDiscussions(response.data.data.discussions);
      } catch (error) {
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
    }, []);
  
    return { discussions, isLoading, fetchDiscussions, setDiscussions };
  };

export default useDiscussions