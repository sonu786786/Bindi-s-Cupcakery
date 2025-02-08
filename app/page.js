"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [
    "/cake.jpg",
    "/hp_img2.jpg",
    "/hp_img3.jpg",
    "/hp_img4.jpg",
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-pink-500">
          Welcome to Bindi’s Cupcakery 🍰
        </h1>
        <p className="mt-4 text-lg">
          100% Eggless, Homemade & Preservative-Free Desserts in Surat!
        </p>
        <Link href="/about_us">
          <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full">
            Order Now
          </button>
        </Link>
      </section>

      {/* Image Carousel */}
      <section className="flex flex-col items-center">
        <div className="relative w-3/4 md:w-1/2 h-64">
          <Image
            src={images[selectedImage]}
            alt="Bindi's Cupcakery Special"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex gap-2 mt-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-4 h-4 rounded-full ${
                selectedImage === index ? "bg-pink-500" : "bg-gray-400"
              }`}
            ></button>
          ))}
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
