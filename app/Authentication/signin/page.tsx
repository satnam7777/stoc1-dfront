"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signin } from "../../lib/api";
import Link from "next/link";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // This sends credentials and sets HttpOnly cookie
      await signin(email, password);

      // Redirect immediately because backend set the cookie
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-100 dark:bg-[#0F172A]">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/Authentication/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>

        <button
          type="button"
          onClick={() => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
              method: "POST",
              credentials: "include",
            });
          }}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded mt-2"
        >
          Clear Session
        </button>
      </form>
    </div>
  );
}
