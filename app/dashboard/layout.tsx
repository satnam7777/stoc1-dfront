'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../lib/auth';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/Authentication/signin');
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
