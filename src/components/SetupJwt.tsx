/**
 * SetupJwt — JWT authentication and RBAC configuration interface
 *
 * Features: JWT token management, role-based access control, user authentication, permission assignment, token lifecycle management
 *
 * Ticket: SCRUM-863 | Branch: proto/SCRUM-853
 */

import React, { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'manager' | 'user' | 'guest'
  permissions: string[]
  tokenExpiry: string
  lastLogin: string
  status: 'active' | 'suspended' | 'pending'
}

interface JwtToken {
  id: string
  userId: string
  token: string
  issuedAt: string
  expiresAt: string
  status: 'valid' | 'expired' | 'revoked'
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin_user',
    email: 'admin@example.com',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    tokenExpiry: '2026-08-16T10:30:00Z',
    lastLogin: '2026-08-15T08:15:00Z',
    status: 'active'
  },
  {
    id: '2',
    username: 'manager_john',
    email: 'john@example.com',
    role: 'manager',
    permissions: ['read', 'write', 'manage_team'],
    tokenExpiry: '2026-08-16T09:45:00Z',
    lastLogin: '2026-08-15T07:30:00Z',
    status: 'active'
  },
  {
    id: '3',
    username: 'user_sarah',
    email: 'sarah@example.com',
    role: 'user',
    permissions: ['read', 'write'],
    tokenExpiry: '2026-08-16T11:00:00Z',
    lastLogin: '2026-08-15T06:45:00Z',
    status: 'active'
  },
  {
    id: '4',
    username: 'guest_mike',
    email: 'mike@example.com',
    role: 'guest',
    permissions: ['read'],
    tokenExpiry: '2026-08-15T12:00:00Z',
    lastLogin: '2026-08-15T05:20:00Z',
    status: 'pending'
  },
  {
    id: '5',
    username: 'user_emma',
    email: 'emma@example.com',
    role: 'user',
    permissions: ['read', 'write'],
    tokenExpiry: '2026-08-14T10:00:00Z',
    lastLogin: '2026-08-14T09:00:00Z',
    status: 'suspended'
  }
]

const MOCK_TOKENS: JwtToken[] = [
  {
    id: 't1',
    userId: '1',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIn0...',
    issuedAt: '2026-08-15T08:15:00Z',
    expiresAt: '2026-08-16T08:15:00Z',
    status: 'valid'
  },
  {
    id: 't2',
    userId: '2',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwicm9sZSI6Im1hbmFnZXIifQ...',
    issuedAt: '2026-08-15T07:30:00Z',
    expiresAt: '2026-08-16T07:30:00Z',
    status: 'valid'
  },
  {
    id: 't3',
    userId: '3',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwicm9sZSI6InVzZXIifQ...',
    issuedAt: '2026-08-15T06:45:00Z',
    expiresAt: '2026-08-16T06:45:00Z',
    status: 'valid'
  },
  {
    id: 't4',
    userId: '4',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Iiwicm9sZSI6Imd1ZXN0In0...',
    issuedAt: '2026-08-15T05:20:00Z',
    expiresAt: '2026-08-15T11:20:00Z',
    status: 'valid'
  },
  {
    id: 't5',
    userId: '5',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Iiwicm9sZSI6InVzZXIifQ...',
    issuedAt: '2026-08-14T09:00:00Z',
    expiresAt: '2026-08-14T10:00:00Z',
    status: 'expired'
  }
]

const AVAILABLE_PERMISSIONS = [
  'read',
  'write',
  'delete',
  'manage_users',
  'manage_roles',
  'manage_team',
  'manage_settings',
  'view_analytics'
]

