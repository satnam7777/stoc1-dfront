'use client';
import Image from 'next/image';
import Link from 'next/link';
import bgImage from '../../Images/bg.jpg';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile, updateUserProfile } from '../../lib/api';
import {
  Facebook,
  Twitter,
  Linkedin,
  Dribbble,
  Globe,
  Camera,
  Edit2,
  Save,
  X
} from 'lucide-react';

interface UserData {
  username: string;
  email: string;
  fullName: string;
  phone: string;
  bio: string;
  photo: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserData>({
    username: '',
    email: '',
    fullName: '',
    phone: '',
    bio: '',
    photo: '',
    role: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push('/Authentication/signin');
          return;
        }
        const data = await getUserProfile(token);
        setUser(data);
        setEditForm(data);
      } catch (error) {
        console.error("Error fetching user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await updateUserProfile(token, editForm);
      setUser(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Profile...</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white sm:p-6 flex justify-center">
      <div className="bg-white dark:bg-gray-800  w-full overflow-hidden">
        {/* Header + Breadcrumb */}
        <div className="flex items-center justify-between bg-gray-100 flex-wrap text-gray-500 dark:text-white dark:bg-gray-900 gap-2 pb-6 w-full max-w-6xl">
          <h2 className="text-2xl font-bold">{user?.username || 'Profile'}</h2>
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

          {/* Edit Mode Toggle */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute bottom-3 right-3 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 text-base rounded-md flex items-center gap-1"
            >
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </button>
          ) : (
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-base rounded-md flex items-center gap-1"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(user!); // Reset changes
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 text-base rounded-md flex items-center gap-1"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          )}

          {/* Profile Image */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                src={user?.photo}
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
          {isEditing ? (
            <div className="max-w-md mx-auto space-y-3">
              <input
                className="block w-full text-center border p-2 rounded dark:bg-gray-700"
                placeholder="Full Name"
                value={editForm.fullName}
                onChange={e => setEditForm({ ...editForm, fullName: e.target.value })}
              />
              <input
                className="block w-full text-center border p-2 rounded dark:bg-gray-700 text-sm"
                placeholder="Role / Title"
                value={editForm.role}
                disabled // Role usually not editable by user directly
              />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold dark:text-white">{user?.fullName || user?.username}</h1>
              <h2 className="text-base text-gray-500 dark:text-gray-300 font-medium mt-1 uppercase">{user?.role}</h2>
            </>
          )}


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
            {isEditing ? (
              <textarea
                className="w-full border p-2 rounded h-32 dark:bg-gray-700"
                value={editForm.bio}
                onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                placeholder="Write something about yourself..."
              />
            ) : (
              <p className="text-base text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {user?.bio || "No bio yet. Click Edit to add one!"}
              </p>
            )}
          </div>

          {/* Contact Info (optional display) */}
          <div className="mt-4 text-sm text-gray-500">
            <p>{user?.email}</p>
            <p>{user?.phone}</p>
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
