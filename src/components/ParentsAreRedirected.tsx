/**
 * ParentsAreRedirected — Redirects parents to payment portal after login
 *
 * Features: login form, redirect simulation, payment portal link, session status, parent user list
 *
 * Ticket: SCRUM-989 | Branch: proto/SCRUM-983
 */

import { useState } from 'react'

interface Parent {
  id: string
  name: string
  email: string
  children: string[]
  status: 'logged-in' | 'logged-out'
}

const mockParents: Parent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    children: ['Emily Johnson', 'Michael Johnson'],
    status: 'logged-out',
  },
  {
    id: '2',
    name: 'David Chen',
    email: 'david.chen@email.com',
    children: ['Sophie Chen'],
    status: 'logged-out',
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    children: ['Carlos Garcia', 'Isabella Garcia', 'Diego Garcia'],
    status: 'logged-out',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    children: ['Olivia Wilson', 'Noah Wilson'],
    status: 'logged-out',
  },
  {
    id: '5',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    children: ['Aarav Patel', 'Aisha Patel'],
    status: 'logged-out',
  },
]

export default function ParentsAreRedirected() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedInParent, setLoggedInParent] = useState<Parent | null>(null)
  const [redirecting, setRedirecting] = useState(false)
  const [showPaymentPortal, setShowPaymentPortal] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate login - find parent by email
    const parent = mockParents.find(p => p.email === email)
    
    if (parent && password) {
      setLoggedInParent({ ...parent, status: 'logged-in' })
      setRedirecting(true)
      
      // Simulate redirect after 1.5 seconds
      setTimeout(() => {
        setRedirecting(false)
        setShowPaymentPortal(true)
      }, 1500)
    }
  }

  const handleLogout = () => {
    setLoggedInParent(null)
    setShowPaymentPortal(false)
    setEmail('')
    setPassword('')
  }

  if (showPaymentPortal && loggedInParent) {
    return (
      <section data-testid="parentsareredirected" className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-green-700">Payment Portal</h1>
              <button
                data-testid="parentsareredirected-logout"
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </div>

            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 rounded">
              <p className="text-green-800">
                <span className="font-semibold">Welcome, {loggedInParent.name}!</span> You have been successfully redirected to the payment portal.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Children</h2>
              <ul data-testid="parentsareredirected-list" className="space-y-2">
                {loggedInParent.children.map((child, index) => (
                  <li
                    key={index}
                    data-testid="parentsareredirected-item"
                    className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    {child}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Available Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  data-testid="parentsareredirected-viewbalance"
                  className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  View Account Balance
                </button>
                <button
                  data-testid="parentsareredirected-makepayment"
                  className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Make Payment
                </button>
                <button
                  data-testid="parentsareredirected-paymenthistory"
                  className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                >
                  Payment History
                </button>
                <button
                  data-testid="parentsareredirected-autopay"
                  className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Setup Auto-Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (redirecting) {
    return (
      <section data-testid="parentsareredirected" className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Redirecting...</h2>
          <p className="text-gray-600">Taking you to the payment portal</p>
        </div>
      </section>
    )
  }

  return (
    <section data-testid="parentsareredirected" className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">Parent Login</h1>
          <p className="text-center text-gray-600 mb-6">School Canteen Pre-Order System</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                data-testid="parentsareredirected-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="parent@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                data-testid="parentsareredirected-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              data-testid="parentsareredirected-submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login & Redirect to Payment
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-2">Test Accounts:</p>
            <ul className="text-xs text-gray-500 space-y-1">
              {mockParents.slice(0, 3).map((parent) => (
                <li key={parent.id}>• {parent.email}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
