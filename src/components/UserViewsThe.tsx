/**
 * UserViewsThe — Dashboard displaying legal case counts and statistics
 *
 * Features: case count cards, status breakdown, recent activity, quick filters, visual metrics
 *
 * Ticket: SCRUM-909 | Branch: proto/SCRUM-903
 */

import React from 'react'

interface CaseCount {
  id: string
  status: string
  count: number
  trend: number
  color: string
}

interface RecentCase {
  id: string
  caseNumber: string
  clientName: string
  status: string
  lastUpdated: string
}

const mockCaseCounts: CaseCount[] = [
  { id: '1', status: 'Active', count: 47, trend: 5, color: 'bg-blue-500' },
  { id: '2', status: 'Pending', count: 23, trend: -2, color: 'bg-yellow-500' },
  { id: '3', status: 'Closed', count: 156, trend: 12, color: 'bg-green-500' },
  { id: '4', status: 'On Hold', count: 8, trend: 0, color: 'bg-gray-500' },
  { id: '5', status: 'Urgent', count: 5, trend: 1, color: 'bg-red-500' },
]

const mockRecentCases: RecentCase[] = [
  { id: '1', caseNumber: 'CASE-2024-001', clientName: 'Johnson Corp', status: 'Active', lastUpdated: '2 hours ago' },
  { id: '2', caseNumber: 'CASE-2024-045', clientName: 'Smith Holdings', status: 'Pending', lastUpdated: '5 hours ago' },
  { id: '3', caseNumber: 'CASE-2024-089', clientName: 'Martinez LLC', status: 'Active', lastUpdated: '1 day ago' },
  { id: '4', caseNumber: 'CASE-2024-102', clientName: 'Anderson Inc', status: 'Urgent', lastUpdated: '2 days ago' },
  { id: '5', caseNumber: 'CASE-2024-115', clientName: 'Williams & Co', status: 'On Hold', lastUpdated: '3 days ago' },
  { id: '6', caseNumber: 'CASE-2024-132', clientName: 'Brown Associates', status: 'Closed', lastUpdated: '1 week ago' },
]

export default function UserViewsThe() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('all')

  const totalCases = mockCaseCounts.reduce((sum, item) => sum + item.count, 0)

  const filteredCases = selectedFilter === 'all' 
    ? mockRecentCases 
    : mockRecentCases.filter(c => c.status.toLowerCase() === selectedFilter.toLowerCase())

  return (
    <div data-testid="userviewsthe" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Dashboard</h1>
          <p className="text-gray-600">Overview of your legal cases and statistics</p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            {mockCaseCounts.map((item) => (
              <div
                key={item.id}
                data-testid="userviewsthe-card"
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  {item.trend !== 0 && (
                    <span
                      className={`text-xs font-semibold ${
                        item.trend > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.trend > 0 ? '+' : ''}
                      {item.trend}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{item.count}</div>
                <div className="text-sm text-gray-600">{item.status}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Cases</div>
            <div className="text-4xl font-bold text-gray-900">{totalCases}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              data-testid="userviewsthe-filter-all"
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              All Cases
            </button>
            <button
              data-testid="userviewsthe-filter-active"
              onClick={() => setSelectedFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Active
            </button>
            <button
              data-testid="userviewsthe-filter-pending"
              onClick={() => setSelectedFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              data-testid="userviewsthe-filter-urgent"
              onClick={() => setSelectedFilter('urgent')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'urgent'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Urgent
            </button>
          </div>
        </div>

        {/* Recent Cases */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Cases</h2>
          </div>
          <div data-testid="userviewsthe-list" className="divide-y divide-gray-200">
            {filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  data-testid="userviewsthe-item"
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900">{caseItem.caseNumber}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            caseItem.status === 'Active'
                              ? 'bg-blue-100 text-blue-700'
                              : caseItem.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : caseItem.status === 'Urgent'
                              ? 'bg-red-100 text-red-700'
                              : caseItem.status === 'On Hold'
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {caseItem.status}
                        </span>
                      </div>
                      <div className="text-gray-900 mb-1">{caseItem.clientName}</div>
                      <div className="text-sm text-gray-500">Updated {caseItem.lastUpdated}</div>
                    </div>
                    <button
                      data-testid="userviewsthe-view"
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                No cases found for the selected filter
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            data-testid="userviewsthe-addcase"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add New Case
          </button>
          <button
            data-testid="userviewsthe-export"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Export Report
          </button>
          <button
            data-testid="userviewsthe-refresh"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  )
}
