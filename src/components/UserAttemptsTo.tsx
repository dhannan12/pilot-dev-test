/**
 * UserAttemptsTo — Expense form with login authentication requirement
 *
 * Features: unauthenticated access handling, login prompt, expense preview, authentication state simulation, guest mode restrictions
 *
 * Ticket: SCRUM-860 | Branch: proto/SCRUM-853
 */

import { useState } from 'react'

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
}

const PREDEFINED_CATEGORIES = [
  'Food',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Other',
]

const MOCK_EXPENSES: Expense[] = [
  { id: '1', title: 'Example: Grocery Shopping', amount: 85.50, category: 'Food', date: '2026-08-10' },
  { id: '2', title: 'Example: Gas Station', amount: 45.00, category: 'Transportation', date: '2026-08-09' },
  { id: '3', title: 'Example: Movie Tickets', amount: 28.00, category: 'Entertainment', date: '2026-08-08' },
  { id: '4', title: 'Example: Coffee Shop', amount: 12.50, category: 'Food', date: '2026-08-07' },
  { id: '5', title: 'Example: Electricity Bill', amount: 120.00, category: 'Utilities', date: '2026-08-06' },
]

export default function UserAttemptsTo() {
  // Simulate user authentication state (starts as not logged in)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  
  const [expenses] = useState<Expense[]>(MOCK_EXPENSES)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if user is logged in BEFORE attempting to add expense
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return
    }

    // If logged in, would normally add the expense (not implemented in this demo)
    alert(`Expense "${title}" would be added for user: ${userName}`)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (userName.trim()) {
      setIsLoggedIn(true)
      setShowLoginPrompt(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName('')
    setTitle('')
    setAmount('')
    setCategory('')
    setDate('')
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <section data-testid="user-attempts-to" className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Auth Status */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
              <p className="text-gray-600 mt-1">
                {isLoggedIn 
                  ? `Welcome back, ${userName}!` 
                  : 'Please log in to add expenses'}
              </p>
            </div>
            <div>
              {isLoggedIn ? (
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Logged in as</span>
                  </div>
                  <p className="font-semibold text-gray-800 mb-2">{userName}</p>
                  <button
                    onClick={handleLogout}
                    data-testid="user-attempts-to-logout"
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Not logged in</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <div 
            data-testid="user-attempts-to-login-modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
                <p className="text-gray-600 mb-6">
                  You must be logged in to add expenses. Please enter your name to continue.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    data-testid="user-attempts-to-username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowLoginPrompt(false)}
                    data-testid="user-attempts-to-cancel"
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-testid="user-attempts-to-login"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Expense Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Expense</h2>
          <p className="text-gray-600 mb-6">
            {isLoggedIn 
              ? 'Fill in the details below to track your expense' 
              : 'You need to log in before adding expenses'}
          </p>

          {!isLoggedIn && (
            <div data-testid="user-attempts-to-warning" className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
              <p className="text-yellow-800 font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                You are not logged in. Log in to save your expenses.
              </p>
            </div>
          )}

          <form data-testid="user-attempts-to-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Expense Title *
              </label>
              <input
                id="title"
                type="text"
                data-testid="user-attempts-to-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Lunch at restaurant"
                disabled={!isLoggedIn}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount ($) *
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                data-testid="user-attempts-to-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                disabled={!isLoggedIn}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                data-testid="user-attempts-to-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={!isLoggedIn}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                  !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              >
                <option value="">-- Select a category --</option>
                {PREDEFINED_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                id="date"
                type="date"
                data-testid="user-attempts-to-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={!isLoggedIn}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            <button
              type="submit"
              data-testid="user-attempts-to-submit"
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                isLoggedIn
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoggedIn ? 'Add Expense' : 'Log In to Add Expense'}
            </button>
          </form>
        </div>

        {/* Example Expenses List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Example Expenses</h2>
          <p className="text-gray-600 mb-4">Preview of what expense tracking looks like</p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600">Total Example Expenses</p>
            <p className="text-2xl font-bold text-blue-600">${totalExpenses.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">{expenses.length} example expense{expenses.length !== 1 ? 's' : ''}</p>
          </div>

          <ul data-testid="user-attempts-to-list" className="space-y-3">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                data-testid="user-attempts-to-item"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-sm text-gray-600">{expense.date}</span>
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
                      {expense.category}
                    </span>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-800">${expense.amount.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
