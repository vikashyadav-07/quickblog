import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 dark:border-gray-500/20">
                <div>
                    <img src={assets.logo} alt="logo" className="w-32 sm:w-44 dark:invert" />
                    <p className="max-w-[410px] mt-6 text-gray-700 dark:text-gray-400">
                        QuickBlog is your go-to platform for sharing ideas, discovering new perspectives, and connecting with a vibrant community of writers and readers. Start your blogging journey today!
                    </p>
                </div>

                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footer_data.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-200 md:mb-5 mb-2">
                                {section.title}
                            </h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a
                                            href="#"
                                            className="hover:underline transition text-gray-700 dark:text-gray-400 hover:text-primary dark:hover:text-blue-500"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80 dark:text-gray-500/60">
                Copyright 2025 © QuickBlog - All Rights Reserved.
            </p>
        </div>
    );
};

export default Footer;