export default function SetupJwt() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'users' | 'tokens' | 'roles'>('users')
  const [tokenFilter, setTokenFilter] = useState<'all' | 'valid' | 'expired' | 'revoked'>('all')

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'manager':
        return 'bg-blue-100 text-blue-800'
      case 'user':
        return 'bg-green-100 text-green-800'
      case 'guest':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'valid':
        return 'bg-green-100 text-green-800'
      case 'suspended':
      case 'revoked':
        return 'bg-red-100 text-red-800'
      case 'pending':
      case 'expired':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTokens = MOCK_TOKENS.filter(token => 
    tokenFilter === 'all' || token.status === tokenFilter
  )

  return (
    <div data-testid="setup-jwt" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">JWT Authentication & RBAC</h1>
          <p className="text-gray-600">Manage users, roles, permissions, and JWT tokens</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                data-testid="setup-jwt-tab-users"
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users & Permissions
              </button>
              <button
                data-testid="setup-jwt-tab-tokens"
                onClick={() => setActiveTab('tokens')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tokens'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                JWT Tokens
              </button>
              <button
                data-testid="setup-jwt-tab-roles"
                onClick={() => setActiveTab('roles')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'roles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Role Configuration
              </button>
            </nav>
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                <button
                  data-testid="setup-jwt-add-user"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add User
                </button>
              </div>

              <div data-testid="setup-jwt-users-list" className="space-y-3">
                {MOCK_USERS.map(user => (
                  <div
                    key={user.id}
                    data-testid="setup-jwt-user-item"
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{user.username}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Last login: {new Date(user.lastLogin).toLocaleString()}</span>
                          <span>Token expires: {new Date(user.tokenExpiry).toLocaleString()}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-600 font-medium">Permissions: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {user.permissions.map(perm => (
                              <span
                                key={perm}
                                className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                              >
                                {perm}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          data-testid="setup-jwt-edit-user"
                          onClick={() => setSelectedUser(user)}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          data-testid="setup-jwt-revoke-token"
                          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          Revoke Token
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tokens Tab */}
          {activeTab === 'tokens' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">JWT Token Management</h2>
                <div className="flex gap-2">
                  <select
                    data-testid="setup-jwt-token-filter"
                    value={tokenFilter}
                    onChange={(e) => setTokenFilter(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Tokens</option>
                    <option value="valid">Valid</option>
                    <option value="expired">Expired</option>
                    <option value="revoked">Revoked</option>
                  </select>
                  <button
                    data-testid="setup-jwt-refresh-tokens"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Refresh All
                  </button>
                </div>
              </div>

              <div data-testid="setup-jwt-tokens-list" className="space-y-3">
                {filteredTokens.map(token => {
                  const user = MOCK_USERS.find(u => u.id === token.userId)
                  return (
                    <div
                      key={token.id}
                      data-testid="setup-jwt-token-item"
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-sm font-medium text-gray-900">
                              Token ID: {token.id}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(token.status)}`}>
                              {token.status}
                            </span>
                          </div>
                          {user && (
                            <p className="text-sm text-gray-600 mb-2">
                              User: {user.username} ({user.email})
                            </p>
                          )}
                          <div className="bg-gray-100 rounded p-2 mb-2 overflow-x-auto">
                            <code className="text-xs text-gray-800">{token.token}</code>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Issued: {new Date(token.issuedAt).toLocaleString()}</span>
                            <span>Expires: {new Date(token.expiresAt).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            data-testid="setup-jwt-copy-token"
                            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          >
                            Copy
                          </button>
                          <button
                            data-testid="setup-jwt-revoke-token-btn"
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                          >
                            Revoke
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Role & Permission Configuration</h2>
                <button
                  data-testid="setup-jwt-add-role"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Role
                </button>
              </div>

              <div data-testid="setup-jwt-roles-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['admin', 'manager', 'user', 'guest'].map(role => {
                  const usersWithRole = MOCK_USERS.filter(u => u.role === role)
                  const rolePermissions = usersWithRole.length > 0 
                    ? usersWithRole[0].permissions 
                    : []

                  return (
                    <div
                      key={role}
                      data-testid="setup-jwt-role-item"
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-gray-900 capitalize">{role}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(role)}`}>
                            {usersWithRole.length} users
                          </span>
                        </div>
                        <button
                          data-testid="setup-jwt-edit-role"
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Assigned Permissions:</p>
                        <div className="flex flex-wrap gap-1">
                          {rolePermissions.map(perm => (
                            <span
                              key={perm}
                              className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                            >
                              ✓ {perm}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Available Permissions:</p>
                        <div className="flex flex-wrap gap-1">
                          {AVAILABLE_PERMISSIONS.filter(p => !rolePermissions.includes(p)).map(perm => (
                            <span
                              key={perm}
                              className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Available Permissions</h3>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_PERMISSIONS.map(perm => (
                    <span
                      key={perm}
                      className="px-3 py-1 bg-white text-blue-700 rounded-lg text-sm border border-blue-200"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Selected User Modal */}
        {selectedUser && (
          <div data-testid="setup-jwt-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit User: {selectedUser.username}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    data-testid="setup-jwt-modal-email"
                    type="email"
                    defaultValue={selectedUser.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    data-testid="setup-jwt-modal-role"
                    defaultValue={selectedUser.role}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    data-testid="setup-jwt-modal-status"
                    defaultValue={selectedUser.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {AVAILABLE_PERMISSIONS.map(perm => (
                      <label key={perm} className="flex items-center">
                        <input
                          data-testid={`setup-jwt-modal-permission-${perm}`}
                          type="checkbox"
                          defaultChecked={selectedUser.permissions.includes(perm)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  data-testid="setup-jwt-modal-save"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  data-testid="setup-jwt-modal-cancel"
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
