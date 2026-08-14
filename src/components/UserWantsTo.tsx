/**
 * UserWantsTo — Displays a breakdown of expenses by category with visual charts
 *
 * Features: Category totals, percentage breakdown, visual bar chart, mock expense data, responsive layout
 *
 * Ticket: SCRUM-859 | Branch: proto/SCRUM-853
 */

import React from 'react'

interface Expense {
  id: string
  category: string
  amount: number
  description: string
  date: string
}

interface CategoryBreakdown {
  category: string
  total: number
  percentage: number
  color: string
}

export default function UserWantsTo() {
  // Mock expense data
  const expenses: Expense[] = [
    { id: '1', category: 'Food & Dining', amount: 450.75, description: 'Grocery shopping', date: '2026-08-10' },
    { id: '2', category: 'Food & Dining', amount: 85.50, description: 'Restaurant dinner', date: '2026-08-12' },
    { id: '3', category: 'Food & Dining', amount: 120.25, description: 'Coffee and lunch', date: '2026-08-13' },
    { id: '4', category: 'Transportation', amount: 200.00, description: 'Monthly transit pass', date: '2026-08-01' },
    { id: '5', category: 'Transportation', amount: 65.30, description: 'Rideshare trips', date: '2026-08-09' },
    { id: '6', category: 'Entertainment', amount: 150.00, description: 'Concert tickets', date: '2026-08-05' },
    { id: '7', category: 'Entertainment', amount: 45.99, description: 'Streaming services', date: '2026-08-01' },
    { id: '8', category: 'Shopping', amount: 320.50, description: 'Clothing purchase', date: '2026-08-07' },
    { id: '9', category: 'Shopping', amount: 89.99, description: 'Electronics accessory', date: '2026-08-11' },
    { id: '10', category: 'Utilities', amount: 180.00, description: 'Electricity bill', date: '2026-08-02' },
    { id: '11', category: 'Utilities', amount: 95.00, description: 'Internet bill', date: '2026-08-03' },
    { id: '12', category: 'Healthcare', amount: 125.00, description: 'Doctor visit copay', date: '2026-08-08' },
    { id: '13', category: 'Healthcare', amount: 42.50, description: 'Prescription medication', date: '2026-08-09' },
  ]

  // Calculate category breakdown
  const categoryMap = new Map<string, number>()
  expenses.forEach(expense => {
    const current = categoryMap.get(expense.category) || 0
    categoryMap.set(expense.category, current + expense.amount)
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const categoryColors: Record<string, string> = {
    'Food & Dining': 'bg-blue-500',
    'Transportation': 'bg-green-500',
    'Entertainment': 'bg-purple-500',
    'Shopping': 'bg-pink-500',
    'Utilities': 'bg-yellow-500',
    'Healthcare': 'bg-red-500',
  }

  const breakdown: CategoryBreakdown[] = Array.from(categoryMap.entries())
    .map(([category, total]) => ({
      category,
      total,
      percentage: (total / totalExpenses) * 100,
      color: categoryColors[category] || 'bg-gray-500',
    }))
    .sort((a, b) => b.total - a.total)

  return (
    <section data-testid="user-wants-to" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 data-testid="user-wants-to-title" className="text-3xl font-bold text-gray-800 mb-2">
            Expense Breakdown by Category
          </h1>
          <p className="text-gray-600 mb-6">View your spending organized by category</p>

          {/* Total Expenses */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p data-testid="user-wants-to-total" className="text-3xl font-bold text-gray-800">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>

          {/* Category Breakdown List */}
          <div data-testid="user-wants-to-breakdown-list" className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Category Breakdown</h2>
            {breakdown.map((item, index) => (
              <div
                key={item.category}
                data-testid="user-wants-to-category-item"
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{item.category}</h3>
                  <span className="text-lg font-bold text-gray-900">
                    ${item.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600 min-w-[50px] text-right">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Chart */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Visual Distribution</h2>
            <div data-testid="user-wants-to-chart" className="flex h-8 rounded-lg overflow-hidden">
              {breakdown.map((item, index) => (
                <div
                  key={item.category}
                  data-testid="user-wants-to-chart-segment"
                  className={`${item.color} hover:opacity-80 transition-opacity cursor-pointer`}
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.category}: ${item.percentage.toFixed(1)}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {breakdown.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div className={`w-4 h-4 ${item.color} rounded`} />
                  <span className="text-sm text-gray-700">{item.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Details Table */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Expenses</h2>
            <div data-testid="user-wants-to-expense-list" className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody data-testid="user-wants-to-expense-tbody">
                  {expenses.slice().reverse().map((expense) => (
                    <tr
                      key={expense.id}
                      data-testid="user-wants-to-expense-row"
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm text-gray-600">{expense.date}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-block px-2 py-1 bg-gray-100 rounded text-gray-700">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">{expense.description}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        ${expense.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
