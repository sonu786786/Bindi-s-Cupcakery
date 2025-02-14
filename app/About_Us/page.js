"use client";
import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] flex items-center justify-center">
        <Image
          src="/logo.jpg"
          alt="Bindi’s Cupcakery"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute text-center px-6 backdrop-blur-md bg-black/10 rounded-lg py-6">
          <h1 className="text-5xl font-extrabold text-black md:text-6xl">Bindi’s Cupcakery</h1>
          <p className="text-lg text-gray-800 mt-4 max-w-3xl">
            Bringing you the finest homemade, eggless, and preservative-free desserts.
          </p>
        </div>
      </div>

      {/* Business Overview */}
      <section className="max-w-5xl mx-auto py-12 px-6 text-center">
        <h2 className="text-4xl font-semibold text-purple-600">Who We Are</h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          Bindi’s Cupcakery is a vegetarian, eggless bakery offering a wide variety of homemade, 
          preservative-free desserts such as cupcakes, brownies, cakes, and ice creams.  
          Operating as a cloud kitchen in Parle Point, Surat, customers can pick up their orders in person.
        </p>
      </section>

      {/* Key Highlights */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center text-yellow-500">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg text-center shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-pink-500">100% Eggless & Homemade</h3>
              <p className="mt-2 text-gray-600">
                Every dessert is crafted with pure, natural ingredients, ensuring freshness without preservatives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-blue-500">Wide Variety</h3>
              <p className="mt-2 text-gray-600">
                From cupcakes and brownies to cakes and ice creams, we bring delicious choices for every sweet lover.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-green-500">Custom Orders</h3>
              <p className="mt-2 text-gray-600">
                Customize your desserts for birthdays, weddings, and special occasions just the way you like it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Trust Section */}
      <section className="py-12 text-center bg-purple-300 text-white">
        <h2 className="text-4xl font-semibold">Join Our Sweet Community</h2>
        <p className="mt-4 text-lg">
          Thousands of happy customers have enjoyed our delicious, eggless desserts.  
          Follow us on Instagram & Facebook to stay updated.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-12 text-center">
        <h2 className="text-4xl font-semibold text-purple-600">Visit Us at Parle Point, Surat</h2>
        <p className="mt-2 text-lg text-gray-700">
          Ready to enjoy our delicious treats? Order today and experience pure sweetness.
        </p>
      </section>
    </div>
  );
};

export default About;
