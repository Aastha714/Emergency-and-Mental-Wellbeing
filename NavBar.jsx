import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";

const Navbar = ({ isLoggedIn, userName, avatar, role }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("role");
    Cookies.remove("userName");
    Cookies.remove("avatar");
    navigate("/");
    window.location.reload();
  };

  const handleUser = () => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "USER") {
      navigate("/userDb");
    } else if (role === "THERAPIST") {
      navigate("/therapistDb");
    }
  };

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const isActive = (path) =>
    location.pathname === path
      ? " text-[#001A35] font-bold drop-shadow scale-105  transition-all duration-300"
      : "text-[#109948] hover:text-[#007A3D] transition-all duration-200";

  return (
    <nav className="bg-white text-[#109948] p-4 flex justify-between items-center drop-shadow-md sticky top-0 z-50 shadow-lg">
      <div className="ml-[80px] mt-0 relative">
        <img
          src={logo}
          alt="Logo"
          className="w-[60px] m-auto transition-transform hover:scale-110"
        />
      </div>
      <div className="text-2xl font-bold drop-shadow-sm ml-[-520px] text-[24px] transition-all duration-300 hover:text-[#109948]">
        Hope Line
      </div>
      <ul className="flex space-x-11 mr-[80px] text-[18px] items-center">
        <li>
          <a href="/" className={`hover:underline ${isActive("/")}`}>
            Home
          </a>
        </li>
        {role !== "THERAPIST" && (
          <>
            <li>
              <a
                href="/about"
                className={`hover:underline ${isActive("/about")}`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/feedBack"
                className={`hover:underline ${isActive("/feedBack")}`}
              >
                SelfCare
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className={`hover:underline ${isActive("/blog")}`}
              >
                Blogs
              </a>
            </li>
            <li>
              <a href="/sos" className={`hover:underline ${isActive("/sos")}`}>
                SOS
              </a>
            </li>
          </>
        )}
        {role === "THERAPIST" && (
          <>
            <li>
              <a
                href="/appointments"
                className={`hover:underline ${isActive("/appointments")}`}
              >
                Appointments
              </a>
            </li>
            <li>
              <a
                href="/sessions"
                className={`hover:underline ${isActive("/sessions")}`}
              >
                Sessions
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className={`hover:underline ${isActive("/blog")}`}
              >
                Blogs
              </a>
            </li>
          </>
        )}
        <li className="relative">
          {isLoggedIn ? (
            <div className="flex items-center cursor-pointer group">
              <Avatar
                alt={userName}
                src={avatar || undefined}
                onClick={handleUser}
                sx={{ width: 60, height: 60 }}
              >
                {!avatar && userName.charAt(0)}
              </Avatar>
            </div>
          ) : (
            <FaUserLarge
              className="cursor-pointer hover:text-[#007A3D] transition-all duration-200"
              onClick={handleToggleDropdown}
            />
          )}
          {showDropdown && !isLoggedIn && (
            <ul className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg text-[16px] transition-all duration-200 opacity-100">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-200">
                <a href="/signup/">Register as User</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-200">
                <a href="/signup/therapist">Register as Therapist</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-200">
                <a href="/login">Login</a>
              </li>
            </ul>
          )}
        </li>
        {isLoggedIn && (
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#FF2945] text-white rounded-md hover:bg-red-600 transition-all duration-200"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
