import React from 'react';
import useAuth from './../hooks/useAuth';

const DashboardComponent = () => {
  const { isLoggedIn, username, showDashboard } = useAuth();

  if (!isLoggedIn) {
    return <p>Please log in to view the dashboard.</p>;
  }

  if (!showDashboard) {
    return <p>You do not have access to the dashboard.</p>;
  }

  return <div>Welcome to the Dashboard, {username}!</div>;
};

export default DashboardComponent;
