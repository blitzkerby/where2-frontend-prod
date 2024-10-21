import React, { useState } from "react";
import CreateDiscussionComponent from "./../components/community/CreateDiscussionComponent";
import WrapperComponent from "./../components/reusable/WrapperComponent";
import Footer from "./../components/reusable/Footer";
import Navbar from "./../components/reusable/Navbar";
import CreateDiscussion from "./../components/community/CreateDiscussionComponent";
import DiscussionList from "./../components/community/DiscussionList";
import SubpageHeroSection from "../components/reusable/SubHeroSectionComponent";

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
            <CreateDiscussion />
          ) : (
            <DiscussionList />
          )}
        </WrapperComponent>
        <Footer />
      </>
    );
  };
  
  export default DiscussionPage;