/**
 * AuthenticationAnd — Authentication and Role-Based Access Control (RBAC) system
 *
 * Features: user login, role management, permission display, user list, role assignment
 *
 * Ticket: SCRUM-1274 | Branch: proto/SCRUM-1265
 */

import React, { useState } from 'react'

interface User {
  id: number
  username: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

interface Role {
  id: number
  name: string
  permissions: string[]
  description: string
}

const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'admin_user',
    email: 'admin@sportsclub.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-08-30 09:30'
  },
  {
    id: 2,
    username: 'coach_sarah',
    email: 'sarah@sportsclub.com',
    role: 'coach',
    status: 'active',
    lastLogin: '2026-08-30 08:15'
  },
  {
    id: 3,
    username: 'member_john',
    email: 'john@example.com',
    role: 'member',
    status: 'active',
    lastLogin: '2026-08-29 18:45'
  },
  {
    id: 4,
    username: 'manager_mike',
    email: 'mike@sportsclub.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2026-08-30 07:00'
  },
  {
    id: 5,
    username: 'member_lisa',
    email: 'lisa@example.com',
    role: 'member',
    status: 'inactive',
    lastLogin: '2026-08-15 12:20'
  },
  {
    id: 6,
    username: 'coach_tom',
    email: 'tom@sportsclub.com',
    role: 'coach',
    status: 'active',
    lastLogin: '2026-08-29 14:30'
  }
]

const MOCK_ROLES: Role[] = [
  {
    id: 1,
    name: 'admin',
    permissions: ['all_access', 'user_management', 'system_settings', 'reports'],
    description: 'Full system access with all permissions'
  },
  {
    id: 2,
    name: 'manager',
    permissions: ['view_users', 'manage_bookings', 'view_reports', 'manage_coaches'],
    description: 'Manage club operations and staff'
  },
  {
    id: 3,
    name: 'coach',
    permissions: ['view_schedule', 'manage_sessions', 'view_members', 'update_attendance'],
    description: 'Manage training sessions and member attendance'
  },
  {
    id: 4,
    name: 'member',
    permissions: ['view_schedule', 'book_sessions', 'view_profile', 'update_profile'],
    description: 'Basic member access for bookings and profile'
  },
  {
    id: 5,
    name: 'guest',
    permissions: ['view_schedule', 'view_public_info'],
    description: 'Limited guest access to public information'
  }
]

export default function AuthenticationAnd() {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState('member')
  const [filterStatus, setFilterStatus] = useState('all')

  const handleLogin = () => {
    // Mock login - find user by username
    const user = MOCK_USERS.find(u => u.username === loginUsername)
    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setLoginUsername('')
    setLoginPassword('')
  }

  const getFilteredUsers = () => {
    if (filterStatus === 'all') return MOCK_USERS
    return MOCK_USERS.filter(u => u.status === filterStatus)
  }

  const getRoleDetails = (roleName: string): Role | undefined => {
    return MOCK_ROLES.find(r => r.name === roleName)
  }

  return (
    <div data-testid="authenticationand" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication & RBAC System
          </h1>
          <p className="text-gray-600">Role-Based Access Control Management</p>
        </header>

        {!isLoggedIn ? (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  data-testid="authenticationand-username"
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  data-testid="authenticationand-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                data-testid="authenticationand-login"
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Login
              </button>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Test users:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                {MOCK_USERS.slice(0, 3).map(user => (
                  <li key={user.id}>{user.username} ({user.role})</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current User Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Current User</h2>
                  <p className="text-gray-600 mt-1">Logged in as {currentUser?.username}</p>
                </div>
                <button
                  data-testid="authenticationand-logout"
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">{currentUser?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="text-gray-900 font-medium capitalize">{currentUser?.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    currentUser?.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {currentUser?.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Login</p>
                  <p className="text-gray-900 font-medium">{currentUser?.lastLogin}</p>
                </div>
              </div>
            </div>

            {/* Permissions Section */}
            {currentUser && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Permissions</h2>
                <div className="flex flex-wrap gap-2" data-testid="authenticationand-permissions-list">
                  {getRoleDetails(currentUser.role)?.permissions.map((permission, index) => (
                    <span
                      key={index}
                      data-testid="authenticationand-permission-item"
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {permission.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Roles Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Roles</h2>
              <div className="mb-4">
                <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role to View Details
                </label>
                <select
                  id="role-select"
                  data-testid="authenticationand-role-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {MOCK_ROLES.map(role => (
                    <option key={role.id} value={role.name}>
                      {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {getRoleDetails(selectedRole) && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 capitalize">{selectedRole}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {getRoleDetails(selectedRole)?.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getRoleDetails(selectedRole)?.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white border border-gray-300 text-gray-700 rounded text-xs"
                      >
                        {permission.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">User Management</h2>
              <div className="mb-4">
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  id="status-filter"
                  data-testid="authenticationand-status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="authenticationand-users-list">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredUsers().map((user) => (
                      <tr key={user.id} data-testid="authenticationand-user-item" className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{user.username}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium capitalize">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
