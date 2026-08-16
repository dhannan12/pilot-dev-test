/**
 * ImplementJwt — JWT authentication and RBAC management interface
 *
 * Features: User authentication, role-based access control, JWT token management, permission visualization, role assignment
 *
 * Ticket: SCRUM-913 | Branch: proto/SCRUM-903
 */

import React, { useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'attorney' | 'paralegal' | 'client' | 'guest'
  permissions: string[]
  tokenExpiry: string
  lastLogin: string
  isActive: boolean
}

interface JwtToken {
  token: string
  issued: string
  expires: string
  userId: string
}

const MOCK_USERS: User[] = [
  {
    id: 'usr_001',
    email: 'admin@lawfirm.com',
    name: 'Sarah Administrator',
    role: 'admin',
    permissions: ['read:all', 'write:all', 'delete:all', 'manage:users', 'manage:roles'],
    tokenExpiry: '2026-08-16T18:30:00Z',
    lastLogin: '2026-08-16T09:15:00Z',
    isActive: true,
  },
  {
    id: 'usr_002',
    email: 'attorney@lawfirm.com',
    name: 'John Attorney',
    role: 'attorney',
    permissions: ['read:cases', 'write:cases', 'read:documents', 'write:documents', 'read:clients'],
    tokenExpiry: '2026-08-16T17:45:00Z',
    lastLogin: '2026-08-16T08:30:00Z',
    isActive: true,
  },
  {
    id: 'usr_003',
    email: 'paralegal@lawfirm.com',
    name: 'Emily Paralegal',
    role: 'paralegal',
    permissions: ['read:cases', 'read:documents', 'write:documents', 'read:clients'],
    tokenExpiry: '2026-08-16T16:00:00Z',
    lastLogin: '2026-08-16T07:45:00Z',
    isActive: true,
  },
  {
    id: 'usr_004',
    email: 'client@example.com',
    name: 'Michael Client',
    role: 'client',
    permissions: ['read:own-cases', 'read:own-documents'],
    tokenExpiry: '2026-08-16T15:30:00Z',
    lastLogin: '2026-08-16T10:00:00Z',
    isActive: true,
  },
  {
    id: 'usr_005',
    email: 'guest@example.com',
    name: 'Guest User',
    role: 'guest',
    permissions: ['read:public'],
    tokenExpiry: '2026-08-16T14:00:00Z',
    lastLogin: '2026-08-16T11:30:00Z',
    isActive: false,
  },
]

const ROLE_DEFINITIONS = {
  admin: {
    name: 'Administrator',
    color: 'bg-red-100 text-red-800',
    description: 'Full system access',
  },
  attorney: {
    name: 'Attorney',
    color: 'bg-blue-100 text-blue-800',
    description: 'Manage cases and clients',
  },
  paralegal: {
    name: 'Paralegal',
    color: 'bg-green-100 text-green-800',
    description: 'Support case management',
  },
  client: {
    name: 'Client',
    color: 'bg-purple-100 text-purple-800',
    description: 'View own cases only',
  },
  guest: {
    name: 'Guest',
    color: 'bg-gray-100 text-gray-800',
    description: 'Limited public access',
  },
}

