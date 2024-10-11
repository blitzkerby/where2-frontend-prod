import React, { useState, createContext } from "react";
import Sidebar from "../accountUtilities/Sidebar.js";
import { useEffect } from "react";
import UniversityListing from "../accountUtilities/sidebarComponents/Developer/UniversityListing.js";
import AccommodationListing from "../accountUtilities/sidebarComponents/Developer/AccommodationListing.js";
import UserListing from "../accountUtilities/sidebarComponents/Developer/UsersListing.js";
import PartTimeJobListing from "../accountUtilities/sidebarComponents/Developer/PartTimeJobListing.js";
import UserAccount from "../../pages/UserAccount.js";
import useAuth from "../../hooks/useAuth";
import { LoadingOverlay } from "./Loading.js";
import { ChevronRight } from "lucide-react";
import AdminDashboard from "../accountUtilities/sidebarComponents/Admin/Dashboard.js";
import AdminContent from "../accountUtilities/sidebarComponents/Admin/AdminContent.js";
import Logout from "./Logout.js";

export const SidebarContentContext = createContext();

const contentComponents = {
  schoolList: UniversityListing,
  account: UserAccount,
  userList: UserListing,
  jobList: PartTimeJobListing,
  accommodationList: AccommodationListing,
  adminDashboard: AdminDashboard,
  adminContent: AdminContent,
  logOut: Logout
};

const Profile = ({ userData, isPublic }) => {
  const [sidebarContent, setSidebarContent] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { role, loading } = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth < 980;
      setIsMobile(newIsMobile);
      setSidebarOpen(!newIsMobile); // Sidebar open by default on large screens
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (!role && !isPublic) {
    return <div>Error: Could not fetch user role</div>;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const ContentComponent = contentComponents[sidebarContent] || (() => null);
console.log('Type sidbarcontent', sidebarContent)
  return (
    <div className="flex h-screen overflow-hidden relative">
      <SidebarContentContext.Provider value={setSidebarContent}>
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out
          ${isMobile ? "absolute" : "relative"} 
          ${sidebarOpen ? "w-64" : "w-0"} 
          ${isMobile ? "top-0 left-0 h-full z-30" : "flex-shrink-0 overflow-y-auto"}`}
        >
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => isMobile && setSidebarOpen(false)}
            userRole={role}
          />
        </div>

        {/* Backdrop for mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </SidebarContentContext.Provider>

      {/* Main Content */}
      <div className={`flex-grow overflow-hidden ${isMobile ? "relative z-10" : ""}`}>
        <div className="h-full overflow-y-auto">
          <div className="p-4">
            {isMobile && !sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="fixed left-4 z-20 p-3 text-black bg-white rounded-full shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            )}
            <ContentComponent userInfo={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
