import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from "./reusable/InputField";
import useAuth from "../hooks/useAuth";
import { LoadingOverlay } from "./reusable/Loading";
import VisitorTracker from "./reusable/VisitorTracker";
import ProfilePictureUpload from "./reusable/ProfilePhotoUpload";

const UserAccount = ({ userInfo }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, loading } = useAuth();

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!role) {
    navigate("/login");
    return null;
  }

  const formattedDate = new Date(userInfo.createdAt).toLocaleDateString('en-CA');

  return (
    <section className="w-full lg:mx-[32px] lg:h-full sm:min-h-fit bg-white rounded-3xl shadow-md border">
      <div className="lg:w-full lg:pl-[128px] lg:pr-[384px] lg:mx-auto h-full px-4 pb-6 pt-12 sm:px-6 lg:pb-0">
        <div className="flex items-center justify-center mb-6">
          <ProfilePictureUpload userId={userInfo.id} />
        </div>
  
        <p className="text-center mb-6">{userInfo.lastName}</p>

        <FormInput
          label="Bio"
          value={userInfo?.bio}
          placeholder="Tell everyone about yourself..."
          className="p-3 sm:p-4 h-fit"
          rounded
        />
  
        <div className="space-y-4">
          {userInfo.entity && (
            <FormInput
              label="Entity"
              value={userInfo.entity}
              disabled
              rounded
              className="p-3 sm:p-4"
            />
          )}

          <div className="flex flex-col lg:flex-row gap-4">
            <FormInput
              label="First Name"
              value={userInfo.firstName}
              placeholder="First Name"
              className="p-3 sm:p-4"
              disabled
              rounded
            />
            <FormInput
              label="Last Name"
              value={userInfo.lastName}
              placeholder="Last Name"
              className="p-3 sm:p-4"
              disabled
              rounded
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <FormInput
              label="Email"
              value={userInfo.email}
              type="email"
              rounded
              disabled
              className="p-3 sm:p-4"
            />  
            <FormInput
              label="Phone Number"
              value={userInfo.phoneNumber}
              type="tel"
              rounded
              disabled
              className="p-3 sm:p-4"
            />  
          </div>
  
          <FormInput
            label="Location"
            placeholder="Enter Location"
            value={userInfo.location}
            disabled
            rounded
            className="p-3 sm:p-4"
          />

          <FormInput
            label="Account Creation Date"
            value={formattedDate}
            disabled
            rounded
            className="p-3 sm:p-4"
          />

          <FormInput
            label="Account Status"
            value={userInfo.isActive ? "Active" : "Not Active"}
            disabled
            rounded
            className="p-3 sm:p-4"
          />
        </div>
        <VisitorTracker path={location.pathname}/>
      </div>
    </section>
  );
};

export default UserAccount;