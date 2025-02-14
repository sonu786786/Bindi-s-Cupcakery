'use client'
import { useAuth } from "../../../Context/auth";
import UserMenu from "../../../components/Usermenu";
import Head from "next/head";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <Head>

      </Head>
      <div className="min-h-screen bg-gray-800 text-white p-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 p-4">
            <UserMenu />
          </div>
          <div className="w-full md:w-3/4 p-4">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">{auth?.user?.name}</h3>
              <p className="text-lg mb-2">{auth?.user?.email}</p>
              <p className="text-lg">{auth?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