export default function ImplementJwt() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [currentToken, setCurrentToken] = useState<JwtToken | null>(null)
  const [activeTab, setActiveTab] = useState<'login' | 'users' | 'roles'>('login')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserName, setNewUserName] = useState('')
  const [newUserRole, setNewUserRole] = useState<User['role']>('client')

  const handleLogin = () => {
    const user = users.find(u => u.email === loginEmail && u.isActive)
    if (user) {
      const token: JwtToken = {
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ userId: user.id, role: user.role }))}`,
        issued: new Date().toISOString(),
        expires: user.tokenExpiry,
        userId: user.id,
      }
      setCurrentToken(token)
      setSelectedUser(user)
      setLoginEmail('')
      setLoginPassword('')
    }
  }

  const handleLogout = () => {
    setCurrentToken(null)
    setSelectedUser(null)
  }

  const handleCreateUser = () => {
    if (newUserEmail && newUserName) {
      const newUser: User = {
        id: `usr_${Date.now()}`,
        email: newUserEmail,
        name: newUserName,
        role: newUserRole,
        permissions: getPermissionsForRole(newUserRole),
        tokenExpiry: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
      }
      setUsers([...users, newUser])
      setNewUserEmail('')
      setNewUserName('')
      setNewUserRole('client')
    }
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u))
  }

  const handleChangeUserRole = (userId: string, newRole: User['role']) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, role: newRole, permissions: getPermissionsForRole(newRole) }
        : u
    ))
  }

  const getPermissionsForRole = (role: User['role']): string[] => {
    const permissionMap: Record<User['role'], string[]> = {
      admin: ['read:all', 'write:all', 'delete:all', 'manage:users', 'manage:roles'],
      attorney: ['read:cases', 'write:cases', 'read:documents', 'write:documents', 'read:clients'],
      paralegal: ['read:cases', 'read:documents', 'write:documents', 'read:clients'],
      client: ['read:own-cases', 'read:own-documents'],
      guest: ['read:public'],
    }
    return permissionMap[role]
  }

  return (
    <section data-testid="implementjwt" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">JWT Authentication & RBAC</h1>
          <p className="text-gray-600">Manage user authentication, roles, and permissions</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b border-gray-200">
            <button
              data-testid="implementjwt-tab-login"
              onClick={() => setActiveTab('login')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'login'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Login & Token
            </button>
            <button
              data-testid="implementjwt-tab-users"
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'users'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              User Management
            </button>
            <button
              data-testid="implementjwt-tab-roles"
              onClick={() => setActiveTab('roles')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'roles'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Roles & Permissions
            </button>
          </div>

          <div className="p-6">
            {/* Login Tab */}
            {activeTab === 'login' && (
              <div data-testid="implementjwt-login-section" className="space-y-6">
                {!currentToken ? (
                  <div className="max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Login</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          data-testid="implementjwt-email"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="user@lawfirm.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input
                          data-testid="implementjwt-password"
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="••••••••"
                        />
                      </div>
                      <button
                        data-testid="implementjwt-login"
                        onClick={handleLogin}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
                      >
                        Login
                      </button>
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-gray-600 font-medium mb-2">Test Credentials:</p>
                        <p className="text-xs text-gray-600">admin@lawfirm.com (Admin)</p>
                        <p className="text-xs text-gray-600">attorney@lawfirm.com (Attorney)</p>
                        <p className="text-xs text-gray-600">paralegal@lawfirm.com (Paralegal)</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-2">
                        ✓ Authenticated
                      </h3>
                      <p className="text-sm text-green-700">
                        Logged in as: <strong>{selectedUser?.name}</strong> ({selectedUser?.email})
                      </p>
                      <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          selectedUser ? ROLE_DEFINITIONS[selectedUser.role].color : ''
                        }`}>
                          {selectedUser ? ROLE_DEFINITIONS[selectedUser.role].name : ''}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h3 className="text-md font-semibold text-gray-900 mb-3">JWT Token</h3>
                      <div className="bg-white p-3 rounded border border-gray-200 mb-3">
                        <p className="text-xs font-mono text-gray-600 break-all">
                          {currentToken.token.substring(0, 80)}...
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Issued:</p>
                          <p className="font-medium">{new Date(currentToken.issued).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Expires:</p>
                          <p className="font-medium">{new Date(currentToken.expires).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h3 className="text-md font-semibold text-gray-900 mb-3">Permissions</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser?.permissions.map((perm, idx) => (
                          <span
                            key={idx}
                            data-testid="implementjwt-permission"
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium"
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      data-testid="implementjwt-logout"
                      onClick={handleLogout}
                      className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div data-testid="implementjwt-users-section" className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New User</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      data-testid="implementjwt-new-user-email"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="Email"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      data-testid="implementjwt-new-user-name"
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="Full Name"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      data-testid="implementjwt-new-user-role"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as User['role'])}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="admin">Administrator</option>
                      <option value="attorney">Attorney</option>
                      <option value="paralegal">Paralegal</option>
                      <option value="client">Client</option>
                      <option value="guest">Guest</option>
                    </select>
                    <button
                      data-testid="implementjwt-create-user"
                      onClick={handleCreateUser}
                      className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-medium"
                    >
                      Create User
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User List</h3>
                  <div data-testid="implementjwt-user-list" className="space-y-3">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        data-testid="implementjwt-user-item"
                        className={`border rounded-lg p-4 ${
                          user.isActive ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{user.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                ROLE_DEFINITIONS[user.role].color
                              }`}>
                                {ROLE_DEFINITIONS[user.role].name}
                              </span>
                              {!user.isActive && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                            <p className="text-xs text-gray-500">
                              Last login: {new Date(user.lastLogin).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <select
                              data-testid="implementjwt-change-role"
                              value={user.role}
                              onChange={(e) => handleChangeUserRole(user.id, e.target.value as User['role'])}
                              className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="admin">Admin</option>
                              <option value="attorney">Attorney</option>
                              <option value="paralegal">Paralegal</option>
                              <option value="client">Client</option>
                              <option value="guest">Guest</option>
                            </select>
                            <button
                              data-testid="implementjwt-toggle-status"
                              onClick={() => handleToggleUserStatus(user.id)}
                              className={`px-3 py-1 rounded text-sm font-medium ${
                                user.isActive
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {user.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Roles Tab */}
            {activeTab === 'roles' && (
              <div data-testid="implementjwt-roles-section" className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Definitions</h3>
                <div data-testid="implementjwt-role-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(ROLE_DEFINITIONS).map(([roleKey, roleDef]) => (
                    <div
                      key={roleKey}
                      data-testid="implementjwt-role-item"
                      className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{roleDef.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleDef.color}`}>
                          {roleKey}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{roleDef.description}</p>
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">Permissions:</p>
                        <div className="space-y-1">
                          {getPermissionsForRole(roleKey as User['role']).map((perm, idx) => (
                            <div key={idx} className="flex items-center text-xs text-gray-600">
                              <span className="mr-2">•</span>
                              <code className="bg-gray-100 px-2 py-0.5 rounded">{perm}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Users with this role: {users.filter(u => u.role === roleKey).length}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
