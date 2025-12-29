'use client';

import { useState } from 'react';
import { signup } from '../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  console.log("🔹 Form submitted:", { username, email, password, confirmPassword });

  // Validations
  if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    setError("All fields are required");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters long");
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address");
    return;
  }

  setLoading(true);
  try {
    console.log("🔹 Sending signup request...");
    const res = await signup({ username, email, password });
    console.log("✅ Signup success:", res);

    router.push("/Authentication/signin?registered=1");
  } catch (err: any) {
    console.error("❌ Signup failed:", err);
    setError(err.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-100 dark:bg-[#0F172A]">
      <form
        className="space-y-4 w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        <div>
          <label className="text-sm mb-1 block dark:text-gray-300">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-md text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block dark:text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-md text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block dark:text-gray-300">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-md text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm mb-1 block dark:text-gray-300">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-md text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#635BFF] hover:bg-[#4f47e4] text-white py-3 rounded-md text-sm font-semibold transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/Authentication/signin"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
