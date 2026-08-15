/**
 * ImplementJwt — JWT authentication and RBAC management interface
 *
 * Features: Login authentication, role-based access control, token management, user permissions, session monitoring
 *
 * Ticket: SCRUM-901 | Branch: proto/SCRUM-892
 */

import { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'moderator' | 'user' | 'guest'
  permissions: string[]
  token?: string
  tokenExpiry?: string
}

interface LoginCredentials {
  username: string
  password: string
}

// Mock users with different roles
const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'admin_user',
    email: 'admin@example.com',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin',
    tokenExpiry: '2026-08-15T18:00:00Z'
  },
  {
    id: 'user-2',
    username: 'moderator_john',
    email: 'john@example.com',
    role: 'moderator',
    permissions: ['read', 'write', 'delete'],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.moderator',
    tokenExpiry: '2026-08-15T16:00:00Z'
  },
  {
    id: 'user-3',
    username: 'user_alice',
    email: 'alice@example.com',
    role: 'user',
    permissions: ['read', 'write'],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user',
    tokenExpiry: '2026-08-15T14:00:00Z'
  },
  {
    id: 'user-4',
    username: 'user_bob',
    email: 'bob@example.com',
    role: 'user',
    permissions: ['read', 'write'],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user2',
    tokenExpiry: '2026-08-15T15:00:00Z'
  },
  {
    id: 'user-5',
    username: 'guest_visitor',
    email: 'guest@example.com',
    role: 'guest',
    permissions: ['read'],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.guest',
    tokenExpiry: '2026-08-15T12:00:00Z'
  }
]

const roleColors = {
  admin: 'bg-red-100 text-red-800 border-red-300',
  moderator: 'bg-blue-100 text-blue-800 border-blue-300',
  user: 'bg-green-100 text-green-800 border-green-300',
  guest: 'bg-gray-100 text-gray-800 border-gray-300'
}

export default function ImplementJwt() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  const handleLogin = () => {
    setError('')
    
    if (!credentials.username || !credentials.password) {
      setError('Username and password are required')
      return
    }

    // Simulate JWT authentication
    const user = mockUsers.find(u => u.username === credentials.username)
    
    if (user) {
      setCurrentUser(user)
      setIsAuthenticated(true)
      setCredentials({ username: '', password: '' })
    } else {
      setError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    setSelectedUser(null)
    setCredentials({ username: '', password: '' })
  }

  const hasPermission = (permission: string): boolean => {
    return currentUser?.permissions.includes(permission) || false
  }

  const getRoleBadgeClass = (role: string): string => {
    return roleColors[role as keyof typeof roleColors] || roleColors.guest
  }

  if (!isAuthenticated) {
    return (
      <section data-testid="implementjwt" className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">JWT Authentication</h1>
              <p className="text-gray-600 mt-2">Sign in with your credentials</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  data-testid="implementjwt-username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  data-testid="implementjwt-password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter password"
                />
              </div>

              <button
                data-testid="implementjwt-login"
                onClick={handleLogin}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Sign In
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">Demo Users:</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p>• admin_user (full access)</p>
                <p>• moderator_john (write access)</p>
                <p>• user_alice (basic access)</p>
                <p>• user_bob (basic access)</p>
                <p>• guest_visitor (read only)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section data-testid="implementjwt" className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-indigo-600">
                  {currentUser?.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentUser?.username}</h2>
                <p className="text-sm text-gray-600">{currentUser?.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeClass(currentUser?.role || 'guest')}`}>
                {currentUser?.role.toUpperCase()}
              </span>
            </div>
            <button
              data-testid="implementjwt-logout"
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* JWT Token Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">JWT Token</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Token</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs break-all">
                  {currentUser?.token}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  {currentUser?.tokenExpiry}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">User ID</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  {currentUser?.id}
                </div>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Role-Based Permissions</h3>
            <div className="space-y-2">
              {['read', 'write', 'delete', 'manage_users', 'manage_roles'].map((permission) => {
                const allowed = hasPermission(permission)
                return (
                  <div
                    key={permission}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      allowed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {permission.replace('_', ' ').toUpperCase()}
                    </span>
                    {allowed ? (
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* All Users List */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">All Users (RBAC Overview)</h3>
          
          {!hasPermission('manage_users') && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
              ⚠️ You don't have permission to manage users. View only.
            </div>
          )}

          <div data-testid="implementjwt-list" className="space-y-3">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                data-testid="implementjwt-item"
                className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedUser?.id === user.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-gray-300">
                      <span className="text-sm font-bold text-gray-700">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.username}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeClass(user.role)}`}>
                      {user.role}
                    </span>
                    <span className="text-xs text-gray-500">
                      {user.permissions.length} permissions
                    </span>
                  </div>
                </div>
                
                {selectedUser?.id === user.id && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="flex flex-wrap gap-2">
                      {user.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {hasPermission('manage_users') && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Admin Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                data-testid="implementjwt-refresh"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Refresh Tokens
              </button>
              <button
                data-testid="implementjwt-revoke"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Revoke Access
              </button>
              <button
                data-testid="implementjwt-audit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                View Audit Log
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
