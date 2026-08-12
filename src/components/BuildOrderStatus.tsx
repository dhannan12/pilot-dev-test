import React from 'react';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  estimatedTime?: string;
  pickupTime?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2026-001',
    date: '2026-08-12T10:30:00',
    status: 'preparing',
    items: [
      { name: 'Craft IPA - Hazy Dreams', quantity: 2, price: 8.99 },
      { name: 'Dark Stout - Midnight Brew', quantity: 1, price: 9.99 },
    ],
    total: 27.97,
    estimatedTime: '15 minutes',
  },
  {
    id: '2',
    orderNumber: 'ORD-2026-002',
    date: '2026-08-12T09:15:00',
    status: 'ready',
    items: [
      { name: 'Lager - Golden Sunset', quantity: 4, price: 7.99 },
      { name: 'Wheat Ale - Summer Breeze', quantity: 2, price: 8.49 },
    ],
    total: 48.94,
    pickupTime: 'Ready for pickup',
  },
  {
    id: '3',
    orderNumber: 'ORD-2026-003',
    date: '2026-08-11T16:45:00',
    status: 'completed',
    items: [
      { name: 'Pale Ale - Citrus Hop', quantity: 3, price: 8.99 },
      { name: 'Sour Ale - Berry Burst', quantity: 1, price: 10.99 },
    ],
    total: 37.96,
    pickupTime: 'Picked up on 2026-08-11',
  },
  {
    id: '4',
    orderNumber: 'ORD-2026-004',
    date: '2026-08-12T11:00:00',
    status: 'confirmed',
    items: [
      { name: 'Porter - Chocolate Dream', quantity: 2, price: 9.49 },
      { name: 'Amber Ale - Autumn Spice', quantity: 2, price: 8.99 },
    ],
    total: 36.96,
    estimatedTime: '30 minutes',
  },
  {
    id: '5',
    orderNumber: 'ORD-2026-005',
    date: '2026-08-10T14:20:00',
    status: 'cancelled',
    items: [
      { name: 'Belgian Tripel - Holy Grail', quantity: 1, price: 11.99 },
    ],
    total: 11.99,
  },
];

const STATUS_COLORS = {
  pending: 'bg-gray-100 text-gray-800 border-gray-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
  preparing: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  ready: 'bg-green-100 text-green-800 border-green-300',
  completed: 'bg-purple-100 text-purple-800 border-purple-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
};

const STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready for Pickup',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function BuildOrderStatus() {
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(MOCK_ORDERS[0]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProgressPercentage = (status: Order['status']): number => {
    const progressMap = {
      pending: 0,
      confirmed: 25,
      preparing: 50,
      ready: 75,
      completed: 100,
      cancelled: 0,
    };
    return progressMap[status];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Status</h1>
          <p className="text-gray-600">Track your craft beverage orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Orders</h2>
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`bg-white rounded-lg shadow-sm border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedOrder?.id === order.id ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      STATUS_COLORS[order.status]
                    }`}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  ${order.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedOrder.orderNumber}
                    </h2>
                    <p className="text-gray-600">{formatDate(selectedOrder.date)}</p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                      STATUS_COLORS[selectedOrder.status]
                    }`}
                  >
                    {STATUS_LABELS[selectedOrder.status]}
                  </span>
                </div>

                {/* Progress Bar */}
                {selectedOrder.status !== 'cancelled' && (
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Order Progress</span>
                      <span className="text-sm font-medium text-gray-700">
                        {getProgressPercentage(selectedOrder.status)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${getProgressPercentage(selectedOrder.status)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                      <span>Confirmed</span>
                      <span>Preparing</span>
                      <span>Ready</span>
                      <span>Completed</span>
                    </div>
                  </div>
                )}

                {/* Status Message */}
                {selectedOrder.estimatedTime && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-900 font-medium">
                      Estimated time: {selectedOrder.estimatedTime}
                    </p>
                  </div>
                )}

                {selectedOrder.pickupTime && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-900 font-medium">{selectedOrder.pickupTime}</p>
                  </div>
                )}

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="border-t-2 border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                  {selectedOrder.status === 'ready' && (
                    <button className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
                      Confirm Pickup
                    </button>
                  )}
                  {(selectedOrder.status === 'pending' || selectedOrder.status === 'confirmed') && (
                    <button className="flex-1 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
                      Cancel Order
                    </button>
                  )}
                  <button className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-gray-600">Select an order to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
