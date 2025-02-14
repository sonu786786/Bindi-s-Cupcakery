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
        headers: {
          Authorization: `Bearer ${token}` // Include token in the header
        }
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Fallback image for broken images
  const fallbackImage = "https://via.placeholder.com/150"; // Placeholder image URL

  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <h1 className="text-2xl font-semibold text-center mb-6">All Products List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((p) => (
          <Link
            key={p._id}
            href={`http://localhost:4000/dashboard/admin/product/${p.slug}`} // Using Next.js Link for navigation
            passHref
          >
            <div className="card bg-gray-700 border border-gray-600 rounded-md p-4">
              <img
                src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`} // Full URL
                className="w-full h-48 object-cover rounded-md mb-4"
                alt={p.name}
                onError={(e) => e.target.src = fallbackImage} // Fallback image on error
              />
              <div className="card-body">
                <h5 className="card-title text-xl font-medium">{p.name}</h5>
                <p className="card-text text-gray-300">{p.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
