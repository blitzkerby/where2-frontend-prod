import React, { useState, createContext } from "react";
import { Menu, Edit2, BusFront , Pen , Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import { useEffect } from "react";
import ContainerComponent from "./ContainerComponent.js";

const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  autoComplete,
  autoCorrect,
  rounded,
  autoCapitalize,
  className = "",
  ...props
}) => {
  return (
    <div className="flex-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        className={`${
          rounded ? "rounded-[19px]" : ""
        } mt-3 block w-full rounded-md border-gray-300 h-[50px] shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className} border-[2px]`}
        {...props}
      />
    </div>
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

const UserAccount = ({ userInfo }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-md border-[1px] mt-[64px] mb-[64px]">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 bg-blue-gray-50 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
            <Edit2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-center mb-8">{userInfo.lastName}</p>

      <div className="space-y-4">
        {userInfo.entity ? (
          <FormInput
            label="Entity"
            value={userInfo.entity}
            disabled
            rounded
            className="p-5"
          />
        ) : (
          ""
        )}

        <div className="flex-col sm:flex-row flex gap-4">
          <FormInput
            label="First Name"
            value={userInfo.firstName}
            placeholder="First Name"
            className="p-5"
            disabled
            rounded
          />
          <FormInput
            label="Last Name"
            value={userInfo.lastName}
            placeholder="Last Name"
            className="p-5"
            disabled
            rounded
          />
        </div>

        {userInfo.location ? (
          <FormInput
            label="Location"
            value={userInfo.location}
            disabled
            rounded
            className="p-5"
          />
        ) : (
          ""
        )}

        <FormInput
          label="Email"
          value={userInfo.email}
          type="email"
          rounded
          disabled
          className="p-5"
        />
        <FormInput
          label="Password"
          value="••••••••••"
          type="password"
          className="p-5"
          disabled
          rounded
        />

        <ButtonComponent className="">Reset password</ButtonComponent>
      </div>
    </div>
  );
};

export const SidebarContentContext = createContext();

const ListingComponent = ({ title, data, columns, totalItems, additionalStats }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleConfirmDelete = () => {
    console.log('Item deleted');
    setShowModal(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-blue-600 font-bold">{title}</h1>
        <div className="flex gap-2">
          <div className="bg-gray-600 text-white p-4 rounded-lg">
            <p className="text-sm">Total {title}</p>
            <p className="text-4xl font-bold">{totalItems}</p>
          </div>
          {additionalStats && additionalStats.map((stat, index) => (
            <div key={index} className="bg-blue-600 text-white p-4 rounded-lg">
              <p className="text-sm">{stat.label}</p>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left">
            {columns.map((column, index) => (
              <th key={index} className="pb-4">{column}</th>
            ))}
            <th className="pb-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              {columns.map((column, index) => (
                <td key={index} className="py-4">{item[column.toLowerCase()]}</td>
              ))}
              <td className="py-4">
                <div className="inline-flex gap-1">
                  <ButtonComponent variant="danger" onClick={handleDeleteClick}>
                    <Trash />
                  </ButtonComponent>
                  <ButtonComponent variant="success">
                    <Pen />
                  </ButtonComponent>
                  <ButtonComponent variant="ghost">View</ButtonComponent>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <nav className="inline-flex rounded-md shadow">
          {/* Pagination buttons */}
          {/* ... (pagination code remains the same) ... */}
        </nav>
      </div>

      <DeleteConfirmationModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

const UniversityListing = () => {
  const universities = [
    {
      id: 1,
      name: "University of Washington",
      status: "Requested",
      email : "admin@gmail.com",
      listedDate: "12/09/2024",
    },
    {
      id: 2,
      name: "University of Cambodia",
      listedDate: "12/09/2024",
      status: "Approved",
    },
    {
      id: 3,
      name: "University of Washington",
      status: "Requested",
      listedDate: "12/09/2024",
      email : "admin@gmail.com"
    },
    {
      id: 4,
      name: "University of Washington",
      status: "Requested",
      listedDate: "12/09/2024",
      email : "admin@gmail.com"
    },
    {
      id: 5,
      name: "University of Washington",
      status: "Requested",
      email : "admin@gmail.com",
      listedDate: "12/09/2024",
    },
    {
      id: 5,
      name: "University of Washington",
      status: "Requested",
      email : "admin@gmail.com",
      listedDate: "12/09/2024",
    },
    {
      id: 5,
      name: "University of Washington",
      status: "Requested",
      email : "admin@gmail.com",
      listedDate: "12/09/2024",
    },
  ];
    return (
      <ListingComponent
        title="UNIVERSITIES"
        data={universities}
        columns={["Name", "ID", "Listed Date", "Status"]}
        totalItems={universities.length}
      />
    );
};

const UserListing = () => {
  const users = [
    {
      id: 1,
      name: "Jay Z",
      role: "user",
      email : "admin@gmail.com"
    },
    {
      id: 2,
      name: "Jay Z",
      role: "Admin",
      email : "admin@gmail.com"
    },
    {
      id: 3,
      name: "Jay Z",
      role: "user",
      email : "admin@gmail.com"
    },
    {
      id: 4,
      name: "Jay Z",
      role: "user",
      email : "admin@gmail.com"
    },
    {
      id: 5,
      name: "Jay Z",
      role: "user",
      email : "admin@gmail.com"
    },
  ];
  return (
    <ListingComponent
      title="USER LISTING"
      data={users}
      columns={["Name", "Email", "Role"]}
      totalItems={users.length}
      additionalStats={[
        { label: "Total Admins", value: users.filter(user => user.role === "Admin").length }
      ]}
    />
  );
};

const PartTimeJobListing = () => {
  const jobs = [
    {
      id: 1,
      title: "Cleaner",
      company : "KFC",
      location : "Wat Phnom",
      salary:"200$",
    },
    {
      id: 2,
      title: "Cleaner",
      company : "KFC",
      location : "Wat Phnom",
      salary:"200$",
    },
    {
      id: 3,
      title: "Cleaner",
      company : "KFC",
      location : "Wat Phnom",
      salary:"200$",
    },
    {
      id: 4,
      title: "Cleaner",
      company : "KFC",
      location : "Wat Phnom",
      salary:"200$",
    },
    {
      id: 5,
      title: "Cleaner",
      company : "KFC",
      location : "Wat Phnom",
      salary:"200$",
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

const AccommodationListing = () => {
  const accommodations = [
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    },
    {
      id: 1,
      name: "Hotel A",
      type: "Hotel",
      location: "Wat Phnom",
      price: "100$",
    }
  ];
  
  return (
    <ListingComponent
      title="ACCOMMODATIONS"
      data={accommodations}
      columns={["Name", "Type", "Location", "Price"]}
      totalItems={accommodations.length}
    />
  );
};


const Profile = ({ userData }) => {
  const [sidebarContent, setSidebarContent] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch(sidebarContent) {
      case "schoolList":
        return <UniversityListing />;
      case "account":
        return <UserAccount userInfo={userData} />;
      case "userList":
        return <UserListing />;
      case "jobList":
        return <PartTimeJobListing />;
      case "accommodationList":
        return <AccommodationListing />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="relative top-4 left-4 z-20 p-2 text-black rounded-md"
        >
          <Menu className="mt-[64px]" size={24} />
        </button>
      )}
      <SidebarContentContext.Provider value={setSidebarContent}>
        <Sidebar className="h-full" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole="developer" />
      </SidebarContentContext.Provider>
      {renderContent()}
    </div>
  );
};

export default Profile;
