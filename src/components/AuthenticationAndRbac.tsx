/**
 * AuthenticationAndRbac — Authentication and role-based access control management interface
 *
 * Features: user authentication, role management, permission assignment, access control policies, audit logging
 *
 * Ticket: SCRUM-878 | Branch: proto/SCRUM-868
 */

import { useState } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'locked'
  lastLogin: string
  permissions: string[]
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface Permission {
  id: string
  name: string
  resource: string
  actions: string[]
  description: string
}

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  status: 'success' | 'denied' | 'failed'
}

const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'Administrator',
    status: 'active',
    lastLogin: '2026-08-15 09:30',
    permissions: ['claims:read', 'claims:write', 'claims:delete', 'users:manage', 'roles:manage']
  },
  {
    id: 'u2',
    username: 'adjuster1',
    email: 'adjuster1@example.com',
    role: 'Claims Adjuster',
    status: 'active',
    lastLogin: '2026-08-15 08:45',
    permissions: ['claims:read', 'claims:write', 'claims:approve']
  },
  {
    id: 'u3',
    username: 'viewer1',
    email: 'viewer1@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2026-08-14 16:20',
    permissions: ['claims:read']
  },
  {
    id: 'u4',
    username: 'manager1',
    email: 'manager1@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2026-08-15 07:15',
    permissions: ['claims:read', 'claims:write', 'claims:approve', 'reports:view', 'users:view']
  },
  {
    id: 'u5',
    username: 'contractor1',
    email: 'contractor@example.com',
    role: 'External Contractor',
    status: 'inactive',
    lastLogin: '2026-08-10 14:30',
    permissions: ['claims:read']
  }
]

const MOCK_ROLES: Role[] = [
  {
    id: 'r1',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: ['claims:read', 'claims:write', 'claims:delete', 'users:manage', 'roles:manage', 'system:config'],
    userCount: 1
  },
  {
    id: 'r2',
    name: 'Claims Adjuster',
    description: 'Can review, edit, and approve claims',
    permissions: ['claims:read', 'claims:write', 'claims:approve', 'documents:upload'],
    userCount: 12
  },
  {
    id: 'r3',
    name: 'Manager',
    description: 'Supervisory access with reporting capabilities',
    permissions: ['claims:read', 'claims:write', 'claims:approve', 'reports:view', 'users:view'],
    userCount: 5
  },
  {
    id: 'r4',
    name: 'Viewer',
    description: 'Read-only access to claims data',
    permissions: ['claims:read'],
    userCount: 8
  },
  {
    id: 'r5',
    name: 'External Contractor',
    description: 'Limited access for external partners',
    permissions: ['claims:read'],
    userCount: 3
  }
]

const MOCK_PERMISSIONS: Permission[] = [
  {
    id: 'p1',
    name: 'claims:read',
    resource: 'Claims',
    actions: ['view', 'search', 'export'],
    description: 'View and search claims data'
  },
  {
    id: 'p2',
    name: 'claims:write',
    resource: 'Claims',
    actions: ['create', 'update'],
    description: 'Create and update claims'
  },
  {
    id: 'p3',
    name: 'claims:delete',
    resource: 'Claims',
    actions: ['delete', 'archive'],
    description: 'Delete or archive claims'
  },
  {
    id: 'p4',
    name: 'users:manage',
    resource: 'Users',
    actions: ['create', 'update', 'delete', 'deactivate'],
    description: 'Manage user accounts'
  },
  {
    id: 'p5',
    name: 'roles:manage',
    resource: 'Roles',
    actions: ['create', 'update', 'delete', 'assign'],
    description: 'Manage roles and permissions'
  }
]

const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'a1',
    timestamp: '2026-08-15 09:30:15',
    user: 'admin',
    action: 'Login',
    resource: 'System',
    status: 'success'
  },
  {
    id: 'a2',
    timestamp: '2026-08-15 09:25:42',
    user: 'adjuster1',
    action: 'Update Claim',
    resource: 'CLM-2024-001',
    status: 'success'
  },
  {
    id: 'a3',
    timestamp: '2026-08-15 09:20:33',
    user: 'viewer1',
    action: 'Attempt Delete',
    resource: 'CLM-2024-002',
    status: 'denied'
  },
  {
    id: 'a4',
    timestamp: '2026-08-15 09:15:18',
    user: 'manager1',
    action: 'Approve Claim',
    resource: 'CLM-2024-003',
    status: 'success'
  },
  {
    id: 'a5',
    timestamp: '2026-08-15 09:10:27',
    user: 'adjuster1',
    action: 'Create User',
    resource: 'Users',
    status: 'denied'
  }
]

