/**
 * WorkforcePlanningTeam — Real-time application trends monitoring for workforce planning
 *
 * Features: live metrics dashboard, trend visualization, forecast alerts, department breakdown, historical comparison
 *
 * Ticket: SCRUM-1011 | Branch: proto/SCRUM-1005
 */

import { useState } from 'react'

interface ApplicationMetric {
  id: string
  department: string
  currentApplications: number
  previousPeriod: number
  trend: 'up' | 'down' | 'stable'
  forecastedNeed: number
  criticalThreshold: number
  lastUpdated: string
}

interface TrendAlert {
  id: string
  severity: 'high' | 'medium' | 'low'
  department: string
  message: string
  timestamp: string
}

const MOCK_METRICS: ApplicationMetric[] = [
  {
    id: '1',
    department: 'Customer Service',
    currentApplications: 145,
    previousPeriod: 98,
    trend: 'up',
    forecastedNeed: 180,
    criticalThreshold: 100,
    lastUpdated: '2 minutes ago'
  },
  {
    id: '2',
    department: 'Software Engineering',
    currentApplications: 89,
    previousPeriod: 92,
    trend: 'down',
    forecastedNeed: 75,
    criticalThreshold: 50,
    lastUpdated: '5 minutes ago'
  },
  {
    id: '3',
    department: 'Sales',
    currentApplications: 203,
    previousPeriod: 198,
    trend: 'stable',
    forecastedNeed: 220,
    criticalThreshold: 150,
    lastUpdated: '1 minute ago'
  },
  {
    id: '4',
    department: 'Marketing',
    currentApplications: 67,
    previousPeriod: 45,
    trend: 'up',
    forecastedNeed: 85,
    criticalThreshold: 60,
    lastUpdated: '3 minutes ago'
  },
  {
    id: '5',
    department: 'Operations',
    currentApplications: 134,
    previousPeriod: 142,
    trend: 'down',
    forecastedNeed: 120,
    criticalThreshold: 100,
    lastUpdated: '4 minutes ago'
  },
  {
    id: '6',
    department: 'Finance',
    currentApplications: 56,
    previousPeriod: 54,
    trend: 'stable',
    forecastedNeed: 60,
    criticalThreshold: 40,
    lastUpdated: '6 minutes ago'
  }
]

const MOCK_ALERTS: TrendAlert[] = [
  {
    id: 'a1',
    severity: 'high',
    department: 'Customer Service',
    message: 'Applications up 48% - consider increasing recruitment capacity',
    timestamp: '10 minutes ago'
  },
  {
    id: 'a2',
    severity: 'medium',
    department: 'Sales',
    message: 'Forecast shows 8% increase next quarter',
    timestamp: '25 minutes ago'
  },
  {
    id: 'a3',
    severity: 'low',
    department: 'Finance',
    message: 'Application volume stable within normal range',
    timestamp: '1 hour ago'
  },
  {
    id: 'a4',
    severity: 'high',
    department: 'Marketing',
    message: 'Applications up 49% - workforce gap detected',
    timestamp: '15 minutes ago'
  },
  {
    id: 'a5',
    severity: 'medium',
    department: 'Operations',
    message: 'Declining trend detected - review job postings',
    timestamp: '30 minutes ago'
  }
]

export default function WorkforcePlanningTeam() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<string>('7days')

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '↗'
      case 'down':
        return '↘'
      case 'stable':
        return '→'
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      case 'stable':
        return 'text-gray-600'
    }
  }

  const getSeverityColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300'
    }
  }

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return change.toFixed(1)
  }

  const filteredMetrics = selectedDepartment === 'all' 
    ? MOCK_METRICS 
    : MOCK_METRICS.filter(m => m.department === selectedDepartment)

  const totalApplications = MOCK_METRICS.reduce((sum, m) => sum + m.currentApplications, 0)
  const totalForecasted = MOCK_METRICS.reduce((sum, m) => sum + m.forecastedNeed, 0)

  return (
    <section data-testid="workforce-planning-team" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Workforce Planning Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor application trends in real-time and forecast workforce needs
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex gap-4 items-center">
          <div className="flex-1">
            <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              id="department-filter"
              data-testid="workforce-planning-team-department-filter"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments</option>
              {MOCK_METRICS.map(m => (
                <option key={m.id} value={m.department}>{m.department}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 mb-1">
              Time Range
            </label>
            <select
              id="time-range"
              data-testid="workforce-planning-team-time-range"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>
          <div className="flex-1">
            <button
              data-testid="workforce-planning-team-refresh"
              className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div data-testid="workforce-planning-team-summary-card" className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Applications</h3>
            <p className="text-3xl font-bold text-gray-900">{totalApplications}</p>
            <p className="text-sm text-gray-500 mt-2">Across all departments</p>
          </div>
          <div data-testid="workforce-planning-team-summary-card" className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Forecasted Need</h3>
            <p className="text-3xl font-bold text-blue-600">{totalForecasted}</p>
            <p className="text-sm text-gray-500 mt-2">Next quarter projection</p>
          </div>
          <div data-testid="workforce-planning-team-summary-card" className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Gap Analysis</h3>
            <p className="text-3xl font-bold text-orange-600">{totalForecasted - totalApplications}</p>
            <p className="text-sm text-gray-500 mt-2">Additional applications needed</p>
          </div>
        </div>

        {/* Department Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Department Metrics</h2>
          <div data-testid="workforce-planning-team-metrics-list" className="space-y-4">
            {filteredMetrics.map((metric) => {
              const change = calculateChange(metric.currentApplications, metric.previousPeriod)
              const isAboveThreshold = metric.currentApplications >= metric.criticalThreshold

              return (
                <div
                  key={metric.id}
                  data-testid="workforce-planning-team-metric-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{metric.department}</h3>
                      <p className="text-xs text-gray-500">Updated {metric.lastUpdated}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${getTrendColor(metric.trend)}`}>
                        {getTrendIcon(metric.trend)}
                      </span>
                      <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                        {change}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Current Applications</p>
                      <p className="text-xl font-bold text-gray-900">{metric.currentApplications}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Previous Period</p>
                      <p className="text-xl font-semibold text-gray-600">{metric.previousPeriod}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Forecasted Need</p>
                      <p className="text-xl font-semibold text-blue-600">{metric.forecastedNeed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Status</p>
                      <span
                        data-testid="workforce-planning-team-status-badge"
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                          isAboveThreshold 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {isAboveThreshold ? 'Above Threshold' : 'Below Threshold'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress to Forecast</span>
                      <span>{Math.round((metric.currentApplications / metric.forecastedNeed) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((metric.currentApplications / metric.forecastedNeed) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trend Alerts</h2>
          <div data-testid="workforce-planning-team-alerts-list" className="space-y-3">
            {MOCK_ALERTS.map((alert) => (
              <div
                key={alert.id}
                data-testid="workforce-planning-team-alert-item"
                className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold uppercase text-xs">{alert.severity}</span>
                      <span className="text-sm font-medium">{alert.department}</span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <span className="text-xs opacity-75 whitespace-nowrap ml-4">{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-6 flex justify-end">
          <button
            data-testid="workforce-planning-team-export"
            className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            Export Report
          </button>
        </div>
      </div>
    </section>
  )
}
