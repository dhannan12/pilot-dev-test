/**
 * SetupAuthenticationAnd — Authentication and Role-Based Access Control setup interface
 *
 * Features: user authentication, role management, permissions configuration, RBAC rules, access control
 *
 * Ticket: SCRUM-746 | Branch: proto/SCRUM-733
 */

import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  permissions: string[]
  lastLogin?: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface Permission {
  id: string
  name: string
  category: string
  description: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    lastLogin: '2026-08-13 10:30'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Manager',
    status: 'active',
    permissions: ['read', 'write', 'manage_tasks'],
    lastLogin: '2026-08-13 09:15'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    role: 'Developer',
    status: 'active',
    permissions: ['read', 'write'],
    lastLogin: '2026-08-12 16:45'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'Viewer',
    status: 'active',
    permissions: ['read'],
    lastLogin: '2026-08-11 14:20'
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma@example.com',
    role: 'Developer',
    status: 'pending',
    permissions: ['read'],
    lastLogin: undefined
  }
]

const mockRoles: Role[] = [
  {
    id: 'r1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles', 'manage_settings'],
    userCount: 1
  },
  {
    id: 'r2',
    name: 'Manager',
    description: 'Can manage tasks and view reports',
    permissions: ['read', 'write', 'manage_tasks', 'view_reports'],
    userCount: 1
  },
  {
    id: 'r3',
    name: 'Developer',
    description: 'Can read and write tasks',
    permissions: ['read', 'write', 'comment'],
    userCount: 2
  },
  {
    id: 'r4',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: ['read'],
    userCount: 1
  },
  {
    id: 'r5',
    name: 'Guest',
    description: 'Limited read access to public resources',
    permissions: ['read_public'],
    userCount: 0
  }
]

const mockPermissions: Permission[] = [
  {
    id: 'p1',
    name: 'read',
    category: 'Basic',
    description: 'View content and resources'
  },
  {
    id: 'p2',
    name: 'write',
    category: 'Basic',
    description: 'Create and edit content'
  },
  {
    id: 'p3',
    name: 'delete',
    category: 'Basic',
    description: 'Delete content and resources'
  },
  {
    id: 'p4',
    name: 'manage_users',
    category: 'Administration',
    description: 'Add, edit, and remove users'
  },
  {
    id: 'p5',
    name: 'manage_roles',
    category: 'Administration',
    description: 'Create and modify roles'
  },
  {
    id: 'p6',
    name: 'manage_settings',
    category: 'Administration',
    description: 'Configure system settings'
  },
  {
    id: 'p7',
    name: 'manage_tasks',
    category: 'Tasks',
    description: 'Manage task assignments and workflows'
  },
  {
    id: 'p8',
    name: 'view_reports',
    category: 'Analytics',
    description: 'Access reports and analytics'
  }
]

export default function SetupAuthenticationAnd() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions'>('users')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [authEnabled, setAuthEnabled] = useState(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Authentication & RBAC Setup</h1>
              <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={authEnabled}
                  onChange={(e) => setAuthEnabled(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Authentication Enabled</span>
              </label>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${authEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {authEnabled ? 'Active' : 'Disabled'}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users ({mockUsers.length})
              </button>
              <button
                onClick={() => setActiveTab('roles')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'roles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Roles ({mockRoles.length})
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'permissions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Permissions ({mockPermissions.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Add User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{user.permissions.length} permissions</div>
                            <div className="text-xs text-gray-500">{user.permissions.slice(0, 2).join(', ')}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastLogin || 'Never'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="text-blue-600 hover:text-blue-900 mr-3"
                            >
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Roles Tab */}
            {activeTab === 'roles' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Create Role
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockRoles.map((role) => (
                    <div
                      key={role.id}
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedRole(role)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                          {role.userCount} users
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-500 uppercase">Permissions</div>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((perm, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm font-medium">
                          Edit
                        </button>
                        <button className="flex-1 px-3 py-1 border border-red-300 text-red-700 rounded hover:bg-red-50 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Permissions Tab */}
            {activeTab === 'permissions' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Permission Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Add Permission
                  </button>
                </div>
                <div className="space-y-6">
                  {['Basic', 'Administration', 'Tasks', 'Analytics'].map((category) => {
                    const categoryPermissions = mockPermissions.filter(p => p.category === category)
                    if (categoryPermissions.length === 0) return null
                    return (
                      <div key={category} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
                        <div className="space-y-2">
                          {categoryPermissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                            >
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <code className="px-2 py-1 bg-gray-100 text-gray-800 text-sm font-mono rounded">
                                    {permission.name}
                                  </code>
                                  <span className="text-sm text-gray-500">•</span>
                                  <span className="text-sm text-gray-600">{permission.description}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                                  Edit
                                </button>
                                <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium">
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="text-sm font-medium text-gray-500">Total Users</div>
            <div className="mt-1 text-3xl font-bold text-gray-900">{mockUsers.length}</div>
            <div className="mt-1 text-xs text-gray-500">
              {mockUsers.filter(u => u.status === 'active').length} active
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="text-sm font-medium text-gray-500">Roles Defined</div>
            <div className="mt-1 text-3xl font-bold text-gray-900">{mockRoles.length}</div>
            <div className="mt-1 text-xs text-gray-500">
              {mockRoles.filter(r => r.userCount > 0).length} in use
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="text-sm font-medium text-gray-500">Permissions</div>
            <div className="mt-1 text-3xl font-bold text-gray-900">{mockPermissions.length}</div>
            <div className="mt-1 text-xs text-gray-500">Across 4 categories</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-5">
            <div className="text-sm font-medium text-gray-500">Pending Users</div>
            <div className="mt-1 text-3xl font-bold text-gray-900">
              {mockUsers.filter(u => u.status === 'pending').length}
            </div>
            <div className="mt-1 text-xs text-gray-500">Awaiting approval</div>
          </div>
        </div>
      </div>
    </div>
  )
}
