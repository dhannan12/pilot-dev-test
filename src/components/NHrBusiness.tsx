/**
 * NHrBusiness — HR Business Partner dashboard for analyzing workforce trends and recruitment metrics
 *
 * Features: application volume tracking, trend analysis charts, recruitment pipeline metrics, department comparison, strategic insights
 *
 * Ticket: SCRUM-1010 | Branch: proto/SCRUM-1010
 */

import { useState } from 'react'

interface ApplicationMetrics {
  id: string
  department: string
  month: string
  applications: number
  hires: number
  conversionRate: number
  averageTimeToHire: number
  trend: 'up' | 'down' | 'stable'
}

interface DepartmentTrend {
  id: string
  department: string
  quarterlyApplications: number[]
  quarterlyHires: number[]
  growthRate: number
  priority: 'high' | 'medium' | 'low'
}

interface StrategicInsight {
  id: string
  category: 'opportunity' | 'concern' | 'trend'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  actionRequired: boolean
}

const mockApplicationMetrics: ApplicationMetrics[] = [
  {
    id: '1',
    department: 'Engineering',
    month: 'July 2026',
    applications: 245,
    hires: 12,
    conversionRate: 4.9,
    averageTimeToHire: 28,
    trend: 'up'
  },
  {
    id: '2',
    department: 'Sales',
    month: 'July 2026',
    applications: 189,
    hires: 18,
    conversionRate: 9.5,
    averageTimeToHire: 21,
    trend: 'stable'
  },
  {
    id: '3',
    department: 'Marketing',
    month: 'July 2026',
    applications: 156,
    hires: 8,
    conversionRate: 5.1,
    averageTimeToHire: 25,
    trend: 'down'
  },
  {
    id: '4',
    department: 'Customer Success',
    month: 'July 2026',
    applications: 203,
    hires: 15,
    conversionRate: 7.4,
    averageTimeToHire: 19,
    trend: 'up'
  },
  {
    id: '5',
    department: 'Product',
    month: 'July 2026',
    applications: 178,
    hires: 9,
    conversionRate: 5.1,
    averageTimeToHire: 32,
    trend: 'stable'
  },
  {
    id: '6',
    department: 'Operations',
    month: 'July 2026',
    applications: 134,
    hires: 11,
    conversionRate: 8.2,
    averageTimeToHire: 22,
    trend: 'up'
  }
]

const mockDepartmentTrends: DepartmentTrend[] = [
  {
    id: '1',
    department: 'Engineering',
    quarterlyApplications: [198, 223, 245],
    quarterlyHires: [9, 11, 12],
    growthRate: 23.7,
    priority: 'high'
  },
  {
    id: '2',
    department: 'Sales',
    quarterlyApplications: [167, 182, 189],
    quarterlyHires: [15, 17, 18],
    growthRate: 13.2,
    priority: 'medium'
  },
  {
    id: '3',
    department: 'Marketing',
    quarterlyApplications: [189, 172, 156],
    quarterlyHires: [10, 9, 8],
    growthRate: -17.5,
    priority: 'high'
  },
  {
    id: '4',
    department: 'Customer Success',
    quarterlyApplications: [178, 195, 203],
    quarterlyHires: [12, 14, 15],
    growthRate: 14.0,
    priority: 'medium'
  },
  {
    id: '5',
    department: 'Product',
    quarterlyApplications: [165, 171, 178],
    quarterlyHires: [8, 8, 9],
    growthRate: 7.9,
    priority: 'low'
  }
]

const mockStrategicInsights: StrategicInsight[] = [
  {
    id: '1',
    category: 'concern',
    title: 'Marketing Applications Declining',
    description: 'Marketing department has seen a 17.5% decline in application volume over the past quarter. This may impact ability to meet Q4 hiring goals.',
    impact: 'high',
    actionRequired: true
  },
  {
    id: '2',
    category: 'opportunity',
    title: 'Engineering Momentum Strong',
    description: 'Engineering applications up 23.7% quarter-over-quarter. Consider expanding pipeline to support growth initiatives.',
    impact: 'high',
    actionRequired: false
  },
  {
    id: '3',
    category: 'trend',
    title: 'Sales Conversion Rate Leading',
    description: 'Sales maintains highest conversion rate at 9.5%, suggesting effective screening and candidate experience processes.',
    impact: 'medium',
    actionRequired: false
  },
  {
    id: '4',
    category: 'concern',
    title: 'Product Time-to-Hire Above Target',
    description: 'Product department averaging 32 days to hire, exceeding company target of 28 days. Review interview scheduling bottlenecks.',
    impact: 'medium',
    actionRequired: true
  },
  {
    id: '5',
    category: 'opportunity',
    title: 'Customer Success Pipeline Healthy',
    description: 'CS showing consistent growth with strong conversion rates and fastest time-to-hire at 19 days.',
    impact: 'low',
    actionRequired: false
  }
]

