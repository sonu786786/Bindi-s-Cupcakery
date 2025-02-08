"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  return (
    <nav className="bg-black text-white flex justify-between items-center px-6 h-20 relative">
      {/* Logo & Name */}
      <div className="flex items-center gap-3">
        <Image src="/logo.jpg" alt="Bindi's Cupcakery" width={55} height={55} className="rounded-full" />
        <h2 className="text-xl font-bold">Bindi’s Cupcakery</h2>
      </div>

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
            <div
              className="absolute left-0 mt-2 w-48 bg-purple-700 text-white rounded-lg shadow-lg z-10"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <Link href="/cupcakes" className="block px-4 py-2 hover:bg-purple-800">Cupcakes</Link>
              <Link href="/brownies" className="block px-4 py-2 hover:bg-purple-800">Brownies</Link>
              <Link href="/cakes" className="block px-4 py-2 hover:bg-purple-800">Cakes</Link>
              <Link href="/pastries" className="block px-4 py-2 hover:bg-purple-800">Pastries</Link>
              <Link href="/cookies" className="block px-4 py-2 hover:bg-purple-800">Cookies</Link>
              <Link href="/icecreams" className="block px-4 py-2 hover:bg-purple-800">Ice Creams</Link>
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
            <div
              className="absolute left-0 mt-2 w-48 bg-purple-700 text-white rounded-lg shadow-lg z-10"
              onMouseEnter={() => setOrdersOpen(true)}
              onMouseLeave={() => setOrdersOpen(false)}
            >
              <Link href="/design-your-own" className="block px-4 py-2 hover:bg-purple-800">Design Your Own</Link>
              <Link href="/choose-collection" className="block px-4 py-2 hover:bg-purple-800">Choose from Our Collection</Link>
            </div>
          )}
        </div>

        <Link href="/contact">
          <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5">
            Contact Us
          </button>
        </Link>

        <Link href="/about">
          <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5">
            About Us
          </button>
        </Link>

        {/* Login/Register Button */}
        <Link href="/Register">
          <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5">
          Register
          </button>
        </Link>

        <Link href="/login">
          <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5">
            Login
          </button>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
