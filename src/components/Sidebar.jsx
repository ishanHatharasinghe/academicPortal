// components/Sidebar.js
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Zap, // Electrical and Electronic
  Settings, // Mechanical
  Building, // Civil
  Ruler, // QS (Quantity Surveying)
  ChevronLeft,
  ChevronRight,
  X,
  Cpu,
  LogOut,
  User,
  BookOpen,
  FileText,
  Calendar,
  MessageSquare,
  Users as Classmates,
  Award
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  isCollapsed,
  toggleCollapse,
  user
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/welcome");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Main navigation items
  const mainNavigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Electrical & Electronic", href: "/electrical", icon: Zap },
    { name: "Mechanical", href: "/mechanical", icon: Settings },
    { name: "Civil", href: "/civil", icon: Building },
    { name: "Quantity Surveying", href: "/qs", icon: Ruler }
  ];

  // Secondary navigation items
  const secondaryNavigation = [
    { name: "Logout", action: handleLogout, icon: LogOut }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            <div className="flex items-center justify-between h-16 px-4">
              <Link to="/" className="flex items-center">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2">
                    <Cpu className="h-4 w-4 text-white" />
                  </div>
                  <h1 className="text-xl font-semibold text-white hidden md:block">
                    Engineering Portal
                  </h1>
                </div>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-gray-100 transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-2">
              <SidebarLinks
                navigation={mainNavigation}
                isActive={isActive}
                isCollapsed={false}
                title="Departments"
              />
            </div>
          </div>

          <div className="border-t border-gray-700 p-4">
            <SidebarLinks
              navigation={secondaryNavigation}
              isActive={isActive}
              isCollapsed={false}
            />
          </div>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-gray-700 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            {/* Top header with logo and collapse toggle button */}
            <div className="flex items-center justify-between h-16 px-4">
              <Link to="/" className="flex items-center">
                {!isCollapsed && (
                  <>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2">
                        <Cpu className="h-4 w-4 text-white" />
                      </div>
                      <h1 className="text-xl font-semibold text-white hidden md:block">
                        Engineering Portal
                      </h1>
                    </div>
                  </>
                )}
              </Link>
              <button
                onClick={toggleCollapse}
                className="p-2 text-gray-400 hover:bg-gray-700 hover:text-gray-100 rounded-md transition-all duration-200"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="mt-9">
              <SidebarLinks
                navigation={mainNavigation}
                isActive={isActive}
                isCollapsed={isCollapsed}
                title={!isCollapsed && "Departments"}
              />
            </div>
          </div>

          <div className="border-t border-gray-700 p-4">
            <SidebarLinks
              navigation={secondaryNavigation}
              isActive={isActive}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const SidebarLinks = ({ navigation, isActive, isCollapsed, title }) => (
  <div className="mb-4">
    {title && (
      <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {title}
      </h3>
    )}
    <nav className="px-2 space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.name}
            onClick={item.action || (() => {})}
            className={`${
              isActive(item.href)
                ? "bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } group flex items-center px-2 py-2 w-full text-base font-medium rounded-md transition-all duration-200`}
          >
            <Link to={item.href || "#"} className="flex items-center w-full">
              <Icon
                className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"} ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-100"
                }`}
              />
              {!isCollapsed && (
                <span
                  className={`${
                    isActive(item.href) ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.name}
                </span>
              )}
            </Link>
          </button>
        );
      })}
    </nav>
  </div>
);

export default Sidebar;
