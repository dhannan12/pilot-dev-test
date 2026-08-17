/**
 * StudentsSubmitOrders — Students submit meal orders before the cutoff time
 *
 * Features: Menu selection, quantity input, cutoff time display, order submission, order history
 *
 * Ticket: SCRUM-985 | Branch: proto/SCRUM-983
 */

import { useState } from 'react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  available: boolean
}

interface OrderItem {
  menuItemId: string
  menuItemName: string
  quantity: number
  price: number
}

interface SubmittedOrder {
  id: string
  studentName: string
  items: OrderItem[]
  totalAmount: number
  submittedAt: string
  status: 'pending' | 'confirmed' | 'ready'
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Chicken Sandwich',
    description: 'Grilled chicken with lettuce and tomato',
    price: 4.50,
    category: 'Main',
    available: true,
  },
  {
    id: 'item-2',
    name: 'Veggie Wrap',
    description: 'Fresh vegetables wrapped in a whole wheat tortilla',
    price: 3.75,
    category: 'Main',
    available: true,
  },
  {
    id: 'item-3',
    name: 'Fruit Salad',
    description: 'Mixed seasonal fruits',
    price: 2.50,
    category: 'Side',
    available: true,
  },
  {
    id: 'item-4',
    name: 'Chocolate Milk',
    description: 'Cold chocolate milk 250ml',
    price: 1.50,
    category: 'Drink',
    available: true,
  },
  {
    id: 'item-5',
    name: 'Pizza Slice',
    description: 'Margherita pizza slice',
    price: 3.25,
    category: 'Main',
    available: true,
  },
  {
    id: 'item-6',
    name: 'Apple Juice',
    description: '100% apple juice 250ml',
    price: 1.25,
    category: 'Drink',
    available: true,
  },
  {
    id: 'item-7',
    name: 'Caesar Salad',
    description: 'Crisp romaine with Caesar dressing',
    price: 4.00,
    category: 'Main',
    available: true,
  },
]

const MOCK_SUBMITTED_ORDERS: SubmittedOrder[] = [
  {
    id: 'order-1',
    studentName: 'Emma Wilson',
    items: [
      { menuItemId: 'item-1', menuItemName: 'Chicken Sandwich', quantity: 1, price: 4.50 },
      { menuItemId: 'item-4', menuItemName: 'Chocolate Milk', quantity: 1, price: 1.50 },
    ],
    totalAmount: 6.00,
    submittedAt: '2026-08-17T08:30:00',
    status: 'confirmed',
  },
  {
    id: 'order-2',
    studentName: 'Liam Chen',
    items: [
      { menuItemId: 'item-5', menuItemName: 'Pizza Slice', quantity: 2, price: 3.25 },
    ],
    totalAmount: 6.50,
    submittedAt: '2026-08-17T08:45:00',
    status: 'confirmed',
  },
  {
    id: 'order-3',
    studentName: 'Sophia Martinez',
    items: [
      { menuItemId: 'item-2', menuItemName: 'Veggie Wrap', quantity: 1, price: 3.75 },
      { menuItemId: 'item-3', menuItemName: 'Fruit Salad', quantity: 1, price: 2.50 },
      { menuItemId: 'item-6', menuItemName: 'Apple Juice', quantity: 1, price: 1.25 },
    ],
    totalAmount: 7.50,
    submittedAt: '2026-08-17T09:00:00',
    status: 'pending',
  },
  {
    id: 'order-4',
    studentName: 'Noah Johnson',
    items: [
      { menuItemId: 'item-7', menuItemName: 'Caesar Salad', quantity: 1, price: 4.00 },
      { menuItemId: 'item-4', menuItemName: 'Chocolate Milk', quantity: 1, price: 1.50 },
    ],
    totalAmount: 5.50,
    submittedAt: '2026-08-17T09:15:00',
    status: 'ready',
  },
  {
    id: 'order-5',
    studentName: 'Olivia Brown',
    items: [
      { menuItemId: 'item-1', menuItemName: 'Chicken Sandwich', quantity: 1, price: 4.50 },
      { menuItemId: 'item-3', menuItemName: 'Fruit Salad', quantity: 1, price: 2.50 },
    ],
    totalAmount: 7.00,
    submittedAt: '2026-08-17T09:30:00',
    status: 'confirmed',
  },
]

