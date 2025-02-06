import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black text-white flex justify-between items-center px-6 h-16">
      {/* Logo */}
      <div className="font-bold text-lg">Bindi's Cupcakery</div>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 w-64"
        />
        <button className="absolute right-2 text-gray-500 hover:text-gray-700">
          🔍
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-5">
        <Link href="/collections">
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            All Collections
          </button>
        </Link>

        <Link href="/custom-orders">
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Custom Orders
          </button>
        </Link>

        <Link href="/contact">
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Contact Us
          </button>
        </Link>

        <Link href="/about">
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            About Us
          </button>
        </Link>

        {/* Login/Register Button */}
        <Link href="/login">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Login/Register
          </button>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
