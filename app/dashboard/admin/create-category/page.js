"use client"; // Ensure this is a client component

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
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/category/create-category",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(`${name} is created`);
        getAllCategory(); // Refresh categories
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while creating category.");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
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
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating category.");
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    if (!token) {
      return toast.error("Authentication failed. Please log in.");
    }

    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/category/delete-category/${pId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting category.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="w-3/4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">Manage Categories</h1>

            {/* Category Form */}
            <div className="mb-6">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>

            {/* Categories Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-lg shadow-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 border-b text-left">Category Name</th>
                    <th className="px-6 py-3 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id} className="border-b">
                      <td className="px-6 py-3">{c.name}</td>
                      <td className="px-6 py-3 flex gap-3">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
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

            {/* Edit Category Modal */}
            {visible && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Category</h2>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                      onClick={() => setVisible(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
