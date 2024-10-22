import { useState, useEffect } from "react";
import axios from "axios";
import config from "./../config";
import useAuth from "./useAuth";


// // THIS FUNCTION IS USED TO FETCH USER PHOTO
// export const useFetchPublicPhoto = (userId) => {
//     const [imageUrl, setImageUrl] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
  
//     const fetchPhoto = async () => {
//       if (!userId) {
//         setIsLoading(false);
//         console.log('sdfihjldflsjkjhkldsjhkldfsjdfhlshjldshjldfs')
//         return;
//       }
  
//       setIsLoading(true);
//       setError(null);
  
//       try {
//         const response = await axios.post(
//           config.photo.fetchPublicPhoto(userId), // Endpoint URL
//           { formType }, // Sending formType in the request body
//           { params: { t: Date.now() } } // Adding query parameters
//         );
  
//         if (response.data.status === "success") {
//           setImageUrl(response.data.data.profilePictureUrl);
//         } else {
//           throw new Error("Failed to fetch profile picture");
//         }
//       } catch (error) {
//         console.error("Error fetching profile picture:", error);
//         setError("Failed to load profile picture");
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       fetchPhoto();
//     }, [userId, formType]); // Include formType in the dependency array
  
//     return { imageUrl, isLoading, error, fetchPhoto };
//   };

// THIS FUNCTION IS USED TO UPLOAD PICTURE

// FRONTEND: Updated useUploadPublicPhoto Hook
export const useUploadPublicPhoto = () => {
    const { userId } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
  
    const uploadPublicPhoto = async (file, folder, formType) => {
      // Input validation
      if (!file || !folder || !formType) {
        const error = new Error("Missing required parameters: file, folder, or formType");
        setUploadError(error.message);
        return null;
      }
  
      if (!userId) {
        const error = new Error("User ID is required");
        setUploadError(error.message);
        return null;
      }
  
      setIsUploading(true);
      setUploadError(null);
  
      try {
        // Step 1: Get S3 pre-signed URL
        const { data: s3Data } = await axios.post(config.photo.getS3Url, { 
          folder,
          contentType: file.type // Pass content type for proper S3 configuration
        });
  
        if (!s3Data?.url) {
          throw new Error("Failed to get valid S3 upload URL");
        }
  
        // Step 2: Upload to S3
        await axios.put(s3Data.url, file, {
          headers: {
            "Content-Type": file.type,
            "Access-Control-Allow-Origin": "*" // Add CORS header if needed
          }
        });
  
        // Step 3: Construct the final image URL
        const urlParts = new URL(s3Data.url);
        const imageUrl = `${urlParts.protocol}//${urlParts.host}${urlParts.pathname}`;
  
        // Step 4: Update backend with the new image URL
        const response = await axios.post(config.photo.uploadPublicPhoto, {
          formType,
          userId,
          imageUrl,
        });
  
        // Check for success response
        if (!response.data?.status === 'success' || !response.data?.imageUrl) {
          throw new Error("Failed to update profile picture in database");
        }
  
        // Return the URL from the backend response
        return response.data.imageUrl;
  
      } catch (error) {
        console.error("Photo upload error:", error);
        setUploadError(error.message || "Failed to upload photo");
        return null;
      } finally {
        setIsUploading(false);
      }
    };
  
    return {
      uploadPublicPhoto,
      isUploading,
      uploadError,
      clearError: () => setUploadError(null)
    };
  };