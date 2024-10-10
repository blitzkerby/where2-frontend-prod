import React, { useState } from 'react';
import CreateDiscussionComponent from './../components/reusable/CreateDiscussionComponent';
import DiscussionList from './../components/reusable/DiscussionList';
import useAuth from './../hooks/useAuth';

const CommunityHeroSection = () => {
  return (
    <div className='w-full bg-black h-[600px] sm:h-[45vh] text-white'>
      <div className='my-[96px] w-full h-full flex'>
        <div>
          <h1>Dive into Anything</h1>
          <p>
            W2COMMUNITY is home to thousands of communities, students, and researchers from all around the world.
            Join us in contributing to the community, whether you're a student, a teacher, or a writer.
          </p>
        </div>
        <div>
          <img src='https://w2community.com/img/hero.png' alt="W2 LOGO"/>
        </div>
      </div>
    </div>
  )
}

const DiscussionsComponent = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { isLoggedIn, role } = useAuth();
  const allowedRoles = ['admin', 'developer'];

  const handleDiscussionCreated = (newDiscussion) => {
    setShowCreateForm(false);
  };

  return (
    <div>
    <CommunityHeroSection/>
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