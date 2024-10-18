import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import Menu from "./../../assets/svg/menu.svg";
import useAuth from "./../../hooks/useAuth";
import ProfilePicture from "./ProfilePicture";
import WrapperComponent from "./WrapperComponent";
import {
  School,
  BookOpenTextIcon,
  LucideBriefcaseBusiness,
  User2,
  Activity,
  ChartNoAxesCombinedIcon,
} from "lucide-react";

const MenuIcon = <img src={Menu} alt="Menu Item" />;
const DashboardIcon = ({ username, entity }) => {
  const actualIdentifier = username || entity || "entity";
  const encodedIdentifier = encodeURIComponent(actualIdentifier);
  // DECODED URL
  const dynamicDashboardUrl = `/dashboard/${encodedIdentifier}`;

  return (
    <Link to={dynamicDashboardUrl}>
      <ChartNoAxesCombinedIcon />
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, username, entity, showDashboard, userId } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      logo: <School />,
      name: "Universities",
      to: "/universities",
      showMobile: true,
    },
    {
      logo: <BookOpenTextIcon />,
      name: "Scholarships",
      to: "/scholarships",
      showMobile: true,
    },
    {
      logo: <LucideBriefcaseBusiness />,
      name: "Livelihood",
      to: "/livelihood",
      showMobile: true,
    },
    { logo: <Activity />, name: "Health", to: "/health", showMobile: true },
    {
      logo: <User2 />,
      name: "Profile",
      to: `/profile/${encodeURIComponent(username || entity)}`,
      showMobile: true,
      showDesktop: false,
    },
    {
      logo: <MessageCircleMore />,
      name: "Community",
      to: "/discussions",
      showMobile: true,
    },
  ];

  const identifier = username || entity;
  const encodedIdentifier = encodeURIComponent(identifier);

  return (
    <>
      <nav className="bg-gray-100 h-[64px] w-full fixed top-0 left-0 right-0 z-[1002]">
        <div className="sm:hidden flex justify-between gap-x-10 items-center px-4 py-3 h-full m-auto lg:w-9/12">
          <Link to="/" className="text-xl font-bold tracking-tighter">
            WHERE2
          </Link>
          <div className="flex align-center justify-between h-full mx-auto lg:w-[800px] tracking-tighter">
            {menuItems
              .filter((item) => item.showDesktop !== false)
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex mb-[6px] pt-[8px] align-center justify-center mx-0 whitespace-nowrap text-gray-700 hover:text-gray-900 h-full"
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
                <div className="w-full h-full flex align-middle justify-center pt-1">
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
          <Link to="/" className="text-xl font-bold">
            WHERE2
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
            <div className="h-[64px] p-4 border-b">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md hover:bg-gray-300 float-right"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <WrapperComponent>
              <div className="flex-grow overflow-y-auto">
                {menuItems
                  .filter((item) => item.showMobile)
                  .map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="px-4 py-4 text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={toggleMenu}
                    >
                      {item.logo}
                      <span className="ml-4">{item.name}</span>
                    </Link>
                  ))}
              </div>
            </WrapperComponent>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
