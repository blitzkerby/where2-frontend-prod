import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../../config';
import { Edit2 } from 'lucide-react';

const ProfilePictureUpload = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    const authDataString = localStorage.getItem('authData');
    if (authDataString) {
      try {
        const authData = JSON.parse(authDataString);
        if (authData && authData.id) {
          setUserId(authData.id);
        } else {
          setError('User ID not found in auth data. Please log in again.');
        }
      } catch (e) {
        console.error('Error parsing authData from localStorage:', e);
        setError('Error retrieving user data. Please log in again.');
      }
    } else {
      setError('Auth data not found. Please log in again.');
    }
  }, []);

  const fetchProfilePicture = useCallback(async () => {
    if (!userId || !shouldFetch) return;

    try {
      const { data } = await axios.get(config.photo.fetchProfilePicture(userId));
      console.log('Fetched profile picture URL:', data.profilePictureUrl);
      setProfilePictureUrl(data.profilePictureUrl);
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      setError('Failed to load profile picture');
    } finally {
      setShouldFetch(false);
    }
  }, [userId, shouldFetch]);

  useEffect(() => {
    fetchProfilePicture();
  }, [fetchProfilePicture]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !userId) return;

    setIsUploading(true);
    setError(null);

    try {
      const { data: s3Data } = await axios.get(config.photo.getS3Url);
      console.log('Received S3 pre-signed URL:', s3Data);
      
      if (!s3Data || !s3Data.url) {
        throw new Error('Invalid S3 pre-signed URL received');
      }

      await axios.put(s3Data.url, selectedFile, {
        headers: {
          'Content-Type': selectedFile.type
        }
      });
      console.log('File uploaded to S3 successfully');

      let imageUrl;
      if (s3Data.bucket && s3Data.key) {
        imageUrl = `https://${s3Data.bucket}.s3.${s3Data.region || 'amazonaws.com'}/${s3Data.key}`;
      } else {
        const urlParts = new URL(s3Data.url);
        imageUrl = `${urlParts.protocol}//${urlParts.host}${urlParts.pathname}`;
      }

      console.log('Constructed Image URL:', imageUrl);
      
      if (!imageUrl || imageUrl.includes('undefined')) {
        throw new Error('Invalid image URL constructed');
      }

      const response = await axios.post(config.photo.uploadProfilePicture, { 
        userId, 
        imageUrl 
      });

      console.log('Response from uploadProfilePicture:', response.data);

      if (!response.data || !response.data.profilePictureUrl || response.data.profilePictureUrl.includes('undefined')) {
        throw new Error('Invalid response from uploadProfilePicture');
      }

      setProfilePictureUrl(response.data.profilePictureUrl);
      console.log('Profile picture updated successfully');
      setShouldFetch(true);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setError(`Failed to upload profile picture: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!userId) {
    return <div className="text-red-500">{error || 'User ID not found. Please log in again.'}</div>;
  }

  return (
    <div className="relative">
      <img 
        src={profilePictureUrl || '/default-profile.jpg'} 
        alt="Profile" 
        className="w-24 h-24 rounded-full object-cover"
        onError={(e) => {
          console.error('Error loading image:', e.target.src);
          e.target.src = '/default-profile.jpg';
        }}
      />
      <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
        <Edit2 size={16} />
      </label>
      <input 
        id="profile-upload"
        type="file" 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden"
      />
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <div className="loader"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-x-0 -bottom-6 text-red-500 text-xs text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;