/**
 * UserAttemptsTo — Expense form with category validation
 *
 * Features: expense entry form, category selection validation, error messaging, real-time feedback, expense list display
 *
 * Ticket: SCRUM-858 | Branch: proto/SCRUM-853
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
  { id: '1', title: 'Grocery Shopping', amount: 85.50, category: 'Food', date: '2026-08-10' },
  { id: '2', title: 'Gas Station', amount: 45.00, category: 'Transportation', date: '2026-08-09' },
  { id: '3', title: 'Movie Tickets', amount: 28.00, category: 'Entertainment', date: '2026-08-08' },
  { id: '4', title: 'Coffee Shop', amount: 12.50, category: 'Food', date: '2026-08-07' },
  { id: '5', title: 'Electricity Bill', amount: 120.00, category: 'Utilities', date: '2026-08-06' },
]

export default function UserAttemptsTo() {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous messages
    setError('')
    setSuccessMessage('')

    // Validate that title is provided
    if (!title.trim()) {
      setError('Please enter an expense title.')
      return
    }

    // Validate that amount is provided and valid
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount greater than 0.')
      return
    }

    // Validate that date is provided
    if (!date) {
      setError('Please select a date.')
      return
    }

    // CRITICAL VALIDATION: Category must be selected
    if (!category) {
      setError('Please select a category before adding the expense.')
      return
    }

    // All validations passed - add the expense
    const newExpense: Expense = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
    }

    setExpenses([newExpense, ...expenses])
    setSuccessMessage(`Successfully added "${title}" to your expenses.`)

    // Clear form
    setTitle('')
    setAmount('')
    setCategory('')
    setDate('')

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <section data-testid="user-attempts-to" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Expense</h1>
          <p className="text-gray-600 mb-6">Track your expenses by category</p>

          <div className="bg-indigo-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-indigo-600">${totalExpenses.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">{expenses.length} expense{expenses.length !== 1 ? 's' : ''} recorded</p>
          </div>

          {error && (
            <div data-testid="user-attempts-to-error" className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {successMessage && (
            <div data-testid="user-attempts-to-success" className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
              <p className="text-green-700 font-medium">{successMessage}</p>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Expense History</h2>
          <ul data-testid="user-attempts-to-list" className="space-y-3">
            {expenses.length === 0 ? (
              <li className="text-center text-gray-500 py-8">No expenses recorded yet</li>
            ) : (
              expenses.map((expense) => (
                <li
                  key={expense.id}
                  data-testid="user-attempts-to-item"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-150"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                    <div className="flex gap-4 mt-1">
                      <span className="text-sm text-gray-600">{expense.date}</span>
                      <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">
                        {expense.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-gray-800">${expense.amount.toFixed(2)}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
