"use client"; // Ensure this is a client component

import { useState, useEffect, useCallback } from "react"; // Add useCallback
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import AdminMenu from "../../../../components/Adminmenu";
import Image from "next/image";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const auth = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("auth")) : null; // Ensure localStorage is accessed only in the browser
  const token = auth?.token;

  // Memoize getAllCategory to prevent re-creation on every render
  const getAllCategory = useCallback(async () => {
    if (!token) {
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/category/get-category", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while fetching categories.");
    }
  }, [token]); // Add token as a dependency

  // Fetch categories when the component mounts
  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]); // Add getAllCategory to the dependency array

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!token) {
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/product/create-product",
        productData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        window.location.href = "/dashboard/admin/products"; // Navigate to products page
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong while creating the product.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex">
      {/* Sidebar */}
      <div className="w-1/4 p-6 bg-gray-100 min-h-screen shadow-md">
        <AdminMenu />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Create Product</h1>

        <form className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleCreate}>
          {/* Category Selection */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Category</label>
            <Select
              placeholder="Select a category"
              size="large"
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Upload Photo */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Upload Photo</label>
            <label className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200">
              {photo ? photo.name : "Choose an image"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>

          {/* Image Preview */}
          {photo && (
            <div className="mb-4 text-center">
              <Image src={URL.createObjectURL(photo)} alt="product_photo" className="h-40 mx-auto rounded-md" />
            </div>
          )}

          {/* Product Details */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Product Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              value={description}
              placeholder="Enter product description"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Price</label>
            <input
              type="number"
              value={price}
              placeholder="Enter price"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              placeholder="Enter quantity"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Shipping Selection */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Shipping</label>
            <Select
              placeholder="Select Shipping Option"
              size="large"
              className="w-full border border-gray-300 rounded-md p-2"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">Not Available</Option>
              <Option value="1">Available</Option>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              CREATE PRODUCT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
