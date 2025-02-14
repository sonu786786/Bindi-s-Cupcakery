'use client'
import { useAuth } from "../../../Context/auth";
import UserMenu from "../../../components/Usermenu";
import Head from "next/head";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900 p-6">
        <div className="flex flex-wrap">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 p-4">
            <UserMenu />
          </div>

          {/* User Info */}
          <div className="w-full md:w-3/4 p-4">
            <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
              <h3 className="text-2xl font-semibold text-blue-600">{auth?.user?.name}</h3>
              <p className="text-lg text-gray-700">{auth?.user?.email}</p>
              <p className="text-lg text-gray-600">{auth?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
