import React, { useState, createContext } from "react";
import { Menu, Edit2, BusFront , Pen , Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import { useEffect } from "react";
import ContainerComponent from "./ContainerComponent.js";

// const FormInput = ({
//   label,
//   value,
//   placeholder,
//    = false,
//   type = "text",
//   onChange,
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       <div className="relative">
//         <input
//           type={type === "password" && showPassword ? "text" : type}
//           value={value}
//           placeholder={placeholder}
//           className="p-2 rounded-[20px] border-[1px] border-black w-full lg:max-w-[300px]"
//           ={}
//           onChange={onChange}
//         />
//       </div>
//     </div>
//   );
// };

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

const UniversityListing = () => {
  const universities = [
    {
      id: 1,
      name: "University of Health Science",
      listedDate: "12/08/2024",
      status: "Requested",
    },
    {
      id: 2,
      name: "University of Cambodia",
      listedDate: "12/09/2024",
      status: "Approved",
    },
    {
      id: 3,
      name: "University of Health Science",
      listedDate: "12/08/2024",
      status: "Requested",
    },
    {
      id: 4,
      name: "University of Health Science",
      listedDate: "12/08/2024",
      status: "Requested",
    },
    {
      id: 5,
      name: "University of Health Science",
      listedDate: "12/08/2024",
      status: "Requested",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-blue-600 font-bold">UNIVERSITIES</h1>
        <div className="bg-blue-600 text-white p-4 rounded-lg">
          <p className="text-sm">Total Universities</p>
          <p className="text-4xl font-bold">126</p>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="pb-4">Name</th>
            <th className="pb-4">ID</th>
            <th className="pb-4">Listed Date</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((uni) => (
            <tr key={uni.id} className="border-t">
              <td className="py-4">{uni.name}</td>
              <td className="py-4">{uni.id}</td>
              <td className="py-4">{uni.listedDate}</td>
              <td className="py-4">
                
                  {uni.status === "Requested" ? 
                  <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    uni.status === "Approved"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                Requested
                </span> : 
                <span
                className={`px-3 py-1 rounded-full text-sm ${
                  uni.status === "Approved"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                  }`}
                  >
                Approved
              </span>}
              </td>
              <td className="py-4">
                <div class="inline-flex gap-1">
                  <ButtonComponent variant="danger" ><Trash/></ButtonComponent>
                  <ButtonComponent variant="success"><Pen/></ButtonComponent>
                  <ButtonComponent variant="ghost">View</ButtonComponent>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <nav className="inline-flex rounded-md shadow">
          <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            &lt;
          </button>
          <button className="px-3 py-2 border-t border-b border-gray-300 bg-blue-50 text-blue-600 font-bold">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            ...
          </button>
          <button className="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            9
          </button>
          <button className="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            10
          </button>
          <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
            &gt;
          </button>
        </nav>
      </div>
    </div>
  );
};
export const SidebarContentContext = createContext();

const Profile = ({ userData }) => {
  const [sidebarContent, setSidebarContent] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
          <Sidebar className = "h-full" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole="developer" />
        </SidebarContentContext.Provider>
        {sidebarContent === "schoolList" && <UniversityListing />}
        {sidebarContent === "account" && <UserAccount userInfo={userData} />}
        {sidebarContent === "School" && ""}  {/* School collection book mark */}
        {sidebarContent === "accomodation" && ""}  {/* Accomodation Collection from book mark*/}
        {sidebarContent === "partTime" && ""}  {/* Part time job Collection from book mark*/}
        {sidebarContent === "partTime" && ""}  {/* Part time job Collection from book mark*/}
    </div>
  );
};

export default Profile;
