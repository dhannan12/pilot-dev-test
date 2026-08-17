/**
 * ImplementRbac — Role-based access control and authorization demo UI
 *
 * Features: JWT token simulation, 4 user roles (Employee, HiringManager, HRBusinessPartner, WorkforcePlanningTeam), permission-based UI rendering, secure action authorization, mock user switching
 *
 * Ticket: SCRUM-1014 | Branch: proto/SCRUM-1014
 */

import { useState } from 'react'

type UserRole = 'Employee' | 'HiringManager' | 'HRBusinessPartner' | 'WorkforcePlanningTeam'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  token: string
}

interface Permission {
  action: string
  resource: string
  roles: UserRole[]
}

interface ActionLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  result: 'authorized' | 'denied'
}

// Mock users for demonstration
const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Employee',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.employee'
  },
  {
    id: 'u2',
    name: 'Sarah Manager',
    email: 'sarah.manager@company.com',
    role: 'HiringManager',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.hiring_manager'
  },
  {
    id: 'u3',
    name: 'Alex Partner',
    email: 'alex.partner@company.com',
    role: 'HRBusinessPartner',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.hr_bp'
  },
  {
    id: 'u4',
    name: 'Emily Planner',
    email: 'emily.planner@company.com',
    role: 'WorkforcePlanningTeam',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.workforce_planning'
  },
  {
    id: 'u5',
    name: 'Mike Employee',
    email: 'mike.employee@company.com',
    role: 'Employee',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.employee2'
  }
]

// Permission matrix based on BR-002 and BR-009
const PERMISSIONS: Permission[] = [
  { action: 'view', resource: 'job_postings', roles: ['Employee', 'HiringManager', 'HRBusinessPartner', 'WorkforcePlanningTeam'] },
  { action: 'create', resource: 'job_postings', roles: ['HiringManager', 'HRBusinessPartner', 'WorkforcePlanningTeam'] },
  { action: 'edit', resource: 'job_postings', roles: ['HiringManager', 'HRBusinessPartner', 'WorkforcePlanningTeam'] },
  { action: 'delete', resource: 'job_postings', roles: ['HRBusinessPartner', 'WorkforcePlanningTeam'] },
  { action: 'view', resource: 'applications', roles: ['Employee', 'HiringManager', 'HRBusinessPartner'] },
  { action: 'submit', resource: 'applications', roles: ['Employee'] },
  { action: 'review', resource: 'applications', roles: ['HiringManager', 'HRBusinessPartner'] },
  { action: 'view', resource: 'workforce_reports', roles: ['WorkforcePlanningTeam', 'HRBusinessPartner'] },
  { action: 'export', resource: 'workforce_reports', roles: ['WorkforcePlanningTeam'] },
  { action: 'manage', resource: 'user_roles', roles: ['HRBusinessPartner'] }
]

