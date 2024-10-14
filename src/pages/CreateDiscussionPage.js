import React from "react";
import CreateDiscussionComponent from "../components/community/CreateDiscussionComponent";
import Navbar from "./../components/reusable/Navbar";
import Footer from "./../components/reusable/Footer";
import WrapperComponent from "../components/reusable/WrapperComponent";

const CreateDiscussionPage = () => {
  return (
    <>
      <Navbar />
      <WrapperComponent>
        <CreateDiscussionComponent />
      </WrapperComponent>
      <Footer />
    </>
  );
};

export default CreateDiscussionPage;