export default function StudentsSubmitOrders() {
  const [studentName, setStudentName] = useState('')
  const [cart, setCart] = useState<OrderItem[]>([])
  const [orders, setOrders] = useState<SubmittedOrder[]>(MOCK_SUBMITTED_ORDERS)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [orderSubmitted, setOrderSubmitted] = useState(false)

  // Cutoff time is 10:00 AM
  const cutoffTime = '10:00 AM'
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  const isBeforeCutoff = new Date().getHours() < 10

  const handleQuantityChange = (itemId: string, value: string) => {
    const qty = parseInt(value) || 0
    setQuantities({ ...quantities, [itemId]: qty })
  }

  const addToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1
    if (quantity <= 0) return

    const existingItemIndex = cart.findIndex(cartItem => cartItem.menuItemId === item.id)
    
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += quantity
      setCart(updatedCart)
    } else {
      setCart([...cart, {
        menuItemId: item.id,
        menuItemName: item.name,
        quantity,
        price: item.price,
      }])
    }
    
    setQuantities({ ...quantities, [item.id]: 0 })
  }

  const removeFromCart = (menuItemId: string) => {
    setCart(cart.filter(item => item.menuItemId !== menuItemId))
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleSubmitOrder = () => {
    if (!studentName.trim() || cart.length === 0) {
      alert('Please enter your name and add items to cart')
      return
    }

    if (!isBeforeCutoff) {
      alert('Sorry, the order cutoff time has passed')
      return
    }

    const newOrder: SubmittedOrder = {
      id: `order-${Date.now()}`,
      studentName,
      items: [...cart],
      totalAmount: getTotalAmount(),
      submittedAt: new Date().toISOString(),
      status: 'pending',
    }

    setOrders([newOrder, ...orders])
    setCart([])
    setStudentName('')
    setOrderSubmitted(true)
    
    setTimeout(() => setOrderSubmitted(false), 3000)
  }

  return (
    <div data-testid="students-submit-orders" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">School Canteen Pre-Order</h1>
          <div className="flex items-center gap-4">
            <p className="text-lg text-gray-600">
              Current Time: <span className="font-semibold">{currentTime}</span>
            </p>
            <p className="text-lg text-gray-600">
              Order Cutoff: <span className="font-semibold text-red-600">{cutoffTime}</span>
            </p>
            {isBeforeCutoff ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Orders Open
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Orders Closed
              </span>
            )}
          </div>
        </div>

        {orderSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            Order submitted successfully! Your order will be ready at lunch time.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Today's Menu</h2>
              <div data-testid="students-submit-orders-menu-list" className="space-y-4">
                {MOCK_MENU_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    data-testid="students-submit-orders-menu-item"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                          {item.category}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-green-600">
                        ${item.price.toFixed(2)}
                      </span>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={quantities[item.id] || ''}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        placeholder="0"
                        data-testid={`students-submit-orders-quantity-${item.id}`}
                        className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isBeforeCutoff}
                      />
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!isBeforeCutoff || !quantities[item.id] || quantities[item.id] <= 0}
                        data-testid={`students-submit-orders-add-${item.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Order</h2>
              
              <div className="mb-4">
                <label htmlFor="student-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name"
                  data-testid="students-submit-orders-student-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isBeforeCutoff}
                />
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div data-testid="students-submit-orders-cart-list" className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div
                      key={item.menuItemId}
                      data-testid="students-submit-orders-cart-item"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.menuItemName}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          ${(item.quantity * item.price).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.menuItemId)}
                          data-testid={`students-submit-orders-remove-${item.menuItemId}`}
                          className="text-red-600 hover:text-red-800 text-xl"
                          disabled={!isBeforeCutoff}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">${getTotalAmount().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={!isBeforeCutoff || cart.length === 0 || !studentName.trim()}
                data-testid="students-submit-orders-submit"
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                {isBeforeCutoff ? 'Submit Order' : 'Orders Closed'}
              </button>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
          <div data-testid="students-submit-orders-history-list" className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                data-testid="students-submit-orders-history-item"
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{order.studentName}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.submittedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-lg font-bold text-green-600">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        order.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'ready'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      • {item.quantity}× {item.menuItemName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