export default function ImplementRbac() {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0])
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([])

  // Check if user has permission for action on resource
  const hasPermission = (action: string, resource: string, role: UserRole): boolean => {
    const permission = PERMISSIONS.find(
      p => p.action === action && p.resource === resource
    )
    return permission ? permission.roles.includes(role) : false
  }

  // Attempt to perform an action (simulated authorization check)
  const attemptAction = (action: string, resource: string) => {
    const authorized = hasPermission(action, resource, currentUser.role)
    const log: ActionLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: currentUser.name,
      action: `${action} ${resource}`,
      resource: resource,
      result: authorized ? 'authorized' : 'denied'
    }
    setActionLogs(prev => [log, ...prev.slice(0, 9)])
  }

  // Get role badge color
  const getRoleBadgeColor = (role: UserRole): string => {
    switch (role) {
      case 'Employee': return 'bg-blue-100 text-blue-800'
      case 'HiringManager': return 'bg-green-100 text-green-800'
      case 'HRBusinessPartner': return 'bg-purple-100 text-purple-800'
      case 'WorkforcePlanningTeam': return 'bg-orange-100 text-orange-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8" data-testid="implement-rbac">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="implement-rbac-title">
            RBAC Authorization Demo
          </h1>
          <p className="text-gray-600">
            Role-Based Access Control with JWT token validation and permission enforcement (BR-002, BR-009)
          </p>
        </div>

        {/* Current User Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6" data-testid="current-user-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Current User</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(currentUser.role)}`} data-testid="current-user-role">
              {currentUser.role}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-gray-900" data-testid="current-user-name">{currentUser.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900" data-testid="current-user-email">{currentUser.email}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">JWT Token (simulated)</p>
            <code className="block bg-gray-100 p-2 rounded text-xs text-gray-700 break-all" data-testid="current-user-token">
              {currentUser.token}
            </code>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Switch User</p>
            <div className="flex flex-wrap gap-2" data-testid="user-switcher">
              {MOCK_USERS.map(user => (
                <button
                  key={user.id}
                  onClick={() => setCurrentUser(user)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentUser.id === user.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid={`user-switch-${user.id}`}
                >
                  {user.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Permission Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-testid="permission-actions">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Permissions</h2>
            <div className="space-y-3">
              {/* Job Postings */}
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Job Postings</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => attemptAction('view', 'job_postings')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('view', 'job_postings', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-view-job-postings"
                  >
                    View
                  </button>
                  <button
                    onClick={() => attemptAction('create', 'job_postings')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('create', 'job_postings', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-create-job-postings"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => attemptAction('edit', 'job_postings')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('edit', 'job_postings', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-edit-job-postings"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => attemptAction('delete', 'job_postings')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('delete', 'job_postings', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-delete-job-postings"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Applications */}
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => attemptAction('view', 'applications')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('view', 'applications', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-view-applications"
                  >
                    View
                  </button>
                  <button
                    onClick={() => attemptAction('submit', 'applications')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('submit', 'applications', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-submit-applications"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => attemptAction('review', 'applications')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('review', 'applications', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-review-applications"
                  >
                    Review
                  </button>
                </div>
              </div>

              {/* Workforce Reports */}
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Workforce Reports</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => attemptAction('view', 'workforce_reports')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('view', 'workforce_reports', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-view-workforce-reports"
                  >
                    View
                  </button>
                  <button
                    onClick={() => attemptAction('export', 'workforce_reports')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('export', 'workforce_reports', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-export-workforce-reports"
                  >
                    Export
                  </button>
                </div>
              </div>

              {/* User Roles */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">User Roles</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => attemptAction('manage', 'user_roles')}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      hasPermission('manage', 'user_roles', currentUser.role)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                    data-testid="action-manage-user-roles"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Authorization Logs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-testid="authorization-logs">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Authorization Logs</h2>
            {actionLogs.length === 0 ? (
              <p className="text-gray-500 text-sm" data-testid="logs-empty">
                No actions yet. Click any action button to test authorization.
              </p>
            ) : (
              <div className="space-y-2" data-testid="logs-list">
                {actionLogs.map(log => (
                  <div
                    key={log.id}
                    className={`p-3 rounded border ${
                      log.result === 'authorized'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                    data-testid="log-item"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{log.action}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          log.result === 'authorized'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                        data-testid="log-result"
                      >
                        {log.result.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{log.user}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6" data-testid="permission-matrix">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Permission Matrix (BR-002, BR-009)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Action</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-700">Resource</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-700">Employee</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-700">Hiring Manager</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-700">HR BP</th>
                  <th className="text-center py-2 px-3 font-semibold text-gray-700">Workforce Planning</th>
                </tr>
              </thead>
              <tbody data-testid="permission-matrix-body">
                {PERMISSIONS.map((perm, idx) => (
                  <tr key={idx} className="border-b border-gray-100" data-testid="permission-row">
                    <td className="py-2 px-3 text-gray-900">{perm.action}</td>
                    <td className="py-2 px-3 text-gray-600">{perm.resource}</td>
                    <td className="py-2 px-3 text-center">
                      {perm.roles.includes('Employee') ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {perm.roles.includes('HiringManager') ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {perm.roles.includes('HRBusinessPartner') ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-center">
                      {perm.roles.includes('WorkforcePlanningTeam') ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
