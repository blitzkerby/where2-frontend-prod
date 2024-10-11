import React, { useEffect, useState } from 'react';
import Profile from '../reusable/Profile';
import config from '../../config';
import { LoadingOverlay } from '../reusable/Loading';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useNavigation
import Navbar from '../reusable/Navbar';

const getAuthData = () => {
  const authData = localStorage.getItem('authData');
  if (!authData) {
    throw new Error('No authentication data found');
  }
  try {
    const parsedAuthData = JSON.parse(authData);
    if (!parsedAuthData.token || !parsedAuthData.id) {
      throw new Error('Invalid authentication data structure');
    }
    return {
      token: parsedAuthData.token,
      userId: parsedAuthData.id
    };
  } catch (error) {
    console.error('Error parsing auth data:', error);
    throw new Error('Invalid authentication data');
  }
};

const fetchProfile = async () => {
  try {
    const { token, userId } = getAuthData();
    const res = await fetch(config.profile.getMyProfile(userId), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook at the top level

  useEffect(() => {
    const loadProfile = async () => {
      try {
        let data;
        if (userId) {
          data = await fetchPublicProfile(userId);
        } else {
          data = await fetchProfile();
        }
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadProfile();
  }, [userId]);

  // If there's an error (like JWT expired), navigate to login
  if (error) {
    console.error('Redirecting due to error:', error);
    navigate("/login");
    return null; // Ensure the component doesn't try to render anything else
  }

  // Show loading spinner if user data is not yet available
  if (!userData) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Navbar />
      <div className='w-full h-full mt-[70px]'>
        <Profile userData={userData} />
      </div>
    </>
  );
};

export default UserProfile;
