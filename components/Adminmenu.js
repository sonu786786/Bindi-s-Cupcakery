"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Create Category", path: "/dashboard/admin/create-category" },
    { name: "Create Product", path: "/dashboard/admin/create-product" },
    { name: "Products", path: "/dashboard/admin/products" },
    { name: "Orders", path: "/dashboard/admin/orders" },
    { name: "Users", path: "/dashboard/admin/users" },
  ];

  return (
    <div className="max-w-xs mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <h4 className="text-xl font-semibold text-center mb-4 text-gray-800">Admin Panel</h4>
      <div className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path} 
            className={`px-4 py-2 rounded-md transition-all duration-300 text-center text-lg 
              ${
                pathname === item.path 
                  ? "bg-blue-500 text-white font-semibold" 
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
