import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as IconsFA from "react-icons/fa";
import * as IconFA6 from "react-icons/fa6";
import * as IconFi from "react-icons/fi";
import * as IconGi from "react-icons/gi";
import * as IconBs from "react-icons/bs";
import * as IconIo from "react-icons/io5";
import * as IconMd from "react-icons/md";
import * as IconPi from "react-icons/pi";
import * as IconTb from "react-icons/tb";
import * as IconRi from "react-icons/ri";
import * as IconRx from "react-icons/rx";
import { getUserById } from "../Utils/ApiUsers";

const Sidebar = () => {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [listMenu, setListMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await getUserById.getMenus();
      setListMenu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const isParentActive = (menu) => {
    if (menu.link && location.pathname.startsWith(menu.link)) {
      return true;
    }
    if (menu.subMenus) {
      return menu.subMenus.some((subMenu) =>
        location.pathname.startsWith(subMenu.link)
      );
    }
    return false;
  };

  const renderIcon = (iconName) => {
    const IconComponent =
      IconsFA[iconName] ||
      IconFA6[iconName] ||
      IconFi[iconName] ||
      IconGi[iconName] ||
      IconBs[iconName] ||
      IconIo[iconName] ||
      IconMd[iconName] ||
      IconPi[iconName] ||
      IconTb[iconName] ||
      IconRi[iconName] ||
      IconRx[iconName];
    return IconComponent ? <IconComponent className="mr-2" /> : null;
  };

  return (
    <div className="w-64 bg-transparent px-4 py-3 max-h-screen overflow-auto">
      <img src={"/logo_.png"} alt="Logo" />
      <div className="border border-gray-300 my-5 w-full"></div>
      <nav className="mt-4 space-y-2">
        {listMenu.map((menu, index) => (
          <div key={index}>
            {menu.subMenus.length > 0 ? (
              <div
                className={`flex items-center justify-between text-sm p-3 rounded-lg cursor-pointer transition-colors duration-300 
                  ${
                    isParentActive(menu)
                      ? "bg-slate-800 text-white"
                      : "text-gray-500 hover:bg-slate-800 hover:text-white"
                  }`}
                onClick={() => handleToggleSubMenu(index)}
              >
                <div className="flex items-center">
                  {renderIcon(menu.icon)}
                  {menu.name}
                </div>
                <span>{openSubMenu === index ? "▼" : "►"}</span>
              </div>
            ) : (
              <Link
                to={menu.link || "#"}
                className={`flex items-center text-sm p-3 rounded-lg transition-colors duration-300 
                  ${
                    isParentActive(menu)
                      ? "bg-slate-800 text-white"
                      : "text-gray-500 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                {renderIcon(menu.icon)}
                {menu.name}
              </Link>
            )}

            {menu.subMenus.length > 0 && (
              <div
                className={`pl-6 mt-2 space-y-2 transition-all duration-300 ${
                  openSubMenu === index ? "block" : "hidden"
                }`}
              >
                {menu.subMenus.map((subMenu, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subMenu.link}
                    className={`flex items-center text-sm p-2 rounded-lg transition-colors duration-300 mb-2 
                      ${
                        location.pathname.startsWith(subMenu.link)
                          ? "bg-slate-600 text-white"
                          : "text-gray-500 hover:bg-slate-800 hover:text-white"
                      }`}
                  >
                    {renderIcon(subMenu.icon)}
                    {subMenu.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
