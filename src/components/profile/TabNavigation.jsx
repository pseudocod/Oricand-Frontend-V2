import TabButton from "../common/Button/TabButton";

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
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
  );
} 