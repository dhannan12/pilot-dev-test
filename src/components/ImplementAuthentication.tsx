/**
 * ImplementAuthentication — Authentication and role-based access control system
 *
 * Features: user login, role selection, access control, session management, permission checking
 *
 * Ticket: SCRUM-1297 | Branch: proto/SCRUM-1288
 */

import React, { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'stylist' | 'customer' | 'manager'
  fullName: string
}

interface Permission {
  id: string
  name: string
  description: string
  roles: string[]
}

interface AuthSession {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

const MOCK_USERS: User[] = [
  { id: '1', username: 'admin', email: 'admin@salon.com', role: 'admin', fullName: 'Admin User' },
  { id: '2', username: 'stylist1', email: 'sarah@salon.com', role: 'stylist', fullName: 'Sarah Johnson' },
  { id: '3', username: 'customer1', email: 'john@email.com', role: 'customer', fullName: 'John Doe' },
  { id: '4', username: 'manager1', email: 'manager@salon.com', role: 'manager', fullName: 'Emily Manager' },
  { id: '5', username: 'customer2', email: 'jane@email.com', role: 'customer', fullName: 'Jane Smith' },
]

const MOCK_PERMISSIONS: Permission[] = [
  { id: '1', name: 'View Bookings', description: 'Can view all booking records', roles: ['admin', 'manager', 'stylist', 'customer'] },
  { id: '2', name: 'Create Bookings', description: 'Can create new bookings', roles: ['admin', 'manager', 'stylist', 'customer'] },
  { id: '3', name: 'Cancel Bookings', description: 'Can cancel bookings', roles: ['admin', 'manager', 'customer'] },
  { id: '4', name: 'Manage Users', description: 'Can create, edit, and delete users', roles: ['admin'] },
  { id: '5', name: 'View Reports', description: 'Can view analytics and reports', roles: ['admin', 'manager'] },
  { id: '6', name: 'Manage Schedule', description: 'Can modify stylist schedules', roles: ['admin', 'manager', 'stylist'] },
  { id: '7', name: 'Process Payments', description: 'Can process and refund payments', roles: ['admin', 'manager'] },
]

export default function ImplementAuthentication() {
  const [session, setSession] = useState<AuthSession>({
    user: null,
    isAuthenticated: false,
    token: null,
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<'admin' | 'stylist' | 'customer' | 'manager'>('customer')
  const [loginError, setLoginError] = useState('')
  const [showPermissions, setShowPermissions] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    // Find user by username
    const user = MOCK_USERS.find(u => u.username === username)

    if (!user) {
      setLoginError('Invalid username or password')
      return
    }

    // Mock authentication - in real app would validate password
    if (password.length < 3) {
      setLoginError('Invalid username or password')
      return
    }

    // Create session
    const mockToken = `token_${user.id}_${Date.now()}`
    setSession({
      user,
      isAuthenticated: true,
      token: mockToken,
    })

    // Reset form
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    setSession({
      user: null,
      isAuthenticated: false,
      token: null,
    })
    setShowPermissions(false)
  }

  const handleQuickLogin = (role: 'admin' | 'stylist' | 'customer' | 'manager') => {
    const user = MOCK_USERS.find(u => u.role === role)
    if (user) {
      const mockToken = `token_${user.id}_${Date.now()}`
      setSession({
        user,
        isAuthenticated: true,
        token: mockToken,
      })
      setLoginError('')
    }
  }

  const hasPermission = (permissionName: string): boolean => {
    if (!session.user) return false
    const permission = MOCK_PERMISSIONS.find(p => p.name === permissionName)
    return permission ? permission.roles.includes(session.user.role) : false
  }

  const getUserPermissions = (): Permission[] => {
    if (!session.user) return []
    const userRole = session.user.role
    return MOCK_PERMISSIONS.filter(p => p.roles.includes(userRole))
  }

  const getRoleBadgeColor = (role: string | undefined): string => {
    if (!role) return 'bg-gray-100 text-gray-800 border-gray-300'
    const colors: Record<string, string> = {
      admin: 'bg-red-100 text-red-800 border-red-300',
      manager: 'bg-purple-100 text-purple-800 border-purple-300',
      stylist: 'bg-blue-100 text-blue-800 border-blue-300',
      customer: 'bg-green-100 text-green-800 border-green-300',
    }
    return colors[role] || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  if (!session.isAuthenticated) {
    return (
      <div data-testid="implementauthentication" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Salon Authentication</h1>
              <p className="text-gray-600 mt-2">Sign in to access your account</p>
            </div>

            {loginError && (
              <div data-testid="implementauthentication-error" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  data-testid="implementauthentication-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  data-testid="implementauthentication-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                type="submit"
                data-testid="implementauthentication-submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Sign In
              </button>
            </form>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 text-center mb-4">Quick Login (Demo)</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  data-testid="implementauthentication-quick-admin"
                  onClick={() => handleQuickLogin('admin')}
                  className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  Admin
                </button>
                <button
                  data-testid="implementauthentication-quick-manager"
                  onClick={() => handleQuickLogin('manager')}
                  className="px-4 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
                >
                  Manager
                </button>
                <button
                  data-testid="implementauthentication-quick-stylist"
                  onClick={() => handleQuickLogin('stylist')}
                  className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  Stylist
                </button>
                <button
                  data-testid="implementauthentication-quick-customer"
                  onClick={() => handleQuickLogin('customer')}
                  className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                >
                  Customer
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Demo Accounts:</strong> admin, stylist1, customer1, manager1, customer2 (password: any 3+ chars)
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Authenticated view
  return (
    <div data-testid="implementauthentication" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with user info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-lg">
                  {session.user?.fullName.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{session.user?.fullName}</h2>
                <p className="text-sm text-gray-600">{session.user?.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(session.user?.role || '')}`}>
                {session.user?.role.toUpperCase()}
              </span>
            </div>
            <button
              data-testid="implementauthentication-logout"
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Session Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Session Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">User ID</p>
              <p className="text-lg font-mono text-gray-900">{session.user?.id}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Username</p>
              <p className="text-lg font-mono text-gray-900">{session.user?.username}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Token</p>
              <p className="text-sm font-mono text-gray-900 truncate">{session.token}</p>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Your Permissions</h3>
            <button
              data-testid="implementauthentication-toggle-permissions"
              onClick={() => setShowPermissions(!showPermissions)}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
            >
              {showPermissions ? 'Hide' : 'Show'} Details
            </button>
          </div>

          <div data-testid="implementauthentication-list" className="space-y-3">
            {getUserPermissions().map(permission => (
              <div
                key={permission.id}
                data-testid="implementauthentication-item"
                className="flex items-start p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{permission.name}</h4>
                  {showPermissions && (
                    <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              You have <strong>{getUserPermissions().length}</strong> permissions based on your <strong>{session.user?.role}</strong> role.
            </p>
          </div>
        </div>

        {/* Access Control Demo */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Role-Based Access Control</h3>
          <p className="text-gray-600 mb-4">Test different actions based on your role permissions:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border-2 ${hasPermission('Manage Users') ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Manage Users</h4>
                  <p className="text-sm text-gray-600">Create, edit, delete users</p>
                </div>
                {hasPermission('Manage Users') ? (
                  <span className="text-green-600 font-bold">✓ Allowed</span>
                ) : (
                  <span className="text-red-600 font-bold">✗ Denied</span>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${hasPermission('View Reports') ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">View Reports</h4>
                  <p className="text-sm text-gray-600">Access analytics dashboard</p>
                </div>
                {hasPermission('View Reports') ? (
                  <span className="text-green-600 font-bold">✓ Allowed</span>
                ) : (
                  <span className="text-red-600 font-bold">✗ Denied</span>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${hasPermission('Process Payments') ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Process Payments</h4>
                  <p className="text-sm text-gray-600">Handle transactions</p>
                </div>
                {hasPermission('Process Payments') ? (
                  <span className="text-green-600 font-bold">✓ Allowed</span>
                ) : (
                  <span className="text-red-600 font-bold">✗ Denied</span>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${hasPermission('Manage Schedule') ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Manage Schedule</h4>
                  <p className="text-sm text-gray-600">Modify stylist availability</p>
                </div>
                {hasPermission('Manage Schedule') ? (
                  <span className="text-green-600 font-bold">✓ Allowed</span>
                ) : (
                  <span className="text-red-600 font-bold">✗ Denied</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Logout and login with different roles to see how permissions change. Try admin for full access or customer for limited access.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
