/**
 * SetupAuthentication — Authentication setup and RBAC management for three user roles
 *
 * Features: role-based access control, user authentication, permission management, role assignment, access level configuration
 *
 * Ticket: SCRUM-936 | Branch: proto/SCRUM-926
 */

import { useState } from 'react'

type UserRole = 'admin' | 'coordinator' | 'volunteer'

interface Permission {
  id: string
  name: string
  description: string
  roles: UserRole[]
}

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  active: boolean
  lastLogin: string
}

interface RoleConfig {
  role: UserRole
  displayName: string
  color: string
  description: string
  permissionCount: number
}

const mockPermissions: Permission[] = [
  {
    id: 'p1',
    name: 'Manage Users',
    description: 'Create, edit, and delete user accounts',
    roles: ['admin']
  },
  {
    id: 'p2',
    name: 'Manage Events',
    description: 'Create and manage volunteer events',
    roles: ['admin', 'coordinator']
  },
  {
    id: 'p3',
    name: 'View Reports',
    description: 'Access analytics and reporting dashboards',
    roles: ['admin', 'coordinator']
  },
  {
    id: 'p4',
    name: 'Assign Volunteers',
    description: 'Assign volunteers to events and tasks',
    roles: ['admin', 'coordinator']
  },
  {
    id: 'p5',
    name: 'Register for Events',
    description: 'Sign up for volunteer opportunities',
    roles: ['admin', 'coordinator', 'volunteer']
  },
  {
    id: 'p6',
    name: 'View Schedule',
    description: 'View personal volunteer schedule',
    roles: ['admin', 'coordinator', 'volunteer']
  },
  {
    id: 'p7',
    name: 'Update Profile',
    description: 'Edit own profile information',
    roles: ['admin', 'coordinator', 'volunteer']
  }
]

const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Sarah Admin',
    email: 'sarah.admin@example.com',
    role: 'admin',
    active: true,
    lastLogin: '2026-08-16 09:15'
  },
  {
    id: 'u2',
    name: 'Mike Coordinator',
    email: 'mike.coord@example.com',
    role: 'coordinator',
    active: true,
    lastLogin: '2026-08-16 08:30'
  },
  {
    id: 'u3',
    name: 'Emma Volunteer',
    email: 'emma.v@example.com',
    role: 'volunteer',
    active: true,
    lastLogin: '2026-08-15 14:20'
  },
  {
    id: 'u4',
    name: 'John Coordinator',
    email: 'john.coord@example.com',
    role: 'coordinator',
    active: true,
    lastLogin: '2026-08-14 16:45'
  },
  {
    id: 'u5',
    name: 'Lisa Volunteer',
    email: 'lisa.v@example.com',
    role: 'volunteer',
    active: false,
    lastLogin: '2026-08-10 11:00'
  }
]

const roleConfigs: RoleConfig[] = [
  {
    role: 'admin',
    displayName: 'Administrator',
    color: 'bg-red-100 text-red-800 border-red-300',
    description: 'Full system access with user management',
    permissionCount: 7
  },
  {
    role: 'coordinator',
    displayName: 'Coordinator',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Manage events and assign volunteers',
    permissionCount: 6
  },
  {
    role: 'volunteer',
    displayName: 'Volunteer',
    color: 'bg-green-100 text-green-800 border-green-300',
    description: 'Register for events and manage own profile',
    permissionCount: 3
  }
]

export default function SetupAuthentication() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin')
  const [users] = useState<User[]>(mockUsers)
  const [showPermissions, setShowPermissions] = useState(false)
  const [activeTab, setActiveTab] = useState<'roles' | 'users' | 'permissions'>('roles')

  const getPermissionsForRole = (role: UserRole): Permission[] => {
    return mockPermissions.filter(p => p.roles.includes(role))
  }

  const getRoleConfig = (role: UserRole): RoleConfig => {
    return roleConfigs.find(r => r.role === role) || roleConfigs[0]
  }

  const getUsersByRole = (role: UserRole): User[] => {
    return users.filter(u => u.role === role)
  }

  return (
    <div data-testid="setup-authentication" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication & RBAC Setup
          </h1>
          <p className="text-gray-600">
            Configure role-based access control for Admin, Coordinator, and Volunteer roles
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              data-testid="setup-authentication-tab-roles"
              onClick={() => setActiveTab('roles')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'roles'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Role Configuration
            </button>
            <button
              data-testid="setup-authentication-tab-users"
              onClick={() => setActiveTab('users')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User Management
            </button>
            <button
              data-testid="setup-authentication-tab-permissions"
              onClick={() => setActiveTab('permissions')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'permissions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Permissions Matrix
            </button>
          </nav>
        </div>

        {/* Role Configuration Tab */}
        {activeTab === 'roles' && (
          <div data-testid="setup-authentication-roles-section">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {roleConfigs.map(config => (
                <div
                  key={config.role}
                  data-testid="setup-authentication-role-card"
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRole === config.role
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRole(config.role)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {config.displayName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                      {getUsersByRole(config.role).length} users
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{config.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {config.permissionCount} permissions
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Role Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {getRoleConfig(selectedRole).displayName} Permissions
                </h2>
                <button
                  data-testid="setup-authentication-toggle-permissions"
                  onClick={() => setShowPermissions(!showPermissions)}
                  className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {showPermissions ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {showPermissions && (
                <div data-testid="setup-authentication-permissions-list" className="space-y-3">
                  {getPermissionsForRole(selectedRole).map(permission => (
                    <div
                      key={permission.id}
                      data-testid="setup-authentication-permission-item"
                      className="flex items-start p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{permission.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div data-testid="setup-authentication-users-section">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                <button
                  data-testid="setup-authentication-add-user"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
              <div data-testid="setup-authentication-users-list" className="divide-y divide-gray-200">
                {users.map(user => {
                  const roleConfig = getRoleConfig(user.role)
                  return (
                    <div
                      key={user.id}
                      data-testid="setup-authentication-user-item"
                      className="px-6 py-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-3">
                              <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${roleConfig.color}`}>
                                {roleConfig.displayName}
                              </span>
                              {user.active ? (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                                  Active
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                            <p className="text-xs text-gray-500 mt-1">Last login: {user.lastLogin}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            data-testid="setup-authentication-edit-user"
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            data-testid="setup-authentication-delete-user"
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Permissions Matrix Tab */}
        {activeTab === 'permissions' && (
          <div data-testid="setup-authentication-matrix-section">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Permissions Matrix</h2>
                <p className="text-sm text-gray-600 mt-1">
                  View all permissions across user roles
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Permission
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admin
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coordinator
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volunteer
                      </th>
                    </tr>
                  </thead>
                  <tbody data-testid="setup-authentication-matrix-list" className="bg-white divide-y divide-gray-200">
                    {mockPermissions.map(permission => (
                      <tr key={permission.id} data-testid="setup-authentication-matrix-item">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                            <div className="text-sm text-gray-500">{permission.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {permission.roles.includes('admin') ? (
                            <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {permission.roles.includes('coordinator') ? (
                            <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {permission.roles.includes('volunteer') ? (
                            <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
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
    </div>
  )
}
