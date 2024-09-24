import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen bg-white w-full">
        <Sidebar />
        <div className="flex flex-col flex-1 p-4 ml-60 w-full max-h-screen overflow-auto justify-start items-start">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
