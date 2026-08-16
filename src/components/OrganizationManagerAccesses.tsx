/**
 * OrganizationManagerAccesses — Organization manager dashboard for accessing and viewing reporting page
 *
 * Features: access log tracking, report viewing, manager dashboard, activity monitoring, report generation controls
 *
 * Ticket: SCRUM-932 | Branch: proto/SCRUM-926
 */

import React, { useState } from 'react'

interface AccessLog {
  id: string
  managerId: string
  managerName: string
  reportType: string
  accessedAt: string
  duration: number
  action: 'view' | 'download' | 'export' | 'share'
}

interface ReportSummary {
  id: string
  title: string
  type: 'volunteer-hours' | 'activity-report' | 'financial' | 'impact' | 'attendance'
  lastUpdated: string
  status: 'ready' | 'generating' | 'outdated'
  viewCount: number
}

const mockAccessLogs: AccessLog[] = [
  {
    id: '1',
    managerId: 'MGR001',
    managerName: 'Jennifer Martinez',
    reportType: 'Volunteer Hours Summary',
    accessedAt: '2026-08-16T09:30:00',
    duration: 15,
    action: 'view'
  },
  {
    id: '2',
    managerId: 'MGR001',
    managerName: 'Jennifer Martinez',
    reportType: 'Monthly Activity Report',
    accessedAt: '2026-08-16T10:15:00',
    duration: 22,
    action: 'download'
  },
  {
    id: '3',
    managerId: 'MGR002',
    managerName: 'Robert Chen',
    reportType: 'Financial Overview',
    accessedAt: '2026-08-16T11:00:00',
    duration: 18,
    action: 'export'
  },
  {
    id: '4',
    managerId: 'MGR003',
    managerName: 'Sarah Thompson',
    reportType: 'Impact Assessment',
    accessedAt: '2026-08-16T13:45:00',
    duration: 30,
    action: 'view'
  },
  {
    id: '5',
    managerId: 'MGR002',
    managerName: 'Robert Chen',
    reportType: 'Volunteer Attendance',
    accessedAt: '2026-08-16T14:20:00',
    duration: 12,
    action: 'share'
  },
  {
    id: '6',
    managerId: 'MGR004',
    managerName: 'Amanda Rodriguez',
    reportType: 'Quarterly Performance',
    accessedAt: '2026-08-16T15:00:00',
    duration: 25,
    action: 'view'
  },
  {
    id: '7',
    managerId: 'MGR001',
    managerName: 'Jennifer Martinez',
    reportType: 'Program Effectiveness',
    accessedAt: '2026-08-16T16:30:00',
    duration: 20,
    action: 'download'
  }
]

const mockReports: ReportSummary[] = [
  {
    id: 'R001',
    title: 'Volunteer Hours Summary',
    type: 'volunteer-hours',
    lastUpdated: '2026-08-16T08:00:00',
    status: 'ready',
    viewCount: 45
  },
  {
    id: 'R002',
    title: 'Monthly Activity Report',
    type: 'activity-report',
    lastUpdated: '2026-08-16T07:30:00',
    status: 'ready',
    viewCount: 32
  },
  {
    id: 'R003',
    title: 'Financial Overview Q3 2026',
    type: 'financial',
    lastUpdated: '2026-08-15T18:00:00',
    status: 'ready',
    viewCount: 28
  },
  {
    id: 'R004',
    title: 'Community Impact Assessment',
    type: 'impact',
    lastUpdated: '2026-08-16T09:00:00',
    status: 'ready',
    viewCount: 19
  },
  {
    id: 'R005',
    title: 'Volunteer Attendance Tracking',
    type: 'attendance',
    lastUpdated: '2026-08-14T16:00:00',
    status: 'outdated',
    viewCount: 56
  },
  {
    id: 'R006',
    title: 'Annual Program Effectiveness',
    type: 'activity-report',
    lastUpdated: '2026-08-16T10:00:00',
    status: 'generating',
    viewCount: 0
  }
]

