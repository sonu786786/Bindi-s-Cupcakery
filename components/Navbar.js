"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/Context/auth";
import { useRouter } from "next/navigation";
import useCategory from "@/hooks/useCategory";
import { useCart } from "@/Context/cart";

const Navbar = () => {
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const collectionsRef = useRef(null);
  const ordersRef = useRef(null);
  const userMenuRef = useRef(null);
  
  const categories = useCategory();
  const [auth, login, logout] = useAuth();
  const router = useRouter();
  const { cart } = useCart();
  const cartCount = cart.length;

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("auth"));
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collectionsRef.current && !collectionsRef.current.contains(event.target)) {
        setCollectionsOpen(false);
      }
      if (ordersRef.current && !ordersRef.current.contains(event.target)) {
        setOrdersOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white text-black flex justify-between items-center px-6 h-20 relative shadow-md">
      {/* Logo & Name */}
      <Link href="/">
        <div className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/logo.jpg"
            alt="Bindi's Cupcakery"
            width={55}
            height={55}
            className="rounded-full"
          />
          <h2 className="text-xl font-bold">Bindi’s Cupcakery</h2>
        </div>
      </Link>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 text-black border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 w-64"
        />
        <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
          🔍
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6">
        {/* All Collections - Dropdown (2 Columns) */}
        <li className="relative" ref={collectionsRef}>
          <span
            onClick={() => setCollectionsOpen(!collectionsOpen)}
            className="cursor-pointer hover:text-purple-500"
          >
            All Collections ▼
          </span>
          {collectionsOpen && (
            <ul className="absolute left-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg z-50 grid grid-cols-2 gap-2 p-2 border border-gray-200">
              {categories.map((c) => (
                <li key={c.slug} className="px-4 py-2 hover:bg-gray-100 transition-all">
                  <Link href={`/category/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Custom Orders - Dropdown */}
        <li className="relative" ref={ordersRef}>
          <span
            onClick={() => setOrdersOpen(!ordersOpen)}
            className="cursor-pointer hover:text-purple-500"
          >
            Custom Orders ▼
          </span>
          {ordersOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 border border-gray-200">
              <li className="px-4 py-2 hover:bg-gray-100 transition-all">
                <Link href="/Design_Your_Own">Design Your Own</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 transition-all">
                <Link href="/Choose_from_Our_Collection">Choose from Our Collection</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/About_Us" className="hover:text-purple-500">
            About Us
          </Link>
        </li>

        <li>
          <Link href="/Contact_Us" className="hover:text-purple-500">
            Contact Us
          </Link>
        </li>

        {/* Add to Cart Button */}
        <li>
          <Link href="/cart" className="relative flex items-center">
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </li>

        {/* Login/Register or User Menu */}
        {!isAuthenticated ? (
          <>
            <li>
              <Link
                href="/Register"
                className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition-all"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/Login"
                className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition-all"
              >
                Login
              </Link>
            </li>
          </>
        ) : (
          <li className="relative" ref={userMenuRef}>
            <span
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="cursor-pointer hover:text-purple-500"
            >
              {auth?.user?.name} ▼
            </span>
            {userMenuOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
