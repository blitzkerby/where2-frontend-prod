import React from "react";
import CreateDiscussion from "./../components/community/CreateDiscussion";
import Navbar from "./../components/reusable/Navbar";
import Footer from "./../components/reusable/Footer";
import WrapperComponent from "../components/reusable/WrapperComponent";

const CreateDiscussionPage = () => {
  return (
    <>
      <Navbar />
      <WrapperComponent>
        <CreateDiscussion showForm={true}/>
      </WrapperComponent>
      <Footer />
    </>
  );
};

export default CreateDiscussionPage;
