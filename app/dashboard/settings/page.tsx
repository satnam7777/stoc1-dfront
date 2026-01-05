'use client';

import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../lib/api';
import { useRouter } from 'next/navigation';

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  // Changed photo to string (base64 URL) or e string
  const [photo, setPhoto] = useState<string>('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // File size validation (e.g., max 500KB)
      if (file.size > 500 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 500KB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push('/Authentication/signin');
          return;
        }

        const data = await getUserProfile(token);

        // Populate fields
        setUsername(data.username || '');
        setEmail(data.email || '');
        setFullName(data.fullName || '');
        setPhone(data.phone || '');
        setBio(data.bio || '');
        setPhoto(data.photo || ''); // Load existing photo URL/Base64
      } catch (error) {
        console.error("Error fetching user", error);
        setMessage({ type: 'error', text: 'Failed to load profile' });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleSave = async () => {
    setMessage({ type: '', text: '' });
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userData = {
        fullName,
        phone,
        email,
        username,
        bio,
        photo, // Send the base64 string
      };

      await updateUserProfile(token, userData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error: any) {
      console.error("Error updating profile", error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Personal Information */}
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
          <h2 className="text-lg font-medium mb-4">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border dark:border-gray-600 rounded-md p-2 dark:bg-gray-700"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                className="w-full border dark:border-gray-600 rounded-md p-2 dark:bg-gray-700"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              className="w-full border dark:border-gray-600 rounded-md p-2 dark:bg-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full border dark:border-gray-600 rounded-md p-2 dark:bg-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              className="w-full border dark:border-gray-600 rounded-md p-2 h-24 dark:bg-gray-700"
              placeholder="Write your bio here"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 border dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="w-full lg:w-64 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 h-fit">
          <h2 className="text-lg font-medium mb-4">Your Photo</h2>

          <div className="flex flex-col items-center mb-4">
            <img
              src={photo || '/default-avatar.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-2 bg-gray-200"
            />
            <div className="text-sm flex gap-2 mb-2">
              <button
                className="text-purple-600 hover:text-purple-700"
                onClick={() => setPhoto('')}
              >
                Delete
              </button>
              {/* Update button is redundant with the file input below, but serves as a visual hint */}
            </div>
          </div>

          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer text-gray-500 dark:text-gray-400 text-sm mb-4 hover:bg-gray-50 dark:hover:bg-gray-700">
            Click to upload or drag and drop
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
          </label>

          <div className="flex gap-2 justify-end">
            <button className="px-4 py-2 border dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              onClick={handleSave}
              disabled={saving}
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
