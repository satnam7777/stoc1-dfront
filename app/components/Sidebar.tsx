'use client';
import React, { JSX } from 'react';

import Link from 'next/link';
import { useState } from 'react';
import {
  Home,
  Calendar,
  User,
  ListChecks,
  FileText,
  Table,
  File,
  Mail,
  Inbox,
  Receipt,
  BarChart3,
  LayoutGrid,
  LogIn,
  ChevronDown,
  ChevronUp,
  Menu,
} from 'lucide-react';

type MenuItem = {
  label: string;
  href?: string;
  icon?: JSX.Element;
  children?: MenuItem[];
  badge?: string;
  pro?: boolean;
  notifyCount?: number;
};

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => {
      const isCurrentlyOpen = !!prev[label];
      return isCurrentlyOpen ? {} : { [label]: true };
    });
  };

  const mainMenu: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: <Home size={18} />,
      children: [
        { label: 'eCommerce', href: '/dashboard' },
        { label: 'Analytics', href: '#', pro: true },
        { label: 'Marketing', href: '/dashboard/marketing', pro: true },
        { label: 'CRM', href: '/dashboard/crm', pro: true },
        { label: 'Stocks', href: '/dashboard/stock', pro: true },
      ],
    },
    { label: 'Calendar', href: '#', icon: <Calendar size={18} /> },
    { label: 'Profile', href: '/dashboard/profile', icon: <User size={18} /> },
    {
      label: 'Tasks',
      icon: <ListChecks size={18} />,
      children: [
        { label: 'List', href: '#', pro: true },
        { label: 'Kanban', href: '#', pro: true },
      ],
    },
    {
      label: 'Forms',
      icon: <FileText size={18} />,
      children: [
        { label: 'Form Elements', href: '#' },
        { label: 'Pro Form Elements', href: '#', pro: true },
        { label: 'Form Layout', href: '#' },
        { label: 'Pro Form Layout', href: '#', pro: true },
      ],
    },
    {
      label: 'Tables',
      icon: <Table size={18} />,
      children: [
        { label: 'Tables', href: '#' },
        { label: 'Pro Tables', href: '#', pro: true },
        { label: 'Data Tables', href: '#', pro: true },
      ],
    },
    {
      label: 'Pages',
      icon: <File size={18} />,
      children: [
        { label: 'Settings', href: '#' },
        { label: 'File Manager', href: '#', pro: true },
        { label: 'Pricing Tables', href: '#', pro: true },
        { label: 'Error Page', href: '#', pro: true },
        { label: 'Teams', href: '#', pro: true },
        { label: 'Terms & Conditions', href: '#', pro: true },
        { label: 'Mail Success', href: '#', pro: true },
      ],
    },
  ];

  const supportMenu: MenuItem[] = [
    { label: 'Messages', icon: <Mail size={18} />, href: '#', notifyCount: 9, pro: true },
    { label: 'Inbox', icon: <Inbox size={18} />, href: '#', pro: true },
    { label: 'Invoice', icon: <Receipt size={18} />, href: '#', pro: true },
  ];

  const othersMenu: MenuItem[] = [
    {
      label: 'Charts',
      icon: <BarChart3 size={18} />,
      children: [
        { label: 'Basic Chart', href: '#' },
        { label: 'Advanced Chart', href: '#', pro: true },
      ],
    },
    {
      label: 'UI Elements',
      icon: <LayoutGrid size={18} />,
      children: [
        { label: 'AccordionPro', href: '#', pro: true },
        { label: 'Alerts', href: '#' },
        { label: 'BadgePro', href: '#', pro: true },
        { label: 'BreadcrumbsPro', href: '#', pro: true },
        { label: 'Buttons', href: '#' },
        { label: 'Buttons GroupPro', href: '#', pro: true },
        { label: 'CardsPro', href: '#', pro: true },
        { label: 'CarouselPro', href: '#', pro: true },
        { label: 'DropdownsPro', href: '#', pro: true },
        { label: 'ImagesPro', href: '#', pro: true },
        { label: 'ModalsPro', href: '#', pro: true },
        { label: 'NotificationsPro', href: '#', pro: true },
        { label: 'PaginationPro', href: '#', pro: true },
        { label: 'PopoversPro', href: '#', pro: true },
        { label: 'ProgressPro', href: '#', pro: true },
        { label: 'TabsPro', href: '#', pro: true },
        { label: 'TooltipsPro', href: '#', pro: true },
        { label: 'Videos', href: '#', pro: true },
      ],
    },
    {
      label: 'Authentication',
      icon: <LogIn size={18} />,
      children: [
        { label: 'Sign In', href: '/Authentication/signin' },
        { label: 'Sign Up', href: '/Authentication/signup', pro: true },
        { label: 'Reset Password', href: '/Authentication/forgetpassword', pro: true },
        { label: 'Coming Soon', href: '#', pro: true },
        { label: '2 Step Verification', href: '/Authentication/verification', pro: true },
        { label: 'Under Maintenance', href: '#', pro: true },
      ],
    },
  ];

  const renderMenuItem = ({ label, href, icon, children, notifyCount, pro }: MenuItem) => {
    const isActive = openMenus[label];

    return (
      <div key={label}>
        <div
          onClick={() => children && toggleMenu(label)}
          className={`flex items-center justify-between text-md p-2 hover:bg-gray-100 hover:text-gray-600 rounded-md cursor-pointer transition-colors duration-200 ${
            isActive ? 'bg-[#f3f2ff] text-[#5750F1]' : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
<Link
  href={href || '#'}
  onClick={() => {
    if (window.innerWidth < 1120) setIsSidebarOpen(false);
  }}
  className={`flex items-center gap-2 ${
    isActive ? 'text-[#5750F1]' : 'text-gray-500'
  }`}
>

            {icon}
            <span>{label}</span>
          </Link>

          {children && (
            <span className={`ml-auto ${isActive ? 'text-[#5750F1]' : 'text-gray-500'}`}>
              {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          )}

          {!children && (notifyCount || pro) && (
            <div className="flex items-center gap-1 ml-2">
              {notifyCount && (
                <span className="text-xs bg-red-500/10 text-red-500 rounded-full px-1.5 py-0.5">{notifyCount}</span>
              )}
              {pro && (
                <span className="text-[10px] bg-indigo-600 text-white rounded px-1.5 py-0.5">Pro</span>
              )}
            </div>
          )}
        </div>

        {children && isActive && (
          <div className="ml-6 mt-1 space-y-1">
            {children.map((child) => (
              <Link
                key={child.label}
                href={child.href || '#'}
                className="flex items-center justify-between p-4 text-md hover:text-gray-700 text-gray-500"
              >
                <span>{child.label}</span>
                {child.pro && (
                  <span className="text-[10px] text-white bg-indigo-600 rounded px-1.5 py-0.5 ml-2">Pro</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Hamburger button */}
<button
  onClick={() => setIsSidebarOpen(true)}
  className="fixed top-4 left-4 z-50 p-2 rounded shadow bg-white dark:bg-gray-800 block min-[1120px]:hidden"
>
  <Menu className="text-gray-700 dark:text-white" />
</button>




{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 z-40 block min-[1120px]:hidden"
    onClick={() => setIsSidebarOpen(false)}
  />
)}




      {/* Sidebar */}
<aside
  className={`
    fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 shadow border-r
    transform transition-transform duration-300
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    min-[1120px]:translate-x-0 min-[1120px]:static min-[1120px]:block
    overflow-y-auto p-4
  `}
>



          <Link href="/dashboard">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-purple-600"></div>  
          <span className="font-bold text-2xl dark:text-white text-gray-800">NextAdmin</span>
        </div>
          </Link>

        <div className="text-md text-gray-500 font-medium uppercase mb-2">Main Menu</div>
        <nav className="space-y-1 text-gray-500 mb-4 hover:text-gray-700">
          {mainMenu.map(renderMenuItem)}
        </nav>

        <div className="text-md font-medium text-gray-500 uppercase mt-4 mb-2">Support</div>
        <nav className="space-y-1 text-gray-500 hover:text-gray-700 mb-4">
          {supportMenu.map(renderMenuItem)}
        </nav>

        <div className="text-md font-medium text-gray-500 uppercase mt-4 mb-2">Others</div>
        <nav className="space-y-1 text-gray-500 hover:text-gray-700">
          {othersMenu.map(renderMenuItem)}
        </nav>
      </aside>
    </>
  );
}
