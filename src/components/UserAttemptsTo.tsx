/**
 * UserAttemptsTo — User attempts to add an expense with a future date
 *
 * Features: expense form, date validation, future date prevention, error messaging, expense list
 *
 * Ticket: SCRUM-861 | Branch: proto/SCRUM-853
 */

import { useState } from 'react'

interface Expense {
  id: number
  description: string
  amount: number
  date: string
  status: 'valid' | 'rejected'
}

const mockExpenses: Expense[] = [
  { id: 1, description: 'Office Supplies', amount: 45.99, date: '2026-08-10', status: 'valid' },
  { id: 2, description: 'Client Lunch', amount: 82.50, date: '2026-08-12', status: 'valid' },
  { id: 3, description: 'Software Subscription', amount: 29.99, date: '2026-08-13', status: 'valid' },
  { id: 4, description: 'Travel Expenses', amount: 150.00, date: '2026-08-14', status: 'valid' },
  { id: 5, description: 'Conference Ticket', amount: 299.00, date: '2026-08-20', status: 'rejected' }
]

export default function UserAttemptsTo() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const getTodayDate = () => {
    const today = new Date('2026-08-14') // Using current date from context
    return today.toISOString().split('T')[0]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validate required fields
    if (!description.trim()) {
      setError('Description is required')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0')
      return
    }

    if (!date) {
      setError('Date is required')
      return
    }

    // Check if date is in the future
    const selectedDate = new Date(date)
    const today = new Date('2026-08-14')
    today.setHours(0, 0, 0, 0)
    selectedDate.setHours(0, 0, 0, 0)

    if (selectedDate > today) {
      setError('Cannot add expenses with future dates. Please select today or a past date.')
      
      // Add rejected expense to list
      const newExpense: Expense = {
        id: expenses.length + 1,
        description: description.trim(),
        amount: parseFloat(amount),
        date,
        status: 'rejected'
      }
      setExpenses([newExpense, ...expenses])
      
      // Don't reset form on rejection so error stays visible
      return
    }

    // Add valid expense
    const newExpense: Expense = {
      id: expenses.length + 1,
      description: description.trim(),
      amount: parseFloat(amount),
      date,
      status: 'valid'
    }
    setExpenses([newExpense, ...expenses])
    setSuccess('Expense added successfully!')
    
    // Reset form
    setDescription('')
    setAmount('')
    setDate('')
  }

  return (
    <section data-testid="user-attempts-to" className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Expense</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} data-testid="user-attempts-to-form">
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              id="description"
              type="text"
              data-testid="user-attempts-to-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter expense description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount ($)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              data-testid="user-attempts-to-amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              id="date"
              type="date"
              data-testid="user-attempts-to-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Today: {getTodayDate()}</p>
          </div>

          {error && (
            <div data-testid="user-attempts-to-error" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div data-testid="user-attempts-to-success" className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            data-testid="user-attempts-to-submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Add Expense
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Expense History</h2>
        
        <ul data-testid="user-attempts-to-list" className="space-y-3">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              data-testid="user-attempts-to-item"
              className={`p-4 rounded-md border ${
                expense.status === 'rejected'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{expense.description}</h3>
                    {expense.status === 'rejected' && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        REJECTED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{expense.date}</p>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  ${expense.amount.toFixed(2)}
                </p>
              </div>
              {expense.status === 'rejected' && (
                <p className="text-xs text-red-600 mt-2">
                  Future date not allowed
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
