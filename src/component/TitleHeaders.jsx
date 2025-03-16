import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { login } from "../Utils/ApiUsers.js";
import { VscSignOut } from "react-icons/vsc";
import { useUser } from "../Context/UserProvider.jsx";

export default function TitleHeaders({ title, subtitle }) {
  const user = useUser(); // Pastikan ini tidak error
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await login.logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-300 w-full pb-3 mb-3">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>

      <div className="flex flex-row justify-start items-center space-x-5 relative">
        <IoNotificationsOutline size={25} />

        <div className="border-l border-gray-300 h-5 mx-3"></div>
        <div
          className="flex flex-row justify-center items-center space-x-2 cursor-pointer relative"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <h1 className="text-2xl font-semibold p-3 bg-red-800 text-white rounded-md">
            {user?.Initial || "?"}
          </h1>
          <div className="flex flex-col justify-start items-start">
            <h1 className="font-semibold">{user?.UserName || "Guest"}</h1>
            <h1 className="text-sm text-gray-400">
              {user?.RoleDetail?.Name || ""}
            </h1>
          </div>
        </div>

        {showDropdown && (
          <div className="absolute top-16 right-0 bg-white shadow-md rounded-md w-40 border border-gray-200 z-50">
            <ul>
              <li
                className="px-4 py-2 hover:bg-red-100 cursor-pointer flex flex-row justify-start items-center gap-x-2 hover:text-red-600"
                onClick={handleLogout}
              >
                <VscSignOut size={20} />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
