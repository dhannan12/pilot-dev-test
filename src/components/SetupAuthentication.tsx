/**
 * SetupAuthentication — Admin authentication and role-based access control setup
 *
 * Features: user authentication, role management, permission assignment, access control, session handling
 *
 * Ticket: SCRUM-839 | Branch: proto/SCRUM-828
 */

import { useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  createdAt: string
}

interface Role {
  id: string
  name: string
  permissions: string[]
  userCount: number
  description: string
}

interface Permission {
  id: string
  name: string
  category: string
  description: string
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'John Admin',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2026-08-14 10:30',
    createdAt: '2026-01-15'
  },
  {
    id: '2',
    email: 'manager@example.com',
    name: 'Sarah Manager',
    role: 'Manager',
    status: 'active',
    lastLogin: '2026-08-14 09:15',
    createdAt: '2026-02-20'
  },
  {
    id: '3',
    email: 'editor@example.com',
    name: 'Mike Editor',
    role: 'Editor',
    status: 'active',
    lastLogin: '2026-08-13 16:45',
    createdAt: '2026-03-10'
  },
  {
    id: '4',
    email: 'viewer@example.com',
    name: 'Emma Viewer',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2026-08-10 14:20',
    createdAt: '2026-04-05'
  },
  {
    id: '5',
    email: 'support@example.com',
    name: 'David Support',
    role: 'Support',
    status: 'pending',
    lastLogin: 'Never',
    createdAt: '2026-08-14'
  }
]

const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    userCount: 1,
    description: 'Full system access with all permissions'
  },
  {
    id: '2',
    name: 'Manager',
    permissions: ['read', 'write', 'delete', 'manage_users'],
    userCount: 1,
    description: 'Can manage content and users'
  },
  {
    id: '3',
    name: 'Editor',
    permissions: ['read', 'write'],
    userCount: 1,
    description: 'Can view and edit content'
  },
  {
    id: '4',
    name: 'Viewer',
    permissions: ['read'],
    userCount: 1,
    description: 'Read-only access to content'
  },
  {
    id: '5',
    name: 'Support',
    permissions: ['read', 'manage_users'],
    userCount: 1,
    description: 'Can view content and help users'
  }
]

const MOCK_PERMISSIONS: Permission[] = [
  {
    id: '1',
    name: 'read',
    category: 'Content',
    description: 'View content and data'
  },
  {
    id: '2',
    name: 'write',
    category: 'Content',
    description: 'Create and edit content'
  },
  {
    id: '3',
    name: 'delete',
    category: 'Content',
    description: 'Delete content and data'
  },
  {
    id: '4',
    name: 'manage_users',
    category: 'Administration',
    description: 'Create, edit, and remove users'
  },
  {
    id: '5',
    name: 'manage_roles',
    category: 'Administration',
    description: 'Create and modify user roles'
  }
]

export default function SetupAuthentication() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions'>('users')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [authEnabled, setAuthEnabled] = useState(true)
  const [mfaEnabled, setMfaEnabled] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication & Access Control
          </h1>
          <p className="text-gray-600">
            Manage user authentication, roles, and permissions
          </p>
        </div>

        {/* Settings Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Authentication
                </span>
                <button
                  onClick={() => setAuthEnabled(!authEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    authEnabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      authEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Multi-Factor Auth
                </span>
                <button
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    mfaEnabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      mfaEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'users'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users ({MOCK_USERS.length})
              </button>
              <button
                onClick={() => setActiveTab('roles')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'roles'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Roles ({MOCK_ROLES.length})
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'permissions'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Permissions ({MOCK_PERMISSIONS.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    + Add User
                  </button>
                </div>
                <div className="space-y-3">
                  {MOCK_USERS.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedUser === user.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Role: {user.role}</span>
                            <span>•</span>
                            <span>Last login: {user.lastLogin}</span>
                            <span>•</span>
                            <span>Created: {user.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            Edit
                          </button>
                          <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Roles Tab */}
            {activeTab === 'roles' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    + Create Role
                  </button>
                </div>
                <div className="space-y-3">
                  {MOCK_ROLES.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id === selectedRole ? null : role.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedRole === role.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{role.name}</h3>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {role.userCount} {role.userCount === 1 ? 'user' : 'users'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((perm) => (
                              <span
                                key={perm}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            Edit
                          </button>
                          <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Permissions Tab */}
            {activeTab === 'permissions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Permission Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    + Add Permission
                  </button>
                </div>
                <div className="space-y-6">
                  {['Content', 'Administration'].map((category) => (
                    <div key={category}>
                      <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                      <div className="space-y-2">
                        {MOCK_PERMISSIONS.filter(p => p.category === category).map((permission) => (
                          <div
                            key={permission.id}
                            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">{permission.name}</h4>
                                <p className="text-sm text-gray-600">{permission.description}</p>
                              </div>
                              <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors">
                                Configure
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Total Users</div>
            <div className="text-2xl font-bold text-gray-900">{MOCK_USERS.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Active Users</div>
            <div className="text-2xl font-bold text-green-600">
              {MOCK_USERS.filter(u => u.status === 'active').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Total Roles</div>
            <div className="text-2xl font-bold text-gray-900">{MOCK_ROLES.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-600 mb-1">Permissions</div>
            <div className="text-2xl font-bold text-gray-900">{MOCK_PERMISSIONS.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
