import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useAuth from "./../../hooks/useAuth";
import { LoadingOverlay } from "./../reusable/Loading";

// THIS IS THE ROUTE THAT IS ACCESSIBLE ONLY TO LOGGED IN USERS; USED MOSTLY FOR PROTECTING EXCLUSIVE PAGE AND COMPONENTS
const LoggedInOnlyRoute = ({ children }) => {
  const { isLoggedIn, loading, refreshAuth } = useAuth();
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isChecking: true,          
    isRefreshing: false,       
    shouldRedirect: false,    
    message: ''            
  });

  useEffect(() => {
    let timeoutId;

    const checkAuth = async () => {
      if (loading) {
        setAuthState(prev => ({
          ...prev,
          isChecking: true,
          message: 'We are checking your login status...'
        }));
        return;
      }

      if (!isLoggedIn) {
        setAuthState(prev => ({
          ...prev,
          isChecking: false,
          isRefreshing: true,
          message: 'We are verifying your login status. Please be patient...'
        }));

        try {
          timeoutId = setTimeout(async () => {
            await refreshAuth();
            
            if (!isLoggedIn) {
              setAuthState(prev => ({
                ...prev,
                isRefreshing: false,
                shouldRedirect: true,
                message: 'You are not logged in. Redirecting to the login page...'
              }));

              // Final redirect timeout
              timeoutId = setTimeout(() => {
                navigate('/login', { replace: true });
              }, 1500);
            }
          }, 1000);
        } catch (error) {
          console.error('Auth refresh failed:', error);
          setAuthState(prev => ({
            ...prev,
            isRefreshing: false,
            shouldRedirect: true,
            message: 'Session verification failed. Redirecting to login...'
          }));
        }
      } else {
        setAuthState({
          isChecking: false,
          isRefreshing: false,
          shouldRedirect: false,
          message: ''
        });
      }
    };

    checkAuth();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, isLoggedIn, refreshAuth, navigate]);

  if (authState.isChecking || authState.isRefreshing || authState.shouldRedirect) {
    return (
      <LoadingOverlay 
        isFullScreen={true} 
        message={authState.message}
      />
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default LoggedInOnlyRoute;