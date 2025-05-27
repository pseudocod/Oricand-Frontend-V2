import toast from "react-hot-toast";
import { useAuth } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Account() {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-5xl font-extralight tracking-wide text-gray-900 mb-4">
        ACCOUNT
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm text-black underline hover:text-gray-800 mb-12 transition cursor-pointer"
      >
        Log out
      </button>

      {/* Account Details Section */}
      <div className="w-full max-w-3xl space-y-12">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-light text-gray-900 mb-6">
            Account Details
          </h2>

          <div className="space-y-2 text-gray-800 text-sm">
            <p>
              <span className="font-medium">Name:</span> {user.firstName}{" "}
              {user.lastName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {user.phoneNumber || "N/A"}
            </p>
            <p>
              <span className="font-medium">Delivery Address:</span>{" "}
              {user.defaultDeliveryAddress?.street || "N/A"}
            </p>
            <p>
              <span className="font-medium">Billing Address:</span>{" "}
              {user.defaultBillingAddress?.street || "N/A"}
            </p>
            <p>
              <span className="font-medium">Role:</span> {user.role || "N/A"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Link
              to="/edit-user"
              className="px-4 py-2 border border-black text-black text-sm rounded-xs hover:bg-black hover:text-white transition"
            >
              Edit Details
            </Link>
            <button
              onClick={() => alert("Password change modal TBD")}
              className="px-4 py-2 border border-black text-black text-sm rounded-xs hover:bg-black hover:text-white transition"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-light text-gray-900 mb-6">
            Order History
          </h2>

          {/* Example static message for now */}
          <p className="text-sm text-gray-500 italic">
            You haven’t placed any orders yet.
          </p>
        </div>
      </div>
    </div>
  );
}
