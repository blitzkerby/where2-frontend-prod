import { useState, useEffect, useCallback } from "react";
import config from "./../config";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [entity, setEntity] = useState("");
  const [role, setRole] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const fetchUserDataAndRole = useCallback(async () => {
    setLoading(true);
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      if (authData) {
        const { userName, entity, token, id, role } = authData;

        setUsername(userName || "");
        setEntity(entity || "");
        setIsLoggedIn(true);
        setUserId(id || null);

        if (role) {
          // Use the role from localStorage if available
          setRole(role);
          setShowDashboard(role === "admin" || role === "developer");
        } else if (token) {
          // Fetch role only if not available in localStorage
          const response = await fetch(config.auth.getUserRole, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setRole(data.role);
            setShowDashboard(
              data.role === "admin" || data.role === "developer"
            );

            // Store the role in localStorage for future use
            localStorage.setItem(
              "authData",
              JSON.stringify({ ...authData, role: data.role })
            );
          } else {
            setRole("");
            setShowDashboard(false);
          }
        }
      } else {
        // Clear all auth-related state if no authData in localStorage
        setUsername("");
        setEntity("");
        setRole("");
        setIsLoggedIn(false);
        setShowDashboard(false);
        setUserId(null);
      }
    } catch (error) {
      console.error("Error fetching user data and role:", error);
      setIsLoggedIn(false);
      setShowDashboard(false);
      setUserId(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDataAndRole();
  }, [fetchUserDataAndRole]);

  const login = useCallback(
    async (loginData) => {
      // Implement your login logic here
      // After successful login, call fetchUserDataAndRole
      await fetchUserDataAndRole();
    },
    [fetchUserDataAndRole]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("authData");
    setIsLoggedIn(false);
    setUsername("");
    setEntity("");
    setRole("");
    setShowDashboard(false);
    setUserId(null);
  }, []);

  return {
    isLoggedIn,
    username,
    entity,
    role,
    loading,
    showDashboard,
    userId,
    login,
    logout,
    refreshAuth: fetchUserDataAndRole,
  };
};

export default useAuth;
