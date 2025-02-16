"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaThList, FaBoxOpen, FaUsers, FaClipboardList, FaChartBar, FaTag } from "react-icons/fa";

const AdminMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Create Category", path: "/dashboard/admin/create-category", icon: <FaTag /> },
    { name: "Create Product", path: "/dashboard/admin/create-product", icon: <FaBoxOpen /> },
    { name: "Products", path: "/dashboard/admin/products", icon: <FaThList /> },
    { name: "Orders", path: "/dashboard/admin/orders", icon: <FaClipboardList /> },
    { name: "Users", path: "/dashboard/admin/users", icon: <FaUsers /> },
    { name: "Review", path: "/dashboard/admin/reviews", icon: <FaChartBar /> },
  ];

  return (
    <div className="w-full max-w-xs mx-auto mt-6 p-5 bg-white shadow-lg rounded-lg border border-gray-200">
      <h4 className="text-2xl font-bold text-center mb-4 text-gray-800">Admin Panel</h4>
      <div className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path} 
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 text-lg 
              ${
                pathname === item.path 
                  ? "bg-blue-600 text-white font-semibold shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
