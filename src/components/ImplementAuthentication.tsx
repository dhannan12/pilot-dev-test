/**
 * ImplementAuthentication — Authentication and Role-Based Access Control (RBAC) system
 *
 * Features: user login, role management, permission checks, session tracking, access control
 *
 * Ticket: SCRUM-962 | Branch: proto/SCRUM-951
 */

import { useState } from 'react'

interface User {
  id: number
  username: string
  email: string
  role: 'admin' | 'manager' | 'member' | 'guest'
  permissions: string[]
  lastLogin?: string
  status: 'active' | 'inactive' | 'locked'
}

interface AuthSession {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@gym.com',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles', 'view_analytics'],
    lastLogin: '2026-08-16 09:30',
    status: 'active'
  },
  {
    id: 2,
    username: 'manager_jane',
    email: 'jane@gym.com',
    role: 'manager',
    permissions: ['read', 'write', 'view_analytics', 'manage_bookings'],
    lastLogin: '2026-08-16 08:15',
    status: 'active'
  },
  {
    id: 3,
    username: 'member_john',
    email: 'john@gym.com',
    role: 'member',
    permissions: ['read', 'book_classes', 'view_profile'],
    lastLogin: '2026-08-15 18:45',
    status: 'active'
  },
  {
    id: 4,
    username: 'guest_sarah',
    email: 'sarah@gym.com',
    role: 'guest',
    permissions: ['read'],
    lastLogin: '2026-08-14 12:20',
    status: 'inactive'
  },
  {
    id: 5,
    username: 'member_mike',
    email: 'mike@gym.com',
    role: 'member',
    permissions: ['read', 'book_classes', 'view_profile'],
    lastLogin: '2026-08-13 14:00',
    status: 'locked'
  }
]

const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: ['read', 'write', 'delete', 'manage_users', 'manage_roles', 'view_analytics'],
  manager: ['read', 'write', 'view_analytics', 'manage_bookings'],
  member: ['read', 'book_classes', 'view_profile'],
  guest: ['read']
}

export default function ImplementAuthentication() {
  const [session, setSession] = useState<AuthSession>({
    user: null,
    isAuthenticated: false,
    token: null
  })
  const [username, setUsername] = useState('')
  const [loginError, setLoginError] = useState('')
  const [selectedPermission, setSelectedPermission] = useState('read')
  const [accessCheckResult, setAccessCheckResult] = useState('')

  const handleLogin = () => {
    setLoginError('')
    const user = MOCK_USERS.find(u => u.username === username)
    
    if (!user) {
      setLoginError('User not found')
      return
    }

    if (user.status === 'locked') {
      setLoginError('Account is locked')
      return
    }

    if (user.status === 'inactive') {
      setLoginError('Account is inactive')
      return
    }

    // Simulate successful login
    const token = `token_${user.id}_${Date.now()}`
    setSession({
      user,
      isAuthenticated: true,
      token
    })
    setUsername('')
  }

  const handleLogout = () => {
    setSession({
      user: null,
      isAuthenticated: false,
      token: null
    })
    setAccessCheckResult('')
  }

  const checkAccess = () => {
    if (!session.user) {
      setAccessCheckResult('Not authenticated')
      return
    }

    const hasPermission = session.user.permissions.includes(selectedPermission)
    setAccessCheckResult(
      hasPermission 
        ? `✓ Access granted: ${session.user.username} has '${selectedPermission}' permission`
        : `✗ Access denied: ${session.user.username} lacks '${selectedPermission}' permission`
    )
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'manager': return 'bg-blue-100 text-blue-800'
      case 'member': return 'bg-green-100 text-green-800'
      case 'guest': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'locked': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div data-testid="implementauthentication" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Authentication & RBAC System
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Login Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Login
            </h2>

            {!session.isAuthenticated ? (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    data-testid="implementauthentication-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {loginError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">{loginError}</p>
                  </div>
                )}

                <button
                  data-testid="implementauthentication-login"
                  onClick={handleLogin}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-xs text-blue-800 font-medium mb-1">
                    Test Users:
                  </p>
                  <p className="text-xs text-blue-700">
                    admin, manager_jane, member_john, guest_sarah, member_mike
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-green-900">
                      Logged in as: {session.user?.username}
                    </p>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getRoleBadgeColor(session.user?.role || '')}`}>
                      {session.user?.role}
                    </span>
                  </div>
                  <p className="text-xs text-green-700">
                    Email: {session.user?.email}
                  </p>
                  <p className="text-xs text-green-700">
                    Token: {session.token?.substring(0, 20)}...
                  </p>
                </div>

                <button
                  data-testid="implementauthentication-logout"
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Permission Check Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Permission Check
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Permission
              </label>
              <select
                data-testid="implementauthentication-permission"
                value={selectedPermission}
                onChange={(e) => setSelectedPermission(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="read">read</option>
                <option value="write">write</option>
                <option value="delete">delete</option>
                <option value="manage_users">manage_users</option>
                <option value="manage_roles">manage_roles</option>
                <option value="view_analytics">view_analytics</option>
                <option value="manage_bookings">manage_bookings</option>
                <option value="book_classes">book_classes</option>
                <option value="view_profile">view_profile</option>
              </select>
            </div>

            <button
              data-testid="implementauthentication-checkaccess"
              onClick={checkAccess}
              disabled={!session.isAuthenticated}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Check Access
            </button>

            {accessCheckResult && (
              <div className={`mt-4 p-3 rounded-md ${
                accessCheckResult.includes('✓') 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm font-medium ${
                  accessCheckResult.includes('✓') ? 'text-green-800' : 'text-red-800'
                }`}>
                  {accessCheckResult}
                </p>
              </div>
            )}

            {session.user && (
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-xs font-medium text-gray-700 mb-2">
                  Current User Permissions:
                </p>
                <div className="flex flex-wrap gap-1">
                  {session.user.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Users
          </h2>

          <div data-testid="implementauthentication-list" className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Last Login</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_USERS.map((user) => (
                  <tr
                    key={user.id}
                    data-testid="implementauthentication-item"
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                      {user.username}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusBadgeColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.lastLogin || 'Never'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.slice(0, 3).map((perm) => (
                          <span
                            key={perm}
                            className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {perm}
                          </span>
                        ))}
                        {user.permissions.length > 3 && (
                          <span className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                            +{user.permissions.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Permissions Matrix */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Role Permissions Matrix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => (
              <div
                key={role}
                className="p-4 border border-gray-200 rounded-md"
              >
                <h3 className={`font-medium mb-3 px-2 py-1 inline-block rounded ${getRoleBadgeColor(role)}`}>
                  {role}
                </h3>
                <ul className="space-y-1">
                  {permissions.map((perm) => (
                    <li key={perm} className="text-sm text-gray-700 flex items-center">
                      <span className="mr-2 text-green-600">✓</span>
                      {perm}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
