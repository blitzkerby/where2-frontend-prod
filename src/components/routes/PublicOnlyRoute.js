import { useEffect, useState } from "react";
import { LoadingOverlay } from "./../reusable/Loading";
import { useNavigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";

// THIS IS THE ROUTE THAT IS ACCESSIVLE TO NOT LOGGED IN USER
const PublicOnlyRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();
    const navigate = useNavigate();
    const [routeState, setRouteState] = useState({
      isChecking: true,         
      shouldRedirect: false, 
      message: ''
    });
  
    useEffect(() => {
      let timeoutId;
  
      const checkAuthStatus = () => {
        if (loading) {
          setRouteState(prev => ({
            ...prev,
            isChecking: true,
            message: 'We are checking your authentication status...'
          }));
          return;
        }
  
        if (isLoggedIn) {
          setRouteState(prev => ({
            ...prev,
            isChecking: false,
            shouldRedirect: true,
            message: 'You are already logged in. Redirecting to homepage...'
          }));
  
          timeoutId = setTimeout(() => {
            navigate('/', { 
              replace: true,
              state: { 
                from: window.location.pathname,
                message: 'You were redirected because you are already logged in...'
              }
            });
          }, 1500);
        } else {
          setRouteState({
            isChecking: false,
            shouldRedirect: false,
            message: ''
          });
        }
      };
  
      checkAuthStatus();
  
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [loading, isLoggedIn, navigate]);
  
    if (routeState.isChecking || routeState.shouldRedirect) {
      return (
        <LoadingOverlay 
          isFullScreen={true} 
          message={routeState.message}
        />
      );
    }
  
    if (isLoggedIn) {
      return null;
    }
    return children;
  };
  
  export const withPublicOnly = (Component) => {
    return function WithPublicOnlyWrapper(props) {
      return (
        <PublicOnlyRoute>
          <Component {...props} />
        </PublicOnlyRoute>
      );
    };
  };
  
  export default PublicOnlyRoute;