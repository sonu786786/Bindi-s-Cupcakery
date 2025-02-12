"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../../Context/auth";
import moment from "moment";
import { Select } from "antd";
import AdminMenu from "../../../../components/Adminmenu";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value });
      getOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}
      <div className="col-md-3">
            <AdminMenu />
        </div>
      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          All Orders
        </h1>

        {orders?.map((order, index) => (
          <div key={order._id} className="bg-white shadow-md rounded-lg p-4 mb-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr className="text-left">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Buyer</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Payment</th>
                  <th className="p-2 border">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    <Select
                      defaultValue={order?.status}
                      className="w-full"
                      onChange={(value) => handleChange(order._id, value)}
                    >
                      {status.map((s, i) => (
                        <Option key={i} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td className="p-2 border">{order?.buyer?.name}</td>
                  <td className="p-2 border">{moment(order?.createdAt).fromNow()}</td>
                  <td className="p-2 border">{order?.payment.success ? "Success" : "Failed"}</td>
                  <td className="p-2 border">{order?.products?.length}</td>
                </tr>
              </tbody>
            </table>

            {/* Products List */}
            <div className="mt-4">
              {order?.products?.map((product) => {
                const imageUrl = `http://localhost:4000/api/v1/product/product-photo/${product._id}`;
                return (
                  <div
                    key={product._id}
                    className="flex items-center bg-gray-100 p-3 rounded-md shadow-md mb-2"
                  >
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                      onError={(e) => e.target.src = '/path/to/fallback-image.jpg'} // Fallback image if the image fails to load
                    />
                    <div className="ml-4">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-gray-500">{product.description.substring(0, 30)}...</p>
                      <p className="text-gray-700 font-bold">₹{product.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
