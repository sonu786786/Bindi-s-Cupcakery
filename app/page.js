"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReviewForm from "../components/reveiwForm";
import ReviewSlider from "../components/Reveiwslider";
import WhatsAppQR  from "../components/WhatsappQR"

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = ["/cake.jpg", "/hp_img2.jpg", "/hp_img3.jpg", "/Rose Pistachio Cranberry Truffle.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-gray-900">
 {/* Floating WhatsApp QR */}
<div className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-lg z-50">
  <WhatsAppQR />
</div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center h-[85vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={images[selectedImage]}
            alt="Bindi's Cupcakery Special"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 bg-white bg-opacity-0 px-6 py-8 rounded-lg shadow-md">
          <h1 className="text-5xl font-extrabold text-pink-600 md:text-6xl">
            Welcome to Bindi’s Cupcakery 🍰
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            100% Eggless, Homemade & Preservative-Free Desserts in Surat!
          </p>
          <Link href="/products">
            <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg transition">
              Order Now
            </button>
          </Link>
        </div>
      </section>

    {/* Feature Highlights Section */}
<section className="py-16 bg-gradient-to-b from-pink-50 to-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold text-pink-600 mb-10">Why Choose Bindi’s Cupcakery?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[
        {
          title: "100% Vegetarian & Preservative-Free",
          description: "Enjoy homemade treats made with natural ingredients, completely eggless and free from preservatives.",
          img: "/cake.png", // Update with actual icon
        },
        {
          title: "Wide Range of Desserts",
          description: "From ice creams to cupcakes, brownies, and cakes, we offer a variety of delicious options for every craving.",
          img: "/sweets.png", // Update with actual icon
        },
        {
          title: "Customizable Hampers",
          description: "Personalize dessert hampers for birthdays, weddings, and special occasions.",
          img: "/hamper.png", // Update with actual icon
        },
        {
          title: "Seamless Ordering",
          description: "Scan our WhatsApp QR code to place an order instantly and enjoy quick pickups from our cloud kitchen.",
          img: "/order.png", // Update with actual icon
        },
       
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <div className="w-16 h-16 mb-4">
            <Image
              src={item.img}
              alt={item.title}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* Our Products Section */}
      <section className="py-16 bg-gray-100 px-6 text-center">
        <h2 className="text-4xl font-bold text-pink-600">Our Products 🍪</h2>
        <p className="mt-2 text-gray-700">
          Indulge in our delicious range of sweet treats.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            { name: "Cakes", img: "/cakes.jpg", link: "/cakes" },
            { name: "Brownies", img: "/brownies.jpg", link: "/brownies" },
            { name: "Desserts & Cupcakes", img: "/cupcakes.jpg", link: "/desserts" },
            { name: "Pastries", img: "/pastries.jpg", link: "/pastries" },
          ].map((item, index) => (
            <Link key={index} href={item.link} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <span className="text-xl font-bold text-white">{item.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/products">
          <button className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition">
            View More
          </button>
        </Link>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-white px-6 text-center">
        <h2 className="text-4xl font-bold text-pink-600">Best Sellers 🔥</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {[
            { name: "Red Velvet Cupcake", price: "₹199", img: "/red_velvet.jpg" },
            { name: "Choco Lava Cake", price: "₹249", img: "/lava_cake.jpg" },
            { name: "Classic Brownie", price: "₹149", img: "/classic_brownie.jpg" },
          ].map((item, index) => (
            <div key={index} className="w-64 bg-gray-100 shadow-lg rounded-lg p-4 border border-gray-200">
              <Image
                src={item.img}
                alt={item.name}
                width={250}
                height={200}
                className="rounded-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.name}</h3>
              <p className="text-pink-600 font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-pink-500 text-center text-white">
        <h2 className="text-4xl font-bold">Craving Something Sweet?</h2>
        <p className="mt-2 text-lg">Order now and satisfy your taste buds! 🍰</p>
        <Link href="/products">
          <button className="mt-6 bg-white text-pink-600 font-bold py-3 px-8 rounded-full text-lg transition hover:bg-gray-200">
            Explore Menu
          </button>
        </Link>
      </section>

    {/* ⭐ Review Form Section - Before Testimonials */}
<section className="px-6 py-12 bg-pink-100 rounded-lg shadow-md">
  <h2 className="text-3xl font-bold text-center text-pink-600">
    Share Your Experience 💬
  </h2>
  <p className="text-center text-gray-700 mt-2">
    We value your feedback! Leave a review below.
  </p>

  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
    <ReviewForm /> {/* ✅ Users can submit reviews here */}
  </div>

  {/* ⭐ Testimonial Slider with subtle background and padding */}
  <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
    <ReviewSlider />
  </div>
</section>



    </div>
  );
}
