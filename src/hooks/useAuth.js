import { useState, useEffect, useCallback } from 'react';
import config from '../config';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [entity, setEntity] = useState("");
  const [role, setRole] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(true)

  const fetchUserDataAndRole = useCallback(async () => {
    try {
      const authData = JSON.parse(localStorage.getItem('authData'));
      if (authData) {
        const { userName, entity, token } = authData;
        
        setUsername(userName || "");
        setEntity(entity || "");
        setIsLoggedIn(true);

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
      }
    } catch (error) {
      console.error('Error fetching user data and role:', error);
      setIsLoggedIn(false);
      setShowDashboard(false);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDataAndRole();
    const intervalId = setInterval(fetchUserDataAndRole, 600000); // Refresh every 10 mins
    return () => clearInterval(intervalId);
  }, [fetchUserDataAndRole]);

  return { isLoggedIn, username, entity, role, loading, showDashboard };
};

export default useAuth;
