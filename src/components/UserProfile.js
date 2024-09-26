import React, { useEffect, useState } from 'react';
import Profile from './reusable/Profile';
// import Navbar from './reusable/Navbar'
import { useParams, useNavigate } from 'react-router-dom';

const user = {
  entity: "University",
  firstName: "Yun",
  lastName: "Chankrisna",
  location: "Cambodia",
  email: "chankrisnayun@gmail.com",
  password: "password123"
};

const UserProfile = () => {
  const { username } = useParams();
  const [authUsername, setAuthUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      if (!authData || !authData.userName) {
        throw new Error("User not authenticated. Please login!");
      }
      setAuthUsername(authData.userName);
    } catch (e) {
      console.error("Error getting user info:", e.message);
      navigate('/login');
    }
  }, [navigate]);

  if (!authUsername || authUsername !== username) {
    return null; // Optionally, you could return a "User not found" message or a redirect.
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className='w-full h-full'>
        <Profile userData={user} />
        <div className="w-full">
        </div>
      </div>
    </>
  );
};

export default UserProfile;

