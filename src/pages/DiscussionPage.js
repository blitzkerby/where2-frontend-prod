import React, { useState } from "react";
import CreateDiscussionComponent from "./../components/community/CreateDiscussionComponent";
import WrapperComponent from "./../components/reusable/WrapperComponent";
import DiscussionsComponent from "./../components/DiscussionsComponent";
import Footer from "./../components/reusable/Footer";
import Navbar from "./../components/reusable/Navbar";

const DiscussionPage = () => {
    const [isCreatingDiscussion, setIsCreatingDiscussion] = useState(false);
  
    const toggleDiscussionView = () => {
      setIsCreatingDiscussion((prev) => !prev);
    };
  
    return (
      <>
        <Navbar />
        <WrapperComponent>
          {isCreatingDiscussion ? (
            <CreateDiscussionComponent />
          ) : (
            <DiscussionsComponent />
          )}
        </WrapperComponent>
        <Footer />
      </>
    );
  };
  
  export default DiscussionPage;