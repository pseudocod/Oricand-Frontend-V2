import OrderList from "./OrderList";

export default function OrderContent({ orders, loading }) {
  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">Loading orders...</p>
        </div>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
} 