'use client';

import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="bg-[#F9FAFB] dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-8 ">
      
      {/* Heading & Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6 w-full max-w-6xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Forgot Password</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <Link href="/">
          <span className="hover:underline cursor-pointer text-gray-400 dark:text-gray-500">Dashboard</span>
          </Link>
          <span className="mx-1">/</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">Forgot Password</span>
        </div>
      </div>

      {/* Card Container */}
      <div className="bg-white items-center dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 w-full max-w-6xl flex flex-col md:flex-row gap-8">
        
        {/* Left: Form */}
        <div className="flex-1">
          <form className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <Mail className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-300" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#635BFF] hover:bg-[#4f47e4] text-white py-2 rounded-md text-sm font-semibold transition"
            >
              Send Password Reset Link
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Login to your account from{' '}
            <Link href="/Authentication/signin" className="text-[#635BFF] hover:underline">
              here
            </Link>
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="flex-1 bg-[#F6F3FF] items-center dark:bg-gray-700 md:block hidden rounded-lg  px-12 pt-12 flex flex-col w-full justify-center  text-left">
            
          <h2 className=" font-semibold text-3xl pb-8">NextAdmin</h2>
          <h4 className="text-xl  y-600 dark:text-gray-300 mb-1">Forget your password?</h4>
          <h3 className="text-4xl font-bold inline-block text-gray-900 dark:text-white mb-2">Reset Password!</h3>
          <p className="text-sm text-gray-500 inline-block dark:text-gray-400 max-w-xs">
            Enter your email address to receive a password reset link.
          </p>
          <img className='h-60' src="https://demo.nextadmin.co/images/grids/grid-02.svg" alt="" />

        </div>
      </div>
    </div>
  );
}
