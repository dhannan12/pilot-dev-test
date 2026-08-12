import { useState } from 'react'

interface Order {
  id: string
  customerName: string
  items: string[]
  totalAmount: number
  status: 'pending_review' | 'approved' | 'rejected'
  submittedAt: string
  reviewedBy?: string
  reviewedAt?: string
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    customerName: 'Sarah Johnson',
    items: ['Premium IPA Case (24)', 'Craft Lager Case (24)', 'Seasonal Ale Case (12)'],
    totalAmount: 145.99,
    status: 'pending_review',
    submittedAt: '2026-08-12T10:30:00Z'
  },
  {
    id: 'ORD-1002',
    customerName: 'Michael Chen',
    items: ['Stout Variety Pack (36)', 'Pilsner Case (24)', 'Wheat Beer Case (24)'],
    totalAmount: 289.50,
    status: 'approved',
    submittedAt: '2026-08-12T09:15:00Z',
    reviewedBy: 'Coordinator A',
    reviewedAt: '2026-08-12T10:00:00Z'
  },
  {
    id: 'ORD-1003',
    customerName: 'Emma Wilson',
    items: ['Pale Ale Case (24)', 'Amber Ale Case (24)', 'Porter Case (12)'],
    totalAmount: 178.75,
    status: 'pending_review',
    submittedAt: '2026-08-12T11:00:00Z'
  },
  {
    id: 'ORD-1004',
    customerName: 'David Rodriguez',
    items: ['Craft Beer Sampler (48)', 'Premium Lager Case (36)'],
    totalAmount: 225.00,
    status: 'approved',
    submittedAt: '2026-08-12T08:45:00Z',
    reviewedBy: 'Coordinator B',
    reviewedAt: '2026-08-12T09:30:00Z'
  },
  {
    id: 'ORD-1005',
    customerName: 'Lisa Martinez',
    items: ['IPA Variety Pack (36)', 'Session Ale Case (24)', 'Blonde Ale Case (24)'],
    totalAmount: 312.25,
    status: 'rejected',
    submittedAt: '2026-08-12T07:30:00Z',
    reviewedBy: 'Coordinator A',
    reviewedAt: '2026-08-12T08:15:00Z'
  },
  {
    id: 'ORD-1006',
    customerName: 'James Thompson',
    items: ['Lager Case (24)', 'Wheat Beer Case (24)', 'Saison Case (12)'],
    totalAmount: 156.80,
    status: 'pending_review',
    submittedAt: '2026-08-12T11:45:00Z'
  }
]

export default function OrderOver() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const handleApprove = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? {
            ...order,
            status: 'approved',
            reviewedBy: 'Logistics Coordinator',
            reviewedAt: new Date().toISOString()
          }
        : order
    ))
    setSelectedOrder(null)
  }

  const handleReject = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? {
            ...order,
            status: 'rejected',
            reviewedBy: 'Logistics Coordinator',
            reviewedAt: new Date().toISOString()
          }
        : order
    ))
    setSelectedOrder(null)
  }

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true
    return order.status === filterStatus
  })

  const getStatusBadgeColor = (status: Order['status']) => {
    switch (status) {
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Review Dashboard
          </h1>
          <p className="text-gray-600">
            Orders over $100 require logistics coordinator review before fulfillment
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="filter" className="text-sm font-medium text-gray-700">
              Filter by status:
            </label>
            <select
              id="filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Orders</option>
              <option value="pending_review">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="ml-auto flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-gray-600">
                  {orders.filter(o => o.status === 'pending_review').length} Pending
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-gray-600">
                  {orders.filter(o => o.status === 'approved').length} Approved
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-gray-600">
                  {orders.filter(o => o.status === 'rejected').length} Rejected
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Orders List</h2>
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              filteredOrders.map(order => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white rounded-lg shadow-sm border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedOrder?.id === order.id
                      ? 'border-blue-500'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        order.status
                      )}`}
                    >
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.submittedAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedOrder.id}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-medium text-gray-900">
                        {selectedOrder.customerName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(selectedOrder.submittedAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-bold text-blue-600 text-lg">
                        ${selectedOrder.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                  <ul className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedOrder.reviewedBy && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Review Information</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reviewed by:</span>
                        <span className="font-medium text-gray-900">
                          {selectedOrder.reviewedBy}
                        </span>
                      </div>
                      {selectedOrder.reviewedAt && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reviewed at:</span>
                          <span className="font-medium text-gray-900">
                            {formatDate(selectedOrder.reviewedAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedOrder.status === 'pending_review' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(selectedOrder.id)}
                      className="flex-1 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve Order
                    </button>
                    <button
                      onClick={() => handleReject(selectedOrder.id)}
                      className="flex-1 px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Reject Order
                    </button>
                  </div>
                )}

                {selectedOrder.status !== 'pending_review' && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      This order has been {selectedOrder.status === 'approved' ? 'approved' : 'rejected'} and cannot be modified
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500">
                  Select an order to view details and take action
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
