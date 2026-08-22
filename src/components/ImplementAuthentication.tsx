/**
 * ImplementAuthentication — Authentication and role-based access control system
 *
 * Features: login/logout, user roles (admin/user/guest), protected routes, session management, permission checks
 *
 * Ticket: SCRUM-1125 | Branch: proto/SCRUM-1115
 */

import React, { useState } from 'react'

type UserRole = 'admin' | 'user' | 'guest'

interface User {
  id: string
  username: string
  email: string
  role: UserRole
  permissions: string[]
  lastLogin?: string
}

interface AuthSession {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

// Mock users database
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@healthapp.com',
    password: 'admin123',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'view_analytics'],
    lastLogin: '2026-08-22T10:30:00Z'
  },
  {
    id: '2',
    username: 'doctor_smith',
    email: 'smith@healthapp.com',
    password: 'doctor123',
    role: 'user',
    permissions: ['read', 'write', 'view_patients'],
    lastLogin: '2026-08-22T09:15:00Z'
  },
  {
    id: '3',
    username: 'nurse_jane',
    email: 'jane@healthapp.com',
    password: 'nurse123',
    role: 'user',
    permissions: ['read', 'write'],
    lastLogin: '2026-08-21T16:45:00Z'
  },
  {
    id: '4',
    username: 'patient_john',
    email: 'john@example.com',
    password: 'patient123',
    role: 'guest',
    permissions: ['read'],
    lastLogin: '2026-08-22T08:00:00Z'
  },
  {
    id: '5',
    username: 'patient_mary',
    email: 'mary@example.com',
    password: 'patient123',
    role: 'guest',
    permissions: ['read'],
    lastLogin: '2026-08-21T14:20:00Z'
  }
]

// Mock protected resources
const PROTECTED_RESOURCES = [
  { id: '1', name: 'Patient Records', requiredPermission: 'read' },
  { id: '2', name: 'Add Health Data', requiredPermission: 'write' },
  { id: '3', name: 'Delete Records', requiredPermission: 'delete' },
  { id: '4', name: 'User Management', requiredPermission: 'manage_users' },
  { id: '5', name: 'Analytics Dashboard', requiredPermission: 'view_analytics' }
]

export default function ImplementAuthentication() {
  const [session, setSession] = useState<AuthSession>({
    user: null,
    isAuthenticated: false,
    token: null
  })

  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [selectedResource, setSelectedResource] = useState<string | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const user = MOCK_USERS.find(
      u => u.username === loginForm.username && u.password === loginForm.password
    )

    if (user) {
      const { password, ...userWithoutPassword } = user
      const mockToken = `token_${user.id}_${Date.now()}`
      
      setSession({
        user: {
          ...userWithoutPassword,
          lastLogin: new Date().toISOString()
        },
        isAuthenticated: true,
        token: mockToken
      })
      setLoginForm({ username: '', password: '' })
    } else {
      setError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setSession({
      user: null,
      isAuthenticated: false,
      token: null
    })
    setSelectedResource(null)
    setError('')
  }

  const hasPermission = (permission: string): boolean => {
    if (!session.user) return false
    return session.user.permissions.includes(permission)
  }

  const getRoleBadgeColor = (role: UserRole): string => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'user':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'guest':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (!session.isAuthenticated) {
    return (
      <div data-testid="implementauthentication" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Monitoring App</h1>
              <p className="text-gray-600">Sign in to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div data-testid="implementauthentication-error" className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  data-testid="implementauthentication-username"
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  data-testid="implementauthentication-password"
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                data-testid="implementauthentication-login"
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs font-semibold text-gray-700 mb-3">Demo Accounts:</p>
              <div className="space-y-2 text-xs text-gray-600">
                <div><span className="font-medium">Admin:</span> admin / admin123</div>
                <div><span className="font-medium">Doctor:</span> doctor_smith / doctor123</div>
                <div><span className="font-medium">Patient:</span> patient_john / patient123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="implementauthentication" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with user info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {session.user?.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{session.user?.username}</h2>
                <p className="text-sm text-gray-600">{session.user?.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(session.user?.role || 'guest')}`}>
                {session.user?.role.toUpperCase()}
              </span>
            </div>
            <button
              data-testid="implementauthentication-logout"
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Session Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Session Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">User ID:</span>
                <span className="font-medium text-gray-900">{session.user?.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Role:</span>
                <span className="font-medium text-gray-900">{session.user?.role}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Token:</span>
                <span className="font-mono text-xs text-gray-900">{session.token?.substring(0, 20)}...</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Last Login:</span>
                <span className="font-medium text-gray-900">
                  {session.user?.lastLogin ? new Date(session.user.lastLogin).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Permissions</h3>
            <div data-testid="implementauthentication-permissions-list" className="space-y-2">
              {session.user?.permissions.map((permission, index) => (
                <div
                  key={index}
                  data-testid="implementauthentication-permission-item"
                  className="flex items-center space-x-3 py-2 px-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-gray-900">{permission}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Access Control Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Protected Resources - RBAC Test</h3>
          <p className="text-sm text-gray-600 mb-6">
            Test your role-based access control. Try accessing different resources based on your permissions.
          </p>

          <div data-testid="implementauthentication-resources-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROTECTED_RESOURCES.map((resource) => {
              const canAccess = hasPermission(resource.requiredPermission)
              const isSelected = selectedResource === resource.id

              return (
                <div
                  key={resource.id}
                  data-testid="implementauthentication-resource-item"
                  className={`p-4 border-2 rounded-lg transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : canAccess
                      ? 'border-gray-200 hover:border-indigo-300'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{resource.name}</h4>
                    {canAccess ? (
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    Required: <span className="font-mono font-semibold">{resource.requiredPermission}</span>
                  </p>
                  <button
                    data-testid={`implementauthentication-access-${resource.id}`}
                    onClick={() => setSelectedResource(resource.id)}
                    disabled={!canAccess}
                    className={`w-full py-2 rounded-lg font-semibold text-sm transition-colors ${
                      canAccess
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {canAccess ? 'Access Resource' : 'Access Denied'}
                  </button>
                </div>
              )
            })}
          </div>

          {selectedResource && (
            <div data-testid="implementauthentication-access-success" className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-green-900">Access Granted!</p>
                  <p className="text-sm text-green-700">
                    You successfully accessed: {PROTECTED_RESOURCES.find(r => r.id === selectedResource)?.name}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* All Users (admin only) */}
        {session.user?.role === 'admin' && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              User Management <span className="text-sm font-normal text-gray-500">(Admin Only)</span>
            </h3>
            <div data-testid="implementauthentication-users-list" className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">User</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Role</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">Permissions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map((user) => (
                    <tr key={user.id} data-testid="implementauthentication-user-item" className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{user.username}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.permissions.length} permissions</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
