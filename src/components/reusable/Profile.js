import React, { useState, createContext } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import { useEffect } from "react";
import ContainerComponent from "./ContainerComponent.js";
import ListingComponent from "./ListingComponent.js";
import UniversityListing from "../UniversityListing.js";
import AccommodationListing from "../AccommodationListing.js";
import UserListing from "../UsersListing.js";
import PartTimeJobListing from "../PartTimeJobListing.js";
import UserAccount from "../UserAccount.js";
import SearchBar from "./SearchBar.js";
import useAuth from "../../hooks/useAuth";
import { LoadingOverlay } from "./Loading.js";
import { ChevronRight } from "lucide-react";

export const SidebarContentContext = createContext();



const contentComponents = {
  schoolList: UniversityListing,
  account: UserAccount,
  userList: UserListing,
  jobList: PartTimeJobListing,
  accommodationList: AccommodationListing,
};

const Profile = ({ userData }) => {
  const [sidebarContent, setSidebarContent] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { role, loading } = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth < 980;
      setIsMobile(newIsMobile);
      setSidebarOpen(!newIsMobile);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (loading) {
    return <LoadingOverlay/>
  }

  if (!role) {
    return <div>Error: Could not fetch user role</div>;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const ContentComponent = contentComponents[sidebarContent] || (() => null);

  return (
    <div className="flex relative w-full h-full">

      <SidebarContentContext.Provider value={setSidebarContent}>
        <Sidebar 
          className={`h-full ${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out`} 
          isOpen={sidebarOpen} 
          onClose={() => isMobile && setSidebarOpen(false)} 
          userRole={role}
        />
      </SidebarContentContext.Provider>
      <div className={`flex-grow h-full w-full absolute ${sidebarOpen && !isMobile ? 'ml-64' : ''} transition-all duration-300 ease-in-out`}>
      {isMobile && !sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-5 z-20 p-2 text-black rounded-md"
        >
          <ChevronRight size={24} />
        </button>
      )}
        <ContentComponent userInfo={userData} />
      </div>
    </div>
  );
};

export default Profile;