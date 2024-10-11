import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "./../../config";
import { User } from "lucide-react";

const ProfilePicture = ({ userId, big, size = 8, onClick }) => {
  const navigate = useNavigate();
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          config.photo.fetchProfilePicture(userId)
        );
        setProfilePictureUrl(data.profilePictureUrl);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        setError("Failed to load profile picture");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfilePicture();
  }, [userId]);

  if (isLoading) {
    return (
      <div
        className={`w-${size} h-${size} rounded-full bg-gray-200 flex items-center justify-center`}
      >
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`w-${size} h-${size} rounded-full bg-red-100 flex items-center justify-center`}
      >
        <User size={size * 2.5} className="text-red-500" />
      </div>
    );
  }

  return (
    <div
      className={`${
        big ? "w-full h-full object-cover" : `w-${size} h-${size}`
      } rounded-full overflow-hidden  flex items-center justify-center`}
    >
      {profilePictureUrl ? (
        <img
          src={profilePictureUrl}
          alt="Profile"
          className={
            big
              ? "w-24 h-24 rounded-full object-cover"
              : "w-full h-full object-cover"
          }
          onClick={onClick}
        />
      ) : (
        <User size={size * 0.6} className="text-gray-500" />
      )}
    </div>
  );
};

export default ProfilePicture;
