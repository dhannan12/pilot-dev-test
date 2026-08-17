/**
 * WorkforcePlanningTeam — Analyze workforce needs using real-time data on open roles and application volumes
 *
 * Features: role demand tracking, application volume metrics, hiring forecast dashboard, department-level analytics, trend visualization
 *
 * Ticket: SCRUM-999 | Branch: proto/SCRUM-993
 */

import { useState } from 'react'

interface RoleData {
  id: string
  department: string
  position: string
  openings: number
  applications: number
  avgTimeToHire: number
  urgency: 'low' | 'medium' | 'high' | 'critical'
  trend: 'up' | 'down' | 'stable'
}

interface DepartmentSummary {
  department: string
  totalOpenings: number
  totalApplications: number
  avgApplicationsPerRole: number
  fillRate: number
}

const mockRoleData: RoleData[] = [
  {
    id: 'role-1',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    openings: 8,
    applications: 124,
    avgTimeToHire: 45,
    urgency: 'high',
    trend: 'up'
  },
  {
    id: 'role-2',
    department: 'Engineering',
    position: 'DevOps Engineer',
    openings: 3,
    applications: 67,
    avgTimeToHire: 38,
    urgency: 'medium',
    trend: 'stable'
  },
  {
    id: 'role-3',
    department: 'Sales',
    position: 'Account Executive',
    openings: 12,
    applications: 89,
    avgTimeToHire: 28,
    urgency: 'critical',
    trend: 'up'
  },
  {
    id: 'role-4',
    department: 'Marketing',
    position: 'Content Marketing Manager',
    openings: 2,
    applications: 156,
    avgTimeToHire: 32,
    urgency: 'low',
    trend: 'down'
  },
  {
    id: 'role-5',
    department: 'Product',
    position: 'Product Manager',
    openings: 5,
    applications: 203,
    avgTimeToHire: 52,
    urgency: 'high',
    trend: 'up'
  },
  {
    id: 'role-6',
    department: 'Customer Success',
    position: 'Customer Success Manager',
    openings: 6,
    applications: 98,
    avgTimeToHire: 25,
    urgency: 'medium',
    trend: 'stable'
  },
  {
    id: 'role-7',
    department: 'Engineering',
    position: 'Frontend Developer',
    openings: 4,
    applications: 187,
    avgTimeToHire: 41,
    urgency: 'medium',
    trend: 'stable'
  },
  {
    id: 'role-8',
    department: 'Sales',
    position: 'Sales Development Representative',
    openings: 15,
    applications: 76,
    avgTimeToHire: 22,
    urgency: 'critical',
    trend: 'up'
  }
]

