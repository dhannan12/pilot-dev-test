/**
 * NHrBusiness — HR Business Partner dashboard for monitoring application trends and status across departments
 *
 * Features: department analytics, application status tracking, trend visualization, hiring metrics, insights reporting
 *
 * Ticket: SCRUM-998 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface ApplicationTrend {
  id: string
  department: string
  totalPositions: number
  activeApplications: number
  interviewsScheduled: number
  offersExtended: number
  hiredCount: number
  avgTimeToHire: number
  conversionRate: number
  month: string
}

interface DepartmentInsight {
  id: string
  department: string
  insight: string
  priority: 'high' | 'medium' | 'low'
  recommendation: string
}

const MOCK_TRENDS: ApplicationTrend[] = [
  {
    id: '1',
    department: 'Engineering',
    totalPositions: 15,
    activeApplications: 142,
    interviewsScheduled: 28,
    offersExtended: 8,
    hiredCount: 6,
    avgTimeToHire: 32,
    conversionRate: 42.5,
    month: 'August 2026'
  },
  {
    id: '2',
    department: 'Sales',
    totalPositions: 10,
    activeApplications: 98,
    interviewsScheduled: 22,
    offersExtended: 6,
    hiredCount: 5,
    avgTimeToHire: 28,
    conversionRate: 50.0,
    month: 'August 2026'
  },
  {
    id: '3',
    department: 'Marketing',
    totalPositions: 8,
    activeApplications: 76,
    interviewsScheduled: 18,
    offersExtended: 5,
    hiredCount: 4,
    avgTimeToHire: 24,
    conversionRate: 55.6,
    month: 'August 2026'
  },
  {
    id: '4',
    department: 'Product',
    totalPositions: 12,
    activeApplications: 134,
    interviewsScheduled: 25,
    offersExtended: 7,
    hiredCount: 5,
    avgTimeToHire: 35,
    conversionRate: 40.0,
    month: 'August 2026'
  },
  {
    id: '5',
    department: 'Customer Success',
    totalPositions: 6,
    activeApplications: 54,
    interviewsScheduled: 15,
    offersExtended: 4,
    hiredCount: 4,
    avgTimeToHire: 22,
    conversionRate: 66.7,
    month: 'August 2026'
  },
  {
    id: '6',
    department: 'Operations',
    totalPositions: 9,
    activeApplications: 67,
    interviewsScheduled: 16,
    offersExtended: 5,
    hiredCount: 3,
    avgTimeToHire: 30,
    conversionRate: 46.2,
    month: 'August 2026'
  }
]

const MOCK_INSIGHTS: DepartmentInsight[] = [
  {
    id: '1',
    department: 'Engineering',
    insight: 'High application volume but longer time-to-hire than target',
    priority: 'high',
    recommendation: 'Increase interview panel capacity and streamline technical assessment process'
  },
  {
    id: '2',
    department: 'Customer Success',
    insight: 'Excellent conversion rate and fastest time-to-hire',
    priority: 'low',
    recommendation: 'Document best practices for other departments'
  },
  {
    id: '3',
    department: 'Product',
    insight: 'Lower conversion rate indicates potential issues in candidate qualification',
    priority: 'medium',
    recommendation: 'Review job descriptions and screening criteria with hiring managers'
  },
  {
    id: '4',
    department: 'Marketing',
    insight: 'Strong performance with above-average conversion rate',
    priority: 'low',
    recommendation: 'Continue current hiring practices'
  },
  {
    id: '5',
    department: 'Sales',
    insight: 'Moderate time-to-hire with solid conversion rates',
    priority: 'medium',
    recommendation: 'Consider increasing sourcing efforts to meet growing team needs'
  }
]

export default function NHrBusiness() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'overview' | 'insights'>('overview')

  const filteredTrends = selectedDepartment === 'all' 
    ? MOCK_TRENDS 
    : MOCK_TRENDS.filter(t => t.department === selectedDepartment)

  const filteredInsights = selectedDepartment === 'all'
    ? MOCK_INSIGHTS
    : MOCK_INSIGHTS.filter(i => i.department === selectedDepartment)

  const totalApplications = filteredTrends.reduce((sum, t) => sum + t.activeApplications, 0)
  const totalPositions = filteredTrends.reduce((sum, t) => sum + t.totalPositions, 0)
  const totalHired = filteredTrends.reduce((sum, t) => sum + t.hiredCount, 0)
  const avgConversionRate = filteredTrends.length > 0
    ? (filteredTrends.reduce((sum, t) => sum + t.conversionRate, 0) / filteredTrends.length).toFixed(1)
    : '0.0'

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div data-testid="nhrbusiness" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            HR Business Partner Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor application trends and hiring metrics across departments
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex flex-col">
                <label htmlFor="department-filter" className="text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  id="department-filter"
                  data-testid="nhrbusiness-department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Departments</option>
                  {MOCK_TRENDS.map(trend => (
                    <option key={trend.id} value={trend.department}>
                      {trend.department}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                data-testid="nhrbusiness-view-overview"
                onClick={() => setViewMode('overview')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'overview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Overview
              </button>
              <button
                data-testid="nhrbusiness-view-insights"
                onClick={() => setViewMode('insights')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'insights'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Insights
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Applications
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {totalApplications}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Active candidates
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Open Positions
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {totalPositions}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Across departments
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Hired
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {totalHired}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              This month
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Avg Conversion Rate
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {avgConversionRate}%
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Interview to hire
            </div>
          </div>
        </div>

        {/* Main Content - Overview or Insights */}
        {viewMode === 'overview' ? (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Department Hiring Metrics
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Application trends and hiring performance by department
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Positions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interviews
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Offers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hired
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion
                    </th>
                  </tr>
                </thead>
                <tbody data-testid="nhrbusiness-list" className="bg-white divide-y divide-gray-200">
                  {filteredTrends.map((trend) => (
                    <tr key={trend.id} data-testid="nhrbusiness-item" className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {trend.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{trend.totalPositions}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{trend.activeApplications}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{trend.interviewsScheduled}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{trend.offersExtended}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">{trend.hiredCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{trend.avgTimeToHire}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          trend.conversionRate >= 50 ? 'text-green-600' :
                          trend.conversionRate >= 40 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {trend.conversionRate.toFixed(1)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTrends.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No data available for selected filters</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Strategic Insights & Recommendations
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Data-driven insights to align HR strategies with business goals
              </p>
            </div>

            <div data-testid="nhrbusiness-insights-list" className="p-6 space-y-4">
              {filteredInsights.map((insight) => (
                <div
                  key={insight.id}
                  data-testid="nhrbusiness-insight-item"
                  className={`border rounded-lg p-5 ${getPriorityColor(insight.priority)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {insight.department}
                      </h3>
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full bg-white bg-opacity-60">
                        {insight.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">Insight:</div>
                      <div className="text-sm">{insight.insight}</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Recommendation:</div>
                      <div className="text-sm">{insight.recommendation}</div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredInsights.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No insights available for selected department</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Export Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            data-testid="nhrbusiness-export-csv"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Export to CSV
          </button>
          <button
            data-testid="nhrbusiness-generate-report"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Generate Executive Report
          </button>
        </div>
      </div>
    </div>
  )
}
