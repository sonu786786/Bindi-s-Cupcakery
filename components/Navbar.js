"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/Context/auth";
import { useRouter } from "next/navigation";
import useCategory from "@/hooks/useCategory";

const Navbar = () => {
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const categories = useCategory();
  const [auth, login, logout] = useAuth();
  const router = useRouter();
  const collectionsRef = useRef(null);
  const ordersRef = useRef(null);

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        collectionsRef.current &&
        !collectionsRef.current.contains(event.target)
      ) {
        setCollectionsOpen(false);
      }
      if (ordersRef.current && !ordersRef.current.contains(event.target)) {
        setOrdersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black text-white flex justify-between items-center px-6 h-20 relative">
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
          className="px-4 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 w-64"
        />
        <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
          🔍
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6">
        {/* All Collections - Dropdown */}
        <li className="relative" ref={collectionsRef}>
          <span
            onClick={() => setCollectionsOpen(!collectionsOpen)}
            className="cursor-pointer text-white hover:text-purple-400"
          >
            All Collections ▼
          </span>
          {collectionsOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-gradient-to-br from-purple-700 to-purple-900 text-white rounded-lg shadow-lg z-10 transition-all ease-in-out">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="block px-4 py-2 hover:bg-purple-800 transition-all ease-in-out"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Custom Orders - Dropdown */}
        <li className="relative" ref={ordersRef}>
          <span
            onClick={() => setOrdersOpen(!ordersOpen)}
            className="cursor-pointer text-white hover:text-purple-400"
          >
            Custom Orders ▼
          </span>
          {ordersOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-gradient-to-br from-purple-700 to-purple-900 text-white rounded-lg shadow-lg z-10 transition-all ease-in-out">
              <li>
                <Link
                  href="/Design_Your_Own"
                  className="block px-4 py-2 hover:bg-purple-800 transition-all ease-in-out"
                >
                  Design Your Own
                </Link>
              </li>
              <li>
                <Link
                  href="/Choose_from_Our_Collection"
                  className="block px-4 py-2 hover:bg-purple-800 transition-all ease-in-out"
                >
                  Choose from Our Collection
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/About_Us" className="text-white hover:text-purple-400">
            About Us
          </Link>
        </li>

        <li>
          <Link href="/Contact_Us" className="text-white hover:text-purple-400">
            Contact Us
          </Link>
        </li>

        {/* Conditional Login/Register or User Menu */}
        {!auth?.user ? (
          <>
            <li>
              <Link
                href="/Register"
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/Login"
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Login
              </Link>
            </li>
          </>
        ) : (
          <li className="relative" ref={userMenuRef}>
            <span
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="cursor-pointer text-white hover:text-purple-400"
            >
              {auth?.user?.name} ▼
            </span>
            {userMenuOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all ease-in-out">
                <li>
                  <Link
                    href={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-100 transition-all ease-in-out"
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
