"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMenu = () => {
  const pathname = usePathname();

  const linkClasses = (path) =>
    `list-group-item list-group-item-action ${
      pathname === path ? "active" : ""
    }`;

  return (
    <div className="text-center">
      <div className="list-group">
        <h4>Admin Panel</h4>
        <Link href="/dashboard/admin/create-category" className={linkClasses("/dashboard/admin/create-category")}>
          Create Category
        </Link>
        <Link href="/dashboard/admin/create-product" className={linkClasses("/dashboard/admin/create-product")}>
          Create Product
        </Link>
        <Link href="/dashboard/admin/products" className={linkClasses("/dashboard/admin/products")}>
          Products
        </Link>
        <Link href="/dashboard/admin/orders" className={linkClasses("/dashboard/admin/orders")}>
          Orders
        </Link>
        <Link href="/dashboard/admin/users" className={linkClasses("/dashboard/admin/users")}>
          Users
        </Link>
      </div>
    </div>
  );
};

export default AdminMenu;
