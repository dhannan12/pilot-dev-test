/**
 * SetupJwt — JWT authentication and role-based access control (RBAC) configuration panel
 *
 * Features: JWT token management, role assignment, permission management, token expiry settings, user session monitoring
 *
 * Ticket: SCRUM-1039 | Branch: proto/SCRUM-1028
 */

import React, { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  permissions: string[]
  tokenExpiry: string
  lastLogin: string
  status: 'active' | 'suspended' | 'expired'
}

interface Role {
  id: string
  name: string
  permissions: string[]
  description: string
}

interface JwtConfig {
  algorithm: string
  expiresIn: string
  refreshTokenExpiry: string
  issuer: string
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john@gym.com',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    tokenExpiry: '2026-08-18T14:00:00Z',
    lastLogin: '2026-08-17T10:30:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'sarah@gym.com',
    role: 'manager',
    permissions: ['read', 'write', 'manage_bookings'],
    tokenExpiry: '2026-08-17T18:00:00Z',
    lastLogin: '2026-08-17T08:15:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Trainer',
    email: 'mike@gym.com',
    role: 'trainer',
    permissions: ['read', 'view_schedules'],
    tokenExpiry: '2026-08-17T16:30:00Z',
    lastLogin: '2026-08-17T07:00:00Z',
    status: 'active'
  },
  {
    id: '4',
    name: 'Lisa Member',
    email: 'lisa@gym.com',
    role: 'member',
    permissions: ['read', 'book_classes'],
    tokenExpiry: '2026-08-16T12:00:00Z',
    lastLogin: '2026-08-15T19:45:00Z',
    status: 'expired'
  },
  {
    id: '5',
    name: 'Tom Guest',
    email: 'tom@gym.com',
    role: 'guest',
    permissions: ['read'],
    tokenExpiry: '2026-08-19T09:00:00Z',
    lastLogin: '2026-08-17T11:20:00Z',
    status: 'suspended'
  },
  {
    id: '6',
    name: 'Emma Receptionist',
    email: 'emma@gym.com',
    role: 'staff',
    permissions: ['read', 'write', 'check_in_members'],
    tokenExpiry: '2026-08-17T17:00:00Z',
    lastLogin: '2026-08-17T09:00:00Z',
    status: 'active'
  }
]

const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    description: 'Full system access with user and role management'
  },
  {
    id: '2',
    name: 'manager',
    permissions: ['read', 'write', 'manage_bookings', 'view_reports'],
    description: 'Can manage bookings and view reports'
  },
  {
    id: '3',
    name: 'trainer',
    permissions: ['read', 'view_schedules', 'manage_sessions'],
    description: 'Can view schedules and manage training sessions'
  },
  {
    id: '4',
    name: 'staff',
    permissions: ['read', 'write', 'check_in_members'],
    description: 'Front desk staff with check-in capabilities'
  },
  {
    id: '5',
    name: 'member',
    permissions: ['read', 'book_classes', 'view_profile'],
    description: 'Standard member access for bookings and profile'
  },
  {
    id: '6',
    name: 'guest',
    permissions: ['read'],
    description: 'Read-only access for guest users'
  }
]

const MOCK_JWT_CONFIG: JwtConfig = {
  algorithm: 'HS256',
  expiresIn: '24h',
  refreshTokenExpiry: '7d',
  issuer: 'gym-portal'
}

const AVAILABLE_PERMISSIONS = [
  'read',
  'write',
  'delete',
  'manage_users',
  'manage_roles',
  'manage_bookings',
  'view_reports',
  'view_schedules',
  'manage_sessions',
  'check_in_members',
  'book_classes',
  'view_profile'
]

