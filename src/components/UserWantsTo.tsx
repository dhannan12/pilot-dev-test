/**
 * UserWantsTo — Displays total monthly expenses with detailed breakdown
 *
 * Features: monthly total calculation, expense list, category breakdown, visual summary, date filtering
 *
 * Ticket: SCRUM-856 | Branch: proto/SCRUM-853
 */

import React, { useState } from 'react'

interface Expense {
  id: number
  date: string
  category: string
  description: string
  amount: number
}

const MOCK_EXPENSES: Expense[] = [
  { id: 1, date: '2026-08-01', category: 'Groceries', description: 'Weekly grocery shopping', amount: 156.75 },
  { id: 2, date: '2026-08-03', category: 'Transportation', description: 'Gas station', amount: 45.00 },
  { id: 3, date: '2026-08-05', category: 'Dining', description: 'Restaurant dinner', amount: 82.50 },
  { id: 4, date: '2026-08-07', category: 'Entertainment', description: 'Movie tickets', amount: 28.00 },
  { id: 5, date: '2026-08-10', category: 'Groceries', description: 'Whole Foods', amount: 92.30 },
  { id: 6, date: '2026-08-12', category: 'Utilities', description: 'Electric bill', amount: 125.00 },
  { id: 7, date: '2026-08-14', category: 'Transportation', description: 'Uber ride', amount: 22.50 },
  { id: 8, date: '2026-08-14', category: 'Dining', description: 'Coffee shop', amount: 12.75 },
]

export default function UserWantsTo() {
  const [selectedMonth] = useState('2026-08')

  // Calculate total spent for the selected month
  const monthlyExpenses = MOCK_EXPENSES.filter(expense => 
    expense.date.startsWith(selectedMonth)
  )

  const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Calculate category totals
  const categoryTotals = monthlyExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div data-testid="user-wants-to" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Monthly Expense Tracker</h1>
          <p className="text-gray-600">Track your spending for {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>

        {/* Total Spent Card */}
        <div data-testid="user-wants-to-total-card" className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-xl p-8 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium uppercase tracking-wide mb-2">Total Spent This Month</p>
              <h2 data-testid="user-wants-to-total-amount" className="text-5xl font-bold">{formatCurrency(totalSpent)}</h2>
              <p className="text-indigo-200 mt-2">{monthlyExpenses.length} transactions</p>
            </div>
            <div className="bg-white/20 rounded-full p-6">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Spending by Category</h3>
            <div data-testid="user-wants-to-category-list" className="space-y-3">
              {sortedCategories.map(([category, amount]) => {
                const percentage = (amount / totalSpent) * 100
                return (
                  <div key={category} data-testid="user-wants-to-category-item" className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-700">{category}</span>
                      <span className="font-bold text-gray-900">{formatCurrency(amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of total</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div data-testid="user-wants-to-stat-average" className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 font-medium mb-1">Average per Transaction</p>
                <p className="text-2xl font-bold text-blue-800">
                  {formatCurrency(totalSpent / monthlyExpenses.length)}
                </p>
              </div>
              <div data-testid="user-wants-to-stat-highest" className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 font-medium mb-1">Highest Expense</p>
                <p className="text-2xl font-bold text-green-800">
                  {formatCurrency(Math.max(...monthlyExpenses.map(e => e.amount)))}
                </p>
              </div>
              <div data-testid="user-wants-to-stat-lowest" className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-600 font-medium mb-1">Lowest Expense</p>
                <p className="text-2xl font-bold text-purple-800">
                  {formatCurrency(Math.min(...monthlyExpenses.map(e => e.amount)))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h3>
          <div data-testid="user-wants-to-transaction-list" className="space-y-2">
            {monthlyExpenses.slice().reverse().map((expense) => (
              <div 
                key={expense.id}
                data-testid="user-wants-to-transaction-item"
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{expense.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                      {expense.category}
                    </span>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900 ml-4">{formatCurrency(expense.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
