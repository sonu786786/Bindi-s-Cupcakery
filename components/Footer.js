import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        
        {/* Column 1: Branding & Description */}
        <div>
          <h2 className="text-xl font-bold text-pink-400">Bindi's Cupcakery 🍰</h2>
          <p className="text-sm mt-2">
            Homemade, eggless, and preservative-free desserts made with love in Surat.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-yellow-400">Quick Links</h3>
          <Link href="/collections" className="text-gray-300 hover:text-white mt-1">All Collections</Link>
          <Link href="/custom-orders" className="text-gray-300 hover:text-white mt-1">Custom Orders</Link>
          <Link href="/about" className="text-gray-300 hover:text-white mt-1">About Us</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white mt-1">Contact Us</Link>
        </div>

        {/* Column 3: Social & WhatsApp */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold text-blue-400">Stay Connected</h3>
          <div className="flex gap-4 mt-2">
            <Link href="https://www.instagram.com/bindis_cupcakery">
              <button className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-3 py-1 rounded-full">
                Instagram 📸
              </button>
            </Link>
            <Link href="https://www.facebook.com/bindis_cupcakery">
              <button className="bg-blue-600 text-white px-3 py-1 rounded-full">
                Facebook 👍
              </button>
            </Link>
          </div>
          <div className="mt-4">
            <Image src="/whatsapp-qr.png" alt="WhatsApp Order QR" width={100} height={100} />
            <p className="text-xs mt-2">Scan to Order on WhatsApp 📱</p>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="text-center border-t border-gray-700 mt-6 pt-4 text-sm">
        <p>Copyright &copy; {new Date().getFullYear()} Bindi's Cupcakery - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
