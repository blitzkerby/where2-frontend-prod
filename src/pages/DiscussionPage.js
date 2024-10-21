import React, { useState, useEffect } from "react";
import WrapperComponent from "./../components/reusable/WrapperComponent";
import Footer from "./../components/reusable/Footer";
import Navbar from "./../components/reusable/Navbar";
import CreateDiscussion from "./../components/community/CreateDiscussion";
import DiscussionList from "./../components/community/DiscussionList";
import { useLocation, useNavigate } from "react-router-dom";

const DiscussionPage = () => {
  const location = useLocation();
  const [isCreatingDiscussion, setIsCreatingDiscussion] = useState(false);

  const toggleDiscussionView = () => {
    setIsCreatingDiscussion((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <WrapperComponent>
        {isCreatingDiscussion ? (
          <CreateDiscussion showForm={isCreatingDiscussion} />
        ) : (
          <DiscussionList isCreatingDiscussion={isCreatingDiscussion} toggleDiscussionView={toggleDiscussionView} />
        )}
      </WrapperComponent>
      <Footer />
    </>
  );
};

export default DiscussionPage;