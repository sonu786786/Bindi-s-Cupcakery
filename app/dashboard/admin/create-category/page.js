'use client'; // Ensure this is a client component

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../../form/category/page";
import AdminMenu from "../../../../components/Adminmenu";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const auth = JSON.parse(localStorage.getItem("auth")); // Parse stored object
  const token = auth?.token; // Extract token

  // Handle Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log("Error: No token found");
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      console.log("Submitting with token:", token);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/category/create-category",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        console.log("Category created successfully");
        toast.success(`${name} is created`);
        getAllCategory(); // Refresh categories
      } else {
        console.log("Error in category creation:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Request Error:", error);
      toast.error("Something went wrong while creating category.");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      console.log("Fetching categories...");
      const { data } = await axios.get("http://localhost:4000/api/v1/category/get-category");

      if (data.success) {
        console.log("Categories fetched successfully:", data.category);
        setCategories(data.category);
      } else {
        console.log("Error fetching categories:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong while fetching categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log("Error: No token found");
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      console.log("Updating category:", selected?._id, "New Name:", updatedName);

      const { data } = await axios.put(
        `http://localhost:4000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        console.log("Category updated successfully");
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        console.log("Error updating category:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Something went wrong while updating category.");
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    if (!token) {
      console.log("Error: No token found");
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      console.log("Deleting category:", pId);

      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/category/delete-category/${pId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        console.log("Category deleted successfully");
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        console.log("Error deleting category:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Something went wrong while deleting category.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-black text-white">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="flex">
        <div className="w-3/4">
          <h1 className="text-2xl font-semibold mb-4">Manage Category</h1>
          <div className="p-4 w-1/2">
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <div className="w-full mt-4">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">Name</th>
                  <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <tr key={c._id}>
                    <td className="px-4 py-2 border-b">{c.name}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
