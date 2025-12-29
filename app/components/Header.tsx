'use client';

import '../globals.css';
import { Search, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import ProfileDropdown from './ProfileDrop';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <header className="bg-white position-sticky dark:bg-gray-900 shadow px-4 sm:px-6 py-4">
      {/* Container: Use flex-col on small, row on md+ */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Title and subtitle */}
        <div className='ml-11'>
          <div className="font-semibold text-2xl sm:text-3xl text-gray-900 hidden md:block dark:text-white">
            Dashboard
          </div>
          <div className="font-medium text-sm sm:text-base text-gray-500 hidden md:block dark:text-gray-400">
            Next.js Admin Dashboard Solution
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex  sm:flex-row justify-center md:justify-normal items-stretch sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative  md:w-full">
            <input
              type="text"
              placeholder="Search"
              className="h-11 ps-10 md:w-full w-10  rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search size={18} className="absolute top-3 left-3 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={clsx(
              'relative flex items-center justify-between w-20 h-11 px-2 rounded-full transition-colors duration-300',
              isDark ? 'bg-gray-700' : 'bg-gray-300'
            )}
          >
            <Sun
              size={22}
              className={clsx(
                'z-10 transition-opacity duration-300 ml-[0.4rem]',
                isDark ? 'opacity-0' : 'opacity-100 text-yellow-500'
              )}
            />
            <Moon
              size={22}
              className={clsx(
                'z-10 transition-opacity duration-300 mr-[0.2rem]',
                isDark ? 'opacity-100 text-indigo-300' : 'opacity-0'
              )}
            />
            <span
              className={clsx(
                'absolute top-1 w-9 h-9 left-1 bg-white rounded-full dark:bg-gray-800 shadow-md transition-transform duration-300 z-0',
                isDark ? 'translate-x-7' : 'translate-x-0'
              )}/>
          </button>

          {/* Notification Icon */}
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-full p-2">
            <Bell className="text-gray-700 dark:text-white" size={20} />
            {/* Uncomment to show red dot */}
            {/* <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-gray-900 bg-red-500" /> */}
          </div>

          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
