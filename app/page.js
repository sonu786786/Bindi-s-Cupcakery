"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    "/cake.jpg",
    "/hp_img2.jpg",
    "/hp_img3.jpg",
    "/hp_img4.jpg",
  ];

  // Automatically change hero image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section - Full Screen */}
      <section className="relative flex flex-col items-center justify-center text-center h-screen w-full">
        {/* Background Image that Changes Every 3 Seconds */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={images[selectedImage]}
            alt="Bindi's Cupcakery Special"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-pink-400 md:text-6xl">
            Welcome to Bindi’s Cupcakery 🍰
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            100% Eggless, Homemade & Preservative-Free Desserts in Surat!
          </p>
          <Link href="/products">
            <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full text-lg transition">
              Order Now
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Why Choose Us? 🌟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-pink-400">
              Homemade & Eggless 🥚🚫
            </h3>
            <p>No preservatives, only natural ingredients!</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-pink-400">
              Wide Variety 🍪
            </h3>
            <p>Cupcakes, brownies, ice creams, and more!</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-pink-400">
              Customizable Hampers 🎁
            </h3>
            <p>Perfect for birthdays, weddings, and festivals.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
