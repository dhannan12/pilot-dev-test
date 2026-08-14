/**
 * UserAttemptsTo — Expense tracker with delete authorization check
 *
 * Features: expense list display, delete attempt validation, ownership verification, error messaging, mock user system
 *
 * Ticket: SCRUM-857 | Branch: proto/SCRUM-853
 */

import { useState } from 'react'

interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  addedBy: string // user who added the expense
}

const MOCK_EXPENSES: Expense[] = [
  { id: '1', title: 'Grocery Shopping', amount: 85.50, category: 'Food', date: '2026-08-10', addedBy: 'current_user' },
  { id: '2', title: 'Gas Station', amount: 45.00, category: 'Transportation', date: '2026-08-09', addedBy: 'other_user' },
  { id: '3', title: 'Movie Tickets', amount: 28.00, category: 'Entertainment', date: '2026-08-08', addedBy: 'current_user' },
  { id: '4', title: 'Coffee Shop', amount: 12.50, category: 'Food', date: '2026-08-07', addedBy: 'other_user' },
  { id: '5', title: 'Electricity Bill', amount: 120.00, category: 'Utilities', date: '2026-08-06', addedBy: 'other_user' },
  { id: '6', title: 'Lunch with Team', amount: 65.00, category: 'Food', date: '2026-08-05', addedBy: 'current_user' },
  { id: '7', title: 'Gym Membership', amount: 50.00, category: 'Other', date: '2026-08-04', addedBy: 'other_user' },
]

const CURRENT_USER = 'current_user'

export default function UserAttemptsTo() {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleDelete = (expense: Expense) => {
    // Clear previous messages
    setError('')
    setSuccessMessage('')

    // Check if current user owns the expense
    if (expense.addedBy !== CURRENT_USER) {
      setError(`You cannot delete "${expense.title}" because you did not add it. Only the person who added an expense can delete it.`)
      return
    }

    // User is authorized to delete
    setExpenses(expenses.filter((e) => e.id !== expense.id))
    setSuccessMessage(`Successfully deleted "${expense.title}"`)
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const userExpenses = expenses.filter((e) => e.addedBy === CURRENT_USER)
  const otherExpenses = expenses.filter((e) => e.addedBy !== CURRENT_USER)

  return (
    <section data-testid="user-attempts-to" className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Shared Expense Tracker</h1>
          <p className="text-gray-600 mb-4">View and manage expenses in this shared workspace</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-purple-600">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Your Expenses</p>
              <p className="text-2xl font-bold text-green-600">{userExpenses.length}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Others' Expenses</p>
              <p className="text-2xl font-bold text-blue-600">{otherExpenses.length}</p>
            </div>
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
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Expenses (You can delete)</h2>
            <ul data-testid="user-attempts-to-list" className="space-y-3">
              {userExpenses.length === 0 ? (
                <li className="text-center text-gray-500 py-4">No expenses added by you yet</li>
              ) : (
                userExpenses.map((expense) => (
                  <li
                    key={expense.id}
                    data-testid="user-attempts-to-item"
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                      <div className="flex gap-4 mt-1">
                        <span className="text-sm text-gray-600">{expense.date}</span>
                        <span className="text-sm text-purple-600 font-medium">{expense.category}</span>
                        <span className="text-sm text-green-600 font-medium">Added by you</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-gray-800">${expense.amount.toFixed(2)}</p>
                      <button
                        data-testid="user-attempts-to-delete"
                        onClick={() => handleDelete(expense)}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Others' Expenses (Cannot delete)</h2>
            <ul data-testid="user-attempts-to-others-list" className="space-y-3">
              {otherExpenses.length === 0 ? (
                <li className="text-center text-gray-500 py-4">No expenses from other users</li>
              ) : (
                otherExpenses.map((expense) => (
                  <li
                    key={expense.id}
                    data-testid="user-attempts-to-other-item"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                      <div className="flex gap-4 mt-1">
                        <span className="text-sm text-gray-600">{expense.date}</span>
                        <span className="text-sm text-purple-600 font-medium">{expense.category}</span>
                        <span className="text-sm text-blue-600 font-medium">Added by other user</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-gray-800">${expense.amount.toFixed(2)}</p>
                      <button
                        data-testid="user-attempts-to-delete-other"
                        onClick={() => handleDelete(expense)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
                        title="You cannot delete expenses added by other users"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
