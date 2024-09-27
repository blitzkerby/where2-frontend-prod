import React, { useState, createContext } from "react";
import { Menu, Edit2 } from "lucide-react";
import React, { useState, createContext } from "react";
import { Menu, Edit2, BusFront , Pen , Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import { useEffect } from "react";
import ContainerComponent from "./ContainerComponent.js";

const FormInput = ({
  label,
  value,
  placeholder,
  readOnly = false,
  type = "text",
  onChange,
}) => {
  const baseStyles =
    "font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  const variants = {
    primary: "bg-sky-400 text-white hover:bg-sky-300 focus:ring-sky-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    outline:
      "bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-100 focus:ring-gray-500",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
  };

  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const widthStyle = fullWidth
    ? "w-full"
    : width === "auto"
    ? ""
    : `w-[${width}]`;

  const heightStyle = height === "auto" ? "" : `h-[${height}]`;
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${heightStyle}
    ${widthStyle}
    ${disabledClass}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={width !== "auto" && !fullWidth ? { width } : {}}
    >
      {children}
    </button>
  );
};

const ButtonComponent = ({
  children,
  variant = "primary",
  size = "medium",
  width = "auto",
  height = "auto",
  fullWidth = false,
  disabled = false,
  onClick,
  className,
}) => {
  const baseStyles =
    "font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  const variants = {
    primary: "bg-sky-400 text-white hover:bg-sky-300 focus:ring-sky-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    outline:
      "bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-100 focus:ring-gray-500",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
  };

  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const widthStyle = fullWidth
    ? "w-full"
    : width === "auto"
      ? ""
      : `w-[${width}]`;

  const heightStyle = height === "auto" ? "" : `h-[${height}]`;
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${heightStyle}
    ${widthStyle}
    ${disabledClass}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      style={width !== "auto" && !fullWidth ? { width } : {}}
    >
      {children}
    </button>
  );
};


const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold">Delete Confirmation</h2>
        <p className="mt-2">Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold">Delete Confirmation</h2>
        <p className="mt-2">Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const SidebarContentContext = createContext();






const PartTimeJobListing = () => {
  const jobs = [
    {
      id: 1,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
    {
      id: 2,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
    {
      id: 3,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
    {
      id: 4,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
    {
      id: 5,
      title: "Cleaner",
      company: "KFC",
      location: "Wat Phnom",
      salary: "200$",
    },
  ];
  return (
    <ListingComponent
      title="PART-TIME JOBS"
      data={jobs}
      columns={["Title", "Company", "Location", "Salary"]}
      totalItems={jobs.length}
    />
  );
};


const contentComponents = {
  schoolList: UniversityListing,
  account: UserAccount,
  userList: UserListing,
  jobList: PartTimeJobListing,
  accommodationList: AccommodationListing,
};

const Profile = ({ userData }) => {
  const [sidebarContent, setSidebarContent] = useState("account");
  const [sidebarContent, setSidebarContent] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
  const [isMobile, setIsMobile] = useState(false);

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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const ContentComponent = contentComponents[sidebarContent] || (() => null);

  return (
    <div className="flex relative w-full h-full">

    <div className="flex relative w-full h-full">

      <SidebarContentContext.Provider value={setSidebarContent}>
        <Sidebar 
          className={`h-full ${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out`} 
          isOpen={sidebarOpen} 
          onClose={() => isMobile && setSidebarOpen(false)} 
          userRole="user"
        />
      </SidebarContentContext.Provider>
      <div className={`flex-grow h-full w-full absolute ${sidebarOpen && !isMobile ? 'ml-64' : ''} transition-all duration-300 ease-in-out`}>
      {isMobile && !sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-5 z-20 p-2 text-black rounded-md"
        >
          <Menu size={24} />
        </button>
      )}
      <SidebarContentContext.Provider value={setSidebarContent}>
        <Sidebar
          className={`h-full ${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out`}
          isOpen={sidebarOpen}
          onClose={() => isMobile && setSidebarOpen(false)}
          userRole="user"
        />
      </SidebarContentContext.Provider>
      <div className={`flex-grow h-full w-full absolute ${sidebarOpen && !isMobile ? 'ml-64' : ''} transition-all duration-300 ease-in-out`}>
        {isMobile && !sidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 left-5 z-20 p-2 text-black rounded-md"
          >
            <Menu size={24} />
          </button>
        )}
        <ContentComponent userInfo={userData} />
      </div>
    </div>
  );
};

export default Profile;