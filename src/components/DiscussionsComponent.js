import React, { useState } from 'react';
import CreateDiscussionComponent from './../components/reusable/CreateDiscussionComponent';
import DiscussionList from './../components/reusable/DiscussionList';
import useAuth from './../hooks/useAuth';

const DiscussionsComponent = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { isLoggedIn, role } = useAuth();
  const allowedRoles = ['admin', 'developer'];

  const handleDiscussionCreated = (newDiscussion) => {
    setShowCreateForm(false);
  };

  return (
    <div className="container mt-[64px] min-h-screen mx-auto py-8">
      {showCreateForm && isLoggedIn && allowedRoles.includes(role) ? (
        <CreateDiscussionComponent 
          onDiscussionCreated={handleDiscussionCreated} 
        />
      ) : (
        <DiscussionList 
          onNewDiscussionClick={() => setShowCreateForm(true)} 
        />
      )}
    </div>
  );
};

export default DiscussionsComponent;