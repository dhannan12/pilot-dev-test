/**
 * UserAttemptsTo — Expense form with validation preventing negative amounts
 *
 * Features: negative amount validation, title validation, amount input, category selection, error messaging
 *
 * Ticket: SCRUM-855 | Branch: proto/SCRUM-853
 */

import { useState } from 'react'

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
}

const MOCK_EXPENSES: Expense[] = [
  { id: '1', title: 'Grocery Shopping', amount: 85.50, category: 'Food', date: '2026-08-10' },
  { id: '2', title: 'Gas Station', amount: 45.00, category: 'Transportation', date: '2026-08-09' },
  { id: '3', title: 'Movie Tickets', amount: 28.00, category: 'Entertainment', date: '2026-08-08' },
  { id: '4', title: 'Coffee Shop', amount: 12.50, category: 'Food', date: '2026-08-07' },
  { id: '5', title: 'Electricity Bill', amount: 120.00, category: 'Utilities', date: '2026-08-06' },
]

const CATEGORIES = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Other']

export default function UserAttemptsTo() {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate: user must provide a title
    if (!title.trim()) {
      setError('Title is required. Please provide a title for the expense.')
      return
    }

    // Validate: amount must be provided and positive
    if (!amount || amount.trim() === '') {
      setError('Amount is required. Please provide an amount.')
      return
    }

    const amountValue = parseFloat(amount)
    
    if (isNaN(amountValue)) {
      setError('Please provide a valid numeric amount.')
      return
    }

    if (amountValue < 0) {
      setError('Amount cannot be negative. Please enter a positive value.')
      return
    }

    if (amountValue === 0) {
      setError('Amount must be greater than zero.')
      return
    }

    // Add the expense
    const newExpense: Expense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: amountValue,
      category,
      date: new Date().toISOString().split('T')[0],
    }

    setExpenses([newExpense, ...expenses])
    setTitle('')
    setAmount('')
    setCategory('Food')
    setError('')
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <section data-testid="user-attempts-to" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Expense Tracker</h1>
          <p className="text-gray-600 mb-6">Track your expenses and manage your budget</p>

          <form data-testid="user-attempts-to-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                data-testid="user-attempts-to-title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (error) setError('')
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Lunch at restaurant"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount ($)
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                data-testid="user-attempts-to-amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  if (error) setError('')
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                data-testid="user-attempts-to-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div data-testid="user-attempts-to-error" className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              data-testid="user-attempts-to-submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Add Expense
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Expenses</h2>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-indigo-600">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>

          <ul data-testid="user-attempts-to-list" className="space-y-3">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                data-testid="user-attempts-to-item"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-sm text-gray-600">{expense.date}</span>
                    <span className="text-sm text-indigo-600 font-medium">{expense.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">${expense.amount.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>

          {expenses.length === 0 && (
            <p className="text-center text-gray-500 py-8">No expenses yet. Add your first expense above!</p>
          )}
        </div>
      </div>
    </section>
  )
}
