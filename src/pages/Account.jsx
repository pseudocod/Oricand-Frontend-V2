import React from "react";
import { motion } from "framer-motion";

// Mock user data
const mockUser = {
  firstName: "VLAD",
  email: "test@diana.com",
  phoneNumber: "N/A",
  defaultDeliveryAddress: "N/A",
  profilePicture: null,
};

export default function Account() {
  const user = mockUser;

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-white text-black px-6 flex items-center justify-center"
    >
      <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-16">
        {/* LEFT: Text */}
        <motion.div
          className="flex-1 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <h1 className="text-9xl font-light tracking-wide text-gray-900 leading-none mb-3">
              {user.firstName}
            </h1>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md">
              Welcome to your coffee sanctuary. Track your exclusive drops,
              manage your profile, and stay connected to the community.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <span className="text-gray-400 w-16">Email</span>
                <span className="text-gray-700">{user.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gray-400 w-16">Phone</span>
                <span className="text-gray-700">{user.phoneNumber}</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gray-400 w-16">Address</span>
                <span className="text-gray-700">
                  {user.defaultDeliveryAddress}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex space-x-6 text-xs tracking-wide">
            <button
              onClick={handleEditProfile}
              className="text-gray-700 text-lg hover:text-black underline underline-offset-4 decoration-[1px] transition-all duration-200 cursor-pointer"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-700 text-lg hover:text-black underline underline-offset-4 decoration-[1px] transition-all duration-200 cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </motion.div>

        {/* RIGHT: Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-[600px] h-[550px]">
            <img
              src="/oricand-drop-1.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
