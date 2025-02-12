import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16 relative">
      {/* Top Divider Line */}
      <div className="w-full border-t border-gray-600 mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">
        
        {/* Column 1: Branding & Description */}
        <div>
          <h2 className="text-2xl font-bold text-pink-400">Bindi's Cupcakery 🍰</h2>
          <p className="text-sm mt-2 text-gray-400">
            Homemade, eggless, and preservative-free desserts made with love in Surat.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400">Quick Links</h3>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Link href="/Cupcakes" className="text-gray-300 hover:text-white">Cupcakes</Link>
            <Link href="/Brownies" className="text-gray-300 hover:text-white">Brownies</Link>
            <Link href="/Cakes" className="text-gray-300 hover:text-white">Cakes</Link>
            <Link href="/Pastries" className="text-gray-300 hover:text-white">Pastries</Link>
            <Link href="/Cookies" className="text-gray-300 hover:text-white">Cookies</Link>
            <Link href="/Icecreams" className="text-gray-300 hover:text-white">Ice Creams</Link>
            <Link href="/About_Us" className="text-gray-300 hover:text-white">About Us</Link>
            <Link href="/Contact_Us" className="text-gray-300 hover:text-white">Contact Us</Link>
            <Link href="/" className="text-gray-300 hover:text-white">Terms of Service</Link>
            <Link href="/" className="text-gray-300 hover:text-white">Privacy Policy</Link>
          </div>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold text-blue-400">Stay Connected</h3>
          <div className="flex gap-3 mt-3">
            <Link href="https://www.instagram.com/bindis_cupcakery" target="_blank">
              <button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-full flex items-center gap-2 transition hover:scale-105">
                📸 Instagram
              </button>
            </Link>
            <Link href="https://www.facebook.com/bindi.malji" target="_blank">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition hover:scale-105">
                👍 Facebook
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center border-t border-gray-700 mt-8 pt-4 text-sm text-gray-400">
        <p>Copyright &copy; {new Date().getFullYear()} Bindi's Cupcakery - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
