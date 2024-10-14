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
  const [token, setToken] = useState(null);

  const fetchUserDataAndRole = useCallback(async () => {
    setLoading(true);
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      if (authData && authData.token) {
        const { userName, entity, token, id, role } = authData;

        setUsername(userName || "");
        setEntity(entity || "");
        setIsLoggedIn(true);
        setUserId(id || null);
        setToken(token);

        if (role) {
          setRole(role);
          setShowDashboard(role === "admin" || role === "developer");
        } else {
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
            throw new Error("Failed to fetch user role");
          }
        }
      } else {
        throw new Error("No valid auth data found");
      }
    } catch (error) {
      console.error("Error fetching user data and role:", error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDataAndRole();
  }, [fetchUserDataAndRole]);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem("authData");
    setIsLoggedIn(false);
    setUsername("");
    setEntity("");
    setRole("");
    setShowDashboard(false);
    setUserId(null);
    setToken(null);
  }, []);

  const login = useCallback(
    async (loginData) => {
      try {
        // Implement your login logic here
        // For example:
        const response = await fetch(config.auth.login, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          const authData = await response.json();
          localStorage.setItem("authData", JSON.stringify(authData));
          await fetchUserDataAndRole();
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        clearAuthData();
      }
    },
    [fetchUserDataAndRole, clearAuthData]
  );

  const logout = useCallback(() => {
    clearAuthData();
  }, [clearAuthData]);

  return {
    isLoggedIn,
    username,
    entity,
    role,
    loading,
    showDashboard,
    userId,
    token,
    login,
    logout,
    refreshAuth: fetchUserDataAndRole,
  };
};

export default useAuth;
