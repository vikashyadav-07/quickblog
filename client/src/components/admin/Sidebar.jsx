import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
    return (
        <div className="flex flex-col border-r border-gray-300 dark:border-gray-700 min-h-screen pt-6 bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Navigation Links */}
            <NavLink
                end={true}
                to="/admin"
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer rounded-r-lg ${isActive &&
                    "bg-primary/10 border-r-4  border-primary dark:border-primary text-primary dark:text-primary"
                    }`
                }
            >
                <img
                    src={assets.home_icon}
                    alt="Dashboard"
                    className="w-5 h-5 dark:invert"
                />
                <p className="hidden md:inline-block text-gray-800 dark:text-gray-300">
                    Dashboard
                </p>
            </NavLink>

            <NavLink
                to="/admin/addBlog"
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer rounded-r-lg ${isActive &&
                    "bg-primary/10 border-r-4 border-primary dark:border-primary text-primary dark:text-primary"
                    }`
                }
            >
                <img
                    src={assets.add_icon}
                    alt="Add Blogs"
                    className="w-5 h-5 dark:invert"
                />
                <p className="hidden md:inline-block text-gray-800 dark:text-gray-300">
                    Add Blogs
                </p>
            </NavLink>

            <NavLink
                to="/admin/listBlog"
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer rounded-r-lg ${isActive &&
                    "bg-primary/10 border-r-4 border-primary dark:border-primary text-primary dark:text-primary"
                    }`
                }
            >
                <img
                    src={assets.list_icon}
                    alt="Blog Lists"
                    className="w-5 h-5 dark:invert"
                />
                <p className="hidden md:inline-block text-gray-800 dark:text-gray-300">
                    Blog Lists
                </p>
            </NavLink>

            <NavLink
                to="/admin/comments"
                className={({ isActive }) =>
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer rounded-r-lg ${isActive &&
                    "bg-primary/10 border-r-4 border-primary dark:border-primary text-primary dark:text-primary"
                    }`
                }
            >
                <img
                    src={assets.comment_icon}
                    alt="Comments"
                    className="w-5 h-5 dark:invert"
                />
                <p className="hidden md:inline-block text-gray-800 dark:text-gray-300">
                    Comments
                </p>
            </NavLink>
        </div>
    );
};

export default Sidebar;
