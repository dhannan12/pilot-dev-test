/**
 * SetupAuthenticationAnd — Authentication and role-based access control setup interface
 *
 * Features: User login, role assignment, permission management, session handling, access control rules
 *
 * Ticket: SCRUM-760 | Branch: proto/SCRUM-747
 */

import { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'doctor' | 'receptionist' | 'patient'
  status: 'active' | 'inactive'
  lastLogin: string
}

interface Permission {
  id: string
  name: string
  description: string
  roles: string[]
}

interface AuthSession {
  userId: string
  username: string
  role: string
  loginTime: string
  expiresAt: string
}

const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'admin_user',
    email: 'admin@dentalclinic.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-08-13 09:30'
  },
  {
    id: 'u2',
    username: 'dr_smith',
    email: 'dr.smith@dentalclinic.com',
    role: 'doctor',
    status: 'active',
    lastLogin: '2026-08-13 08:15'
  },
  {
    id: 'u3',
    username: 'reception_jane',
    email: 'jane@dentalclinic.com',
    role: 'receptionist',
    status: 'active',
    lastLogin: '2026-08-13 07:45'
  },
  {
    id: 'u4',
    username: 'dr_johnson',
    email: 'dr.johnson@dentalclinic.com',
    role: 'doctor',
    status: 'inactive',
    lastLogin: '2026-08-10 14:20'
  },
  {
    id: 'u5',
    username: 'patient_john',
    email: 'john.doe@email.com',
    role: 'patient',
    status: 'active',
    lastLogin: '2026-08-12 16:30'
  }
]

const mockPermissions: Permission[] = [
  {
    id: 'p1',
    name: 'Manage Users',
    description: 'Create, edit, and delete user accounts',
    roles: ['admin']
  },
  {
    id: 'p2',
    name: 'View Medical Records',
    description: 'Access patient medical history and treatment records',
    roles: ['admin', 'doctor']
  },
  {
    id: 'p3',
    name: 'Manage Appointments',
    description: 'Schedule, modify, and cancel appointments',
    roles: ['admin', 'receptionist', 'doctor']
  },
  {
    id: 'p4',
    name: 'Process Payments',
    description: 'Handle billing and payment transactions',
    roles: ['admin', 'receptionist']
  },
  {
    id: 'p5',
    name: 'Update Profile',
    description: 'Modify personal information and settings',
    roles: ['admin', 'doctor', 'receptionist', 'patient']
  },
  {
    id: 'p6',
    name: 'View Own Records',
    description: 'Access personal medical records and appointment history',
    roles: ['patient']
  }
]

const mockActiveSessions: AuthSession[] = [
  {
    userId: 'u1',
    username: 'admin_user',
    role: 'admin',
    loginTime: '2026-08-13 09:30',
    expiresAt: '2026-08-13 17:30'
  },
  {
    userId: 'u2',
    username: 'dr_smith',
    role: 'doctor',
    loginTime: '2026-08-13 08:15',
    expiresAt: '2026-08-13 16:15'
  },
  {
    userId: 'u3',
    username: 'reception_jane',
    role: 'receptionist',
    loginTime: '2026-08-13 07:45',
    expiresAt: '2026-08-13 15:45'
  }
]

export default function SetupAuthenticationAnd() {
  const [activeTab, setActiveTab] = useState<'users' | 'permissions' | 'sessions'>('users')
  const [selectedRole, setSelectedRole] = useState<string>('all')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showLoginForm, setShowLoginForm] = useState(false)

  const handleLogin = () => {
    if (loginUsername && loginPassword) {
      alert(`Login successful for ${loginUsername}`)
      setShowLoginForm(false)
      setLoginUsername('')
      setLoginPassword('')
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'doctor':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'receptionist':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'patient':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  const filteredUsers = selectedRole === 'all' 
    ? mockUsers 
    : mockUsers.filter(user => user.role === selectedRole)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Authentication & Access Control</h1>
              <p className="text-gray-600 mt-2">Manage user authentication and role-based permissions</p>
            </div>
            <button
              onClick={() => setShowLoginForm(!showLoginForm)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              {showLoginForm ? 'Cancel' : 'Test Login'}
            </button>
          </div>

          {/* Login Form */}
          {showLoginForm && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Login Test</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Authenticate
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'users'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Users & Roles
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'permissions'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Permissions
              </button>
              <button
                onClick={() => setActiveTab('sessions')}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'sessions'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Active Sessions
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRole('all')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedRole === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Users
                    </button>
                    <button
                      onClick={() => setSelectedRole('admin')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedRole === 'admin'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => setSelectedRole('doctor')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedRole === 'doctor'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Doctor
                    </button>
                    <button
                      onClick={() => setSelectedRole('receptionist')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedRole === 'receptionist'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Receptionist
                    </button>
                    <button
                      onClick={() => setSelectedRole('patient')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedRole === 'patient'
                          ? 'bg-gray-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Patient
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    + Add User
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Username</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Login</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{user.username}</td>
                          <td className="py-3 px-4 text-gray-600">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">{user.lastLogin}</td>
                          <td className="py-3 px-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Permissions Tab */}
            {activeTab === 'permissions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Access Control Rules</h3>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    + Add Permission
                  </button>
                </div>

                <div className="grid gap-4">
                  {mockPermissions.map((permission) => (
                    <div key={permission.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{permission.name}</h4>
                          <p className="text-gray-600 mt-1 text-sm">{permission.description}</p>
                          <div className="flex gap-2 mt-3">
                            {permission.roles.map((role) => (
                              <span
                                key={role}
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(role)}`}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Active User Sessions</h3>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                    {mockActiveSessions.length} Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Login Time</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Expires At</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockActiveSessions.map((session) => (
                        <tr key={session.userId} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{session.username}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(session.role)}`}>
                              {session.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 text-sm">{session.loginTime}</td>
                          <td className="py-3 px-4 text-gray-600 text-sm">{session.expiresAt}</td>
                          <td className="py-3 px-4">
                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                              Terminate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-blue-900 font-semibold text-2xl">{mockActiveSessions.length}</div>
                    <div className="text-blue-700 text-sm mt-1">Active Sessions</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-green-900 font-semibold text-2xl">
                      {mockUsers.filter(u => u.status === 'active').length}
                    </div>
                    <div className="text-green-700 text-sm mt-1">Active Users</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-purple-900 font-semibold text-2xl">{mockPermissions.length}</div>
                    <div className="text-purple-700 text-sm mt-1">Total Permissions</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 mt-1">Require 2FA for all admin users</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                  Enabled
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Session Timeout</h4>
                  <p className="text-sm text-gray-600 mt-1">Auto-logout after 8 hours of inactivity</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Configure
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Password Policy</h4>
                  <p className="text-sm text-gray-600 mt-1">Min 8 chars, uppercase, number, special char</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Edit
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Login Attempts</h4>
                  <p className="text-sm text-gray-600 mt-1">Lock account after 5 failed attempts</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  Adjust
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
