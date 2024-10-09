import React, { useState } from 'react';
import CreateDiscussion from './../components/reusable/CreateDiscussion';
import DiscussionList from './../components/reusable/DiscussionList';

const DiscussionsComponent = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleDiscussionCreated = (newDiscussion) => {
    setShowCreateForm(false);
  };

  return (
    <div className="container mt-[64px] min-h-screen mx-auto py-8">
      {showCreateForm ? (
        <CreateDiscussion 
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