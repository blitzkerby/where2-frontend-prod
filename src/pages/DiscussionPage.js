import React, { useState, useEffect } from "react";
import WrapperComponent from "./../components/reusable/WrapperComponent";
import Footer from "./../components/reusable/Footer";
import Navbar from "./../components/reusable/Navbar";
import CreateDiscussion from "./../components/community/CreateDiscussion";
import DiscussionList from "./../components/community/DiscussionList";
import DiscussionContainer from "./../components/reusable/DiscussionContainer";
import { useLocation, useNavigate } from "react-router-dom";

const DiscussionPage = () => {
  return (
    <>
      <Navbar />
      <WrapperComponent>
        <DiscussionContainer />
      </WrapperComponent>
      <Footer />
    </>
  );
};

export default DiscussionPage;