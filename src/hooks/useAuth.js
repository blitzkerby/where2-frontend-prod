import { useState, useEffect, useCallback, useMemo } from "react";
import config from "./../config";

const useAuth = () => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    username: "",
    entity: "",
    role: "",
    showDashboard: false,
    loading: true,
    userId: null,
    token: null,
  });

  const fetchUserDataAndRole = useCallback(async () => {
    setAuthState(prev => ({ ...prev, loading: true }));
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      if (!authData || !authData.token) {
        throw new Error("No valid auth data found");
      }

      const { userName, entity, token, id, role } = authData;

      let userRole = role;
      if (!userRole) {
        const response = await fetch(config.auth.getUserRole, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user role");
        }

        const data = await response.json();
        userRole = data.role;

        localStorage.setItem(
          "authData",
          JSON.stringify({ ...authData, role: userRole })
        );
      }

      setAuthState({
        isLoggedIn: true,
        username: userName || "",
        entity: entity || "",
        role: userRole,
        showDashboard: userRole === "admin" || userRole === "developer",
        loading: false,
        userId: id || null,
        token,
      });
    } catch (error) {
      console.error("Error fetching user data and role:", error);
      clearAuthData();
    }
  }, []);

  useEffect(() => {
    fetchUserDataAndRole();
  }, [fetchUserDataAndRole]);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem("authData");
    setAuthState({
      isLoggedIn: false,
      username: "",
      entity: "",
      role: "",
      showDashboard: false,
      loading: false,
      userId: null,
      token: null,
    });
  }, []);

  const login = useCallback(async (loginData) => {
    try {
      const response = await fetch(config.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const authData = await response.json();
      localStorage.setItem("authData", JSON.stringify(authData));
      await fetchUserDataAndRole();
    } catch (error) {
      console.error("Login error:", error);
      clearAuthData();
      throw error; // Re-throw the error for the component to handle
    }
  }, [fetchUserDataAndRole, clearAuthData]);

  const logout = useCallback(() => {
    clearAuthData();
  }, [clearAuthData]);

  const authActions = useMemo(() => ({
    login,
    logout,
    refreshAuth: fetchUserDataAndRole,
  }), [login, logout, fetchUserDataAndRole]);

  return { ...authState, ...authActions };
};

export default useAuth;
