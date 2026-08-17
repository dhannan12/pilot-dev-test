/**
 * KitchenStaffConfirm — Kitchen staff interface to review and confirm pre-orders before meal service
 *
 * Features: order list view, item quantities, bulk confirmation, order status tracking, service prep workflow
 *
 * Ticket: SCRUM-990 | Branch: proto/SCRUM-983
 */

import { useState } from 'react'

interface OrderItem {
  id: string
  studentName: string
  grade: string
  meal: string
  specialRequests?: string
  quantity: number
  allergens?: string[]
  orderTime: string
  status: 'pending' | 'confirmed' | 'preparing'
}

const MOCK_ORDERS: OrderItem[] = [
  {
    id: 'ORD001',
    studentName: 'Emma Thompson',
    grade: '5A',
    meal: 'Chicken Burger with Fries',
    specialRequests: 'No pickles',
    quantity: 1,
    allergens: ['Gluten', 'Dairy'],
    orderTime: '08:30 AM',
    status: 'pending'
  },
  {
    id: 'ORD002',
    studentName: 'Liam Chen',
    grade: '6B',
    meal: 'Vegetarian Pasta',
    quantity: 1,
    allergens: ['Dairy'],
    orderTime: '08:45 AM',
    status: 'pending'
  },
  {
    id: 'ORD003',
    studentName: 'Sophia Rodriguez',
    grade: '4C',
    meal: 'Fish and Chips',
    specialRequests: 'Extra tartar sauce',
    quantity: 1,
    allergens: ['Fish', 'Gluten'],
    orderTime: '09:00 AM',
    status: 'pending'
  },
  {
    id: 'ORD004',
    studentName: 'Noah Williams',
    grade: '7A',
    meal: 'Chicken Caesar Salad',
    quantity: 1,
    allergens: ['Dairy', 'Eggs'],
    orderTime: '09:15 AM',
    status: 'pending'
  },
  {
    id: 'ORD005',
    studentName: 'Olivia Johnson',
    grade: '5B',
    meal: 'Margherita Pizza',
    specialRequests: 'Light cheese',
    quantity: 2,
    allergens: ['Gluten', 'Dairy'],
    orderTime: '09:20 AM',
    status: 'pending'
  },
  {
    id: 'ORD006',
    studentName: 'Ethan Brown',
    grade: '6A',
    meal: 'Beef Tacos',
    quantity: 1,
    allergens: ['Gluten', 'Dairy'],
    orderTime: '09:30 AM',
    status: 'confirmed'
  },
  {
    id: 'ORD007',
    studentName: 'Ava Martinez',
    grade: '4A',
    meal: 'Chicken Nuggets',
    specialRequests: 'Mild sauce only',
    quantity: 1,
    allergens: ['Gluten'],
    orderTime: '09:35 AM',
    status: 'confirmed'
  }
]

export default function KitchenStaffConfirm() {
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_ORDERS)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all')

  const handleConfirmOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'confirmed' as const } : order
      )
    )
  }

  const handleConfirmAll = () => {
    setOrders(prev =>
      prev.map(order =>
        order.status === 'pending' ? { ...order, status: 'confirmed' as const } : order
      )
    )
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  const pendingCount = orders.filter(o => o.status === 'pending').length
  const confirmedCount = orders.filter(o => o.status === 'confirmed').length

  const getMealSummary = () => {
    const summary = new Map<string, number>()
    orders.forEach(order => {
      const current = summary.get(order.meal) || 0
      summary.set(order.meal, current + order.quantity)
    })
    return Array.from(summary.entries()).map(([meal, qty]) => ({ meal, qty }))
  }

  return (
    <div data-testid="kitchenstaffconfirm" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Kitchen Order Management</h1>
              <p className="text-gray-600 mt-1">Review and confirm pre-orders before meal service</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Service Date</div>
              <div className="text-lg font-semibold text-gray-900">Today, {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="text-yellow-800 text-sm font-medium">Pending Orders</div>
              <div className="text-3xl font-bold text-yellow-900">{pendingCount}</div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <div className="text-green-800 text-sm font-medium">Confirmed Orders</div>
              <div className="text-3xl font-bold text-green-900">{confirmedCount}</div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="text-blue-800 text-sm font-medium">Total Orders</div>
              <div className="text-3xl font-bold text-blue-900">{orders.length}</div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Meal Summary</h2>
            <div className="grid grid-cols-2 gap-3">
              {getMealSummary().map(({ meal, qty }) => (
                <div key={meal} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded">
                  <span className="text-gray-700 text-sm">{meal}</span>
                  <span className="font-semibold text-gray-900">×{qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <button
                data-testid="kitchenstaffconfirm-filter-all"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Orders ({orders.length})
              </button>
              <button
                data-testid="kitchenstaffconfirm-filter-pending"
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                data-testid="kitchenstaffconfirm-filter-confirmed"
                onClick={() => setFilter('confirmed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'confirmed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Confirmed ({confirmedCount})
              </button>
            </div>
            {pendingCount > 0 && (
              <button
                data-testid="kitchenstaffconfirm-confirm-all"
                onClick={handleConfirmAll}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Confirm All Pending
              </button>
            )}
          </div>

          <div data-testid="kitchenstaffconfirm-list" className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No orders found for the selected filter.
              </div>
            ) : (
              filteredOrders.map(order => (
                <div
                  key={order.id}
                  data-testid="kitchenstaffconfirm-item"
                  className={`border rounded-lg p-4 transition-all ${
                    order.status === 'confirmed'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {order.id}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            order.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">{order.orderTime}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-600">Student</div>
                          <div className="font-semibold text-gray-900">
                            {order.studentName} <span className="text-gray-500 text-sm">({order.grade})</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Meal</div>
                          <div className="font-semibold text-gray-900">
                            {order.meal} {order.quantity > 1 && `×${order.quantity}`}
                          </div>
                        </div>
                      </div>

                      {order.allergens && order.allergens.length > 0 && (
                        <div className="mb-2">
                          <div className="text-sm text-gray-600 mb-1">Allergens</div>
                          <div className="flex gap-2">
                            {order.allergens.map(allergen => (
                              <span
                                key={allergen}
                                className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-medium"
                              >
                                ⚠️ {allergen}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {order.specialRequests && (
                        <div>
                          <div className="text-sm text-gray-600">Special Requests</div>
                          <div className="text-sm text-gray-900 italic">{order.specialRequests}</div>
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      {order.status === 'pending' ? (
                        <button
                          data-testid="kitchenstaffconfirm-confirm"
                          onClick={() => handleConfirmOrder(order.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
                        >
                          Confirm Order
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-green-700 font-medium">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Confirmed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
