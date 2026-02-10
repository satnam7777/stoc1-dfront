'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
// import { logout } from "@/app/lib/logout";

import { ChevronDown, LogOut, User, Settings } from 'lucide-react';
// import { logout } from '../lib/auth';
import { getUserProfile } from '../lib/api';
import { useRouter } from 'next/navigation';
import LogoutButton from '@/app/components/LogoutButton'

interface UserData {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // User is not authenticated, keep user as null
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 dark:text-white text-base sm:text-lg font-medium px-4 py-2 rounded hover:text-indigo-500 focus:outline-none"
      >
        <User />
        <span className="hidden sm:inline text-nowrap">{user ? user.username : "Loading..."}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-xl z-50">
          <ul className="text-sm sm:text-base">
            {/* Profile Summary */}
            <li className="border-b border-gray-200 dark:border-gray-700">
              <span className="flex px-5 py-3.5 items-center gap-3">
                <User size={44} />
                <div className="flex-1">
                  <span className="block font-medium text-gray-800 dark:text-white">
                    {user ? user.username : "Guest"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">
                    {user ? user.email : ""}
                  </span>
                  {user && (
                    <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                      {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                    </span>
                  )}
                </div>
              </span>
            </li>

            {/* View Profile */}
            <li className="pt-2 px-2">
              <Link
                href="/dashboard/profile"
                className="block px-2.5 py-2 flex gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <User /> <span>View Profile</span>
              </Link>
            </li>

            {/* Admin Panel - Only visible to admins */}
            {user?.role === 'admin' && (
              <li className="px-2">
                <Link
                  href="/dashboard/admin"
                  className="block px-2.5 py-2 flex gap-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md font-medium"
                >
                  <Settings /> <span>Admin Panel</span>
                </Link>
              </li>
            )}

            {/* Settings */}
            <li className="py-2 px-2">
              <Link
                href="/dashboard/settings"
                className="block px-2.5 py-2 flex gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <Settings /> <span>Settings</span>
              </Link>
            </li>

            <hr className="my-1 border-gray-200 dark:border-gray-700" />

            {/* Logout */}
            <li className="p-2">
              <LogoutButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