export default function SetupJwt() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'config'>('users')
  const [users] = useState<User[]>(MOCK_USERS)
  const [roles] = useState<Role[]>(MOCK_ROLES)
  const [jwtConfig, setJwtConfig] = useState<JwtConfig>(MOCK_JWT_CONFIG)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleConfigChange = (field: keyof JwtConfig, value: string) => {
    setJwtConfig(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div data-testid="setupjwt" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">JWT Authentication & RBAC</h1>
          <p className="text-gray-600">Manage JWT tokens, user roles, and permissions</p>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <nav className="flex border-b border-gray-200">
            <button
              data-testid="setupjwt-users-tab"
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'users'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Users & Sessions
            </button>
            <button
              data-testid="setupjwt-roles-tab"
              onClick={() => setActiveTab('roles')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'roles'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Roles & Permissions
            </button>
            <button
              data-testid="setupjwt-config-tab"
              onClick={() => setActiveTab('config')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'config'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              JWT Configuration
            </button>
          </nav>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">User Sessions</h2>
              <button
                data-testid="setupjwt-add-user"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add User
              </button>
            </div>

            <div data-testid="setupjwt-users-list" className="space-y-4">
              {users.map(user => (
                <div
                  key={user.id}
                  data-testid="setupjwt-user-item"
                  className={`border rounded-lg p-4 ${
                    selectedUser === user.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  } hover:border-gray-300 cursor-pointer transition-colors`}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>Last Login: {new Date(user.lastLogin).toLocaleString()}</span>
                        <span>Token Expires: {new Date(user.tokenExpiry).toLocaleString()}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {user.permissions.map(permission => (
                          <span
                            key={permission}
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        data-testid="setupjwt-revoke-token"
                        className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm transition-colors"
                      >
                        Revoke Token
                      </button>
                      <button
                        data-testid="setupjwt-refresh-token"
                        className="px-3 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm transition-colors"
                      >
                        Refresh Token
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
              <button
                data-testid="setupjwt-add-role"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Role
              </button>
            </div>

            <div data-testid="setupjwt-roles-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map(role => (
                <div
                  key={role.id}
                  data-testid="setupjwt-role-item"
                  className={`border rounded-lg p-4 ${
                    selectedRole === role.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  } hover:border-gray-300 cursor-pointer transition-colors`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg capitalize">{role.name}</h3>
                    <button
                      data-testid="setupjwt-edit-role"
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                  <div className="border-t pt-3">
                    <p className="text-xs font-medium text-gray-500 mb-2">PERMISSIONS ({role.permissions.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map(permission => (
                        <span
                          key={permission}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Available Permissions</h3>
              <div data-testid="setupjwt-permissions-list" className="flex flex-wrap gap-2">
                {AVAILABLE_PERMISSIONS.map(permission => (
                  <span
                    key={permission}
                    data-testid="setupjwt-permission-item"
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Config Tab */}
        {activeTab === 'config' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">JWT Configuration</h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="algorithm" className="block text-sm font-medium text-gray-700 mb-2">
                  Algorithm
                </label>
                <select
                  id="algorithm"
                  data-testid="setupjwt-algorithm"
                  value={jwtConfig.algorithm}
                  onChange={e => handleConfigChange('algorithm', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="HS256">HS256 (HMAC SHA-256)</option>
                  <option value="HS384">HS384 (HMAC SHA-384)</option>
                  <option value="HS512">HS512 (HMAC SHA-512)</option>
                  <option value="RS256">RS256 (RSA SHA-256)</option>
                  <option value="RS384">RS384 (RSA SHA-384)</option>
                  <option value="RS512">RS512 (RSA SHA-512)</option>
                </select>
              </div>

              <div>
                <label htmlFor="expiresIn" className="block text-sm font-medium text-gray-700 mb-2">
                  Token Expiry
                </label>
                <input
                  id="expiresIn"
                  type="text"
                  data-testid="setupjwt-expiry"
                  value={jwtConfig.expiresIn}
                  onChange={e => handleConfigChange('expiresIn', e.target.value)}
                  placeholder="e.g., 24h, 7d, 30m"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Format: number + unit (m=minutes, h=hours, d=days)</p>
              </div>

              <div>
                <label htmlFor="refreshTokenExpiry" className="block text-sm font-medium text-gray-700 mb-2">
                  Refresh Token Expiry
                </label>
                <input
                  id="refreshTokenExpiry"
                  type="text"
                  data-testid="setupjwt-refresh-expiry"
                  value={jwtConfig.refreshTokenExpiry}
                  onChange={e => handleConfigChange('refreshTokenExpiry', e.target.value)}
                  placeholder="e.g., 7d, 30d"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Refresh tokens should have longer expiry than access tokens</p>
              </div>

              <div>
                <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-2">
                  Issuer (iss)
                </label>
                <input
                  id="issuer"
                  type="text"
                  data-testid="setupjwt-issuer"
                  value={jwtConfig.issuer}
                  onChange={e => handleConfigChange('issuer', e.target.value)}
                  placeholder="e.g., gym-portal, api.example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Identifies the principal that issued the JWT</p>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      data-testid="setupjwt-require-https"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require HTTPS for token transmission</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      data-testid="setupjwt-enable-refresh"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable refresh token rotation</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      data-testid="setupjwt-revoke-on-password-change"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Revoke all tokens on password change</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      data-testid="setupjwt-log-token-events"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Log token creation and revocation events</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  data-testid="setupjwt-save-config"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Configuration
                </button>
                <button
                  data-testid="setupjwt-test-config"
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Test Configuration
                </button>
                <button
                  data-testid="setupjwt-reset-config"
                  className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
