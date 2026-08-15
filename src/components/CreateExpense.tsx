/**
 * CreateExpense — Form to add new expense entries with category, amount, date, and notes
 *
 * Features: category selection, amount input, date picker, notes field, form validation
 *
 * Ticket: SCRUM-862 | Branch: proto/SCRUM-853
 */

import { useState } from 'react'

interface Expense {
  id: string
  category: string
  amount: number
  date: string
  description: string
  paymentMethod: string
}

const MOCK_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Utilities',
  'Other'
]

const MOCK_PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'Digital Wallet'
]

const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    category: 'Food & Dining',
    amount: 45.99,
    date: '2026-08-14',
    description: 'Lunch at downtown restaurant',
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    category: 'Transportation',
    amount: 25.00,
    date: '2026-08-13',
    description: 'Uber ride to office',
    paymentMethod: 'Digital Wallet'
  },
  {
    id: '3',
    category: 'Shopping',
    amount: 89.50,
    date: '2026-08-12',
    description: 'Groceries for the week',
    paymentMethod: 'Debit Card'
  },
  {
    id: '4',
    category: 'Entertainment',
    amount: 30.00,
    date: '2026-08-11',
    description: 'Movie tickets',
    paymentMethod: 'Cash'
  },
  {
    id: '5',
    category: 'Healthcare',
    amount: 120.00,
    date: '2026-08-10',
    description: 'Medical checkup',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '6',
    category: 'Utilities',
    amount: 75.00,
    date: '2026-08-09',
    description: 'Internet bill',
    paymentMethod: 'Bank Transfer'
  }
]

export default function CreateExpense() {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES)
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    paymentMethod: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0'
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description'
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description,
      paymentMethod: formData.paymentMethod
    }

    setExpenses([newExpense, ...expenses])

    // Reset form
    setFormData({
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paymentMethod: ''
    })
  }

  const handleReset = () => {
    setFormData({
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      paymentMethod: ''
    })
    setErrors({})
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div data-testid="create-expense" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Expense Tracker</h1>
          <p className="text-gray-600 mb-6">Track and manage your expenses efficiently</p>

          <form data-testid="create-expense-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  data-testid="create-expense-category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {MOCK_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($) *
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  data-testid="create-expense-amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  data-testid="create-expense-date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method *
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  data-testid="create-expense-payment-method"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.paymentMethod ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select payment method</option>
                  {MOCK_PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                data-testid="create-expense-description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter expense details..."
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                data-testid="create-expense-submit"
                className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Add Expense
              </button>
              <button
                type="button"
                data-testid="create-expense-reset"
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Expenses</h2>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-blue-600" data-testid="create-expense-total">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>
          </div>

          <div data-testid="create-expense-list" className="space-y-3">
            {expenses.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No expenses added yet</p>
            ) : (
              expenses.map((expense) => (
                <div
                  key={expense.id}
                  data-testid="create-expense-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{expense.description}</h3>
                      <p className="text-sm text-gray-600">{expense.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">${expense.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{expense.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
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
