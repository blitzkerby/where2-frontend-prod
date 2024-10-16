import React, { useState } from "react";
import CreateDiscussionComponent from "./community/CreateDiscussionComponent";
import DiscussionList from "./community/DiscussionList";
import SubpageHeroSection from "./community/SubHeroSectionComponent";
import ButtonComponent from "./reusable/Button";
import UserDiscussions from "./community/UserDiscussion";
import useAuth from "./../hooks/useAuth";

const DiscussionsComponent = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { isLoggedIn, role, userId } = useAuth();
  const allowedRoles = ["admin", "developer"];

  const handleDiscussionCreated = (newDiscussion) => {
    setShowCreateForm(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <SubpageHeroSection />
      <div className="w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
        {showCreateForm && isLoggedIn && allowedRoles.includes(role) ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <CreateDiscussionComponent
              onDiscussionCreated={handleDiscussionCreated}
            />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 h-full">
            <div className="lg:w-[90%] w-full">
              <div className="bg-white shadow-md rounded-lg p-6 min-h-[600px]">
                <DiscussionList
                  onNewDiscussionClick={() => setShowCreateForm(true)}
                />
              </div>
            </div>
            <div className="lg:w-1/3 w-full">
              {isLoggedIn && (
                <div className="bg-white shadow-md rounded-lg p-6 h-full">
                  <UserDiscussions userId={userId} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionsComponent;
