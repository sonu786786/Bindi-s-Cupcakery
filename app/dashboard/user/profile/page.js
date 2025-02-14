'use client';
import { useState, useEffect } from "react";
import { useAuth } from "../../../../Context/auth";
import UserMenu from "../../../../components/Usermenu";
import toast from "react-hot-toast";
import axios from "axios";
import Head from "next/head";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost4000:/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Your Profile</title>
      </Head>
      <div className="min-h-screen bg-gray-800 text-white p-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 p-4">
            <UserMenu />
          </div>
          <div className="w-full md:w-3/4 p-4">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold text-center mb-6">USER PROFILE</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-gray-600 text-white rounded-lg"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-gray-600 text-white rounded-lg"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-gray-600 text-white rounded-lg"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-gray-600 text-white rounded-lg"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 bg-gray-600 text-white rounded-lg"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
                >
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
