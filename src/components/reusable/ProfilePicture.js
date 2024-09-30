import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import User from "./../../assets/svg/user.svg";

const ProfilePicture = ({ userId }) => {
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
  
    useEffect(() => {
      const fetchProfilePicture = async () => {
        try {
          const { data } = await axios.get(config.photo.fetchProfilePicture(userId));
          setProfilePictureUrl(data.profilePictureUrl);
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      };
  
      if (userId) {
        fetchProfilePicture();
      }
    }, [userId]);
  
    return (
      <div className="w-8 h-8 rounded-full overflow-hidden">
        {profilePictureUrl ? (
          <img 
            src={profilePictureUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={User} 
            alt="Default User" 
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  };
  
  export default ProfilePicture;