"use client";
import React from "react";
import { useAuth } from "@/Context/auth";
import AdminMenu from "../../../components/Adminmenu";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-purple-100 text-white min-h-screen p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <AdminMenu />
      </div>

      {/* Admin Info Section */}
      <div className="flex-1 p-10">
        <div className="bg-gray-100 shadow-xl rounded-lg p-8 max-w-3xl mx-auto border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h2>

          <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-300">
            <div className="flex items-center gap-4">
              <div className="bg-purple-500 text-white w-12 h-12 flex items-center justify-center text-lg font-semibold rounded-full">
                {auth?.user?.name?.charAt(0) || "A"}
              </div>
              <h3 className="text-xl font-semibold text-gray-700">{auth?.user?.name || "Admin"}</h3>
            </div>

            <div className="space-y-3 text-gray-700">
              <p className="text-lg">
                <span className="font-medium">📧 Email:</span> {auth?.user?.email || "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-medium">📞 Contact:</span> {auth?.user?.phone || "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-medium">🔑 Role:</span> Administrator
              </p>
            </div>

            <button className="w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-6">
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
