/**
 * ImplementAuthentication — Authentication and Role-Based Access Control (RBAC) system
 *
 * Features: User login, role management, permission checks, session handling, access control dashboard
 *
 * Ticket: SCRUM-924 | Branch: proto/SCRUM-914
 */

import { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'manager' | 'user' | 'guest'
  permissions: string[]
  lastLogin: string
  status: 'active' | 'inactive' | 'locked'
}

interface Role {
  id: string
  name: string
  permissions: string[]
  description: string
  userCount: number
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin_user',
    email: 'admin@equipment.com',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles', 'view_reports'],
    lastLogin: '2026-08-16 09:30',
    status: 'active'
  },
  {
    id: '2',
    username: 'manager_jane',
    email: 'jane@equipment.com',
    role: 'manager',
    permissions: ['read', 'write', 'view_reports', 'manage_equipment'],
    lastLogin: '2026-08-16 08:15',
    status: 'active'
  },
  {
    id: '3',
    username: 'user_john',
    email: 'john@equipment.com',
    role: 'user',
    permissions: ['read', 'write'],
    lastLogin: '2026-08-15 16:45',
    status: 'active'
  },
  {
    id: '4',
    username: 'guest_visitor',
    email: 'guest@equipment.com',
    role: 'guest',
    permissions: ['read'],
    lastLogin: '2026-08-14 11:20',
    status: 'active'
  },
  {
    id: '5',
    username: 'user_sarah',
    email: 'sarah@equipment.com',
    role: 'user',
    permissions: ['read', 'write'],
    lastLogin: '2026-08-13 14:30',
    status: 'inactive'
  }
]

const MOCK_ROLES: Role[] = [
  {
    id: 'r1',
    name: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles', 'view_reports'],
    description: 'Full system access with all permissions',
    userCount: 1
  },
  {
    id: 'r2',
    name: 'manager',
    permissions: ['read', 'write', 'view_reports', 'manage_equipment'],
    description: 'Manage equipment and view reports',
    userCount: 1
  },
  {
    id: 'r3',
    name: 'user',
    permissions: ['read', 'write'],
    description: 'Standard user access for booking and viewing',
    userCount: 2
  },
  {
    id: 'r4',
    name: 'guest',
    permissions: ['read'],
    description: 'Read-only access for guests',
    userCount: 1
  },
  {
    id: 'r5',
    name: 'auditor',
    permissions: ['read', 'view_reports'],
    description: 'View-only access with reporting capabilities',
    userCount: 0
  }
]

