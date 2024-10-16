import { useState, useEffect } from "react";
import axios from "axios";
import config from "./../config";

export const useFetchPhoto = (userId) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhoto = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        config.photo.fetchProfilePicture(userId) + `?t=${Date.now()}`
      );

      if (response.data.status === "success") {
        // Ensure you're getting the correct URL
        setPhotoUrl(response.data.data.profilePictureUrl);
      } else {
        throw new Error("Failed to fetch profile picture");
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      setError("Failed to load profile picture");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [userId]);

  return { photoUrl, isLoading, error, fetchPhoto };
};

export const useUploadPhoto = (userId) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadPhoto = async (file, folder) => {
    if (!file || !userId || !folder) {
      console.warn("File, userId, or folder is missing");
      return null;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const { data: s3Data } = await axios.post(config.photo.getS3Url, { folder });
      console.log("Received S3 pre-signed URL:", s3Data);

      if (!s3Data || !s3Data.url) {
        throw new Error("Invalid S3 pre-signed URL received");
      }

      await axios.put(s3Data.url, file, {
        headers: {
          "Content-Type": file.type, // Retain the content type for the upload
        },
      });
      console.log("File uploaded to S3 successfully");

      const urlParts = new URL(s3Data.url);
      const imageUrl = `${urlParts.protocol}//${urlParts.host}${urlParts.pathname}`;
      console.log("Constructed Image URL:", imageUrl);

      if (!imageUrl) {
        throw new Error("S3 URL construction failed");
      }

      const response = await axios.post(config.photo.uploadProfilePicture, {
        userId,
        imageUrl,
      });

      console.log("Response from uploadProfilePicture:", response.data);

      if (!response.data || !response.data.profilePictureUrl) {
        throw new Error("Failed to upload profile picture");
      }

      return response.data.profilePictureUrl;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setUploadError(`Failed to upload profile picture: ${error.message}`);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadPhoto, isUploading, uploadError };
};
export const useFetchBatchPhotos = (userIds) => {
  const [photoUrls, setPhotoUrls] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatchPhotos = async () => {
      if (!userIds || userIds.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const uniqueUserIds = [...new Set(userIds)].join(",");
        const response = await axios.get(
          `${config.photo.fetchBatchProfilePictures}?userIds=${uniqueUserIds}`
        );

        if (response.data.status === "success") {
          setPhotoUrls(response.data.data);
        } else {
          throw new Error("Failed to fetch profile pictures");
        }
      } catch (error) {
        console.error("Error fetching batch profile pictures:", error);
        setError("Failed to load profile pictures");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatchPhotos();
  }, [userIds]);

  return { photoUrls, isLoading, error };
};
