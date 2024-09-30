import { useState, useEffect, useCallback } from 'react';
import config from '../config';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [entity, setEntity] = useState("");
  const [role, setRole] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Add this line

  const fetchUserDataAndRole = useCallback(async () => {
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      if (authData) {
        const { userName, entity, token, id } = authData; // Add id here
        
        setUsername(userName || "");
        setEntity(entity || "");
        setIsLoggedIn(true);
        setUserId(id || null); // Add this line

        if (token) {
          const response = await fetch(config.auth.getUserRole, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.ok) {
            const data = await response.json();
            setRole(data.role);
            setShowDashboard(data.role === 'admin' || data.role === 'developer');
          } else {
            setRole("");
            setShowDashboard(false);
          }
        }
      } else {
        setUsername("");
        setEntity("");
        setRole("");
        setIsLoggedIn(false);
        setShowDashboard(false);
        setUserId(null);
      }
    } catch (error) {
      console.error('Error fetching user data and role:', error);
      setIsLoggedIn(false);
      setShowDashboard(false);
      setUserId(null);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDataAndRole();
    const intervalId = setInterval(fetchUserDataAndRole, 600000);
    return () => clearInterval(intervalId);
  }, [fetchUserDataAndRole]);

  return { isLoggedIn, username, entity, role, loading, showDashboard, userId };
};

export default useAuth;

