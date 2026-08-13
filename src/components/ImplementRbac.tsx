/**
 * ImplementRbac — Role-Based Access Control management interface
 *
 * Features: role management, permission assignment, user role mapping, access matrix, audit logging
 *
 * Ticket: SCRUM-715 | Branch: proto/SCRUM-703
 */

import { useState } from 'react'

interface Permission {
  id: string
  name: string
  resource: string
  action: string
  description: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: string
}

interface User {
  id: string
  name: string
  email: string
  roles: string[]
  lastLogin: string
}

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  status: 'success' | 'denied'
}

const MOCK_PERMISSIONS: Permission[] = [
  {
    id: 'p1',
    name: 'View Properties',
    resource: 'properties',
    action: 'read',
    description: 'View property listings and details'
  },
  {
    id: 'p2',
    name: 'Create Properties',
    resource: 'properties',
    action: 'create',
    description: 'Create new property listings'
  },
  {
    id: 'p3',
    name: 'Edit Properties',
    resource: 'properties',
    action: 'update',
    description: 'Modify existing property information'
  },
  {
    id: 'p4',
    name: 'Delete Properties',
    resource: 'properties',
    action: 'delete',
    description: 'Remove property listings'
  },
  {
    id: 'p5',
    name: 'Manage Users',
    resource: 'users',
    action: 'manage',
    description: 'Create, edit, and delete user accounts'
  },
  {
    id: 'p6',
    name: 'View Analytics',
    resource: 'analytics',
    action: 'read',
    description: 'Access analytics and reports'
  },
  {
    id: 'p7',
    name: 'Manage Bookings',
    resource: 'bookings',
    action: 'manage',
    description: 'Handle property bookings and reservations'
  }
]

const MOCK_ROLES: Role[] = [
  {
    id: 'r1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'],
    userCount: 3,
    createdAt: '2024-01-15'
  },
  {
    id: 'r2',
    name: 'Property Manager',
    description: 'Manage properties and bookings',
    permissions: ['p1', 'p2', 'p3', 'p6', 'p7'],
    userCount: 12,
    createdAt: '2024-02-01'
  },
  {
    id: 'r3',
    name: 'Agent',
    description: 'View and create properties',
    permissions: ['p1', 'p2', 'p6'],
    userCount: 28,
    createdAt: '2024-02-10'
  },
  {
    id: 'r4',
    name: 'Viewer',
    description: 'Read-only access to properties',
    permissions: ['p1'],
    userCount: 45,
    createdAt: '2024-03-01'
  },
  {
    id: 'r5',
    name: 'Support Staff',
    description: 'Handle bookings and view analytics',
    permissions: ['p1', 'p6', 'p7'],
    userCount: 18,
    createdAt: '2024-03-15'
  }
]

const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    roles: ['r1'],
    lastLogin: '2024-08-13 09:30'
  },
  {
    id: 'u2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    roles: ['r2'],
    lastLogin: '2024-08-13 10:15'
  },
  {
    id: 'u3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    roles: ['r3'],
    lastLogin: '2024-08-12 16:45'
  },
  {
    id: 'u4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    roles: ['r4'],
    lastLogin: '2024-08-13 08:20'
  },
  {
    id: 'u5',
    name: 'Lisa Martinez',
    email: 'lisa.martinez@company.com',
    roles: ['r5'],
    lastLogin: '2024-08-13 11:00'
  },
  {
    id: 'u6',
    name: 'James Taylor',
    email: 'james.taylor@company.com',
    roles: ['r2', 'r3'],
    lastLogin: '2024-08-11 14:30'
  }
]

const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'a1',
    timestamp: '2024-08-13 11:23:45',
    user: 'sarah.johnson@company.com',
    action: 'Created property listing',
    resource: 'Property #12345',
    status: 'success'
  },
  {
    id: 'a2',
    timestamp: '2024-08-13 11:15:32',
    user: 'david.kim@company.com',
    action: 'Attempted to delete property',
    resource: 'Property #12340',
    status: 'denied'
  },
  {
    id: 'a3',
    timestamp: '2024-08-13 10:58:21',
    user: 'michael.chen@company.com',
    action: 'Updated property details',
    resource: 'Property #12338',
    status: 'success'
  },
  {
    id: 'a4',
    timestamp: '2024-08-13 10:45:15',
    user: 'emily.rodriguez@company.com',
    action: 'Viewed analytics dashboard',
    resource: 'Analytics',
    status: 'success'
  },
  {
    id: 'a5',
    timestamp: '2024-08-13 10:30:08',
    user: 'lisa.martinez@company.com',
    action: 'Managed booking',
    resource: 'Booking #B789',
    status: 'success'
  },
  {
    id: 'a6',
    timestamp: '2024-08-13 10:12:54',
    user: 'emily.rodriguez@company.com',
    action: 'Attempted to manage users',
    resource: 'User Management',
    status: 'denied'
  }
]

