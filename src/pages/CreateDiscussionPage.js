import React from "react";
import CreateDiscussionComponent from "../components/community/CreateDiscussionComponent";
import Navbar from "./../components/reusable/Navbar";
import Footer from "./../components/reusable/Footer";
import WrapperComponent from "../components/reusable/WrapperComponent";

const CreateDiscussionPage = () => {
  return (
    <div>
      <Navbar />
      <WrapperComponent>
        <CreateDiscussionComponent />
      </WrapperComponent>
      <Footer />
    </div>
  );
};

export default CreateDiscussionPage;
