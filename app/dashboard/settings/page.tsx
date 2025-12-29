'use client';

import { useState, useEffect } from 'react';

const SettingsPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/me", {
        credentials: "include"  // IMPORTANT to send cookies
      });

      const data = await res.json();

      if (data.success) {
        setUsername(data.user.username);
        setEmail(data.user.email);
        setFullName(data.user.username);
      }
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };

  fetchUser();
}, []);


  const handleSave = () => {
    
    console.log({ fullName, phone, email, username, bio, photo });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="flex gap-8">
        {/* Personal Information */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full border rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              className="w-full border rounded-md p-2 h-24"
              placeholder="Write your bio here"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 border rounded-md">Cancel</button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="w-64 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Your Photo</h2>

          <div className="flex flex-col items-center mb-4">
            <img
              src={photo ? URL.createObjectURL(photo) : '/default-avatar.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <div className="text-sm flex gap-2 mb-2">
              <button className="text-purple-600">Delete</button>
              <button className="text-purple-600">Update</button>
            </div>
          </div>

          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-gray-500 text-sm mb-4">
            Click to upload or drag and drop
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
          </label>

          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 border rounded-md">Cancel</button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
