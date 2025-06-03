import React from 'react';
import { assets, footer_data } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-primary/3 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col md:flex-row justify-between gap-10 py-10 border-b border-gray-300 text-gray-600">
        {/* Left section: Logo and description */}
        <div className="md:w-[30%]">
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44 mb-4" />
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Rerum unde quaerat eveniet cumque accusamus atque qui
            error quo enim fugiat?
          </p>
        </div>

        {/* Right section: Footer columns (Quick Links, Need Help?, Follow Us) */}
        <div className="flex flex-1 flex-wrap gap-10 justify-between">
          {footer_data.map((section, index) => (
            <div key={index} className="min-w-[120px]">
              <h3 className="text-gray-900 font-semibold mb-3 text-base">
                {section.title}
              </h3>
              <ul className="space-y-1 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition-all">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom copyright */}
      <p className="py-4 text-center text-sm text-gray-500">
        Copyright 2025 © QuickBlog GreatStack - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
