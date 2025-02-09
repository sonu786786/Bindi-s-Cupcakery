// /components/Navbar.js
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/Context/auth"; // Import the useAuth hook

const Navbar = () => {
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [auth, login, logout] = useAuth(); // Use the auth state from context

  console.log("auth = ", auth);

  const handleLogout = () => {
    logout(); // Log out by clearing the context and localStorage
  };

  return (
    <nav className="bg-black text-white flex justify-between items-center px-6 h-20 relative">
      {/* Logo & Name */}
      <Link href="/"> 
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Bindi's Cupcakery" width={55} height={55} className="rounded-full" />
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
        <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">🔍</button>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6">
        {/* All Collections - Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCollectionsOpen(!collectionsOpen)}
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            All Collections ▼
          </button>
          {collectionsOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-purple-700 text-white rounded-lg shadow-lg z-10">
              <Link href="/Cupcakes" className="block px-4 py-2 hover:bg-purple-800">Cupcakes</Link>
              <Link href="/Brownies" className="block px-4 py-2 hover:bg-purple-800">Brownies</Link>
              <Link href="/Cakes" className="block px-4 py-2 hover:bg-purple-800">Cakes</Link>
              <Link href="/Pastries" className="block px-4 py-2 hover:bg-purple-800">Pastries</Link>
              <Link href="/Cookies" className="block px-4 py-2 hover:bg-purple-800">Cookies</Link>
              <Link href="/Icecreams" className="block px-4 py-2 hover:bg-purple-800">Ice Creams</Link>
            </div>
          )}
        </div>

        {/* Custom Orders - Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOrdersOpen(!ordersOpen)}
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Custom Orders ▼
          </button>
          {ordersOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-purple-700 text-white rounded-lg shadow-lg z-10">
              <Link href="/Design_Your_Own" className="block px-4 py-2 hover:bg-purple-800">Design Your Own</Link>
              <Link href="/Choose_from_Our_Collection" className="block px-4 py-2 hover:bg-purple-800">Choose from Our Collection</Link>
            </div>
          )}
        </div>

        <Link href="/About_Us">
          <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5">
            About Us
          </button>
        </Link>

        <Link href="/Contact_Us">
          <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5">
            Contact Us
          </button>
        </Link>

        {/* Conditional Buttons based on Login Status */}
        {console.log("in navbar", auth)}

        {!auth ? (
          <>
            <Link href="/Register">
              <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5">
                Register
              </button>
            </Link>
            <Link href="/Login">
              <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5">
                Login
              </button>
            </Link>
          </>
        ) : (
          <div className="relative">
            <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5">
              {auth?.user?.name}
            </button>
            <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
              <li>
                <Link
                  href={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
