import React, { useState } from "react";
import CreateDiscussionComponent from "./community/CreateDiscussionComponent";
import DiscussionList from "./community/DiscussionList";
import SubpageHeroSection from "./community/SubHeroSectionComponent";
import useAuth from "./../hooks/useAuth";

const DiscussionsComponent = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { isLoggedIn, role } = useAuth();
  const allowedRoles = ["admin", "developer"];

  const handleDiscussionCreated = (newDiscussion) => {
    setShowCreateForm(false);
  };

  return (
    <div>
      <SubpageHeroSection />
      <div className="container min-h-screen mx-auto py-8">
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
    </div>
  );
};

export default DiscussionsComponent;
