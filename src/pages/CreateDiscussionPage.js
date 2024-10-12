import React from "react";
import CreateDiscussionComponent from "../components/community/CreateDiscussionComponent";
import Navbar from "./../components/reusable/Navbar";
import Footer from "./../components/reusable/Footer";

const CreateDiscussionPage = () => {
  return (
    <div>
      <Navbar />
      <CreateDiscussionComponent />
      <Footer />
    </div>
  );
};

export default CreateDiscussionPage;
