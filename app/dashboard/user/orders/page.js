'use client'
import React, { useState, useEffect } from "react";
import UserMenu from "./../../../../components/Usermenu";
import axios from "axios";
import { useAuth } from "../../../../Context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4 p-4">
          <UserMenu />
        </div>
        <div className="w-full md:w-3/4 p-4">
          <h1 className="text-3xl font-semibold text-center mb-6">Your Orders</h1>
          {orders?.map((o, i) => (
            <div key={i} className="mb-6 bg-gray-800 rounded-lg shadow-lg p-4">
              <table className="min-w-full table-auto text-left">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-2 px-4 text-lg">#</th>
                    <th className="py-2 px-4 text-lg">Status</th>
                    <th className="py-2 px-4 text-lg">Buyer</th>
                    <th className="py-2 px-4 text-lg">Date</th>
                    <th className="py-2 px-4 text-lg">Payment</th>
                    <th className="py-2 px-4 text-lg">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-600">
                    <td className="py-2 px-4">{i + 1}</td>
                    <td className="py-2 px-4">{o?.status}</td>
                    <td className="py-2 px-4">{o?.buyer?.name}</td>
                    <td className="py-2 px-4">{moment(o?.createAt).fromNow()}</td>
                    <td className="py-2 px-4">{o?.payment.success ? "Success" : "Failed"}</td>
                    <td className="py-2 px-4">{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="space-y-4 mt-4">
                {o?.products?.map((p) => (
                  <div key={p._id} className="flex items-center bg-gray-700 rounded-lg p-3">
                    <div className="w-1/4">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-3/4 pl-4">
                      <p className="font-semibold text-lg">{p.name}</p>
                      <p className="text-sm text-gray-400">{p.description.substring(0, 30)}...</p>
                      <p className="text-lg text-yellow-400">Price: ${p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
