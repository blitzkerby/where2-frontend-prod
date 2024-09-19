import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Dashboard from "./../../assets/svg/dashboard.svg";
import Menu from "./../../assets/svg/menu.svg";
import User from "./../../assets/svg/user.svg";
import config from "../../config";

const MenuIcon = <img src={Menu} alt="Menu" />;
const DashboardIcon = (
  <Link to="/dashboard" aria-label="Dashboard">
    <img src={Dashboard} alt="Dashboard" />
  </Link>
);
const UserIcon = <img src={User} alt="User" />;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserRole = useCallback(async () => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      try {
        const { token } = JSON.parse(authData);
        if (token) {
          const response = await fetch(config.auth.getUserRole, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            setShowDashboard(data.role === 'admin' || data.role === 'developer');
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            setShowDashboard(false);
          }
        } else {
          setIsLoggedIn(false);
          setShowDashboard(false);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setIsLoggedIn(false);
        setShowDashboard(false);
      }
    } else {
      setIsLoggedIn(false);
      setShowDashboard(false);
    }
  }, []);

  useEffect(() => {
    fetchUserRole();
    const intervalId = setInterval(fetchUserRole, 600000);

    return () => clearInterval(intervalId);
  }, [fetchUserRole]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // NavBar menuItems
  const menuItems = [
    { name: "Universities", to: "/universities" },
    { name: "Scholarships", to: "/scholarships" },
    { name: "Livelihood", to: "/livelihood" },
    { name: "About Us", to: "/about-us" },
  ];

  return (
    <>
      <nav className="bg-gray-100 h-[64px] w-full fixed top-0 left-0 right-0 z-[1002]">
        <div className="flex justify-between gap-x-10 items-center px-4 py-3 h-full sm:hidden m-auto lg:w-7/12 sm:hidden">
          <Link to="/" className="text-xl font-bold">WHERE2</Link>
          <div className="flex align-center justify-between space-x-10 rd:hidden sm:hidden h-full lg:w-[60%] rd:hidden">
            {menuItems.map((item) => (
              <Link key={item.name} to={item.to} className="flex my-[6px] mx-0 whitespace-nowrap text-gray-700 hover:text-gray-900 h-full">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {showDashboard && DashboardIcon}
            <button className="p-2 rounded-full hover:bg-gray-300" aria-label="Profile">
              {isLoggedIn ? <Link to="/profile">{UserIcon}</Link> : <Link to="/login">{UserIcon}</Link>}
            </button>
          </div>
        </div>

        <div className="sm:flex lg:hidden justify-between items-center px-4 py-3 h-full w-full">
          <Link to="/" className="text-xl font-bold">WHERE2</Link>
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-300">
            {isOpen ? <X size={20} /> : MenuIcon}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform translate-x-0 z-[1003]">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-300 float-right" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;



