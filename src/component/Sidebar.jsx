import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaHospitalUser } from 'react-icons/fa';
import { MdDashboard, MdOutlineHomeRepairService, MdOutlineTask } from "react-icons/md";
import { FaMapLocationDot, FaUsersGear } from 'react-icons/fa6';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
        { path: '/service-orders', icon: <MdOutlineTask />, label: 'Service Orders' },
        { path: '/client', icon: <FaHospitalUser />, label: 'Client' },
        { path: '/service-type', icon: <MdOutlineHomeRepairService />, label: 'Service Type' },
        { path: '/locations', icon: <FaMapLocationDot />, label: 'Locations' },
        { path: '/users', icon: <FaUsersGear />, label: 'Users' },
        { path: '/consultant', icon: <FaUsers />, label: 'Consultant' },
    ];

    return (
        <div className="fixed h-screen w-60 text-[#333] border-r border-slate-200 bg-white">
            <div className="p-4 text-2xl font-bold">
                <img src="/logo_.png" width={200} alt="Logo" />
            </div>
            <div className="mt-10">
                {['Main', 'Master', 'User Management'].map((section, index) => (
                    <div key={index} className="mt-6">
                        <h1 className="mx-4 text-sm text-gray-500">{section}</h1>
                        <ul className="space-y-2 mt-2 px-3 text-sm">
                            {menuItems
                                .slice(index * 2, index * 2 + 2)
                                .map(({ path, icon, label }) => (
                                    <li key={path}>
                                        <Link
                                            to={path}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-slate-400 ${location.pathname === path ? 'bg-slate-400 text-white' : ''}`}
                                        >
                                            {icon}
                                            <span>{label}</span>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
