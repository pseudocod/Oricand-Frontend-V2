export default function OrderList({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-1">
      {orders.map((order) => (
        <div
          key={order.id}
          className="p-4 border border-gray-200 rounded-lg space-y-2"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900">
                  Order #{order.id}
                </p>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {order.paymentType}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium text-gray-900">
                Total: ${order.totalPrice}
              </p>
              <p className="text-xs text-gray-500">
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <button
              className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer"
              onClick={() => {
                // We can implement order details view later
                console.log('View order details:', order.id);
              }}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 