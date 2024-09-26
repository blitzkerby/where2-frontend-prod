import ListingComponent from "./reusable/ListingComponent";
import ButtonComponent from "./reusable/Button";
import { Menu, Edit2, BusFront , Pen , Trash } from "lucide-react";
import FormInput from "./reusable/InputField";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "./reusable/Loading";
import DefaultProfile from "../assets/svg/defaultProfile.svg"
  const UserAccount = ({ userInfo }) => {
    const navigate = useNavigate();
    const { role, loading } = useAuth();

    if (loading) {
      return <LoadingOverlay />;
    }

    if (!role) {
      navigate("/login");
      return null;
    }

    return (
      <section className="w-full lg:mx-[32px] lg:h-full sm:min-h-fit bg-white rounded-3xl shadow-md border">
        <div className="lg:w-[80%] lg:pl-[128px] lg:mx-[64px] h-full px-4 pb-6 pt-12 sm:px-6 lg:pb-0">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-gray-50 rounded-full flex items-center justify-center">
                <img src={DefaultProfile} alt="default profile" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                <Edit2 size={16} />
              </button>
            </div>
          </div>
  
          <p className="text-center mb-6">{userInfo.lastName}</p>

          <FormInput
                label="Bio"
                value={userInfo.bio}
                placeholder="Enter your Bio..."
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
              type="number"
              rounded
              disabled
              className="p-3 sm:p-4"
            />  
            </div>
  
            {userInfo.location && (
              <FormInput
                label="Location"
                value={userInfo.location}
                disabled
                rounded
                className="p-3 sm:p-4"
              />
            )}
          </div>
        </div>
      </section>
    );
  };
  
  export default UserAccount;