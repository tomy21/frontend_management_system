import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen bg-gradient-to-r from-red-50 via-red-100 to-red-500 p-2">
        <Sidebar />
        <div className="flex-1 px-5 py-5 bg-white rounded-xl max-h-screen overflow-auto relative w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
