import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Leaf, Bell } from "lucide-react";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const { userRole, getUserNotifications } = useApp();
  const navigate = useNavigate();

  const notifications = getUserNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogoClick = () => {
    if (isSignedIn) {
      if (userRole === "patient") {
        navigate("/dashboard/patient");
      } else if (userRole === "practitioner") {
        navigate("/dashboard/practitioner");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-50 to-amber-50 border-b border-emerald-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={handleLogoClick}
        >
          <div className="bg-gradient-to-br from-emerald-600 to-amber-600 p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-amber-700 bg-clip-text text-transparent">
              AyurSutra
            </h1>
            <p className="text-xs text-emerald-600 -mt-1">Panchakarma Care</p>
          </div>
        </div>

        {/* Navigation Links */}
        {isSignedIn && (
          <div className="hidden md:flex items-center space-x-6">
            {userRole === "patient" && (
              <>
                <Link
                  to="/dashboard/patient"
                  className="text-emerald-700 hover:text-amber-600 font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/therapy-schedule"
                  className="text-emerald-700 hover:text-amber-600 font-medium transition-colors duration-200"
                >
                  Schedule
                </Link>
                <Link
                  to="/feedback"
                  className="text-emerald-700 hover:text-amber-600 font-medium transition-colors duration-200"
                >
                  Feedback
                </Link>
              </>
            )}

            {userRole === "practitioner" && (
              <>
                <Link
                  to="/dashboard/practitioner"
                  className="text-emerald-700 hover:text-amber-600 font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/therapy-schedule"
                  className="text-emerald-700 hover:text-amber-600 font-medium transition-colors duration-200"
                >
                  Manage Sessions
                </Link>
              </>
            )}
          </div>
        )}

        {/* Right side - Notifications & User */}
        <div className="flex items-center space-x-4">
          {isSignedIn && userRole === "patient" && (
            <Button
              variant="ghost"
              size="sm"
              className="relative text-emerald-700 hover:text-amber-600 hover:bg-emerald-50"
              onClick={() => navigate("/dashboard/patient")}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          )}

          {isSignedIn ? (
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-emerald-700">
                  {user?.fullName || user?.emailAddresses[0]?.emailAddress}
                </p>
                <p className="text-xs text-emerald-600 capitalize">
                  {userRole}
                </p>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/auth/login")}
                className="text-emerald-700 hover:text-amber-600 hover:bg-emerald-50"
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/auth/signup")}
                className="bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
