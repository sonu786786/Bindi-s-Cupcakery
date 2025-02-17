"use client";
import React, { useState, useEffect } from "react";
import { Checkbox, Radio } from "antd";
import { Prices } from "../../price/price";
import { useCart } from "../../Context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useCart([]);

  useEffect(() => {
    getAllCategory();
    getAllProducts(); // Fetch all products initially
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      // Fetch all products when no filters are applied
      getAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      // Apply filters when checked or radio changes
      filterProduct();
    }
  }, [checked, radio]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/category/get-category");
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:4000/api/v1/product/product-list");
      setLoading(false);
      setProducts(data.products); // Set all products
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    value ? all.push(id) : (all = all.filter((c) => c !== id));
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:4000/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setLoading(false);
      setProducts(data?.products); // Set filtered products
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    if (!Array.isArray(cart)) setCart([]);
    setCart((prevCart) => [...prevCart, product]);
    toast.success("Item Added to Cart");
  };

  return (
    <div className="bg-white text-black min-h-screen p-6">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-lg">
          {/* Filter By Category Section */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 text-center">Filter By Category</h4>
            <div className="space-y-3">
              {categories?.map((c) => (
                <label key={c._id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
                  />
                  <span className="text-gray-700">{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-200" />

          {/* Filter By Price Section */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4 text-gray-800 text-center">Filter By Price</h4>
            <div className="space-y-3">
              {Prices?.map((p) => (
                <label key={p._id} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="price"
                    value={p.array}
                    onChange={(e) => setRadio(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-500 focus:ring-blue-400"
                  />
                  <span className="text-gray-700">{p.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reset Filters Button */}
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>

        {/* Products Section */}
        <div className="md:w-3/4">
          <h1 className="text-4xl font-extrabold text-center text-blue-500">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {products?.map((p) => (
              <div key={p._id} className="bg-white p-4 rounded-lg shadow-lg">
                <Image
                  src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  width={300}
                  height={300}
                  className="w-full h-56 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h5 className="text-xl font-semibold">{p.name}</h5>
                  <p className="text-gray-600 text-sm mt-1">{p.description.substring(0, 50)}...</p>
                  <p className="text-blue-500 font-bold mt-2">₹ {p.price}</p>

                  {/* Buttons in Same Row with Styling */}
                  <div className="mt-4 flex justify-between items-center">
                    <Link href={`/products/${p.slug}`} passHref>
                      <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition-all font-semibold text-sm w-full">
                        More Details
                      </button>
                    </Link>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-all font-semibold text-sm w-full"
                      onClick={() => handleAddToCart(p)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;