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
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useCart([]);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [page]);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
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
      const { data } = await axios.get(`http://localhost:4000/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
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
      const { data } = await axios.post("http://localhost:4000/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    if (!Array.isArray(cart)) setCart([]);
    setCart((prevCart) => [...prevCart, product]);
    toast.success("Item Added to Cart");
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen p-6">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Filters Section */}
        <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-2xl font-semibold mb-4 text-blue-500 text-center">Filter By Category</h4>
          <div className="space-y-2">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="text-gray-700"
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-2xl font-semibold mt-6 mb-4 text-blue-500 text-center">Filter By Price</h4>
          <div className="space-y-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id} className="text-gray-700">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <button
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-bold transition-all"
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

          {products.length < total && (
            <div className="mt-8 flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-bold transition-all"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
