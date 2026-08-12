import React, { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
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

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2026-08-12 10:30 AM',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2026-08-12 09:15 AM',
    permissions: ['read', 'write', 'manage_inventory', 'view_reports']
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Staff',
    status: 'active',
    lastLogin: '2026-08-11 04:20 PM',
    permissions: ['read', 'write', 'process_orders']
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2026-08-10 02:45 PM',
    permissions: ['read']
  },
  {
    id: '5',
    name: 'Tom Brown',
    email: 'tom.brown@example.com',
    role: 'Manager',
    status: 'inactive',
    lastLogin: '2026-08-05 11:00 AM',
    permissions: ['read', 'write', 'manage_inventory', 'view_reports']
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Staff',
    status: 'pending',
    lastLogin: 'Never',
    permissions: ['read', 'write', 'process_orders']
  }
]

const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles', 'manage_inventory', 'view_reports', 'process_orders'],
    userCount: 1
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Manage inventory and view reports',
    permissions: ['read', 'write', 'manage_inventory', 'view_reports', 'process_orders'],
    userCount: 2
  },
  {
    id: '3',
    name: 'Staff',
    description: 'Process orders and basic operations',
    permissions: ['read', 'write', 'process_orders'],
    userCount: 2
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to system',
    permissions: ['read'],
    userCount: 1
  },
  {
    id: '5',
    name: 'Guest',
    description: 'Limited access for temporary users',
    permissions: ['read'],
    userCount: 0
  }
]

export default function SetupAuthenticationAnd() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions'>('users')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const allPermissions = [
    { id: 'read', name: 'Read', description: 'View data and resources' },
    { id: 'write', name: 'Write', description: 'Create and update data' },
    { id: 'delete', name: 'Delete', description: 'Remove data and resources' },
    { id: 'manage_users', name: 'Manage Users', description: 'Create, update, and delete users' },
    { id: 'manage_roles', name: 'Manage Roles', description: 'Create and modify role permissions' },
    { id: 'manage_inventory', name: 'Manage Inventory', description: 'Control product inventory' },
    { id: 'view_reports', name: 'View Reports', description: 'Access analytics and reports' },
    { id: 'process_orders', name: 'Process Orders', description: 'Handle customer orders' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication & RBAC Setup
          </h1>
          <p className="text-gray-600">
            Manage user authentication, roles, and permissions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Users ({MOCK_USERS.length})
              </button>
              <button
                onClick={() => setActiveTab('roles')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'roles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Roles ({MOCK_ROLES.length})
              </button>
              <button
                onClick={() => setActiveTab('permissions')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'permissions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Permissions ({allPermissions.length})
              </button>
            </nav>
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Login</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_USERS.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{user.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.lastLogin}</td>
                        <td className="py-3 px-4 text-sm">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* User Details Modal */}
              {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-gray-900 font-medium">{selectedUser.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900">{selectedUser.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="text-gray-900">{selectedUser.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Permissions</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedUser.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Role
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_ROLES.map((role) => (
                  <div
                    key={role.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {role.userCount} users
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 4).map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                        >
                          {permission}
                        </span>
                      ))}
                      {role.permissions.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{role.permissions.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Role Details Modal */}
              {selectedRole && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Role Details</h3>
                      <button
                        onClick={() => setSelectedRole(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Role Name</p>
                        <p className="text-gray-900 font-medium">{selectedRole.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="text-gray-900">{selectedRole.description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Users with this role</p>
                        <p className="text-gray-900">{selectedRole.userCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Permissions ({selectedRole.permissions.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedRole.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Edit Role
                      </button>
                      <button
                        onClick={() => setSelectedRole(null)}
                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === 'permissions' && (
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">System Permissions</h2>
                <p className="text-sm text-gray-600 mt-1">
                  All available permissions in the system
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allPermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                          {permission.name}
                        </h3>
                        <p className="text-sm text-gray-600">{permission.description}</p>
                      </div>
                      <div className="ml-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                          {permission.id}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Used in{' '}
                        {MOCK_ROLES.filter((role) => role.permissions.includes(permission.id)).length}{' '}
                        roles
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{MOCK_USERS.length}</p>
            <p className="text-xs text-green-600 mt-1">
              {MOCK_USERS.filter((u) => u.status === 'active').length} active
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-1">Active Roles</p>
            <p className="text-2xl font-bold text-gray-900">{MOCK_ROLES.length}</p>
            <p className="text-xs text-gray-500 mt-1">System roles</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-1">Permissions</p>
            <p className="text-2xl font-bold text-gray-900">{allPermissions.length}</p>
            <p className="text-xs text-gray-500 mt-1">Available permissions</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-1">Pending Users</p>
            <p className="text-2xl font-bold text-gray-900">
              {MOCK_USERS.filter((u) => u.status === 'pending').length}
            </p>
            <p className="text-xs text-yellow-600 mt-1">Requires approval</p>
          </div>
        </div>
      </div>
    </div>
  )
}
