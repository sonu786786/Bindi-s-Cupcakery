'use client'; // Ensure this is a client component

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link"; // Using Next.js Link for routing
import AdminMenu from "../../../../components/Adminmenu";

const Products = () => {
  const [products, setProducts] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth")); // Parse stored object
  const token = auth?.token; // Extract token

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/product/get-product", {
        headers: { Authorization: `Bearer ${token}` }, // Include token in the header
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching products.");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Fallback image for broken images
  const fallbackImage = "https://via.placeholder.com/150"; // Placeholder image URL

  return (
    <div className="container mx-auto p-6 bg-white text-black min-h-screen">
      <div className="flex">
        {/* Sidebar for Admin Menu */}
        <div className="w-1/4 pr-6">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="w-3/4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">All Products</h1>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((p) => (
              <Link key={p._id} href={`/dashboard/admin/product/${p.slug}`} passHref>
                <div className="card bg-gray-400 border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer">
                  <img
                    src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`} // Full URL
                    className="w-full h-48 object-cover rounded-md mb-4"
                    alt={p.name}
                    onError={(e) => (e.target.src = fallbackImage)} // Fallback image on error
                  />
                  <div className="card-body">
                    <h5 className="card-title text-lg font-bold text-gray-900">{p.name}</h5>
                    <p className="card-text text-gray-800">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
