import React from 'react';
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 ${
                    isActive ? 'bg-[#5754a8] text-white md:text-blue-700' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/status"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 ${
                    isActive ? 'bg-[#5754a8] text-white md:text-blue-700' : 'text-gray-900 md:text-blue-700'
                  }`
                }
                aria-current="page"
              >
                Accepted Books
              </NavLink>
            </li>

            <li className="ml-auto">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:hover:text-blue-500 ${
                    isActive ? 'bg-[#5754a8] text-white md:text-blue-700' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  }`
                }
              >
                Logout
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