export default function NHrBusiness() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<string>('current')

  const filteredMetrics = selectedDepartment === 'all'
    ? mockApplicationMetrics
    : mockApplicationMetrics.filter(m => m.department === selectedDepartment)

  const totalApplications = mockApplicationMetrics.reduce((sum, m) => sum + m.applications, 0)
  const totalHires = mockApplicationMetrics.reduce((sum, m) => sum + m.hires, 0)
  const overallConversionRate = ((totalHires / totalApplications) * 100).toFixed(1)
  const averageTimeToHire = Math.round(
    mockApplicationMetrics.reduce((sum, m) => sum + m.averageTimeToHire, 0) / mockApplicationMetrics.length
  )

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '↑'
    if (trend === 'down') return '↓'
    return '→'
  }

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600'
    if (trend === 'down') return 'text-red-600'
    return 'text-gray-600'
  }

  const getImpactBadgeColor = (impact: string) => {
    if (impact === 'high') return 'bg-red-100 text-red-800'
    if (impact === 'medium') return 'bg-yellow-100 text-yellow-800'
    return 'bg-blue-100 text-blue-800'
  }

  const getCategoryIcon = (category: string) => {
    if (category === 'concern') return '⚠️'
    if (category === 'opportunity') return '🎯'
    return '📊'
  }

  return (
    <section data-testid="n-hr-business" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 data-testid="n-hr-business-title" className="text-3xl font-bold text-gray-900 mb-2">
            Workforce Trends & Recruitment Analytics
          </h1>
          <p className="text-gray-600">
            HR Business Partner Dashboard — Analyze application volume and align recruitment strategies
          </p>
        </div>

        {/* Filters */}
        <div data-testid="n-hr-business-filters" className="bg-white rounded-lg shadow p-4 mb-6 flex gap-4">
          <div>
            <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              id="department-filter"
              data-testid="n-hr-business-department-filter"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Customer Success">Customer Success</option>
              <option value="Product">Product</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          <div>
            <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <select
              id="time-range"
              data-testid="n-hr-business-time-range"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="current">Current Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">Year to Date</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div data-testid="n-hr-business-summary-cards" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div data-testid="n-hr-business-card-applications" className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Applications</div>
            <div className="text-3xl font-bold text-gray-900">{totalApplications}</div>
            <div className="text-sm text-green-600 mt-1">↑ 12.3% vs last month</div>
          </div>
          <div data-testid="n-hr-business-card-hires" className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Hires</div>
            <div className="text-3xl font-bold text-gray-900">{totalHires}</div>
            <div className="text-sm text-green-600 mt-1">↑ 8.5% vs last month</div>
          </div>
          <div data-testid="n-hr-business-card-conversion" className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</div>
            <div className="text-3xl font-bold text-gray-900">{overallConversionRate}%</div>
            <div className="text-sm text-gray-600 mt-1">→ Stable</div>
          </div>
          <div data-testid="n-hr-business-card-time-to-hire" className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600 mb-1">Avg. Time to Hire</div>
            <div className="text-3xl font-bold text-gray-900">{averageTimeToHire} days</div>
            <div className="text-sm text-red-600 mt-1">↓ 2 days improvement</div>
          </div>
        </div>

        {/* Department Metrics Table */}
        <div data-testid="n-hr-business-metrics-section" className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Department Application Metrics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Time to Hire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody data-testid="n-hr-business-metrics-list" className="bg-white divide-y divide-gray-200">
                {filteredMetrics.map((metric) => (
                  <tr key={metric.id} data-testid="n-hr-business-metric-item" className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{metric.department}</div>
                      <div className="text-xs text-gray-500">{metric.month}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{metric.applications}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{metric.hires}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{metric.conversionRate}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{metric.averageTimeToHire} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-lg font-bold ${getTrendColor(metric.trend)}`}>
                        {getTrendIcon(metric.trend)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quarterly Trends */}
        <div data-testid="n-hr-business-trends-section" className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quarterly Growth Trends</h2>
          </div>
          <div className="p-6">
            <div data-testid="n-hr-business-trends-list" className="space-y-4">
              {mockDepartmentTrends.map((trend) => (
                <div
                  key={trend.id}
                  data-testid="n-hr-business-trend-item"
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{trend.department}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Q1: {trend.quarterlyApplications[0]} apps</span>
                        <span>Q2: {trend.quarterlyApplications[1]} apps</span>
                        <span>Q3: {trend.quarterlyApplications[2]} apps</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${trend.growthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend.growthRate > 0 ? '+' : ''}{trend.growthRate}%
                      </div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        trend.priority === 'high' ? 'bg-red-100 text-red-800' :
                        trend.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {trend.priority.charAt(0).toUpperCase() + trend.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 h-12 items-end">
                    {trend.quarterlyApplications.map((apps, idx) => {
                      const maxApps = Math.max(...trend.quarterlyApplications)
                      const heightPercent = (apps / maxApps) * 100
                      return (
                        <div
                          key={idx}
                          className="flex-1 bg-blue-500 rounded-t"
                          style={{ height: `${heightPercent}%` }}
                          title={`Q${idx + 1}: ${apps} applications`}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic Insights */}
        <div data-testid="n-hr-business-insights-section" className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Strategic Insights & Recommendations</h2>
          </div>
          <div className="p-6">
            <div data-testid="n-hr-business-insights-list" className="space-y-4">
              {mockStrategicInsights.map((insight) => (
                <div
                  key={insight.id}
                  data-testid="n-hr-business-insight-item"
                  className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getCategoryIcon(insight.category)}</span>
                      <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactBadgeColor(insight.impact)}`}>
                        {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                      </span>
                      {insight.actionRequired && (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          Action Required
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div data-testid="n-hr-business-actions" className="mt-6 flex gap-4 justify-end">
          <button
            data-testid="n-hr-business-export"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Export Report
          </button>
          <button
            data-testid="n-hr-business-schedule"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Schedule Review
          </button>
          <button
            data-testid="n-hr-business-share"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Share with Leadership
          </button>
        </div>
      </div>
    </section>
  )
}
