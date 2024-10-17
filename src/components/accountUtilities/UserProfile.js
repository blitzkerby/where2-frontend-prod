import React, { useEffect, useState } from "react";
import Profile from "../reusable/Profile";
import config from "../../config";
import { LoadingOverlay } from "../reusable/Loading";
import Navbar from "../reusable/Navbar";
import Footer from "../reusable/Footer";

const getAuthData = () => {
  const authData = localStorage.getItem("authData");
  if (!authData) {
    throw new Error("No authentication data found");
  }
  try {
    const parsedAuthData = JSON.parse(authData);
    if (!parsedAuthData.token || !parsedAuthData.id) {
      throw new Error("Invalid authentication data structure");
    }
    return {
      token: parsedAuthData.token,
      userId: parsedAuthData.id,
    };
  } catch (error) {
    console.error("Error parsing auth data:", error);
    throw new Error("Invalid authentication data");
  }
};

const fetchProfile = async () => {
  try {
    const { token, userId } = getAuthData();
    console.log(userId);
    const res = await fetch(config.profile.getMyProfile(userId), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadProfile();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Navbar />
      <div className="w-full h-full mt-[70px] lg:mb-[32px] relative">
        <Profile userData={userData} />  
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
