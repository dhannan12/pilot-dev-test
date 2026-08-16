/**
 * ImplementJwt — JWT authentication and Role-Based Access Control (RBAC) management interface
 *
 * Features: JWT token generation, role assignment, permission management, token validation, session monitoring
 *
 * Ticket: SCRUM-949 | Branch: proto/SCRUM-938
 */

import { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'teacher' | 'parent' | 'student'
  status: 'active' | 'inactive'
  lastLogin: string
  tokenExpiry: string
}

interface Permission {
  id: string
  resource: string
  actions: string[]
}

interface Role {
  name: string
  permissions: Permission[]
  description: string
}

const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin_user',
    email: 'admin@school.edu',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-08-16 09:30',
    tokenExpiry: '2026-08-16 21:30'
  },
  {
    id: '2',
    username: 'teacher_smith',
    email: 'smith@school.edu',
    role: 'teacher',
    status: 'active',
    lastLogin: '2026-08-16 08:15',
    tokenExpiry: '2026-08-16 20:15'
  },
  {
    id: '3',
    username: 'parent_jones',
    email: 'jones@email.com',
    role: 'parent',
    status: 'active',
    lastLogin: '2026-08-16 07:45',
    tokenExpiry: '2026-08-16 19:45'
  },
  {
    id: '4',
    username: 'student_mike',
    email: 'mike@school.edu',
    role: 'student',
    status: 'inactive',
    lastLogin: '2026-08-15 16:20',
    tokenExpiry: '2026-08-16 04:20'
  },
  {
    id: '5',
    username: 'teacher_davis',
    email: 'davis@school.edu',
    role: 'teacher',
    status: 'active',
    lastLogin: '2026-08-16 08:50',
    tokenExpiry: '2026-08-16 20:50'
  }
]

const MOCK_ROLES: Role[] = [
  {
    name: 'admin',
    description: 'Full system access',
    permissions: [
      { id: 'p1', resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
      { id: 'p2', resource: 'absences', actions: ['create', 'read', 'update', 'delete'] },
      { id: 'p3', resource: 'reports', actions: ['create', 'read', 'export'] }
    ]
  },
  {
    name: 'teacher',
    description: 'Manage student absences',
    permissions: [
      { id: 'p4', resource: 'absences', actions: ['create', 'read', 'update'] },
      { id: 'p5', resource: 'reports', actions: ['read'] }
    ]
  },
  {
    name: 'parent',
    description: 'View child absences',
    permissions: [
      { id: 'p6', resource: 'absences', actions: ['read'] },
      { id: 'p7', resource: 'reports', actions: ['read'] }
    ]
  },
  {
    name: 'student',
    description: 'View own absences',
    permissions: [
      { id: 'p8', resource: 'absences', actions: ['read'] }
    ]
  }
]

export default function ImplementJwt() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>('admin')
  const [showTokenModal, setShowTokenModal] = useState(false)
  const [generatedToken, setGeneratedToken] = useState<string>('')

  const generateToken = (user: User) => {
    // Simulate JWT token generation
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({ 
      sub: user.id, 
      username: user.username,
      role: user.role,
      exp: Date.now() + 43200000 
    }))
    const signature = btoa('mock_signature_' + user.id)
    return `${header}.${payload}.${signature}`
  }

  const handleGenerateToken = (user: User) => {
    const token = generateToken(user)
    setGeneratedToken(token)
    setSelectedUser(user)
    setShowTokenModal(true)
  }

  const handleRevokeToken = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'inactive' as const } : u
    ))
  }

  const handleRefreshToken = (userId: string) => {
    const now = new Date()
    const expiry = new Date(now.getTime() + 12 * 60 * 60 * 1000)
    setUsers(users.map(u => 
      u.id === userId ? { 
        ...u, 
        status: 'active' as const,
        lastLogin: now.toLocaleString('en-CA', { hour12: false }).slice(0, 16).replace('T', ' '),
        tokenExpiry: expiry.toLocaleString('en-CA', { hour12: false }).slice(0, 16).replace('T', ' ')
      } : u
    ))
  }

  const getRolePermissions = (roleName: string) => {
    return MOCK_ROLES.find(r => r.name === roleName)?.permissions || []
  }

  const handleChangeRole = (userId: string, newRole: 'admin' | 'teacher' | 'parent' | 'student') => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    ))
  }

  return (
    <div data-testid="implementjwt" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">JWT Authentication & RBAC</h1>
          <p className="text-gray-600">Manage user authentication tokens and role-based access control</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold text-green-600">
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expired Tokens</h3>
            <p className="text-3xl font-bold text-red-600">
              {users.filter(u => u.status === 'inactive').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Sessions Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">User Sessions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody data-testid="implementjwt-list" className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} data-testid="implementjwt-item" className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-gray-900">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          data-testid="implementjwt-role"
                          value={user.role}
                          onChange={(e) => handleChangeRole(user.id, e.target.value as any)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="admin">Admin</option>
                          <option value="teacher">Teacher</option>
                          <option value="parent">Parent</option>
                          <option value="student">Student</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            data-testid="implementjwt-generate"
                            onClick={() => handleGenerateToken(user)}
                            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          >
                            Generate
                          </button>
                          {user.status === 'active' ? (
                            <button
                              data-testid="implementjwt-revoke"
                              onClick={() => handleRevokeToken(user.id)}
                              className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                            >
                              Revoke
                            </button>
                          ) : (
                            <button
                              data-testid="implementjwt-refresh"
                              onClick={() => handleRefreshToken(user.id)}
                              className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                            >
                              Refresh
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role Permissions */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Role Permissions</h2>
              <select
                data-testid="implementjwt-roleselect"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                {MOCK_ROLES.map(role => (
                  <option key={role.name} value={role.name}>
                    {role.name.charAt(0).toUpperCase() + role.name.slice(1)} - {role.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {getRolePermissions(selectedRole).map((permission) => (
                  <div key={permission.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 capitalize">{permission.resource}</h3>
                    <div className="flex flex-wrap gap-2">
                      {permission.actions.map((action) => (
                        <span
                          key={action}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Token Generation Modal */}
        {showTokenModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div data-testid="implementjwt-modal" className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated JWT Token</h2>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">User: <span className="font-medium">{selectedUser.username}</span></p>
                <p className="text-sm text-gray-600 mb-2">Role: <span className="font-medium capitalize">{selectedUser.role}</span></p>
                <p className="text-sm text-gray-600 mb-4">Expires: <span className="font-medium">{selectedUser.tokenExpiry}</span></p>
              </div>
              <div className="bg-gray-50 rounded border border-gray-300 p-4 mb-4">
                <p className="text-xs font-mono break-all text-gray-700">{generatedToken}</p>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  data-testid="implementjwt-copy"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedToken)
                    alert('Token copied to clipboard!')
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Copy Token
                </button>
                <button
                  data-testid="implementjwt-close"
                  onClick={() => setShowTokenModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