export default function OrganizationManagerAccesses() {
  const [selectedReportType, setSelectedReportType] = useState<string>('all')
  const [selectedManager, setSelectedManager] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'reports' | 'logs'>('reports')

  // Get unique managers
  const uniqueManagers = Array.from(
    new Set(mockAccessLogs.map(log => log.managerName))
  ).sort()

  // Filter access logs
  const filteredLogs = mockAccessLogs.filter(log => {
    const matchesManager = selectedManager === 'all' || log.managerName === selectedManager
    const matchesType = selectedReportType === 'all' || log.reportType.toLowerCase().includes(selectedReportType.toLowerCase())
    return matchesManager && matchesType
  })

  // Filter reports
  const filteredReports = mockReports.filter(report => {
    return selectedReportType === 'all' || report.type === selectedReportType
  })

  // Calculate stats
  const totalAccesses = filteredLogs.length
  const totalDuration = filteredLogs.reduce((sum, log) => sum + log.duration, 0)
  const avgDuration = totalAccesses > 0 ? totalDuration / totalAccesses : 0

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'generating':
        return 'bg-blue-100 text-blue-800'
      case 'outdated':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'view':
        return 'bg-blue-100 text-blue-800'
      case 'download':
        return 'bg-green-100 text-green-800'
      case 'export':
        return 'bg-purple-100 text-purple-800'
      case 'share':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section data-testid="organizationmanageraccesses" className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Organization Manager Reporting Portal
          </h1>
          <p className="text-gray-600">
            Access reports, view analytics, and monitor report usage
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex gap-4">
            <button
              data-testid="organizationmanageraccesses-view-reports"
              onClick={() => setViewMode('reports')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                viewMode === 'reports'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Available Reports
            </button>
            <button
              data-testid="organizationmanageraccesses-view-logs"
              onClick={() => setViewMode('logs')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                viewMode === 'logs'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Access Logs
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select
                id="report-type"
                data-testid="organizationmanageraccesses-report-type"
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Report Types</option>
                <option value="volunteer-hours">Volunteer Hours</option>
                <option value="activity-report">Activity Report</option>
                <option value="financial">Financial</option>
                <option value="impact">Impact Assessment</option>
                <option value="attendance">Attendance</option>
              </select>
            </div>
            {viewMode === 'logs' && (
              <div>
                <label htmlFor="manager-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Manager
                </label>
                <select
                  id="manager-select"
                  data-testid="organizationmanageraccesses-manager"
                  value={selectedManager}
                  onChange={(e) => setSelectedManager(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Managers</option>
                  {uniqueManagers.map(manager => (
                    <option key={manager} value={manager}>{manager}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        {viewMode === 'logs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
              <div className="text-sm font-medium opacity-90 mb-1">Total Accesses</div>
              <div className="text-4xl font-bold">{totalAccesses}</div>
              <div className="text-sm opacity-75 mt-1">report views</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <div className="text-sm font-medium opacity-90 mb-1">Total Duration</div>
              <div className="text-4xl font-bold">{totalDuration}</div>
              <div className="text-sm opacity-75 mt-1">minutes</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
              <div className="text-sm font-medium opacity-90 mb-1">Avg Duration</div>
              <div className="text-4xl font-bold">{avgDuration.toFixed(1)}</div>
              <div className="text-sm opacity-75 mt-1">minutes</div>
            </div>
          </div>
        )}

        {/* Reports View */}
        {viewMode === 'reports' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Available Reports</h2>
              <button
                data-testid="organizationmanageraccesses-generate-report"
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Generate New Report
              </button>
            </div>
            {filteredReports.length > 0 ? (
              <div data-testid="organizationmanageraccesses-report-list" className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    data-testid="organizationmanageraccesses-report-item"
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {report.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                          <span>ID: {report.id}</span>
                          <span>•</span>
                          <span>Updated: {formatDate(report.lastUpdated)} at {formatTime(report.lastUpdated)}</span>
                          <span>•</span>
                          <span>{report.viewCount} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}
                          >
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                            {report.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          data-testid="organizationmanageraccesses-view"
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View
                        </button>
                        <button
                          data-testid="organizationmanageraccesses-download"
                          className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Download
                        </button>
                        <button
                          data-testid="organizationmanageraccesses-share"
                          className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No reports found matching the selected filters
              </div>
            )}
          </div>
        )}

        {/* Access Logs View */}
        {viewMode === 'logs' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Access Logs</h2>
            {filteredLogs.length > 0 ? (
              <div data-testid="organizationmanageraccesses-log-list" className="space-y-3">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    data-testid="organizationmanageraccesses-log-item"
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900">{log.managerName}</span>
                        <span className="text-sm text-gray-500">({log.managerId})</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}
                        >
                          {log.action.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-medium">Report:</span> {log.reportType}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(log.accessedAt)} at {formatTime(log.accessedAt)} • Duration: {log.duration} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No access logs found matching the selected filters
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            data-testid="organizationmanageraccesses-refresh"
            onClick={() => {
              setSelectedReportType('all')
              setSelectedManager('all')
            }}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Reset Filters
          </button>
          <button
            data-testid="organizationmanageraccesses-export"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Export Data
          </button>
        </div>
      </div>
    </section>
  )
}
