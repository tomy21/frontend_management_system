import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUsers, FaHospitalUser } from 'react-icons/fa';
import { MdDashboard, MdOutlineHomeRepairService, MdOutlineTask } from "react-icons/md";
import { FaMapLocationDot, FaUsersGear } from 'react-icons/fa6';
import { VscSignOut } from "react-icons/vsc";
import { login } from '../Utils/ApiUsers';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        // { path: '/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
        { path: '/dashboard/user', icon: <MdDashboard />, label: 'Dashboard ' },
        { path: '/dashboard/service-orders', icon: <MdOutlineTask />, label: 'Service Orders' },
        { path: '/dashboard/client', icon: <FaHospitalUser />, label: 'Client' },
        { path: '/dashboard/service-type', icon: <MdOutlineHomeRepairService />, label: 'Service Type' },
        { path: '/dashboard/locations', icon: <FaMapLocationDot />, label: 'Locations' },
        { path: '/dashboard/users', icon: <FaUsersGear />, label: 'Users' },
        { path: '/dashboard/consultant', icon: <FaUsers />, label: 'Consultant' },
    ];

    const handleLogout = async () => {
        try {
            const response = await login.logoutPost();
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-slate-400 ${location.pathname === path ? 'bg-slate-400 text-white' : ''
                                                }`}
                                        >
                                            {icon}
                                            <span>{label}</span>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
                <div className="fixed bottom-5 p-4">
                    <button onClick={handleLogout} className='flex flex-row justify-start items-center gap-x-3'>
                        <VscSignOut /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
