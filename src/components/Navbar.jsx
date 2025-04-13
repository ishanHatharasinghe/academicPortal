import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cpu, Menu, User, Settings, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = ({ toggleSidebar, user }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/welcome");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-sm z-10 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left section: Sidebar toggle and logo */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="ml-3 sm:ml-6 flex items-center space-x-1">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2">
                  <Cpu className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-white hidden md:block">
                  Engineering Portal
                </h1>
              </div>
            </Link>
          </div>

          {/* Right section: User menu */}
          <div className="relative">
            {user && (
              <>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 flex items-center justify-center shadow-md">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-100 group-hover:text-white transition">
                      {user.email}
                    </span>
                    <span className="text-xs text-gray-400">Student</span>
                  </div>
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-10 z-50">
                    <div className="py-2">
                      <button
                        disabled
                        className="w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                      >
                        Your Profile
                      </button>
                      <button
                        disabled
                        className="w-full text-left px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                      >
                        Account Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {userMenuOpen && (
        <div className="sm:hidden bg-gray-800 border-t border-gray-700 pt-4 pb-3">
          <div className="px-4 mb-3 flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-100">{user.email}</p>
              <p className="text-xs text-gray-400">Student</p>
            </div>
          </div>
          <div className="px-4 space-y-1">
            <button
              disabled
              className="w-full text-left px-4 py-2 text-base text-gray-400 cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-base text-red-400 hover:bg-gray-700 hover:text-red-300 transition"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="h-5 w-5" />
                <span>Sign out</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
