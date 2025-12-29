'use client';
import Image from 'next/image';
import Link from 'next/link';
import bgImage from '../../Images/bg.jpg';
import {
  Facebook,
  Twitter,
  Linkedin,
  Dribbble,
  Globe,
  Camera,
} from 'lucide-react';
 
export default function ProfilePage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white sm:p-6 flex justify-center">
      <div className="bg-white dark:bg-gray-800  w-full overflow-hidden">
                {/* Header + Breadcrumb */}
      <div className="flex items-center justify-between bg-gray-100 flex-wrap text-gray-500 dark:text-white dark:bg-gray-900 gap-2 pb-6 w-full max-w-6xl">
        <h2 className="text-2xl font-bold">Profile</h2>
        <div className="text-base text-gray-500 dark:text-gray-400">
          <Link href="/dashboard">
          <span className="hover:underline cursor-pointer">Dashboard</span>
          </Link>
          <span className="mx-1">/</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">Profile</span>
        </div>
      </div>
        {/* Cover Image */}
        <div className="relative">
          <Image
            src={bgImage}
            alt="Cover"
            className="w-full h-40 rounded-t-xl md:h-56 object-cover"
          />

          {/* Edit Cover Button */}
          <button className="absolute bottom-3 right-3 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 text-base rounded-md flex items-center gap-1">
            <Camera className="w-5 h-5" />
            Edit
          </button>

          {/* Profile Image */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-white dark:border-gray-800 object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-indigo-500 p-1 rounded-full">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="pt-16 pb-10 px-6 text-center"> 
          <h2 className="text-base text-gray-500 dark:text-white font-medium">Ui/Ux Designer</h2>

          {/* Stats */}
          <div className="flex justify-center border max-w-[370px] m-auto py-2 mt-4 text-sm dark:text-gray-300">
            <div className="border-r px-4 py-1 rounded-md">
              <span className="font-semibold text-base">259</span> <span className='text-gray-500'> Posts</span>
            </div>
            <div className="border-r px-4 py-1 rounded-md">
              <span className="font-bold">129K</span> <span className='text-gray-500'> Followers</span>
            </div>
            <div className="px-4 py-1 rounded-md">
              <span className="font-bold">2K</span> <span className='text-gray-500'>Following</span>
            </div>
          </div>

          {/* About Me */}
          <div className="mt-6 mx-auto max-w-[720px]">
            <h3 className="font-semibold mb-2">About Me</h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque posuere fermentum urna, eu condimentum mauris tempus
              ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
              ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
              pharetra ligula sed, aliquam lacus.
            </p>
          </div>

          {/* Social Media */}
          <div className="mt-6">
            <h4 className="font-medium mb-2">Follow me on</h4>
            <div className="flex justify-center gap-6 text-gray-600 dark:text-gray-400">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-indigo-500" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-indigo-500" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-indigo-500" />
              <Dribbble className="w-5 h-5 cursor-pointer hover:text-indigo-500" />
              <Globe className="w-5 h-5 cursor-pointer hover:text-indigo-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
