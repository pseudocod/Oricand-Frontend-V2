import { useAuth } from "../context/UserContext";
import { useProfileForm } from "../hooks/useProfileForm";
import { useAddresses } from "../hooks/useAddresses";
import { useOrders } from "../hooks/useOrders";
import ProfileField from "../components/profile/ProfileField";
import AddressForm from "../components/profile/AddressForm";
import AddressList from "../components/profile/AddressList";
import OrderList from "../components/profile/OrderList";
import TabButton from "../components/ui/TabButton";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Account() {
  const { user, logout } = useAuth();
  const { editing, formData, handleEdit, handleChange, handleSave } =
    useProfileForm(user);

  const {
    addresses,
    editingAddress,
    setEditingAddress,
    handleCreateAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    handleSetDefaultDelivery,
    handleSetDefaultBilling,
    defaultDeliveryId,
    defaultBillingId,
  } = useAddresses();

  const { orders, loading: ordersLoading } = useOrders();

  const [activeTab, setActiveTab] = useState("profile");
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handleAddressSubmit = async (addressData) => {
    if (editingAddress) {
      await handleUpdateAddress(editingAddress.id, addressData);
    } else {
      await handleCreateAddress(addressData);
    }
    setIsAddingAddress(false);
  };

  const renderProfileContent = () => (
    <div className="space-y-4">
      <ProfileField label="Email" value={user.email} editing={false} />
      <ProfileField
        label="First Name"
        value={formData.firstName}
        name="firstName"
        editing={editing}
        onChange={handleChange}
      />
      <ProfileField
        label="Last Name"
        value={formData.lastName}
        name="lastName"
        editing={editing}
        onChange={handleChange}
      />
      <ProfileField
        label="Phone"
        value={formData.phoneNumber}
        name="phoneNumber"
        editing={editing}
        onChange={handleChange}
      />
    </div>
  );

  const renderAddressContent = () => (
    <div className="space-y-8">
      {!isAddingAddress && !editingAddress && (
        <button
          onClick={() => setIsAddingAddress(true)}
          className="text-gray-700 text-sm hover:text-black underline underline-offset-4 decoration-[1px] cursor-pointer"
        >
          + Add New Address
        </button>
      )}

      {(isAddingAddress || editingAddress) && (
        <AddressForm
          address={editingAddress}
          onSubmit={handleAddressSubmit}
          onCancel={() => {
            setIsAddingAddress(false);
            setEditingAddress(null);
          }}
          isEditing={!!editingAddress}
        />
      )}

      {!isAddingAddress && !editingAddress && (
        <AddressList
          addresses={addresses}
          onEdit={setEditingAddress}
          onDelete={handleDeleteAddress}
          onSetDefaultDelivery={handleSetDefaultDelivery}
          onSetDefaultBilling={handleSetDefaultBilling}
          defaultDeliveryId={defaultDeliveryId}
          defaultBillingId={defaultBillingId}
        />
      )}
    </div>
  );

  const renderOrderContent = () => (
    <div className="space-y-4">
      {ordersLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Loading orders...</p>
        </div>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-white text-black px-6 flex items-center justify-center"
    >
      <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-16">
        <motion.div
          className="flex-1 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <h1 className="text-7xl font-extralight tracking-wide text-gray-900 leading-none mb-3">
              {user.firstName}
            </h1>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md">
              Welcome to your coffee sanctuary. Track your exclusive drops,
              manage your profile, and stay connected to the community.
            </p>

            <div className="flex space-x-8 mb-8 border-b border-gray-200">
              <TabButton
                isActive={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </TabButton>
              <TabButton
                isActive={activeTab === "addresses"}
                onClick={() => setActiveTab("addresses")}
              >
                Addresses
              </TabButton>
              <TabButton
                isActive={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </TabButton>
            </div>

            <div
              className="relative h-[220px] overflow-y-scroll"
              data-lenis-prevent
            >
              {activeTab === "profile" && renderProfileContent()}
              {activeTab === "addresses" && renderAddressContent()}
              {activeTab === "orders" && renderOrderContent()}
            </div>

            <div className="mt-5 flex space-x-6 text-xs tracking-wide">
              {activeTab === "profile" && (
                <>
                  {!editing ? (
                    <button
                      onClick={handleEdit}
                      className="text-gray-700 text-lg hover:text-black underline underline-offset-4 decoration-[1px] cursor-pointer"
                    >
                      edit profile
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="text-gray-700 text-lg hover:text-black underline underline-offset-4 decoration-[1px] cursor-pointer"
                    >
                      save changes
                    </button>
                  )}
                </>
              )}
              <button
                onClick={logout}
                className="text-gray-700 text-lg hover:text-black underline underline-offset-4 decoration-[1px] cursor-pointer"
              >
                logout
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-[600px] h-[550px]">
            <video
              src="videos/oricand-hero.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
