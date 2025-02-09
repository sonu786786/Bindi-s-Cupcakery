'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import Navigate from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAuth } from "../../Context/auth";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();


  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/v1/auth/login', {
        email,
        password
      });
      console.log("response data",res.data);
      console.log("response data 1",res.data.user);
      console.log("response data 2",res.data.token);
      
      if(res){
        toast.success(res.data.message);
        setAuth({
            
            user: res.data.user,
            token: res.data.token,
          });
        localStorage.setItem("auth", JSON.stringify(res.data.token));
        // navigate(location.state || '/');
        console.log("setauth pass ho gya ji");
        // redirect("/");
        router.push('/')
        
    }
    else{
        toast.success(res.data.message)
    }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
}
