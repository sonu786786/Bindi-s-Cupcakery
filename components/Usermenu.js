import Link from "next/link";

const UserMenu = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <h4 className="text-xl font-semibold mb-4">Dashboard</h4>
        <div className="space-y-2">
          <Link href="/dashboard/user/profile" className="block px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
            Profile
          </Link>
          <Link href="/dashboard/user/orders" className="block px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
