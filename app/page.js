"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = ["/cake.jpg", "/hp_img2.jpg", "/hp_img3.jpg", "/hp_img4.jpg"];

  // Automatically change hero image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center h-[85vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={images[selectedImage]}
            alt="Bindi's Cupcakery Special"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-6xl font-extrabold md:text-7xl">Bindi’s Cupcakery 🍰</h1>
          <p className="mt-4 text-xl md:text-2xl">Eggless | Homemade | Preservative-Free</p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link href="/shop">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg transition">
                Order Now
              </button>
            </Link>
            <Link href="/About_Us">
              <button className="border border-white text-white font-bold py-3 px-8 rounded-full text-lg transition hover:bg-white hover:text-pink-600">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Our Specialties ✨</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { name: "Cupcakes", img: "/cupcakes.jpg" },
            { name: "Brownies", img: "/brownies.jpg" },
            { name: "Custom Cakes", img: "/custom_cake.jpg" },
          ].map((item, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
              <Image src={item.img} alt={item.name} width={400} height={300} className="w-full h-60 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <h3 className="text-white text-2xl font-bold">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-100 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900">Best Sellers 🔥</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {[
            { name: "Red Velvet Cupcake", price: "₹199", img: "/red_velvet.jpg" },
            { name: "Choco Lava Cake", price: "₹249", img: "/lava_cake.jpg" },
            { name: "Classic Brownie", price: "₹149", img: "/classic_brownie.jpg" },
          ].map((item, index) => (
            <div key={index} className="w-64 bg-white shadow-lg rounded-lg p-4">
              <Image src={item.img} alt={item.name} width={250} height={200} className="rounded-md" />
              <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
              <p className="text-pink-600 font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-900">Customer Love ❤️</h2>
        <div className="mt-8 space-y-6">
          {[
            { name: "Priya Sharma", review: "Absolutely delicious cupcakes! Best in town." },
            { name: "Rohan Mehta", review: "Loved the red velvet cupcake. Will order again!" },
            { name: "Ananya Patel", review: "Perfectly baked and fresh. Highly recommended!" },
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-200 rounded-lg p-6 max-w-lg mx-auto shadow-md">
              <p className="text-gray-700">"{testimonial.review}"</p>
              <h4 className="mt-2 font-semibold text-pink-600">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-pink-600 text-center text-white">
        <h2 className="text-4xl font-bold">Craving Something Sweet?</h2>
        <p className="mt-2 text-lg">Order now and satisfy your taste buds! 🍰</p>
        <Link href="/shop">
          <button className="mt-6 bg-white text-pink-600 font-bold py-3 px-8 rounded-full text-lg transition hover:bg-gray-200">
            Explore Menu
          </button>
        </Link>
      </section>
    </div>
  );
}
