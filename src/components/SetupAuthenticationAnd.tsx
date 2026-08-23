/**
 * SetupAuthenticationAnd — Authentication and Role-Based Access Control system setup interface
 *
 * Features: user authentication status, role management, permission assignment, access control rules, user-role mapping
 *
 * Ticket: SCRUM-1160 | Branch: proto/SCRUM-1151
 */

import React, { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  isAuthenticated: boolean
  lastLogin: string
}

interface Role {
  id: string
  name: string
  permissions: string[]
  color: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Administrator',
    email: 'sarah.admin@coffeeshop.com',
    role: 'admin',
    isAuthenticated: true,
    lastLogin: '2026-08-23 09:15 AM'
  },
  {
    id: '2',
    name: 'Mike Manager',
    email: 'mike.manager@coffeeshop.com',
    role: 'manager',
    isAuthenticated: true,
    lastLogin: '2026-08-23 08:30 AM'
  },
  {
    id: '3',
    name: 'Emma Employee',
    email: 'emma.employee@coffeeshop.com',
    role: 'employee',
    isAuthenticated: false,
    lastLogin: '2026-08-22 05:45 PM'
  },
  {
    id: '4',
    name: 'John Customer',
    email: 'john.customer@email.com',
    role: 'customer',
    isAuthenticated: true,
    lastLogin: '2026-08-23 10:00 AM'
  },
  {
    id: '5',
    name: 'Lisa Guest',
    email: 'lisa.guest@email.com',
    role: 'guest',
    isAuthenticated: false,
    lastLogin: 'Never'
  },
  {
    id: '6',
    name: 'Tom Barista',
    email: 'tom.barista@coffeeshop.com',
    role: 'employee',
    isAuthenticated: true,
    lastLogin: '2026-08-23 07:00 AM'
  }
]

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'admin',
    permissions: ['manage_users', 'manage_roles', 'manage_products', 'view_reports', 'manage_orders', 'manage_rewards'],
    color: 'bg-red-100 text-red-800 border-red-300'
  },
  {
    id: '2',
    name: 'manager',
    permissions: ['manage_products', 'view_reports', 'manage_orders', 'manage_rewards'],
    color: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  {
    id: '3',
    name: 'employee',
    permissions: ['manage_orders', 'view_products'],
    color: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    id: '4',
    name: 'customer',
    permissions: ['place_order', 'view_rewards', 'view_products'],
    color: 'bg-green-100 text-green-800 border-green-300'
  },
  {
    id: '5',
    name: 'guest',
    permissions: ['view_products'],
    color: 'bg-gray-100 text-gray-800 border-gray-300'
  }
]

export default function SetupAuthenticationAnd() {
  const [users] = useState<User[]>(mockUsers)
  const [roles] = useState<Role[]>(mockRoles)
  const [selectedRole, setSelectedRole] = useState<string>('admin')

  const getRoleColor = (roleName: string): string => {
    const role = roles.find(r => r.name === roleName)
    return role?.color || 'bg-gray-100 text-gray-800 border-gray-300'
  }

  const selectedRoleData = roles.find(r => r.name === selectedRole)

  return (
    <div data-testid="setupauthenticationand" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication & RBAC System</h1>
          <p className="text-gray-600">Manage user authentication and role-based access control</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Users</h2>
            <div data-testid="setupauthenticationand-list" className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  data-testid="setupauthenticationand-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        {user.isAuthenticated && (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                            Active
                          </span>
                        )}
                        {!user.isAuthenticated && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                            Offline
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        <span className="text-xs text-gray-500">Last login: {user.lastLogin}</span>
                      </div>
                    </div>
                    <button
                      data-testid="setupauthenticationand-edit"
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roles & Permissions Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Roles & Permissions</h2>
            
            {/* Role Selection */}
            <div className="mb-4">
              <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <select
                id="role-select"
                data-testid="setupauthenticationand-role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Role Details */}
            {selectedRoleData && (
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded border ${selectedRoleData.color}`}>
                    {selectedRoleData.name}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Permissions:</h3>
                <div className="space-y-2">
                  {selectedRoleData.permissions.map((permission, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{permission.replace(/_/g, ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Roles Overview */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">All Roles</h3>
              <div data-testid="setupauthenticationand-roles-list" className="space-y-2">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    data-testid="setupauthenticationand-role-item"
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${role.color}`}>
                      {role.name}
                    </span>
                    <span className="text-xs text-gray-600">
                      {role.permissions.length} permissions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            data-testid="setupauthenticationand-add-user"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add User
          </button>
          <button
            data-testid="setupauthenticationand-add-role"
            className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Role
          </button>
          <button
            data-testid="setupauthenticationand-settings"
            className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            Auth Settings
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.isAuthenticated).length}
            </div>
            <div className="text-sm text-gray-600">Active Sessions</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-gray-900">{roles.length}</div>
            <div className="text-sm text-gray-600">Roles Defined</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-blue-600">
              {roles.reduce((sum, role) => sum + role.permissions.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Permissions</div>
          </div>
        </div>
      </div>
    </div>
  )
}
