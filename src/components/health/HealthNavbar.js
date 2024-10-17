import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Dashboard from "./../../assets/svg/dashboard.svg";
import Menu from "./../../assets/svg/menu.svg";
import useAuth from "../../hooks/useAuth";
import ProfilePicture from "../reusable/ProfilePicture";
import { User2 } from "lucide-react";

const MenuIcon = <img src={Menu} alt="Menu" />;
const DashboardIcon = ({ username, entity }) => {
  const actualIdentifier = username || entity || "entity";
  const encodedIdentifier = encodeURIComponent(actualIdentifier);
  const dynamicDashboardUrl = `/dashboard/${encodedIdentifier}`;

  return (
    <Link to={dynamicDashboardUrl}>
      <img src={Dashboard} alt="Dashboard" />
    </Link>
  );
};

const HealthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, username, entity, showDashboard, userId } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      logo: <User2 />,
      name: "Profile",
      to: `/profile/${encodeURIComponent(username || entity)}`,
      showMobile: true,
      showDesktop: false,
    },
  ];

  const identifier = username || entity;
  const encodedIdentifier = encodeURIComponent(identifier);

  return (
    <>
      <nav className="bg-[#E6F3F9] h-[64px] w-full fixed top-0 left-0 right-0 z-[1002]">
        <div className="sm:hidden flex justify-between gap-x-10 items-center px-4 py-3 h-full m-auto lg:w-9/12">
          <Link to="/" className="text-xl font-bold tracking-tightest">
            W2HEALTH
          </Link>
          <div className="flex align-center justify-between h-full lg:w-9/12">
            {menuItems
              .filter((item) => item.showDesktop !== false)
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex my-[6px] mx-0 whitespace-nowrap text-gray-700 hover:text-gray-900 h-full"
                >
                  {item.name}
                </Link>
              ))}
          </div>
          <div className="flex items-center space-x-4">
            {showDashboard && (
              <DashboardIcon username={username} entity={entity} />
            )}
            {isLoggedIn ? (
              <Link to={`/profile/${encodedIdentifier}`}>
                <ProfilePicture userId={userId} />
              </Link>
            ) : (
              <Link to="/login" className="w-8 h-8">
                <div className="w-full h-full">
                  <User2
                    size={22}
                    className="flex justify-center align-center"
                  />
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="lg:hidden sm:flex justify-between items-center px-4 py-3 h-full w-full">
          <Link to="/" className="text-xl font-bold tracking-tighter">
            W2HEALTH
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-300"
          >
            {isOpen ? <X size={20} /> : MenuIcon}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform translate-x-0 z-[1003]">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md hover:bg-gray-300 float-right"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              {menuItems
                .filter((item) => item.showMobile)
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={toggleMenu}
                  >
                    {item.logo}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HealthNavbar;