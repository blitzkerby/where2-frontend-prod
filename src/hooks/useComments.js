import { useQuery } from 'react-query';
import axios from 'axios';
import config from './../config';

const useComments = (discussionId) => {
    const fetchComments = async () => {
      const url = `${config.community.getAllComments(discussionId)}`;
      try {
        const response = await axios.get(url);
        console.log('Fetched comments:', response.data);
        
        // Check if response data structure matches expectations
        if (!response.data || !response.data.data || !response.data.data.comments) {
          throw new Error('Invalid response structure');
        }
        return response.data.data.comments; // Return the comments directly
      } catch (err) {
        console.error('Error fetching comments:', err);
        throw err;
      }
    };
  
    // Use useQuery with the new object-based API
    const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['comments', discussionId], // Key for the query
      queryFn: fetchComments, // Function to fetch comments
      enabled: !!discussionId, // Only run the query if discussionId is defined
    });
  
    return {
      comments: data,
      loading: isLoading,
      error: isError,
      setComments: (newData) => {
        refetch();
      },
      refetch,
    };
  };
  
  export default useComments
