'use client'; // Ensure this is a client component

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import AdminMenu from "../../../../components/Adminmenu";
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

  const auth = JSON.parse(localStorage.getItem("auth")); // Parse stored object
  const token = auth?.token; // Extract token

  // Get all categories
  const getAllCategory = async () => {
    if (!token) {
      console.log("Error: No token found");
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      console.log("Fetching categories with token:", token);
      const { data } = await axios.get("http://localhost:4000/api/v1/category/get-category", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (data?.success) {
        console.log("Categories fetched successfully:", data.category);
        setCategories(data?.category);
      } else {
        console.log("Error fetching categories:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log("Error: No token found");
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      console.log("Creating product with token:", token);

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
        console.log("Product created successfully");
        toast.success("Product Created Successfully");
        // Navigate to products page after creation
        window.location.href = "/dashboard/admin/products"; // Use direct navigation
      } else {
        console.log("Error creating product:", data?.message);
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Something went wrong while creating the product");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <h1 className="text-2xl font-semibold mb-6">Create Product</h1>
      <form className="space-y-4" onSubmit={handleCreate}>
        {/* Category Selection */}
        <div className="mb-4">
          <Select
            variant="filled" // Updated from 'bordered' to 'variant'
            placeholder="Select a category"
            size="large"
            showSearch
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
            onChange={(value) => setCategory(value)}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Uploading Photo */}
        <div className="mb-4">
          <label className="w-full text-center py-2 border border-gray-600 rounded-md cursor-pointer bg-gray-700 text-white">
            {photo ? photo.name : "Upload Photo"}
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
        <div className="mb-4">
          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height="200px"
                className="img img-responsive"
              />
            </div>
          )}
        </div>

        {/* Product Details Inputs */}
        <div className="mb-4">
          <input
            type="text"
            value={name}
            placeholder="Product Name"
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <textarea
            value={description}
            placeholder="Product Description"
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={price}
            placeholder="Price"
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={quantity}
            placeholder="Quantity"
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* Shipping Selection */}
        <div className="mb-4">
          <Select
            variant="filled" // Updated from 'bordered' to 'variant'
            placeholder="Select Shipping"
            size="large"
            showSearch
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
            onChange={(value) => setShipping(value)}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            CREATE PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
