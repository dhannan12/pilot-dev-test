/**
 * SetupAuthentication — Authentication and RBAC system management interface
 *
 * Features: user authentication, role-based access control, permission management, user role assignment, access level display
 *
 * Ticket: SCRUM-1149 | Branch: proto/SCRUM-1140
 */

import React, { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

interface Role {
  id: string
  name: string
  permissions: string[]
  description: string
  color: string
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
    username: 'admin_user',
    email: 'admin@westireland.ie',
    role: 'Admin',
    status: 'active',
    lastLogin: '2026-08-22 10:30'
  },
  {
    id: '2',
    username: 'manager_sean',
    email: 'sean@westireland.ie',
    role: 'Manager',
    status: 'active',
    lastLogin: '2026-08-22 09:15'
  },
  {
    id: '3',
    username: 'user_mary',
    email: 'mary@westireland.ie',
    role: 'User',
    status: 'active',
    lastLogin: '2026-08-21 16:45'
  },
  {
    id: '4',
    username: 'guest_tourist',
    email: 'tourist@example.com',
    role: 'Guest',
    status: 'active',
    lastLogin: '2026-08-22 11:00'
  },
  {
    id: '5',
    username: 'editor_fiona',
    email: 'fiona@westireland.ie',
    role: 'Editor',
    status: 'inactive',
    lastLogin: '2026-08-20 14:20'
  }
]

const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'Admin',
    permissions: ['user.create', 'user.edit', 'user.delete', 'content.manage', 'system.config', 'booking.manage'],
    description: 'Full system access and administration',
    color: 'red'
  },
  {
    id: '2',
    name: 'Manager',
    permissions: ['user.view', 'user.edit', 'content.manage', 'booking.manage', 'report.view'],
    description: 'Manage content and bookings',
    color: 'blue'
  },
  {
    id: '3',
    name: 'Editor',
    permissions: ['content.create', 'content.edit', 'content.view'],
    description: 'Create and edit content',
    color: 'green'
  },
  {
    id: '4',
    name: 'User',
    permissions: ['content.view', 'booking.create', 'profile.edit'],
    description: 'Standard user access',
    color: 'yellow'
  },
  {
    id: '5',
    name: 'Guest',
    permissions: ['content.view'],
    description: 'View-only access',
    color: 'gray'
  }
]

const MOCK_PERMISSIONS: Permission[] = [
  { id: '1', name: 'user.create', category: 'User Management', description: 'Create new users' },
  { id: '2', name: 'user.edit', category: 'User Management', description: 'Edit user details' },
  { id: '3', name: 'user.delete', category: 'User Management', description: 'Delete users' },
  { id: '4', name: 'user.view', category: 'User Management', description: 'View user information' },
  { id: '5', name: 'content.create', category: 'Content', description: 'Create new content' },
  { id: '6', name: 'content.edit', category: 'Content', description: 'Edit existing content' },
  { id: '7', name: 'content.view', category: 'Content', description: 'View content' },
  { id: '8', name: 'content.manage', category: 'Content', description: 'Full content management' },
  { id: '9', name: 'booking.create', category: 'Bookings', description: 'Create bookings' },
  { id: '10', name: 'booking.manage', category: 'Bookings', description: 'Manage all bookings' },
  { id: '11', name: 'system.config', category: 'System', description: 'Configure system settings' },
  { id: '12', name: 'profile.edit', category: 'Profile', description: 'Edit own profile' },
  { id: '13', name: 'report.view', category: 'Reports', description: 'View reports' }
]