export default function ImplementRbac() {
  const [activeTab, setActiveTab] = useState<'roles' | 'users' | 'permissions' | 'audit'>('roles')
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const getPermissionById = (id: string): Permission | undefined => {
    return MOCK_PERMISSIONS.find(p => p.id === id)
  }

  const getRoleById = (id: string): Role | undefined => {
    return MOCK_ROLES.find(r => r.id === id)
  }

  const getRoleNames = (roleIds: string[]): string => {
    return roleIds.map(id => getRoleById(id)?.name || 'Unknown').join(', ')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Role-Based Access Control
          </h1>
          <p className="text-gray-600">
            Manage roles, permissions, and user access across the platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Roles</div>
            <div className="text-3xl font-bold text-blue-600">{MOCK_ROLES.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Active Users</div>
            <div className="text-3xl font-bold text-green-600">{MOCK_USERS.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Permissions</div>
            <div className="text-3xl font-bold text-purple-600">{MOCK_PERMISSIONS.length}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Access Denied (24h)</div>
            <div className="text-3xl font-bold text-red-600">
              {MOCK_AUDIT_LOGS.filter(log => log.status === 'denied').length}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {(['roles', 'users', 'permissions', 'audit'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Roles Tab */}
            {activeTab === 'roles' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">System Roles</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    + Create Role
                  </button>
                </div>

                <div className="space-y-4">
                  {MOCK_ROLES.map(role => (
                    <div
                      key={role.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
                      onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              {role.userCount} users
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{role.description}</p>
                          <div className="text-xs text-gray-500">
                            Created: {role.createdAt} • {role.permissions.length} permissions
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                            Edit
                          </button>
                          <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                            Delete
                          </button>
                        </div>
                      </div>

                      {selectedRole === role.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">Permissions:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {role.permissions.map(permId => {
                              const perm = getPermissionById(permId)
                              return perm ? (
                                <div key={permId} className="flex items-center gap-2 text-sm">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-gray-700">{perm.name}</span>
                                  <span className="text-gray-400 text-xs">({perm.action})</span>
                                </div>
                              ) : null
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    + Add User
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Roles
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {MOCK_USERS.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.email}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {user.roles.map(roleId => {
                                const role = getRoleById(roleId)
                                return role ? (
                                  <span
                                    key={roleId}
                                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                                  >
                                    {role.name}
                                  </span>
                                ) : null
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.lastLogin}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                              className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                              Manage
                            </button>
                            <button className="text-red-600 hover:text-red-800">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Permissions Tab */}
            {activeTab === 'permissions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">System Permissions</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    + Add Permission
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_PERMISSIONS.map(permission => (
                    <div
                      key={permission.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base font-semibold text-gray-900">{permission.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          permission.action === 'read'
                            ? 'bg-green-100 text-green-700'
                            : permission.action === 'create'
                            ? 'bg-blue-100 text-blue-700'
                            : permission.action === 'update'
                            ? 'bg-yellow-100 text-yellow-700'
                            : permission.action === 'delete'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {permission.action}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{permission.description}</p>
                      <div className="text-xs text-gray-500">
                        Resource: <span className="font-medium text-gray-700">{permission.resource}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                        Used in {MOCK_ROLES.filter(r => r.permissions.includes(permission.id)).length} roles
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audit Log Tab */}
            {activeTab === 'audit' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Access Audit Log</h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                      Filter
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                      Export
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {MOCK_AUDIT_LOGS.map(log => (
                    <div
                      key={log.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              log.status === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {log.status}
                            </span>
                            <span className="text-sm font-medium text-gray-900">{log.action}</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            User: <span className="font-medium">{log.user}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Resource: <span className="font-medium">{log.resource}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                          {log.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
