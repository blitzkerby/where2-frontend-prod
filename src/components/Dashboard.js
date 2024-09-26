import React from 'react';
import useAuth from './../hooks/useAuth';
import { LoadingOverlay } from './reusable/Loading';

const DashboardComponent = () => {
  const { isLoggedIn, username, showDashboard, loading } = useAuth();

  if (!isLoggedIn) {
    return <p>Please log in to view the dashboard.</p>;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!showDashboard) {
    return <p>You do not have access to the dashboard.</p>;
  }

  return <div>Welcome to the Dashboard, {username}!</div>;
};

export default DashboardComponent;
