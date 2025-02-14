import Link from "next/link";

const UserMenu = () => {
  return (
    <div className="bg-gray-100 text-gray-900 p-6 rounded-lg shadow-md">
      <div className="text-center">
        <h4 className="text-xl text-black font-semibold mb-4">Dashboard</h4>
        <div className="space-y-3">
          <Link
            href="/dashboard/user/profile"
            className="block px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow-sm border border-gray-300 hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Profile
          </Link>
          <Link
            href="/dashboard/user/orders"
            className="block px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow-sm border border-gray-300 hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
