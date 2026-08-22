/**
 * BuildCore — Core health metrics API endpoints management dashboard
 *
 * Features: API endpoint monitoring, health status tracking, response time metrics, error rate analysis, endpoint configuration
 *
 * Ticket: SCRUM-1126 | Branch: proto/SCRUM-1115
 */

import React, { useState } from 'react'

interface HealthMetric {
  id: string
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  status: 'healthy' | 'degraded' | 'down'
  responseTime: number
  successRate: number
  lastChecked: string
  errorCount: number
}

const mockHealthMetrics: HealthMetric[] = [
  {
    id: '1',
    endpoint: '/api/v1/health/check',
    method: 'GET',
    status: 'healthy',
    responseTime: 45,
    successRate: 99.8,
    lastChecked: '2026-08-22 10:30:00',
    errorCount: 2
  },
  {
    id: '2',
    endpoint: '/api/v1/metrics/heart-rate',
    method: 'GET',
    status: 'healthy',
    responseTime: 120,
    successRate: 98.5,
    lastChecked: '2026-08-22 10:29:45',
    errorCount: 5
  },
  {
    id: '3',
    endpoint: '/api/v1/metrics/blood-pressure',
    method: 'POST',
    status: 'degraded',
    responseTime: 340,
    successRate: 92.3,
    lastChecked: '2026-08-22 10:29:30',
    errorCount: 23
  },
  {
    id: '4',
    endpoint: '/api/v1/metrics/activity',
    method: 'GET',
    status: 'healthy',
    responseTime: 85,
    successRate: 99.2,
    lastChecked: '2026-08-22 10:29:15',
    errorCount: 3
  },
  {
    id: '5',
    endpoint: '/api/v1/metrics/sleep',
    method: 'GET',
    status: 'healthy',
    responseTime: 95,
    successRate: 97.8,
    lastChecked: '2026-08-22 10:29:00',
    errorCount: 8
  },
  {
    id: '6',
    endpoint: '/api/v1/metrics/nutrition',
    method: 'POST',
    status: 'down',
    responseTime: 0,
    successRate: 0,
    lastChecked: '2026-08-22 10:25:00',
    errorCount: 150
  },
  {
    id: '7',
    endpoint: '/api/v1/metrics/weight',
    method: 'PUT',
    status: 'healthy',
    responseTime: 110,
    successRate: 99.5,
    lastChecked: '2026-08-22 10:28:45',
    errorCount: 1
  }
]

export default function BuildCore() {
  const [metrics] = useState<HealthMetric[]>(mockHealthMetrics)
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredMetrics = metrics.filter(metric => {
    if (filterStatus === 'all') return true
    return metric.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'down':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-800'
      case 'POST':
        return 'bg-green-100 text-green-800'
      case 'PUT':
        return 'bg-orange-100 text-orange-800'
      case 'DELETE':
        return 'bg-red-100 text-red-800'
      case 'PATCH':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const healthyCount = metrics.filter(m => m.status === 'healthy').length
  const degradedCount = metrics.filter(m => m.status === 'degraded').length
  const downCount = metrics.filter(m => m.status === 'down').length
  const avgResponseTime = Math.round(
    metrics.reduce((sum, m) => sum + m.responseTime, 0) / metrics.length
  )

  return (
    <div data-testid="buildcore" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Health Metrics API Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage core health metrics API endpoints
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Endpoints
            </div>
            <div className="text-3xl font-bold text-gray-900">{metrics.length}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Healthy
            </div>
            <div className="text-3xl font-bold text-green-600">{healthyCount}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Degraded
            </div>
            <div className="text-3xl font-bold text-yellow-600">{degradedCount}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Down
            </div>
            <div className="text-3xl font-bold text-red-600">{downCount}</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="endpoint-select" className="block text-sm font-medium text-gray-700 mb-2">
                Search Endpoint
              </label>
              <select
                id="endpoint-select"
                data-testid="buildcore-endpoint"
                value={selectedEndpoint}
                onChange={(e) => setSelectedEndpoint(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Endpoints</option>
                {metrics.map((metric) => (
                  <option key={metric.id} value={metric.endpoint}>
                    {metric.endpoint}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                id="status-filter"
                data-testid="buildcore-status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="healthy">Healthy</option>
                <option value="degraded">Degraded</option>
                <option value="down">Down</option>
              </select>
            </div>

            <div className="flex gap-2 items-end">
              <button
                data-testid="buildcore-refresh"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Refresh
              </button>
              <button
                data-testid="buildcore-configure"
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Configure
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">Avg Response Time</div>
              <div className="text-2xl font-bold text-gray-900">{avgResponseTime}ms</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Errors (24h)</div>
              <div className="text-2xl font-bold text-gray-900">
                {metrics.reduce((sum, m) => sum + m.errorCount, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Uptime</div>
              <div className="text-2xl font-bold text-green-600">98.5%</div>
            </div>
          </div>
        </div>

        {/* Endpoints List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              API Endpoints ({filteredMetrics.length})
            </h2>
          </div>

          <div data-testid="buildcore-list" className="divide-y divide-gray-200">
            {filteredMetrics.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No endpoints match the selected filters
              </div>
            ) : (
              filteredMetrics.map((metric) => (
                <div
                  key={metric.id}
                  data-testid="buildcore-item"
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-[300px]">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${getMethodColor(
                            metric.method
                          )}`}
                        >
                          {metric.method}
                        </span>
                        <code className="text-sm font-mono text-gray-900">
                          {metric.endpoint}
                        </code>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Last checked: {metric.lastChecked}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Response Time</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {metric.responseTime}ms
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {metric.successRate}%
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Errors</div>
                        <div className="text-lg font-semibold text-gray-900">
                          {metric.errorCount}
                        </div>
                      </div>

                      <div>
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(
                            metric.status
                          )}`}
                        >
                          {metric.status.toUpperCase()}
                        </span>
                      </div>

                      <button
                        data-testid="buildcore-view-details"
                        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            data-testid="buildcore-export"
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Export Report
          </button>
          <button
            data-testid="buildcore-add-endpoint"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Add Endpoint
          </button>
        </div>
      </div>
    </div>
  )
}