export default function ImplementAuthentication() {
  const [activeTab, setActiveTab] = useState<'login' | 'users' | 'roles' | 'permissions'>('login')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [filterRole, setFilterRole] = useState<string>('all')

  const handleLogin = () => {
    // Simulate login
    const user = MOCK_USERS.find(u => u.username === loginUsername)
    if (user) {
      setCurrentUser(user)
      setIsAuthenticated(true)
      setActiveTab('users')
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    setLoginUsername('')
    setLoginPassword('')
    setActiveTab('login')
  }

  const hasPermission = (permission: string): boolean => {
    return currentUser?.permissions.includes(permission) || false
  }

  const filteredUsers = filterRole === 'all' 
    ? MOCK_USERS 
    : MOCK_USERS.filter(u => u.role === filterRole)

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800'
      case 'manager': return 'bg-blue-100 text-blue-800'
      case 'user': return 'bg-green-100 text-green-800'
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
    <div data-testid="implementauthentication" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Authentication & RBAC</h1>
                <p className="text-purple-100 mt-1">Role-Based Access Control System</p>
              </div>
              {isAuthenticated && currentUser && (
                <div className="text-right">
                  <div className="text-sm text-purple-100">Logged in as</div>
                  <div className="font-semibold">{currentUser.username}</div>
                  <div className="text-xs text-purple-100">{currentUser.role}</div>
                </div>
              )}
            </div>
          </div>

          {!isAuthenticated ? (
            /* Login Form */
            <div className="p-8 max-w-md mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
                <p className="text-gray-600">Enter your credentials to access the system</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    data-testid="implementauthentication-username"
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    data-testid="implementauthentication-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                </div>

                <button
                  data-testid="implementauthentication-login"
                  onClick={handleLogin}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Sign In
                </button>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• admin_user (Admin)</li>
                    <li>• manager_jane (Manager)</li>
                    <li>• user_john (User)</li>
                    <li>• guest_visitor (Guest)</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            /* Authenticated View */
            <>
              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 bg-gray-50">
                <div className="flex space-x-1 p-4">
                  <button
                    data-testid="implementauthentication-tab-users"
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'users'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Users
                  </button>
                  <button
                    data-testid="implementauthentication-tab-roles"
                    onClick={() => setActiveTab('roles')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'roles'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Roles
                  </button>
                  <button
                    data-testid="implementauthentication-tab-permissions"
                    onClick={() => setActiveTab('permissions')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'permissions'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Permissions
                  </button>
                  <div className="flex-1"></div>
                  <button
                    data-testid="implementauthentication-logout"
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'users' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                      {hasPermission('manage_users') && (
                        <button
                          data-testid="implementauthentication-add-user"
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                        >
                          + Add User
                        </button>
                      )}
                    </div>

                    {/* Filter */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Role
                      </label>
                      <select
                        data-testid="implementauthentication-filter-role"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                        <option value="guest">Guest</option>
                      </select>
                    </div>

                    {/* User List */}
                    <div data-testid="implementauthentication-users-list" className="space-y-3">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          data-testid="implementauthentication-user-item"
                          className={`border rounded-lg p-4 transition-all ${
                            selectedUser === user.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedUser(user.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-800">{user.username}</h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                  {user.role}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                                  {user.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                              <div className="text-xs text-gray-500">
                                Last login: {user.lastLogin}
                              </div>
                            </div>
                            {hasPermission('manage_users') && (
                              <div className="flex gap-2">
                                <button
                                  data-testid="implementauthentication-edit-user"
                                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  data-testid="implementauthentication-delete-user"
                                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                          {selectedUser === user.id && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="text-sm font-medium text-gray-700 mb-2">Permissions:</div>
                              <div className="flex flex-wrap gap-2">
                                {user.permissions.map((perm) => (
                                  <span
                                    key={perm}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
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
                )}

                {activeTab === 'roles' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
                      {hasPermission('manage_roles') && (
                        <button
                          data-testid="implementauthentication-add-role"
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                        >
                          + Add Role
                        </button>
                      )}
                    </div>

                    <div data-testid="implementauthentication-roles-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MOCK_ROLES.map((role) => (
                        <div
                          key={role.id}
                          data-testid="implementauthentication-role-item"
                          className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-all"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-800 text-lg capitalize">{role.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                            </div>
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                              {role.userCount} users
                            </span>
                          </div>
                          <div className="mb-3">
                            <div className="text-sm font-medium text-gray-700 mb-2">Permissions:</div>
                            <div className="flex flex-wrap gap-2">
                              {role.permissions.map((perm) => (
                                <span
                                  key={perm}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                                >
                                  {perm}
                                </span>
                              ))}
                            </div>
                          </div>
                          {hasPermission('manage_roles') && (
                            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                              <button
                                data-testid="implementauthentication-edit-role"
                                className="flex-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                data-testid="implementauthentication-delete-role"
                                className="flex-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'permissions' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Permission Check</h2>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-2">Current User Permissions</h3>
                      <p className="text-sm text-blue-800 mb-3">
                        User: <span className="font-medium">{currentUser?.username}</span> | 
                        Role: <span className="font-medium">{currentUser?.role}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentUser?.permissions.map((perm) => (
                          <span
                            key={perm}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium"
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-800 mb-3">Permission Matrix</h3>
                      {[
                        { perm: 'read', label: 'Read Access', desc: 'View content and data' },
                        { perm: 'write', label: 'Write Access', desc: 'Create and modify content' },
                        { perm: 'delete', label: 'Delete Access', desc: 'Remove content and data' },
                        { perm: 'manage_users', label: 'Manage Users', desc: 'Add, edit, and remove users' },
                        { perm: 'manage_roles', label: 'Manage Roles', desc: 'Create and modify roles' },
                        { perm: 'view_reports', label: 'View Reports', desc: 'Access analytics and reports' },
                        { perm: 'manage_equipment', label: 'Manage Equipment', desc: 'Handle equipment inventory' }
                      ].map((item) => {
                        const hasAccess = hasPermission(item.perm)
                        return (
                          <div
                            key={item.perm}
                            data-testid="implementauthentication-permission-item"
                            className={`border rounded-lg p-4 ${
                              hasAccess
                                ? 'border-green-300 bg-green-50'
                                : 'border-red-300 bg-red-50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold text-gray-800">{item.label}</h4>
                                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                  hasAccess
                                    ? 'bg-green-600 text-white'
                                    : 'bg-red-600 text-white'
                                }`}
                              >
                                {hasAccess ? '✓ Granted' : '✗ Denied'}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
