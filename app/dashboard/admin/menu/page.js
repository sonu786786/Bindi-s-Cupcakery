"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaBox, FaClipboardList, FaPlusCircle, FaLayerGroup } from "react-icons/fa";

const AdminMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Create Category", href: "/dashboard/admin/create-category", icon: FaLayerGroup },
    { name: "Create Product", href: "/dashboard/admin/create-product", icon: FaPlusCircle },
    { name: "Products", href: "/dashboard/admin/products", icon: FaBox },
    { name: "Orders", href: "/dashboard/admin/orders", icon: FaClipboardList },
    { name: "Users", href: "/dashboard/admin/users", icon: FaUsers },
  ];

  return (
    <div className="w-full max-w-xs bg-white shadow-lg rounded-lg p-5">
      <h4 className="text-xl font-semibold text-gray-700 mb-4 text-center">Admin Panel</h4>
      <div className="flex flex-col space-y-2">
        {menuItems.map(({ name, href, icon: Icon }) => (
          <Link 
            key={href} 
            href={href} 
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-200 transition-all duration-200 ${pathname === href ? "bg-purple-600 text-white" : ""}`}
          >
            <Icon className="w-5 h-5" />
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