export default function WorkforcePlanningTeam() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'urgency' | 'applications' | 'openings'>('urgency')

  // Calculate department summaries
  const departmentSummaries: DepartmentSummary[] = Array.from(
    new Set(mockRoleData.map(role => role.department))
  ).map(dept => {
    const deptRoles = mockRoleData.filter(role => role.department === dept)
    const totalOpenings = deptRoles.reduce((sum, role) => sum + role.openings, 0)
    const totalApplications = deptRoles.reduce((sum, role) => sum + role.applications, 0)
    return {
      department: dept,
      totalOpenings,
      totalApplications,
      avgApplicationsPerRole: totalApplications / deptRoles.length,
      fillRate: (totalApplications / totalOpenings) * 100
    }
  })

  // Filter and sort roles
  const filteredRoles = selectedDepartment === 'all'
    ? mockRoleData
    : mockRoleData.filter(role => role.department === selectedDepartment)

  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (sortBy === 'urgency') {
      const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
    } else if (sortBy === 'applications') {
      return b.applications - a.applications
    } else {
      return b.openings - a.openings
    }
  })

  // Calculate totals
  const totalOpenings = mockRoleData.reduce((sum, role) => sum + role.openings, 0)
  const totalApplications = mockRoleData.reduce((sum, role) => sum + role.applications, 0)
  const avgApplicationsPerOpening = (totalApplications / totalOpenings).toFixed(1)

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↑'
      case 'down':
        return '↓'
      case 'stable':
        return '→'
      default:
        return '→'
    }
  }

  return (
    <div data-testid="workforceplanningteam" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Workforce Planning Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time data on open roles and application volumes for hiring forecasting
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Open Roles</div>
            <div className="text-3xl font-bold text-gray-900">{totalOpenings}</div>
            <div className="text-xs text-green-600 mt-1">Across all departments</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Applications</div>
            <div className="text-3xl font-bold text-gray-900">{totalApplications}</div>
            <div className="text-xs text-blue-600 mt-1">Active candidates</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Avg Apps/Opening</div>
            <div className="text-3xl font-bold text-gray-900">{avgApplicationsPerOpening}</div>
            <div className="text-xs text-purple-600 mt-1">Market demand indicator</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Departments</div>
            <div className="text-3xl font-bold text-gray-900">{departmentSummaries.length}</div>
            <div className="text-xs text-indigo-600 mt-1">Hiring teams</div>
          </div>
        </div>

        {/* Department Summary */}
        <div className="bg-white rounded-lg shadow mb-8 border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Department Overview</h2>
          </div>
          <div className="p-6">
            <div data-testid="workforceplanningteam-department-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {departmentSummaries.map((summary) => (
                <div
                  key={summary.department}
                  data-testid="workforceplanningteam-department-item"
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 mb-3">{summary.department}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Openings:</span>
                      <span className="font-medium text-gray-900">{summary.totalOpenings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Applications:</span>
                      <span className="font-medium text-gray-900">{summary.totalApplications}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg per role:</span>
                      <span className="font-medium text-gray-900">
                        {summary.avgApplicationsPerRole.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-600">Fill rate:</span>
                      <span className="font-semibold text-blue-600">
                        {summary.fillRate.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow mb-6 p-6 border border-gray-200">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label htmlFor="department-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Department
              </label>
              <select
                id="department-filter"
                data-testid="workforceplanningteam-department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Departments</option>
                {departmentSummaries.map((summary) => (
                  <option key={summary.department} value={summary.department}>
                    {summary.department}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                id="sort-by"
                data-testid="workforceplanningteam-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'urgency' | 'applications' | 'openings')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="urgency">Urgency</option>
                <option value="applications">Applications</option>
                <option value="openings">Openings</option>
              </select>
            </div>
            <div className="ml-auto">
              <button
                data-testid="workforceplanningteam-export"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Role Details Table */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Role-Level Analysis ({sortedRoles.length} roles)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Openings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Apps/Opening
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Avg Time to Hire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody data-testid="workforceplanningteam-list" className="bg-white divide-y divide-gray-200">
                {sortedRoles.map((role) => (
                  <tr
                    key={role.id}
                    data-testid="workforceplanningteam-item"
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {role.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {role.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-semibold">{role.openings}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-semibold text-blue-600">{role.applications}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(role.applications / role.openings).toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {role.avgTimeToHire} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(
                          role.urgency
                        )}`}
                      >
                        {role.urgency.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="font-bold text-lg">{getTrendIcon(role.trend)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Forecast Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiring Forecast Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="font-semibold text-gray-900 mb-2">High Priority Roles</div>
              <div className="text-2xl font-bold text-red-600">
                {mockRoleData.filter(r => r.urgency === 'critical' || r.urgency === 'high').length}
              </div>
              <div className="text-gray-600 mt-1">Require immediate attention</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="font-semibold text-gray-900 mb-2">Undersubscribed Roles</div>
              <div className="text-2xl font-bold text-orange-600">
                {mockRoleData.filter(r => r.applications / r.openings < 10).length}
              </div>
              <div className="text-gray-600 mt-1">Need recruitment boost</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="font-semibold text-gray-900 mb-2">Upward Trends</div>
              <div className="text-2xl font-bold text-green-600">
                {mockRoleData.filter(r => r.trend === 'up').length}
              </div>
              <div className="text-gray-600 mt-1">Growing demand</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
