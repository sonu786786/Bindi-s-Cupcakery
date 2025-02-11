'use client'; 
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link"; // Using Next.js Link for routing
import AdminMenu from "../../../../components/Adminmenu";
const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/product/get-product");
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

  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white">
      <div className="col-md-3">
            <AdminMenu />
        </div>
      <h1 className="text-2xl font-semibold text-center mb-6">All Products List</h1>
      <div className="flex flex-wrap">
        {products?.map((p) => (
          <Link
            key={p._id}
            href={`/dashboard/admin/product/${p.slug}`} // Using Next.js Link for navigation
            passHref
          >
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
              <div className="card bg-gray-700 border border-gray-600 rounded-md p-4">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top w-full h-48 object-cover rounded-md mb-4"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-xl font-medium">{p.name}</h5>
                  <p className="card-text text-gray-300">{p.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
