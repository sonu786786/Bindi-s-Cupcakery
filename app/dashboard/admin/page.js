"use client";
import React from "react";
import { useAuth } from "@/Context/auth";
import AdminMenu from "../../../components/Adminmenu";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}
      <div className="col-md-3">
            <AdminMenu />
        </div>

      {/* Admin Info Section */}
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Admin Dashboard</h2>
          <div className="space-y-3">
            <p className="text-gray-600 text-lg"><span className="font-semibold">Admin Name:</span> {auth?.user?.name || "N/A"}</p>
            <p className="text-gray-600 text-lg"><span className="font-semibold">Admin Email:</span> {auth?.user?.email || "N/A"}</p>
            <p className="text-gray-600 text-lg"><span className="font-semibold">Admin Contact:</span> {auth?.user?.phone || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
