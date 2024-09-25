import React, { useState, useEffect, useRef, useContext } from "react";
import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  DocumentDuplicateIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  BookOpenIcon,
  BeakerIcon,
} from '@heroicons/react/24/solid';
import { X, User, Heart, ChevronDown, ChevronRight, BookKey, Users, School, House, Briefcase, BadgeDollarSignIcon } from "lucide-react";
import { SidebarContentContext } from "./Profile";

const MenuItem = ({ item, depth = 0, onItemClick, isSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggleOpen = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    }
    if (item.content) {
      onItemClick(item.label, item.content);
    }
  };

  return (
    <>
      <div
        className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all duration-300 ease-in-out transform hover:bg-gray-100 cursor-pointer ${
          depth > 0 ? 'pl-' + (depth * 4 + 3) : ''
        } ${isSelected ? 'bg-gray-200' : ''}`}
        onClick={(e) => {
          toggleOpen(e);
          handleClick();
        }}
      >
        {item.icon && <div className="mr-4">{item.icon}</div>}
        <span className="flex-grow">{item.label}</span>
        {item.badge && (
          <div className="grid place-items-center ml-auto">
            <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
              <span>{item.badge}</span>
            </div>
          </div>
        )}
        {hasChildren && (
          <div className="ml-auto transition-transform duration-300">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
      {hasChildren && (
        <div
          className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out transform ${
            isOpen ? 'max-h-[1000px]' : 'max-h-0'
          }`}
        >
          {item.children.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              depth={depth + 1}
              onItemClick={onItemClick}
              isSelected={isSelected}
            />
          ))}
        </div>
      )}
    </>
  );
};

const Sidebar = ({ isOpen, onClose, userRole }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const sidebarRef = useRef(null);
  const setSideBarContent = useContext(SidebarContentContext);

  const handleItemClick = (item, content) => {
    setSelectedItem(item); // Set the clicked item as selected
    setSideBarContent(content);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, isOpen]);

  const menuItems = {
    user: [
      {
        label: 'Account',
        icon: <User className="w-5 h-5" />,
        onClick: () => handleItemClick("account", "account"),
      },
      {
        label: 'Collection',
        icon: <Heart className="w-5 h-5" />,
        children: [
          { label: 'School', icon: <School />, onClick: () => handleItemClick("school", "school") },
          { label: 'Accommodation', icon: <House />, onClick: () => handleItemClick("accommodation", "accommodation") },
          { label: 'Part-time Job', icon: <Briefcase />, onClick: () => handleItemClick("job", "job") },
          { label: 'Financial', icon: <BadgeDollarSignIcon />, onClick: () => handleItemClick("financial", "financial") }
        ]
      },
      { label: 'Settings', icon: <Cog6ToothIcon className="h-5 w-5" /> },
      { label: 'Log Out', icon: <PowerIcon className="h-5 w-5" /> },
    ],
    admin: [
      { label: 'Content', icon: <DocumentDuplicateIcon className="h-5 w-5" />, badge: '14' },
      { label: 'Profile', icon: <UserCircleIcon className="h-5 w-5" /> },
      { label: 'Settings', icon: <Cog6ToothIcon className="h-5 w-5" /> },
      { label: 'Log Out', icon: <PowerIcon className="h-5 w-5" /> },
    ],
    developer: [
      { label: 'Account', icon: <User className="w-5 h-5" />, onClick: () => handleItemClick("account", "account") },
      { label: 'Users', icon: <Users className="w-5 h-5" />, onClick: () => handleItemClick("users", "userList") },
      { label: 'School', icon: <BookKey className="w-5 h-5" />, onClick: () => handleItemClick("school", "schoolList") },
      { label: 'Accommodation', icon: <House />, onClick: () => handleItemClick("accommodation", "accommodationList") },
      { label: 'Part time job', icon: <Briefcase />, onClick: () => handleItemClick("job", "jobList") },
      {
        label: 'Sign Out',
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7ZM20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z" fill="currentColor" />
          </svg>
        ),
        onClick: () => handleItemClick("signout", "signout")
      },
    ]
  };

  return (
    <div
      ref={sidebarRef}
      className={`rounded-[20px] p-[16px] h-[100vh] left-0 w-64 shadow-md border-[1px] bg-white text-black transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-500 ease-in-out z-10`}
    >
      <div className="flex justify-between items-center mb-6">
        <span></span>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav>
        {menuItems[userRole].map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            onItemClick={handleItemClick}
            isSelected={selectedItem === item.label} // Highlight if selected
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
