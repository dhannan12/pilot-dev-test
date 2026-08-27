/**
 * SetupAuthenticationAnd — Authentication and role-based access control (RBAC) management interface
 *
 * Features: user authentication, role assignment, permission management, access control, user administration
 *
 * Ticket: SCRUM-1231 | Branch: proto/SCRUM-1223
 */

import React, { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
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

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2026-08-27 10:30',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2026-08-27 09:15',
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2026-08-26 16:45',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    role: 'Editor',
    status: 'inactive',
    lastLogin: '2026-08-20 14:20',
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2026-08-27 08:00',
  },
]

const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access and user management',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    userCount: 1,
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can create and edit content',
    permissions: ['read', 'write', 'delete'],
    userCount: 2,
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access to content',
    permissions: ['read'],
    userCount: 2,
  },
  {
    id: '4',
    name: 'Moderator',
    description: 'Can moderate content and manage users',
    permissions: ['read', 'write', 'manage_users'],
    userCount: 0,
  },
  {
    id: '5',
    name: 'Guest',
    description: 'Limited read access',
    permissions: ['read'],
    userCount: 0,
  },
]

const MOCK_PERMISSIONS: Permission[] = [
  {
    id: '1',
    name: 'read',
    category: 'Content',
    description: 'View content and data',
  },
  {
    id: '2',
    name: 'write',
    category: 'Content',
    description: 'Create and edit content',
  },
  {
    id: '3',
    name: 'delete',
    category: 'Content',
    description: 'Delete content and data',
  },
  {
    id: '4',
    name: 'manage_users',
    category: 'Administration',
    description: 'Add, edit, and remove users',
  },
  {
    id: '5',
    name: 'manage_roles',
    category: 'Administration',
    description: 'Create and modify roles and permissions',
  },
]

export default function SetupAuthenticationAnd() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions'>('users')
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [roles] = useState<Role[]>(MOCK_ROLES)
  const [permissions] = useState<Permission[]>(MOCK_PERMISSIONS)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setIsAuthenticated(true)
      setLoginEmail('')
      setLoginPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setSelectedUser(null)
    setSelectedRole(null)
  }

  const handleUserStatusToggle = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  if (!isAuthenticated) {
    return (
      <div data-testid="setupauthenticationand" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
            <p className="text-gray-600">Sign in to access RBAC management</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                data-testid="setupauthenticationand-email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                data-testid="setupauthenticationand-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <button
              data-testid="setupauthenticationand-login"
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Demo credentials: Use any email/password combination
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="setupauthenticationand" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication & RBAC</h1>
              <p className="text-gray-600">Manage users, roles, and permissions</p>
            </div>
            <button
              data-testid="setupauthenticationand-logout"
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                data-testid="setupauthenticationand-tab-users"
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users ({users.length})
              </button>
              <button
                data-testid="setupauthenticationand-tab-roles"
                onClick={() => setActiveTab('roles')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'roles'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Roles ({roles.length})
              </button>
              <button
                data-testid="setupauthenticationand-tab-permissions"
                onClick={() => setActiveTab('permissions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'permissions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Permissions ({permissions.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <button
                data-testid="setupauthenticationand-add-user"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add User
              </button>
            </div>

            <div data-testid="setupauthenticationand-list" className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  data-testid="setupauthenticationand-item"
                  className={`border rounded-lg p-4 transition-all ${
                    selectedUser === user.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Last login: {user.lastLogin}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <select
                        data-testid="setupauthenticationand-role-select"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500"
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.name}>
                            {role.name}
                          </option>
                        ))}
                      </select>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.status}
                      </span>

                      <button
                        data-testid="setupauthenticationand-toggle-status"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUserStatusToggle(user.id)
                        }}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          user.status === 'active'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
              <button
                data-testid="setupauthenticationand-add-role"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Role
              </button>
            </div>

            <div data-testid="setupauthenticationand-role-list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => (
                <div
                  key={role.id}
                  data-testid="setupauthenticationand-role-item"
                  className={`border rounded-lg p-6 transition-all ${
                    selectedRole === role.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{role.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      {role.userCount} users
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Permissions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      data-testid="setupauthenticationand-edit-role"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      data-testid="setupauthenticationand-delete-role"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium"
                    >
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Permission Management</h2>
              <button
                data-testid="setupauthenticationand-add-permission"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Permission
              </button>
            </div>

            <div className="space-y-6">
              {['Content', 'Administration'].map((category) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{category}</h3>
                  <div data-testid="setupauthenticationand-permission-list" className="space-y-3">
                    {permissions
                      .filter((perm) => perm.category === category)
                      .map((permission) => (
                        <div
                          key={permission.id}
                          data-testid="setupauthenticationand-permission-item"
                          className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{permission.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                            </div>
                            <button
                              data-testid="setupauthenticationand-edit-permission"
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium"
                            >
                              Edit
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
  )
}
