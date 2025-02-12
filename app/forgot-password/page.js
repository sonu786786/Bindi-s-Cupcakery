'use client'
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const router = useRouter();

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        router.push("/Login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-lg bg-gray-900 text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Security Answer</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
              placeholder="Enter your favorite sport"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
              placeholder="Enter your new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg mt-4"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