export default function SetupAuthentication() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions'>('users')
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [authUsername, setAuthUsername] = useState('')
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')

  const handleLogin = () => {
    alert(`Login attempted for: ${authUsername}`)
    setAuthUsername('')
    setAuthPassword('')
  }

  const handleRegister = () => {
    alert(`Registration attempted for: ${authEmail}`)
    setAuthUsername('')
    setAuthEmail('')
    setAuthPassword('')
  }

  return (
    <div data-testid="setupauthentication" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Authentication & RBAC System
          </h1>
          <p className="text-gray-600">
            Manage users, roles, and permissions for West Ireland Tourism
          </p>
        </div>

        {/* Authentication Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
          
          <div className="flex gap-4 mb-6">
            <button
              data-testid="setupauthentication-login-tab"
              onClick={() => setLoginMode('login')}
              className={`px-4 py-2 rounded-lg font-medium ${
                loginMode === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              data-testid="setupauthentication-register-tab"
              onClick={() => setLoginMode('register')}
              className={`px-4 py-2 rounded-lg font-medium ${
                loginMode === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Register
            </button>
          </div>

          {loginMode === 'login' ? (
            <div className="max-w-md">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  data-testid="setupauthentication-username"
                  type="text"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  data-testid="setupauthentication-password"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>
              <button
                data-testid="setupauthentication-login"
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="max-w-md">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  data-testid="setupauthentication-register-username"
                  type="text"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Choose username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  data-testid="setupauthentication-email"
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  data-testid="setupauthentication-register-password"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create password"
                />
              </div>
              <button
                data-testid="setupauthentication-register"
                onClick={handleRegister}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* RBAC Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Role-Based Access Control</h2>
          
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b">
            <button
              data-testid="setupauthentication-users-tab"
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Users
            </button>
            <button
              data-testid="setupauthentication-roles-tab"
              onClick={() => setActiveTab('roles')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'roles'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Roles
            </button>
            <button
              data-testid="setupauthentication-permissions-tab"
              onClick={() => setActiveTab('permissions')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'permissions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Permissions
            </button>
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">User Management</h3>
                <button
                  data-testid="setupauthentication-add-user"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
              
              <div data-testid="setupauthentication-user-list" className="space-y-3">
                {MOCK_USERS.map((user) => (
                  <div
                    key={user.id}
                    data-testid="setupauthentication-user-item"
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{user.username}</h4>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{user.email}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="text-gray-500">
                            Role: <span className="font-medium text-gray-900">{user.role}</span>
                          </span>
                          <span className="text-gray-500">
                            Last login: {user.lastLogin}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          data-testid="setupauthentication-edit-user"
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50"
                        >
                          Edit
                        </button>
                        <button
                          data-testid="setupauthentication-delete-user"
                          className="text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50"
                        >
                          Delete
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Role Management</h3>
                <button
                  data-testid="setupauthentication-add-role"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Role
                </button>
              </div>
              
              <div data-testid="setupauthentication-role-list" className="space-y-3">
                {MOCK_ROLES.map((role) => (
                  <div
                    key={role.id}
                    data-testid="setupauthentication-role-item"
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{role.name}</h4>
                        <p className="text-gray-600 text-sm">{role.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          data-testid="setupauthentication-edit-role"
                          onClick={() => setSelectedRole(role)}
                          className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50"
                        >
                          Edit
                        </button>
                        <button
                          data-testid="setupauthentication-delete-role"
                          className="text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((perm, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 text-xs rounded bg-${role.color}-100 text-${role.color}-800`}
                          >
                            {perm}
                          </span>
                        ))}
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Permission Management</h3>
                <button
                  data-testid="setupauthentication-add-permission"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Permission
                </button>
              </div>
              
              <div data-testid="setupauthentication-permission-list" className="space-y-4">
                {['User Management', 'Content', 'Bookings', 'System', 'Profile', 'Reports'].map((category) => {
                  const categoryPerms = MOCK_PERMISSIONS.filter(p => p.category === category)
                  if (categoryPerms.length === 0) return null
                  
                  return (
                    <div key={category} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-3">{category}</h4>
                      <div className="space-y-2">
                        {categoryPerms.map((perm) => (
                          <div
                            key={perm.id}
                            data-testid="setupauthentication-permission-item"
                            className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100"
                          >
                            <div>
                              <p className="font-medium text-sm">{perm.name}</p>
                              <p className="text-gray-600 text-xs">{perm.description}</p>
                            </div>
                            <button
                              data-testid="setupauthentication-edit-permission"
                              className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 rounded hover:bg-blue-50"
                            >
                              Edit
                            </button>
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

        {/* Role Assignment Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Role Assignment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select User
              </label>
              <select
                data-testid="setupauthentication-select-user"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a user...</option>
                {MOCK_USERS.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Role
              </label>
              <select
                data-testid="setupauthentication-select-role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Choose a role...</option>
                {MOCK_ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            data-testid="setupauthentication-assign-role"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Assign Role
          </button>
        </div>
      </div>
    </div>
  )
}
