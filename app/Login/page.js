"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Context/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/login", {
        email,
        password,
      });

      console.log("response data", res.data);
      
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data.token));

        console.log("Authentication successful");
        router.push("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/50 text-white placeholder-gray-400"
              placeholder="Enter your email..."
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-black/50 text-white placeholder-gray-400"
              placeholder="Enter your password..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Log In
          </button>
        </form>

        {/* Forgot Password & Signup Links */}
        <div className="text-center text-gray-400 text-sm mt-4">
          <a href="/forgot-password" className="text-purple-400 hover:underline">
            Forgot Password?
          </a>
          <p className="mt-2">
            New here?{" "}
            <a href="/register" className="text-purple-400 font-semibold hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