export default function AuthenticationAndRbac() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions' | 'audit'>('users')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Set to true to show main interface

  const handleLogin = () => {
    // Mock login - in real app would validate credentials
    if (loginUsername && loginPassword) {
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginUsername('')
    setLoginPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div data-testid="authenticationandrbac" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md" data-testid="authenticationandrbac-login-form">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Claims Management System</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                data-testid="authenticationandrbac-username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                data-testid="authenticationandrbac-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              data-testid="authenticationandrbac-login"
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div data-testid="authenticationandrbac" className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Authentication & RBAC</h1>
                <p className="text-sm text-gray-600">Security & Access Control</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">admin</div>
                <div className="text-xs text-gray-600">Administrator</div>
              </div>
              <button
                data-testid="authenticationandrbac-logout"
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <nav className="flex space-x-1 p-1" data-testid="authenticationandrbac-tabs">
            <button
              data-testid="authenticationandrbac-tab-users"
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'users'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Users
            </button>
            <button
              data-testid="authenticationandrbac-tab-roles"
              onClick={() => setActiveTab('roles')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'roles'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Roles
            </button>
            <button
              data-testid="authenticationandrbac-tab-permissions"
              onClick={() => setActiveTab('permissions')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'permissions'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Permissions
            </button>
            <button
              data-testid="authenticationandrbac-tab-audit"
              onClick={() => setActiveTab('audit')}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'audit'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Audit Log
            </button>
          </nav>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <p className="text-gray-600 mt-1">Manage user accounts and access</p>
              </div>
              <button
                data-testid="authenticationandrbac-add-user"
                onClick={() => setShowUserModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                + Add User
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="authenticationandrbac-users-table">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200" data-testid="authenticationandrbac-users-list">
                    {MOCK_USERS.map((user) => (
                      <tr key={user.id} data-testid="authenticationandrbac-user-item" className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{user.username}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{user.permissions.length} permissions</span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            data-testid="authenticationandrbac-view-user"
                            onClick={() => setSelectedUser(user)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            View
                          </button>
                          <button
                            data-testid="authenticationandrbac-edit-user"
                            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedUser && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-testid="authenticationandrbac-user-details">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
                  <button
                    data-testid="authenticationandrbac-close-details"
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div className="text-gray-900">{selectedUser.username}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="text-gray-900">{selectedUser.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <div className="text-gray-900">{selectedUser.role}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="text-gray-900">{selectedUser.status}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.map((perm, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Role Management</h2>
                <p className="text-gray-600 mt-1">Define roles and assign permissions</p>
              </div>
              <button
                data-testid="authenticationandrbac-add-role"
                onClick={() => setShowRoleModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                + Add Role
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="authenticationandrbac-roles-list">
              {MOCK_ROLES.map((role) => (
                <div
                  key={role.id}
                  data-testid="authenticationandrbac-role-item"
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Permissions</label>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((perm, idx) => (
                          <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded">
                            {perm}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Assigned Users</label>
                      <div className="text-sm text-gray-900">{role.userCount} users</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
                    <button
                      data-testid="authenticationandrbac-view-role"
                      onClick={() => setSelectedRole(role)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      data-testid="authenticationandrbac-edit-role"
                      className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {selectedRole && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-testid="authenticationandrbac-role-details">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Role Details: {selectedRole.name}</h3>
                  <button
                    data-testid="authenticationandrbac-close-role-details"
                    onClick={() => setSelectedRole(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{selectedRole.description}</p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">All Permissions</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.permissions.map((perm, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Permission Management</h2>
                <p className="text-gray-600 mt-1">Configure system permissions</p>
              </div>
              <button
                data-testid="authenticationandrbac-add-permission"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                + Add Permission
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="authenticationandrbac-permissions-table">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200" data-testid="authenticationandrbac-permissions-list">
                    {MOCK_PERMISSIONS.map((permission) => (
                      <tr key={permission.id} data-testid="authenticationandrbac-permission-item" className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-900">{permission.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                            {permission.resource}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {permission.actions.map((action, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {action}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{permission.description}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            data-testid="authenticationandrbac-edit-permission"
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Audit Log Tab */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Audit Log</h2>
                <p className="text-gray-600 mt-1">Track all authentication and access events</p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  data-testid="authenticationandrbac-filter-status"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option>All Status</option>
                  <option>Success</option>
                  <option>Denied</option>
                  <option>Failed</option>
                </select>
                <button
                  data-testid="authenticationandrbac-export-audit"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Export
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="authenticationandrbac-audit-table">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200" data-testid="authenticationandrbac-audit-list">
                    {MOCK_AUDIT_LOGS.map((log) => (
                      <tr key={log.id} data-testid="authenticationandrbac-audit-item" className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900">{log.user}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{log.action}</td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-gray-600">{log.resource}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                            log.status === 'success' ? 'bg-green-100 text-green-800' :
                            log.status === 'denied' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-testid="authenticationandrbac-user-modal">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  data-testid="authenticationandrbac-modal-username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  data-testid="authenticationandrbac-modal-email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  data-testid="authenticationandrbac-modal-role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option>Select role...</option>
                  {MOCK_ROLES.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                data-testid="authenticationandrbac-modal-cancel"
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                data-testid="authenticationandrbac-modal-submit"
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-testid="authenticationandrbac-role-modal">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  data-testid="authenticationandrbac-modal-role-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  data-testid="authenticationandrbac-modal-description"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                data-testid="authenticationandrbac-modal-cancel-role"
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                data-testid="authenticationandrbac-modal-submit-role"
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
